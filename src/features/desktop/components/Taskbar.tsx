import { useMemo, useState } from 'react';
import {
  BATTERY_ICON,
  BROWSER_APPS,
  PINNED_APPS,
  START_MENU_APPS,
  START_MENU_RECOMMENDED_IDS,
  WALLPAPERS,
  WIFI_ICON,
  type LauncherAction,
  type LauncherEntry,
} from '@/features/desktop/config/shell';
import { PAGE_TABS } from '@/features/pages-window/registry/page-registry';
import { useClock } from '@/hooks/useClock';
import {
  useDesktopLayoutStore,
  useDesktopPreferencesStore,
  useDesktopStore,
  useDesktopTerminalStore,
  useDesktopTextFilesStore,
} from '@/stores';
import type { AnyWindow, PagesWindow } from '@/stores';
import { playSystemSound } from '@/utils/systemSounds';
import { useShallow } from 'zustand/shallow';

type DockStatus = 'idle' | 'running' | 'active';

function formatMenuTime(now: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
}

function formatMenuDate(now: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(now);
}

function formatPanelDate(now: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);
}

function matchesLauncher(entry: LauncherEntry, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  const haystack = [entry.label, entry.subtitle, ...entry.keywords]
    .join(' ')
    .toLowerCase();

  return normalizedQuery
    .split(/\s+/)
    .every((term) => haystack.includes(term));
}

function getFolderLaunchOptions(folderId: 'projects' | 'recycle-bin') {
  if (folderId === 'projects') {
    return {
      id: 'folder:projects',
      folderId: 'projects' as const,
      title: 'Projects',
      icon: '/assets/common/desktop/folder-shortcut.webp',
      contentType: 'projects' as const,
    };
  }

  return {
    id: 'folder:recycle-bin',
    folderId: 'recycle-bin' as const,
    title: 'Recycle Bin',
    icon: '/assets/common/desktop/folder-shortcut.webp',
    contentType: 'recycle-bin' as const,
  };
}

function getLaunchWindowId(action: LauncherAction) {
  switch (action.kind) {
    case 'folder':
      return `folder:${action.folderId}`;
    case 'browser':
      return `browser:${action.browserAppId}`;
    case 'code':
      return `code:${action.workspaceId}`;
    case 'text-file':
      return `text-file:${action.fileId}`;
    case 'terminal':
      return 'terminal:main';
    case 'page':
      return 'pages';
  }
}

function AppleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 384 512' aria-hidden className={`fill-current ${className}`}>
      <path d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C61.5 141.2 18 168.1 0 219c-20.3 55.6-2.6 137.4 30.7 187.5 16.2 24.6 35.4 52.1 60.7 51.2 24.4-.9 33.6-15.7 63-15.7 29.2 0 37.7 15.7 63.4 15.2 26.2-.4 42.7-24.8 58.7-49.5 12.4-18.5 22-38.5 27.4-59.5-51.5-19.4-53.6-51.4-53.6-51zM255.3 91.2c17.3-20.9 15.7-40 15.2-46.9-15.3.9-33 10.4-43.1 22.2-11.1 12.6-17.6 28.2-16.2 45.5 16.5 1.3 31.5-7.1 44.1-20.8z' />
    </svg>
  );
}

function DockButton({
  icon,
  label,
  status = 'idle',
  onClick,
}: {
  icon: string;
  label: string;
  status?: DockStatus;
  onClick: () => void;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className='group relative flex flex-col items-center'
    >
      <span className='pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100'>
        {label}
      </span>
      <img
        src={icon}
        alt=''
        className='h-12 w-12 origin-bottom rounded-[14px] object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out group-hover:-translate-y-1.5 group-hover:scale-125'
      />
      <span
        className={[
          'mt-[3px] h-[3px] w-[3px] rounded-full transition-colors',
          status === 'idle' ? 'bg-transparent' : 'bg-black/55',
        ].join(' ')}
      />
    </button>
  );
}

function LauncherRow({
  entry,
  onLaunch,
}: {
  entry: LauncherEntry;
  onLaunch: (entry: LauncherEntry) => void;
}) {
  return (
    <button
      onClick={() => onLaunch(entry)}
      className='flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/10'
    >
      <img
        src={entry.icon}
        alt=''
        className='h-8 w-8 rounded-lg object-contain'
      />
      <div className='min-w-0 flex-1'>
        <div className='truncate text-sm font-medium text-white'>
          {entry.label}
        </div>
        <div className='truncate text-[12px] text-white/55'>
          {entry.subtitle}
        </div>
      </div>
    </button>
  );
}

function Spotlight({
  query,
  onQueryChange,
  results,
  recommendedEntries,
  onLaunch,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  results: LauncherEntry[];
  recommendedEntries: LauncherEntry[];
  onLaunch: (entry: LauncherEntry) => void;
}) {
  const isSearching = query.trim().length > 0;
  const list = isSearching ? results : recommendedEntries;

  return (
    <div className='fixed left-1/2 top-24 z-[9999] w-[92vw] max-w-[560px] -translate-x-1/2'>
      <div className='overflow-hidden rounded-2xl border border-white/15 bg-[#20232b]/85 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl'>
        <label className='flex items-center gap-3 border-b border-white/10 px-4 py-3.5'>
          <svg viewBox='0 0 24 24' className='h-5 w-5 flex-none fill-none stroke-white/55' strokeWidth='2'>
            <circle cx='11' cy='11' r='7' />
            <path d='M21 21l-4.3-4.3' strokeLinecap='round' />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder='Spotlight 검색 — About, Projects, Terminal…'
            className='min-w-0 flex-1 bg-transparent text-[17px] text-white outline-none placeholder:text-white/35'
          />
        </label>

        <div className='max-h-[52vh] overflow-y-auto p-2'>
          <div className='px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40'>
            {isSearching ? '검색 결과' : '추천'}
          </div>
          {list.length > 0 ? (
            <div className='space-y-0.5'>
              {list.map((entry) => (
                <LauncherRow key={entry.id} entry={entry} onLaunch={onLaunch} />
              ))}
            </div>
          ) : (
            <div className='px-3 py-6 text-center text-sm text-white/55'>
              결과가 없습니다. About, Projects, Terminal, GitHub 등으로
              검색해보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ControlCenter({
  now,
  onReset,
  onOpenSettings,
}: {
  now: Date;
  onReset: () => void;
  onOpenSettings: () => void;
}) {
  const wallpaperId = useDesktopPreferencesStore((s) => s.wallpaperId);
  const setWallpaper = useDesktopPreferencesStore((s) => s.setWallpaper);
  const soundEnabled = useDesktopPreferencesStore((s) => s.soundEnabled);
  const toggleSound = useDesktopPreferencesStore((s) => s.toggleSound);

  return (
    <div className='fixed right-2 top-8 z-[9999] w-[320px] rounded-2xl border border-white/15 bg-[#20232b]/85 p-3 text-white shadow-[0_28px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl'>
      <div className='rounded-xl border border-white/10 bg-white/6 px-4 py-3'>
        <div className='text-[30px] font-semibold leading-none tracking-[-0.03em]'>
          {formatMenuTime(now)}
        </div>
        <div className='mt-1.5 text-[13px] text-white/65'>
          {formatPanelDate(now)}
        </div>
      </div>

      <button
        onClick={() => {
          toggleSound();
          playSystemSound('click');
        }}
        className='mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-left transition-colors hover:bg-white/10'
      >
        <span className='text-[13px] font-medium text-white/80'>사운드</span>
        <span
          className={[
            'rounded-full px-3 py-0.5 text-[12px] font-semibold',
            soundEnabled ? 'bg-[#0a84ff] text-white' : 'bg-white/12 text-white/60',
          ].join(' ')}
        >
          {soundEnabled ? 'On' : 'Off'}
        </span>
      </button>

      <div className='mt-3 rounded-xl border border-white/10 bg-white/6 p-3'>
        <div className='flex items-center justify-between'>
          <div className='text-[12px] uppercase tracking-[0.14em] text-white/50'>
            배경화면
          </div>
          <button
            onClick={onOpenSettings}
            className='rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold text-white/80 transition-colors hover:bg-white/14'
          >
            설정 열기
          </button>
        </div>
        <div className='mt-3 grid grid-cols-3 gap-2'>
          {Object.values(WALLPAPERS).map((wallpaper) => (
            <button
              key={wallpaper.id}
              onClick={() => {
                setWallpaper(wallpaper.id);
                playSystemSound('click');
              }}
              className={[
                'overflow-hidden rounded-xl border p-1 text-left transition-colors',
                wallpaper.id === wallpaperId
                  ? 'border-[#0a84ff] bg-white/12'
                  : 'border-white/10 hover:bg-white/8',
              ].join(' ')}
            >
              <div className='h-12 rounded-lg' style={wallpaper.style} />
              <div className='px-0.5 pb-0.5 pt-1.5 text-[11px] text-white/80'>
                {wallpaper.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className='mt-3 w-full rounded-xl border border-[#f87171]/30 bg-[#ef4444]/15 px-4 py-2.5 text-left text-[13px] font-semibold text-[#fecaca] transition-colors hover:bg-[#ef4444]/25'
      >
        데스크탑 초기화
      </button>
    </div>
  );
}

export function TaskbarInline() {
  const now = useClock();
  const {
    windows,
    activeWindowId,
    toggleTaskbarItem,
    openPage,
    openFolder,
    openBrowser,
    openCodeWorkspace,
    openTextFileWindow,
    openTerminalWindow,
    resetWindows,
  } = useDesktopStore(
    useShallow((s) => ({
      windows: s.windows,
      activeWindowId: s.activeWindowId,
      toggleTaskbarItem: s.toggleTaskbarItem,
      openPage: s.openPage,
      openFolder: s.openFolder,
      openBrowser: s.openBrowser,
      openCodeWorkspace: s.openCodeWorkspace,
      openTextFileWindow: s.openTextFileWindow,
      openTerminalWindow: s.openTerminalWindow,
      resetWindows: s.resetWindows,
    }))
  );

  const recordLauncherUse = useDesktopPreferencesStore((s) => s.recordLauncherUse);
  const recentLauncherIds = useDesktopPreferencesStore((s) => s.recentLauncherIds);
  const resetPreferences = useDesktopPreferencesStore((s) => s.resetPreferences);
  const resetLayout = useDesktopLayoutStore((s) => s.resetLayout);
  const resetTextFiles = useDesktopTextFilesStore((s) => s.resetTextFiles);
  const resetTerminal = useDesktopTerminalStore((s) => s.resetTerminal);

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [appleOpen, setAppleOpen] = useState(false);
  const [launcherQuery, setLauncherQuery] = useState('');

  const closeAllPanels = () => {
    setSpotlightOpen(false);
    setControlOpen(false);
    setAppleOpen(false);
  };

  const startEntriesById = useMemo(
    () => new Map(START_MENU_APPS.map((entry) => [entry.id, entry])),
    []
  );

  const searchResults = useMemo(
    () =>
      START_MENU_APPS.filter((entry) =>
        matchesLauncher(entry, launcherQuery)
      ).slice(0, 12),
    [launcherQuery]
  );

  const recommendedEntries = useMemo(() => {
    const recentEntries = recentLauncherIds
      .map((id) => startEntriesById.get(id))
      .filter((entry): entry is LauncherEntry => Boolean(entry));

    if (recentEntries.length > 0) {
      return recentEntries;
    }

    return START_MENU_RECOMMENDED_IDS.map((id) =>
      startEntriesById.get(id)
    ).filter((entry): entry is LauncherEntry => Boolean(entry));
  }, [recentLauncherIds, startEntriesById]);

  const runningItems = useMemo(() => {
    return windows
      .filter((window) => {
        if (!window.isOpen && !window.isMinimized) {
          return false;
        }

        if (window.type === 'folder' && window.id === 'folder:projects') {
          return false;
        }

        if (window.type === 'browser' && window.browserAppId === 'browser-home') {
          return false;
        }

        if (window.type === 'code' && window.workspaceId === 'portfolio-workspace') {
          return false;
        }

        if (window.type === 'terminal' && window.id === 'terminal:main') {
          return false;
        }

        if (
          window.type === 'pages' &&
          window.activeTabId === 'about' &&
          window.tabs.length <= 1
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [windows]);

  const pagesWindow = windows.find(
    (window): window is PagesWindow => window.type === 'pages'
  );

  const activeAppName = useMemo(() => {
    const active = windows.find(
      (window) =>
        window.id === activeWindowId && window.isOpen && !window.isMinimized
    );
    return active?.title || 'Finder';
  }, [windows, activeWindowId]);

  const launchEntry = (entry: LauncherEntry) => {
    recordLauncherUse(entry.id);
    closeAllPanels();
    setLauncherQuery('');

    switch (entry.launch.kind) {
      case 'page':
        openPage(PAGE_TABS[entry.launch.pageId]);
        break;
      case 'folder':
        openFolder(getFolderLaunchOptions(entry.launch.folderId));
        break;
      case 'browser':
        openBrowser(entry.launch.browserAppId);
        break;
      case 'code':
        openCodeWorkspace(entry.launch.workspaceId);
        break;
      case 'text-file':
        openTextFileWindow(entry.launch.fileId);
        break;
      case 'terminal':
        openTerminalWindow();
        break;
    }

    playSystemSound('open');
  };

  const toggleControlCenter = () => {
    setControlOpen((value) => !value);
    setSpotlightOpen(false);
    setAppleOpen(false);
    playSystemSound('click');
  };

  const toggleSpotlight = () => {
    setSpotlightOpen((value) => !value);
    setControlOpen(false);
    setAppleOpen(false);
    playSystemSound('click');
  };

  const handlePinnedClick = (pin: LauncherEntry) => {
    if (
      pin.launch.kind === 'page' &&
      pagesWindow?.type === 'pages' &&
      pagesWindow.activeTabId === pin.launch.pageId &&
      activeWindowId === pagesWindow.id
    ) {
      toggleTaskbarItem(pagesWindow.id);
      return;
    }

    const windowId = getLaunchWindowId(pin.launch);

    if (
      pin.launch.kind !== 'page' &&
      windows.some((window) => window.id === windowId)
    ) {
      toggleTaskbarItem(windowId);
      return;
    }

    launchEntry(pin);
  };

  const getPinStatus = (pin: LauncherEntry): DockStatus => {
    if (pin.launch.kind === 'page') {
      const launch = pin.launch;
      const hasTab =
        pagesWindow?.type === 'pages' &&
        pagesWindow.tabs.some((tab) => tab.id === launch.pageId);
      const isActive =
        activeWindowId === pagesWindow?.id &&
        pagesWindow?.type === 'pages' &&
        pagesWindow.activeTabId === launch.pageId;
      return isActive ? 'active' : hasTab ? 'running' : 'idle';
    }

    const matchedWindow = windows.find((window) => {
      if (!window.isOpen && !window.isMinimized) {
        return false;
      }

      return window.id === getLaunchWindowId(pin.launch);
    });

    if (!matchedWindow) {
      return 'idle';
    }

    return activeWindowId === matchedWindow.id && !matchedWindow.isMinimized
      ? 'active'
      : 'running';
  };

  const handleRunningClick = (window: AnyWindow) => {
    toggleTaskbarItem(window.id);
    playSystemSound('click');
  };

  const resetDesktop = () => {
    resetLayout();
    resetPreferences();
    resetTextFiles();
    resetTerminal();
    resetWindows();
    closeAllPanels();
    setLauncherQuery('');
    playSystemSound('click');
  };

  const anyPanelOpen = spotlightOpen || controlOpen || appleOpen;

  return (
    <>
      {anyPanelOpen ? (
        <button
          aria-hidden
          className='fixed inset-0 z-[9996] bg-transparent'
          onClick={closeAllPanels}
        />
      ) : null}

      {/* ===== TOP MENU BAR ===== */}
      <div className='fixed left-0 right-0 top-0 z-[9998] flex h-7 items-center gap-4 border-b border-white/10 bg-black/28 px-3 text-[13px] text-white backdrop-blur-2xl'>
        <div className='relative'>
          <button
            onClick={() => {
              setAppleOpen((value) => !value);
              setSpotlightOpen(false);
              setControlOpen(false);
            }}
            className={[
              'grid h-7 place-items-center rounded px-1.5 transition-colors',
              appleOpen ? 'bg-white/15' : 'hover:bg-white/10',
            ].join(' ')}
            title='Apple 메뉴'
          >
            <AppleLogo className='h-[15px] w-[15px]' />
          </button>
          {appleOpen ? (
            <div className='absolute left-0 top-8 z-[9999] w-56 rounded-xl border border-white/15 bg-[#20232b]/90 p-1.5 text-[13px] text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl'>
              <button
                onClick={() => {
                  closeAllPanels();
                  openPage(PAGE_TABS.about);
                  playSystemSound('open');
                }}
                className='w-full rounded-md px-3 py-1.5 text-left transition-colors hover:bg-[#0a84ff]'
              >
                이 Mac에 관하여
              </button>
              <button
                onClick={() => {
                  closeAllPanels();
                  openPage(PAGE_TABS.settings);
                  playSystemSound('open');
                }}
                className='w-full rounded-md px-3 py-1.5 text-left transition-colors hover:bg-[#0a84ff]'
              >
                시스템 설정…
              </button>
              <div className='my-1 h-px bg-white/12' />
              <button
                onClick={resetDesktop}
                className='w-full rounded-md px-3 py-1.5 text-left transition-colors hover:bg-[#0a84ff]'
              >
                데스크탑 초기화
              </button>
            </div>
          ) : null}
        </div>

        <span className='font-semibold'>{activeAppName}</span>
        <span className='hidden text-white/80 sm:inline'>파일</span>
        <span className='hidden text-white/80 sm:inline'>편집</span>
        <span className='hidden text-white/80 md:inline'>보기</span>
        <span className='hidden text-white/80 md:inline'>윈도우</span>
        <span className='hidden text-white/80 md:inline'>도움말</span>

        <div className='ml-auto flex items-center gap-1'>
          <button
            onClick={toggleSpotlight}
            title='Spotlight 검색'
            className={[
              'grid size-7 place-items-center rounded transition-colors',
              spotlightOpen ? 'bg-white/15' : 'hover:bg-white/10',
            ].join(' ')}
          >
            <svg viewBox='0 0 24 24' className='h-[15px] w-[15px] fill-none stroke-white' strokeWidth='2'>
              <circle cx='11' cy='11' r='7' />
              <path d='M21 21l-4.3-4.3' strokeLinecap='round' />
            </svg>
          </button>
          <button
            onClick={toggleControlCenter}
            title='제어 센터'
            className={[
              'flex h-7 items-center gap-2 rounded px-2 transition-colors',
              controlOpen ? 'bg-white/15' : 'hover:bg-white/10',
            ].join(' ')}
          >
            <img src={WIFI_ICON} alt='' className='h-[15px] w-[15px]' />
            <img src={BATTERY_ICON} alt='' className='h-[15px] w-[18px]' />
          </button>
          <button
            onClick={toggleControlCenter}
            className={[
              'flex h-7 items-center rounded px-2 tabular-nums transition-colors',
              controlOpen ? 'bg-white/15' : 'hover:bg-white/10',
            ].join(' ')}
          >
            <span className='mr-2 hidden text-white/85 sm:inline'>
              {formatMenuDate(now)}
            </span>
            <span className='font-medium'>{formatMenuTime(now)}</span>
          </button>
        </div>
      </div>

      {/* ===== SPOTLIGHT ===== */}
      {spotlightOpen ? (
        <Spotlight
          query={launcherQuery}
          onQueryChange={setLauncherQuery}
          results={searchResults}
          recommendedEntries={recommendedEntries}
          onLaunch={launchEntry}
        />
      ) : null}

      {/* ===== CONTROL CENTER ===== */}
      {controlOpen ? (
        <ControlCenter
          now={now}
          onReset={resetDesktop}
          onOpenSettings={() => {
            closeAllPanels();
            openPage(PAGE_TABS.settings);
            playSystemSound('open');
          }}
        />
      ) : null}

      {/* ===== DOCK ===== */}
      <div className='pointer-events-none fixed bottom-1.5 left-0 right-0 z-[9998] flex justify-center'>
        <div className='pointer-events-auto flex items-end gap-2.5 rounded-[24px] border border-white/25 bg-white/12 px-3 pb-2.5 pt-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-[1.8] ring-1 ring-inset ring-white/15'>
          {PINNED_APPS.map((pin) => (
            <DockButton
              key={pin.id}
              icon={pin.icon}
              label={pin.label}
              status={getPinStatus(pin)}
              onClick={() => handlePinnedClick(pin)}
            />
          ))}

          {runningItems.length > 0 ? (
            <div className='mx-1 h-12 w-px self-center bg-white/25' />
          ) : null}

          {runningItems.map((window) => {
            const dockIcon =
              window.type === 'browser'
                ? BROWSER_APPS[window.browserAppId].icon
                : window.icon;
            return (
              <DockButton
                key={window.id}
                icon={dockIcon}
                label={window.title}
                status={
                  !window.isMinimized && activeWindowId === window.id
                    ? 'active'
                    : 'running'
                }
                onClick={() => handleRunningClick(window)}
              />
            );
          })}

          <div className='mx-1 h-12 w-px self-center bg-white/25' />

          <button
            onClick={toggleSpotlight}
            title='Launchpad'
            className='group relative flex flex-col items-center'
          >
            <span className='pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100'>
              Launchpad
            </span>
            <span className='grid h-12 w-12 origin-bottom grid-cols-3 gap-[3px] rounded-[14px] bg-white/25 p-2 shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-150 ease-out group-hover:-translate-y-1.5 group-hover:scale-125'>
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} className='rounded-[3px] bg-white/85' />
              ))}
            </span>
            <span className='mt-[3px] h-[3px] w-[3px] rounded-full bg-transparent' />
          </button>
        </div>
      </div>
    </>
  );
}
