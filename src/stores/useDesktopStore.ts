import { create } from 'zustand';
import {
  BROWSER_APPS,
  CODE_WORKSPACES,
  NOTEPAD_ICON,
  TERMINAL_ICON,
} from '@/features/desktop/config/shell';
import { BROWSER_HOME_URL } from '@/features/browser-window/browserPolicy';
import {
  getStoredTextFile,
  useDesktopTextFilesStore,
} from './useDesktopTextFilesStore';
import { useDesktopPreferencesStore } from './useDesktopPreferencesStore';
import type {
  AnyWindow,
  BrowserAppId,
  BrowserWindow,
  CodeWindow,
  CodeWorkspaceId,
  FolderContentType,
  FolderWindow,
  PageTab,
  PageType,
  PagesWindow,
  TerminalWindow,
  TextFileId,
  TextFileWindow,
} from './desktopModels';

export type {
  AnyWindow,
  BrowserAppId,
  BrowserWindow,
  CodeWorkspaceId,
  CodeWindow,
  FolderContentType,
  FolderWindow,
  PageTab,
  PageType,
  PagesWindow,
  TerminalWindow,
  TextFileId,
  TextFileWindow,
} from './desktopModels';

const PAGE_WINDOW_ID = 'pages';
const TERMINAL_WINDOW_ID = 'terminal:main';
const WINDOW_CASCADE = [
  { x: 80, y: 80 },
  { x: 118, y: 110 },
  { x: 156, y: 142 },
  { x: 194, y: 174 },
] as const;

function getNextWindowPosition(windowCount: number) {
  const base = WINDOW_CASCADE[windowCount % WINDOW_CASCADE.length];
  if (typeof window === 'undefined') {
    return base;
  }
  // 창 기본 높이(약 85%)가 화면 아래(Dock 영역)로 잘리지 않도록 시작 top을 제한한다.
  // cascade로 창이 아래로 내려가더라도 항상 전체가 보이도록 clamp.
  const viewportHeight = window.innerHeight;
  const approxWindowHeight = viewportHeight * 0.85;
  const dockAllowance = 76;
  const maxTop = Math.max(
    28,
    viewportHeight - dockAllowance - approxWindowHeight
  );
  return { x: base.x, y: Math.min(base.y, maxTop) };
}

interface DesktopState {
  windows: AnyWindow[];
  activeWindowId: string | null;
  zIndexCounter: number;

  openPage: (tab: PageTab) => void;
  openFolder: (opts: {
    id?: string;
    title: string;
    icon: string;
    contentType: FolderContentType;
    folderId?: string;
    initialPos?: { x: number; y: number };
  }) => void;
  openBrowser: (browserAppId: BrowserAppId) => void;
  updateBrowserUrl: (id: string, url: string) => void;
  goBrowserHome: (id: string) => void;
  openCodeWorkspace: (workspaceId: CodeWorkspaceId) => void;
  openTextFileWindow: (fileId: TextFileId) => void;
  openTerminalWindow: () => void;

  setActiveTab: (tabId: PageType) => void;
  closeTab: (tabId: PageType) => void;
  closeActiveTab: () => void;
  moveTab: (fromIndex: number, toIndex: number) => void;

  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  toggleTaskbarItem: (id: string) => void;
  resetWindows: () => void;

  setWindowPosition: (id: string, pos: { x: number; y: number }) => void;
  setWindowSize: (id: string, size: { w: number; h: number }) => void;

  getWindow: (id: string) => AnyWindow | undefined;
  getPagesWindow: () => PagesWindow | undefined;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  zIndexCounter: 1000,

  getWindow: (id) => get().windows.find((window) => window.id === id),
  getPagesWindow: () =>
    get().windows.find((window) => window.id === PAGE_WINDOW_ID && window.type === 'pages') as
      | PagesWindow
      | undefined,

  openPage: (tab) => {
    let pagesWindow = get().getPagesWindow();

    if (!pagesWindow) {
      const nextZ = get().zIndexCounter + 1;
      const newPagesWindow: PagesWindow = {
        id: PAGE_WINDOW_ID,
        type: 'pages',
        title: tab.title,
        icon: tab.icon,
        position: getNextWindowPosition(get().windows.length),
        size: { w: 1080, h: 720 },
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZ,
        tabs: [],
        activeTabId: null,
      };

      set((state) => ({
        windows: [...state.windows, newPagesWindow],
        zIndexCounter: nextZ,
        activeWindowId: PAGE_WINDOW_ID,
      }));
      pagesWindow = get().getPagesWindow();
    }

    set((state) => {
      const nextZ = state.zIndexCounter + 1;
      return {
        windows: state.windows.map((window) => {
          if (window.id !== PAGE_WINDOW_ID) {
            return window;
          }

          const pages = window as PagesWindow;
          const nextTabs = pages.tabs.some((existingTab) => existingTab.id === tab.id)
            ? pages.tabs
            : [...pages.tabs, tab];

          return {
            ...pages,
            title: tab.title,
            icon: tab.icon,
            tabs: nextTabs,
            activeTabId: tab.id,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          };
        }),
        zIndexCounter: nextZ,
        activeWindowId: PAGE_WINDOW_ID,
      };
    });
  },

  openFolder: ({
    id = 'folder:root',
    title,
    icon,
    contentType,
    folderId,
    initialPos,
  }) => {
    const existing = get().getWindow(id) as FolderWindow | undefined;

    if (existing) {
      set((state) => {
        const nextZ = state.zIndexCounter + 1;
        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  title,
                  icon,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                }
              : window
          ),
          zIndexCounter: nextZ,
          activeWindowId: id,
        };
      });
      return;
    }

    const nextZ = get().zIndexCounter + 1;
    const folderWindow: FolderWindow = {
      id,
      type: 'folder',
      title,
      icon,
      contentType,
      folderId: folderId ?? id,
      position: initialPos ?? getNextWindowPosition(get().windows.length),
      size: { w: 780, h: 560 },
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    set((state) => ({
      windows: [...state.windows, folderWindow],
      zIndexCounter: nextZ,
      activeWindowId: id,
    }));
  },

  openBrowser: (browserAppId) => {
    const app = BROWSER_APPS[browserAppId];
    const id = `browser:${browserAppId}`;
    const existing = get().getWindow(id) as BrowserWindow | undefined;

    if (existing) {
      set((state) => {
        const nextZ = state.zIndexCounter + 1;
        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                }
              : window
          ),
          zIndexCounter: nextZ,
          activeWindowId: id,
        };
      });
      return;
    }

    const nextZ = get().zIndexCounter + 1;
    const browserWindow: BrowserWindow = {
      id,
      type: 'browser',
      browserAppId,
      title: app.title,
      icon: app.icon,
      url: app.initialUrl,
      position: getNextWindowPosition(get().windows.length),
      size: { w: 1040, h: 700 },
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    set((state) => ({
      windows: [...state.windows, browserWindow],
      zIndexCounter: nextZ,
      activeWindowId: id,
    }));
  },

  updateBrowserUrl: (id, url) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id && window.type === 'browser'
          ? { ...window, url }
          : window
      ),
    }));

    if (url !== BROWSER_HOME_URL) {
      useDesktopPreferencesStore.getState().setLastBrowserUrl(url);
    }
  },

  goBrowserHome: (id) => {
    get().updateBrowserUrl(id, BROWSER_HOME_URL);
  },

  openCodeWorkspace: (workspaceId) => {
    const workspace = CODE_WORKSPACES[workspaceId];
    const id = `code:${workspaceId}`;
    const existing = get().getWindow(id) as CodeWindow | undefined;

    if (existing) {
      set((state) => {
        const nextZ = state.zIndexCounter + 1;
        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                }
              : window
          ),
          zIndexCounter: nextZ,
          activeWindowId: id,
        };
      });
      return;
    }

    const nextZ = get().zIndexCounter + 1;
    const codeWindow: CodeWindow = {
      id,
      type: 'code',
      workspaceId,
      title: workspace.title,
      icon: workspace.icon,
      owner: workspace.owner,
      repo: workspace.repo,
      branch: workspace.branch,
      path: workspace.path,
      position: getNextWindowPosition(get().windows.length),
      size: { w: 1120, h: 740 },
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    set((state) => ({
      windows: [...state.windows, codeWindow],
      zIndexCounter: nextZ,
      activeWindowId: id,
    }));
  },

  openTextFileWindow: (fileId) => {
    const file = getStoredTextFile(fileId);
    const id = `text-file:${fileId}`;
    const existing = get().getWindow(id) as TextFileWindow | undefined;

    useDesktopTextFilesStore.getState().markFileOpened(fileId);

    if (existing) {
      set((state) => {
        const nextZ = state.zIndexCounter + 1;
        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  title: file.title,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                }
              : window
          ),
          zIndexCounter: nextZ,
          activeWindowId: id,
        };
      });
      return;
    }

    const nextZ = get().zIndexCounter + 1;
    const textFileWindow: TextFileWindow = {
      id,
      type: 'text-file',
      fileId,
      title: file.title,
      icon: NOTEPAD_ICON,
      position: getNextWindowPosition(get().windows.length),
      size: { w: 720, h: 560 },
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    set((state) => ({
      windows: [...state.windows, textFileWindow],
      zIndexCounter: nextZ,
      activeWindowId: id,
    }));
  },

  openTerminalWindow: () => {
    const existing = get().getWindow(TERMINAL_WINDOW_ID) as TerminalWindow | undefined;

    if (existing) {
      set((state) => {
        const nextZ = state.zIndexCounter + 1;
        return {
          windows: state.windows.map((window) =>
            window.id === TERMINAL_WINDOW_ID
              ? {
                  ...window,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                }
              : window
          ),
          zIndexCounter: nextZ,
          activeWindowId: TERMINAL_WINDOW_ID,
        };
      });
      return;
    }

    const nextZ = get().zIndexCounter + 1;
    const terminalWindow: TerminalWindow = {
      id: TERMINAL_WINDOW_ID,
      type: 'terminal',
      terminalId: 'main',
      title: 'Terminal',
      icon: TERMINAL_ICON,
      position: getNextWindowPosition(get().windows.length),
      size: { w: 840, h: 540 },
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    set((state) => ({
      windows: [...state.windows, terminalWindow],
      zIndexCounter: nextZ,
      activeWindowId: TERMINAL_WINDOW_ID,
    }));
  },

  setActiveTab: (tabId) => {
    set((state) => ({
      windows: state.windows.map((window) => {
        if (window.id !== PAGE_WINDOW_ID) {
          return window;
        }

        const pages = window as PagesWindow;
        if (!pages.tabs.some((tab) => tab.id === tabId)) {
          return pages;
        }

        const activeTab = pages.tabs.find((tab) => tab.id === tabId) ?? pages.tabs[0];
        return {
          ...pages,
          title: activeTab?.title ?? pages.title,
          icon: activeTab?.icon ?? pages.icon,
          activeTabId: tabId,
          isMinimized: false,
        };
      }),
      activeWindowId: PAGE_WINDOW_ID,
    }));
  },

  closeTab: (tabId) => {
    set((state) => {
      const nextWindows = state.windows.map((window) => {
        if (window.id !== PAGE_WINDOW_ID) {
          return window;
        }

        const pages = window as PagesWindow;
        if (!pages.tabs.some((tab) => tab.id === tabId)) {
          return pages;
        }

        const nextTabs = pages.tabs.filter((tab) => tab.id !== tabId);
        const nextActiveTabId =
          pages.activeTabId === tabId
            ? nextTabs[nextTabs.length - 1]?.id ?? null
            : pages.activeTabId;
        const activeTab =
          nextTabs.find((tab) => tab.id === nextActiveTabId) ?? nextTabs[nextTabs.length - 1];

        return {
          ...pages,
          title: activeTab?.title ?? 'Pages',
          icon: activeTab?.icon ?? pages.icon,
          tabs: nextTabs,
          activeTabId: nextActiveTabId,
          isOpen: nextTabs.length > 0,
        };
      });

      const pagesWindow = nextWindows.find((window) => window.id === PAGE_WINDOW_ID) as
        | PagesWindow
        | undefined;

      return {
        windows: nextWindows,
        activeWindowId:
          pagesWindow?.isOpen || state.activeWindowId !== PAGE_WINDOW_ID
            ? state.activeWindowId
            : null,
      };
    });
  },

  closeActiveTab: () => {
    const pagesWindow = get().getPagesWindow();
    if (!pagesWindow?.activeTabId) {
      return;
    }

    get().closeTab(pagesWindow.activeTabId);
  },

  moveTab: (fromIndex, toIndex) => {
    set((state) => ({
      windows: state.windows.map((window) => {
        if (window.id !== PAGE_WINDOW_ID) {
          return window;
        }

        const pages = window as PagesWindow;
        if (
          fromIndex < 0 ||
          fromIndex >= pages.tabs.length ||
          toIndex < 0 ||
          toIndex >= pages.tabs.length
        ) {
          return pages;
        }

        const nextTabs = [...pages.tabs];
        const [movedTab] = nextTabs.splice(fromIndex, 1);
        nextTabs.splice(toIndex, 0, movedTab);
        return {
          ...pages,
          tabs: nextTabs,
        };
      }),
    }));
  },

  focusWindow: (id) => {
    set((state) => {
      const nextZ = state.zIndexCounter + 1;
      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                isMinimized: false,
                zIndex: nextZ,
              }
            : window
        ),
        zIndexCounter: nextZ,
        activeWindowId: id,
      };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => {
      const nextZ = state.zIndexCounter + 1;
      return {
        windows: state.windows.map((window) => {
          if (window.id !== id) {
            return window;
          }

          if (!window.isMaximized) {
            return {
              ...window,
              isMaximized: true,
              isMinimized: false,
              zIndex: nextZ,
              prevBounds: {
                position: window.position,
                size: window.size,
              },
            };
          }

          return {
            ...window,
            isMaximized: false,
            isMinimized: false,
            zIndex: nextZ,
            position: window.prevBounds?.position ?? window.position,
            size: window.prevBounds?.size ?? window.size,
            prevBounds: undefined,
          };
        }),
        zIndexCounter: nextZ,
        activeWindowId: id,
      };
    });
  },

  closeWindow: (id) => {
    set((state) => {
      if (id === PAGE_WINDOW_ID) {
        return {
          windows: state.windows.map((window) =>
            window.id === PAGE_WINDOW_ID
              ? {
                  ...window,
                  title: 'Pages',
                  tabs: [],
                  activeTabId: null,
                  isOpen: false,
                  isMinimized: false,
                }
              : window
          ),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        };
      }

      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                isOpen: false,
                isMinimized: false,
              }
            : window
        ),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      };
    });
  },

  toggleTaskbarItem: (id) => {
    const window = get().getWindow(id);
    if (!window) {
      return;
    }

    if (window.isMinimized) {
      get().focusWindow(id);
      return;
    }

    if (get().activeWindowId === id) {
      get().minimizeWindow(id);
      return;
    }

    get().focusWindow(id);
  },

  resetWindows: () =>
    set({
      windows: [],
      activeWindowId: null,
    }),

  setWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, position } : window
      ),
    }));
  },

  setWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, size } : window
      ),
    }));
  },
}));
