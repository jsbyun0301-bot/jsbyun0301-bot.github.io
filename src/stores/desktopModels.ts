export type PageType =
  | 'about'
  | 'awards'
  | 'chrome'
  | 'blog'
  | 'insta'
  | 'github'
  | 'work'
  | 'card'
  | 'inobus'
  | 'hirax'
  | 'grace'
  | 'dongnae'
  | 'cafe'
  | 'game'
  | 'settings';

export type BrowserAppId =
  | 'browser-home'
  | 'blog'
  | 'insta'
  | 'github';

export type CodeWorkspaceId = 'portfolio-workspace';

export type TextFileId =
  | 'readme'
  | 'about-file'
  | 'contact'
  | 'now';

export type FolderContentType =
  | 'projects'
  | 'gru'
  | 'user-folder'
  | 'recycle-bin';

export type WallpaperId =
  | 'sonoma'
  | 'ventura'
  | 'graphite';

export interface DesktopPosition {
  x: number;
  y: number;
}

export interface PageTab {
  id: PageType;
  title: string;
  icon: string;
}

type DesktopShortcutBase = {
  id: string;
  title: string;
  icon: string;
  position: DesktopPosition;
  isSystem?: boolean;
  iconFrameClassName?: string;
};

export type PageShortcutItem = DesktopShortcutBase & {
  kind: 'page';
  pageId: PageType;
};

export type BrowserShortcutItem = DesktopShortcutBase & {
  kind: 'browser';
  browserAppId: BrowserAppId;
};

export type FolderShortcutItem = DesktopShortcutBase & {
  kind: 'folder';
  folderId: string;
  contentType: FolderContentType;
  mutable?: boolean;
};

export type CodeShortcutItem = DesktopShortcutBase & {
  kind: 'code';
  workspaceId: CodeWorkspaceId;
};

export type TerminalShortcutItem = DesktopShortcutBase & {
  kind: 'terminal';
};

export type TextFileShortcutItem = DesktopShortcutBase & {
  kind: 'text-file';
  fileId: TextFileId;
};

export type DesktopShortcutItem =
  | PageShortcutItem
  | BrowserShortcutItem
  | FolderShortcutItem
  | CodeShortcutItem
  | TerminalShortcutItem
  | TextFileShortcutItem;

export interface DesktopTextFile {
  id: TextFileId;
  title: string;
  description: string;
  content: string;
  isReadOnly: boolean;
}

type WindowType =
  | 'pages'
  | 'folder'
  | 'browser'
  | 'code'
  | 'text-file'
  | 'terminal';

interface WindowBounds {
  position: DesktopPosition;
  size: { w: number; h: number } | null;
}

interface BaseWindow {
  id: string;
  type: WindowType;
  title: string;
  icon: string;
  position: DesktopPosition;
  size: { w: number; h: number } | null;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  prevBounds?: WindowBounds;
}

export interface PagesWindow extends BaseWindow {
  type: 'pages';
  tabs: PageTab[];
  activeTabId: PageType | null;
}

export interface FolderWindow extends BaseWindow {
  type: 'folder';
  contentType: FolderContentType;
  folderId: string;
}

export interface BrowserWindow extends BaseWindow {
  type: 'browser';
  browserAppId: BrowserAppId;
  url: string;
}

export interface CodeWindow extends BaseWindow {
  type: 'code';
  workspaceId: CodeWorkspaceId;
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

export interface TextFileWindow extends BaseWindow {
  type: 'text-file';
  fileId: TextFileId;
}

export interface TerminalWindow extends BaseWindow {
  type: 'terminal';
  terminalId: 'main';
}

export type AnyWindow =
  | PagesWindow
  | FolderWindow
  | BrowserWindow
  | CodeWindow
  | TextFileWindow
  | TerminalWindow;
