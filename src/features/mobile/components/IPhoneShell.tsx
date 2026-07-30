import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { CODE_WORKSPACES } from '@/features/desktop/config/shell';
import {
  PageScrollContainerProvider,
  PAGES_SCROLL_CONTAINER_ID,
} from '@/features/pages-window/context/PageScrollContext';
import { PageContent } from '@/features/pages-window/registry/PageContent';
import { PAGE_TABS } from '@/features/pages-window/registry/page-registry';
import { useClock } from '@/hooks/useClock';
import { useDesktopPreferencesStore } from '@/stores';
import type { TextFileId } from '@/stores';
import { useImagePreload } from '@/utils/preloadAssets';
import {
  PHONE_APP_BY_ID,
  PHONE_APPS,
  PHONE_DOCK_APP_IDS,
  PHONE_FOLDER_APP_IDS,
  PHONE_FOLDER_TITLES,
  PHONE_HOME_APP_IDS,
  PHONE_SYSTEM_ICONS,
  type PhoneApp,
  type PhoneFolderId,
  type PhoneLaunch,
} from '../config/phoneShell';

const NotepadWindowBody = lazy(async () => {
  const module = await import(
    '@/features/notepad-window/components/NotepadWindowBody'
  );
  return { default: module.NotepadWindowBody };
});

const TerminalWindowBody = lazy(async () => {
  const module = await import(
    '@/features/terminal-window/components/TerminalWindowBody'
  );
  return { default: module.TerminalWindowBody };
});

const Github1sCodeWindow = lazy(async () => {
  const module = await import(
    '@/features/code-window/components/Github1sCodeWindow'
  );
  return { default: module.Github1sCodeWindow };
});

type RunnablePhoneLaunch = Exclude<PhoneLaunch, { kind: 'folder' }>;

export type PhoneInitialApp = RunnablePhoneLaunch;

type PhoneActiveApp = {
  key: string;
  title: string;
  icon: string;
  launch: RunnablePhoneLaunch;
};

const PHONE_IMAGE_ASSETS = PHONE_APPS.map((app) => app.icon).filter((src) =>
  src.startsWith('/')
);

const TEXT_FILE_TITLES: Record<TextFileId, string> = {
  readme: 'README',
  'about-file': 'About',
  contact: 'Contact',
  now: 'Now',
};

function isRunnableLaunch(launch: PhoneLaunch): launch is RunnablePhoneLaunch {
  return launch.kind !== 'folder';
}

function getLaunchKey(launch: RunnablePhoneLaunch) {
  switch (launch.kind) {
    case 'page':
      return `page:${launch.pageId}`;
    case 'text-file':
      return `text-file:${launch.fileId}`;
    case 'code':
      return `code:${launch.workspaceId}`;
    case 'terminal':
      return 'terminal:main';
  }
}

function getFallbackTitle(launch: RunnablePhoneLaunch) {
  switch (launch.kind) {
    case 'page':
      return PAGE_TABS[launch.pageId].title;
    case 'text-file':
      return TEXT_FILE_TITLES[launch.fileId];
    case 'code':
      return CODE_WORKSPACES[launch.workspaceId].title;
    case 'terminal':
      return 'Terminal';
  }
}

function getFallbackIcon(launch: RunnablePhoneLaunch) {
  switch (launch.kind) {
    case 'page':
      return PAGE_TABS[launch.pageId].icon;
    case 'text-file':
      return PHONE_SYSTEM_ICONS.notes;
    case 'code':
      return PHONE_SYSTEM_ICONS.code;
    case 'terminal':
      return PHONE_SYSTEM_ICONS.terminal;
  }
}

function getActiveAppFromLaunch(launch: RunnablePhoneLaunch): PhoneActiveApp {
  const key = getLaunchKey(launch);
  const matchedApp = PHONE_APPS.find(
    (app) => isRunnableLaunch(app.launch) && getLaunchKey(app.launch) === key
  );

  return {
    key,
    title: matchedApp?.label ?? getFallbackTitle(launch),
    icon: matchedApp?.icon ?? getFallbackIcon(launch),
    launch,
  };
}

function formatTime(now: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(now);
}

/* ---------- 상태바 아이콘 (iOS) ---------- */

function SignalIcon() {
  return (
    <svg viewBox='0 0 18 12' className='h-[11px] w-[17px]' aria-hidden='true'>
      <rect x='0' y='8' width='3' height='4' rx='1' fill='currentColor' />
      <rect x='5' y='5.5' width='3' height='6.5' rx='1' fill='currentColor' />
      <rect x='10' y='3' width='3' height='9' rx='1' fill='currentColor' />
      <rect x='15' y='0.5' width='3' height='11.5' rx='1' fill='currentColor' />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox='0 0 18 13' className='h-[12px] w-[16px]' aria-hidden='true'>
      <path
        d='M9 12.2 6.9 10a3 3 0 0 1 4.2 0zm0-3.9L4.9 4.2a8 8 0 0 1 8.2 0zm0-3.9L2 1.4a12 12 0 0 1 14 0z'
        fill='currentColor'
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox='0 0 27 13' className='h-[12px] w-[25px]' aria-hidden='true'>
      <rect
        x='0.6'
        y='0.6'
        width='22'
        height='11.4'
        rx='3.2'
        fill='none'
        stroke='currentColor'
        strokeOpacity='0.4'
        strokeWidth='1'
      />
      <rect x='2' y='2' width='16' height='8.6' rx='2' fill='currentColor' />
      <rect
        x='24'
        y='4.2'
        width='1.8'
        height='4.6'
        rx='0.9'
        fill='currentColor'
        fillOpacity='0.5'
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox='0 0 24 24' className='h-6 w-6' aria-hidden='true'>
      <path
        d='M15 5 8 12l7 7'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.6'
      />
    </svg>
  );
}

function SearchIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' className={className} aria-hidden='true'>
      <path
        d='m20 20-4.5-4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
      />
    </svg>
  );
}

/* ---------- 상태바 + Dynamic Island ---------- */

function StatusBar({
  now,
  dark,
  onOpenControlCenter,
}: {
  now: Date;
  dark: boolean;
  onOpenControlCenter: () => void;
}) {
  return (
    <div
      className={[
        'relative flex h-11 w-full shrink-0 items-center justify-between px-7 pt-2 text-[15px] font-semibold',
        dark ? 'text-[#0b0b0f]' : 'text-white',
      ].join(' ')}
    >
      <span className='tracking-tight tabular-nums'>{formatTime(now)}</span>

      {/* Dynamic Island */}
      <span className='absolute left-1/2 top-2 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black' />

      <button
        type='button'
        aria-label='Open control center'
        onClick={onOpenControlCenter}
        className='flex items-center gap-1.5'
      >
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </button>
    </div>
  );
}

function HomeIndicator({
  dark,
  onHome,
}: {
  dark: boolean;
  onHome: () => void;
}) {
  return (
    <div className='flex h-6 w-full shrink-0 items-end justify-center pb-2'>
      <button
        type='button'
        aria-label='Home'
        onClick={onHome}
        className={[
          'h-[5px] w-[134px] rounded-full transition-colors',
          dark ? 'bg-[#0b0b0f]/80' : 'bg-white/85',
        ].join(' ')}
      />
    </div>
  );
}

/* ---------- 앱 아이콘 ---------- */

function FolderPreview({ folderId }: { folderId: PhoneFolderId }) {
  const previewApps = PHONE_FOLDER_APP_IDS[folderId]
    .slice(0, 4)
    .map((id) => PHONE_APP_BY_ID.get(id))
    .filter((app): app is PhoneApp => Boolean(app));

  return (
    <div className='grid h-full w-full grid-cols-2 place-items-center gap-1 rounded-[15px] bg-white/22 p-1.5 backdrop-blur-md'>
      {previewApps.map((app) => (
        <img
          key={app.id}
          src={app.icon}
          alt=''
          className='h-full w-full rounded-[7px] object-cover'
          draggable={false}
        />
      ))}
    </div>
  );
}

function AppIcon({
  app,
  onLaunch,
  showLabel = true,
}: {
  app: PhoneApp;
  onLaunch: (app: PhoneApp) => void;
  showLabel?: boolean;
}) {
  const isFolder = app.launch.kind === 'folder';
  const frameless = Boolean(app.frameless) && !isFolder;

  return (
    <button
      type='button'
      onClick={() => onLaunch(app)}
      className='group flex min-w-0 flex-col items-center gap-1.5 outline-none'
      aria-label={app.label}
    >
      <span
        className={[
          'grid h-[60px] w-[60px] shrink-0 place-items-center transition-transform duration-100 group-active:scale-90',
          frameless
            ? ''
            : 'overflow-hidden rounded-[15px] shadow-[0_6px_16px_rgba(0,0,0,0.22)]',
          isFolder ? 'bg-white/10' : '',
        ].join(' ')}
      >
        {isFolder && app.launch.kind === 'folder' ? (
          <FolderPreview folderId={app.launch.folderId} />
        ) : (
          <img
            src={app.icon}
            alt=''
            className={
              frameless
                ? 'h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]'
                : 'h-full w-full object-cover'
            }
            draggable={false}
          />
        )}
      </span>
      {showLabel && (
        <span className='max-w-[74px] truncate text-[11px] font-medium leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'>
          {app.label}
        </span>
      )}
    </button>
  );
}

/* ---------- 홈 화면 ---------- */

function HomeScreen({
  onLaunch,
  onOpenSpotlight,
  onPointerDown,
  onPointerUp,
}: {
  onLaunch: (app: PhoneApp) => void;
  onOpenSpotlight: () => void;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
}) {
  const homeApps = PHONE_HOME_APP_IDS.map((id) => PHONE_APP_BY_ID.get(id)).filter(
    (app): app is PhoneApp => Boolean(app)
  );
  const dockApps = PHONE_DOCK_APP_IDS.map((id) => PHONE_APP_BY_ID.get(id)).filter(
    (app): app is PhoneApp => Boolean(app)
  );

  return (
    <div
      className='flex h-full min-h-0 flex-col px-6 pt-4'
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className='grid grid-cols-4 gap-x-4 gap-y-5'>
        {homeApps.map((app) => (
          <AppIcon key={app.id} app={app} onLaunch={onLaunch} />
        ))}
      </div>

      <div className='mt-auto flex flex-col items-center gap-4 pb-3'>
        {/* 페이지 인디케이터 */}
        <div className='flex items-center gap-1.5'>
          <span className='h-[7px] w-[7px] rounded-full bg-white/90' />
        </div>

        {/* Spotlight 검색 pill */}
        <button
          type='button'
          onClick={onOpenSpotlight}
          className='flex items-center gap-1.5 rounded-full bg-black/22 px-4 py-1.5 text-white/90 backdrop-blur-md'
        >
          <SearchIcon className='h-[15px] w-[15px]' />
          <span className='text-[13px] font-medium'>검색</span>
        </button>

        {/* 독 */}
        <div className='grid w-full grid-cols-4 gap-3 rounded-[32px] bg-white/16 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] ring-1 ring-white/10 backdrop-blur-2xl'>
          {dockApps.map((app) => (
            <div key={app.id} className='flex justify-center'>
              <AppIcon app={app} onLaunch={onLaunch} showLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Spotlight 검색 ---------- */

function Spotlight({
  open,
  query,
  onQueryChange,
  onClose,
  onLaunch,
}: {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onLaunch: (app: PhoneApp) => void;
}) {
  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PHONE_APPS.filter((app) => app.label.toLowerCase().includes(trimmed))
    : PHONE_APPS;

  if (!open) return null;

  return (
    <div className='absolute inset-0 z-[70] flex flex-col bg-black/45 px-5 pb-6 pt-16 backdrop-blur-2xl'>
      <label className='flex h-11 items-center gap-2.5 rounded-[13px] bg-white/22 px-3.5 text-white ring-1 ring-white/16'>
        <SearchIcon className='h-[18px] w-[18px] text-white/80' />
        <input
          autoFocus
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder='검색'
          className='min-w-0 flex-1 bg-transparent text-[16px] font-medium outline-none placeholder:text-white/55'
        />
        <button
          type='button'
          onClick={onClose}
          className='text-[14px] font-medium text-white/80'
        >
          취소
        </button>
      </label>

      <div className='app-scroll mt-6 min-h-0 flex-1 overflow-y-auto'>
        {results.length > 0 ? (
          <div className='grid grid-cols-4 gap-x-4 gap-y-6'>
            {results.map((app) => (
              <AppIcon key={app.id} app={app} onLaunch={onLaunch} />
            ))}
          </div>
        ) : (
          <div className='rounded-[20px] bg-white/12 p-6 text-center text-sm text-white/75'>
            결과 없음
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- 제어 센터 ---------- */

function CCModule({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'rounded-[24px] bg-white/16 p-4 ring-1 ring-white/12 backdrop-blur-2xl',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function CCToggle({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-3'
      aria-label={label}
    >
      <span
        className={[
          'grid h-11 w-11 place-items-center rounded-full text-[18px] transition-colors',
          active ? 'bg-[#34c759] text-white' : 'bg-white/26 text-white',
        ].join(' ')}
      >
        {children}
      </span>
      <span className='text-[13px] font-medium text-white'>{label}</span>
    </button>
  );
}

function ControlCenter({
  open,
  soundEnabled,
  onToggleSound,
  onClose,
}: {
  open: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className='absolute inset-0 z-[80] px-4 pt-4'>
      <button
        type='button'
        aria-label='Close control center'
        className='absolute inset-0 h-full w-full cursor-default bg-black/25 backdrop-blur-xl'
        onClick={onClose}
      />
      <div
        className='relative grid grid-cols-2 gap-3'
        onClick={(event) => event.stopPropagation()}
      >
        <CCModule>
          <div className='flex flex-col gap-3'>
            <CCToggle label='Wi-Fi' active>
              <WifiIcon />
            </CCToggle>
            <CCToggle label='Bluetooth' active>
              ✦
            </CCToggle>
            <CCToggle label='Data' active>
              ↑↓
            </CCToggle>
          </div>
        </CCModule>

        <div className='grid grid-rows-2 gap-3'>
          <CCModule className='flex items-center justify-center gap-4 text-white'>
            <span className='text-[13px] font-semibold'>기내</span>
            <span className='text-[13px] font-semibold'>AirDrop</span>
          </CCModule>
          <CCModule className='flex items-center justify-between text-white'>
            <span className='text-[13px] font-medium'>Sound</span>
            <button
              type='button'
              onClick={onToggleSound}
              className={[
                'grid h-9 w-9 place-items-center rounded-full text-[16px]',
                soundEnabled ? 'bg-white text-[#111]' : 'bg-white/24 text-white',
              ].join(' ')}
            >
              {soundEnabled ? '♪' : '×'}
            </button>
          </CCModule>
        </div>

        <CCModule className='col-span-2 flex items-center gap-4'>
          <span className='text-[13px] font-semibold text-white'>밝기</span>
          <div className='h-2.5 flex-1 rounded-full bg-white/24'>
            <div className='h-full w-[74%] rounded-full bg-white' />
          </div>
          <span className='text-[13px] font-medium text-white/80'>74%</span>
        </CCModule>
      </div>
    </div>
  );
}

/* ---------- 폴더 ---------- */

function FolderOverlay({
  folderId,
  onClose,
  onLaunch,
}: {
  folderId: PhoneFolderId | null;
  onClose: () => void;
  onLaunch: (app: PhoneApp) => void;
}) {
  if (!folderId) return null;

  const apps = PHONE_FOLDER_APP_IDS[folderId]
    .map((id) => PHONE_APP_BY_ID.get(id))
    .filter((app): app is PhoneApp => Boolean(app));

  return (
    <div className='absolute inset-0 z-[60] flex flex-col items-center justify-center px-6'>
      <button
        type='button'
        aria-label='Close folder'
        className='absolute inset-0 h-full w-full bg-black/40 backdrop-blur-2xl'
        onClick={onClose}
      />
      <div className='relative w-full max-w-[360px]'>
        <div className='mb-6 text-center text-[26px] font-semibold text-white drop-shadow'>
          {PHONE_FOLDER_TITLES[folderId]}
        </div>
        <div className='grid grid-cols-3 gap-x-5 gap-y-6'>
          {apps.map((app) => (
            <AppIcon key={app.id} app={app} onLaunch={onLaunch} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 앱 콘텐츠 ---------- */

function PhoneAppContent({ app }: { app: PhoneActiveApp }) {
  switch (app.launch.kind) {
    case 'page':
      return (
        <div
          id={PAGES_SCROLL_CONTAINER_ID}
          className='app-scroll h-full min-h-0 overflow-y-auto overscroll-y-contain bg-[#f8fafc] [&_iframe]:h-full [&_iframe]:w-full [&_img]:h-auto [&_img]:max-w-full'
        >
          <PageScrollContainerProvider>
            <PageContent pageId={app.launch.pageId} />
          </PageScrollContainerProvider>
        </div>
      );
    case 'text-file':
      return (
        <Suspense
          fallback={<div className='p-4 text-sm text-[#667085]'>Loading...</div>}
        >
          <NotepadWindowBody fileId={app.launch.fileId} />
        </Suspense>
      );
    case 'terminal':
      return (
        <Suspense
          fallback={<div className='p-4 text-sm text-[#667085]'>Loading...</div>}
        >
          <TerminalWindowBody />
        </Suspense>
      );
    case 'code': {
      const workspace = CODE_WORKSPACES[app.launch.workspaceId];
      return (
        <Suspense
          fallback={<div className='p-4 text-sm text-[#667085]'>Loading...</div>}
        >
          <Github1sCodeWindow
            owner={workspace.owner}
            repo={workspace.repo}
            branch={workspace.branch}
            path={workspace.path}
            title={workspace.title}
          />
        </Suspense>
      );
    }
  }
}

function AppScreen({
  app,
  onBack,
}: {
  app: PhoneActiveApp;
  onBack: () => void;
}) {
  return (
    <div className='flex h-full min-h-0 flex-col bg-[#f8fafc] text-[#111827]'>
      <div className='flex h-[52px] shrink-0 items-center gap-2 border-b border-black/5 bg-[#f8fafc]/95 px-2 backdrop-blur-xl'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center text-[#0a84ff] active:opacity-60'
          aria-label='Back'
        >
          <ChevronLeft />
          <span className='-ml-1 text-[16px]'>홈</span>
        </button>
        <div className='pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-2'>
          <img
            src={app.icon}
            alt=''
            className='h-6 w-6 rounded-[7px] object-cover'
          />
          <span className='max-w-[180px] truncate text-[16px] font-semibold'>
            {app.title}
          </span>
        </div>
      </div>
      <div className='min-h-0 flex-1 overflow-hidden'>
        <PhoneAppContent app={app} />
      </div>
    </div>
  );
}

/* ---------- 셸 ---------- */

export function IPhoneShell({ initialApp }: { initialApp?: PhoneInitialApp }) {
  const now = useClock();
  const swipeStartYRef = useRef<number | null>(null);
  const soundEnabled = useDesktopPreferencesStore((s) => s.soundEnabled);
  const toggleSound = useDesktopPreferencesStore((s) => s.toggleSound);

  const [activeApp, setActiveApp] = useState<PhoneActiveApp | null>(() =>
    initialApp ? getActiveAppFromLaunch(initialApp) : null
  );
  const [openFolderId, setOpenFolderId] = useState<PhoneFolderId | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  const initialKey = initialApp ? getLaunchKey(initialApp) : 'home';

  useImagePreload(PHONE_IMAGE_ASSETS);

  useEffect(() => {
    if (!initialApp) return;
    setActiveApp(getActiveAppFromLaunch(initialApp));
  }, [initialApp, initialKey]);

  const inApp = Boolean(activeApp);
  const statusDark = inApp && !controlCenterOpen;

  const launchRunnableApp = (nextApp: PhoneActiveApp) => {
    setActiveApp(nextApp);
    setOpenFolderId(null);
    setSpotlightOpen(false);
    setSpotlightQuery('');
    setControlCenterOpen(false);
  };

  const launchApp = (app: PhoneApp) => {
    if (app.launch.kind === 'folder') {
      setOpenFolderId(app.launch.folderId);
      setControlCenterOpen(false);
      return;
    }
    launchRunnableApp(getActiveAppFromLaunch(app.launch));
  };

  const goHome = () => {
    setActiveApp(null);
    setOpenFolderId(null);
    setSpotlightOpen(false);
    setSpotlightQuery('');
    setControlCenterOpen(false);
  };

  const handleHomePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartYRef.current = event.clientY;
  };

  const handleHomePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartYRef.current === null) return;
    const deltaY = swipeStartYRef.current - event.clientY;
    swipeStartYRef.current = null;
    if (deltaY > 60) {
      setSpotlightOpen(true);
    }
  };

  const wallpaperStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(120% 80% at 20% 12%, rgba(120,146,255,0.55) 0%, rgba(120,146,255,0) 55%), radial-gradient(120% 90% at 85% 20%, rgba(244,114,182,0.5) 0%, rgba(244,114,182,0) 55%), linear-gradient(160deg, #1b2a6b 0%, #3b2e83 42%, #7a3d8f 70%, #b65a86 100%)',
    }),
    []
  );

  return (
    <div
      className='relative flex h-full w-full flex-col overflow-hidden bg-[#1b2a6b] text-white'
      style={wallpaperStyle}
    >
      <StatusBar
        now={now}
        dark={statusDark}
        onOpenControlCenter={() => setControlCenterOpen(true)}
      />

      <main className='relative min-h-0 flex-1 overflow-hidden'>
        {activeApp ? (
          <AppScreen app={activeApp} onBack={goHome} />
        ) : (
          <HomeScreen
            onLaunch={launchApp}
            onOpenSpotlight={() => setSpotlightOpen(true)}
            onPointerDown={handleHomePointerDown}
            onPointerUp={handleHomePointerUp}
          />
        )}
      </main>

      <HomeIndicator dark={statusDark} onHome={goHome} />

      <Spotlight
        open={spotlightOpen}
        query={spotlightQuery}
        onQueryChange={setSpotlightQuery}
        onClose={() => {
          setSpotlightOpen(false);
          setSpotlightQuery('');
        }}
        onLaunch={launchApp}
      />
      <FolderOverlay
        folderId={openFolderId}
        onClose={() => setOpenFolderId(null)}
        onLaunch={launchApp}
      />
      <ControlCenter
        open={controlCenterOpen}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onClose={() => setControlCenterOpen(false)}
      />
    </div>
  );
}
