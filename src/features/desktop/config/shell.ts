import type { CSSProperties } from 'react';
import { BROWSER_HOME_URL } from '@/features/browser-window/browserPolicy';
import type {
  BrowserAppId,
  CodeWorkspaceId,
  DesktopShortcutItem,
  PageType,
  TextFileId,
  WallpaperId,
} from '@/stores/desktopModels';

const svgDataUri = (markup: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;

const recycleBinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#eef4fb"/>
    <path d="M20 18h24l2 6H18l2-6z" fill="#6c8fb1"/>
    <path d="M18 24h28l-3 28a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4l-3-28z" fill="#cfe6ff" stroke="#7ba7d6" stroke-width="2"/>
    <path d="M28 12h8a3 3 0 0 1 3 3v3H25v-3a3 3 0 0 1 3-3z" fill="#98bce3"/>
    <path d="M26 30v18M32 30v18M38 30v18" stroke="#7ba7d6" stroke-width="2" stroke-linecap="round"/>
  </svg>
`;

const windowsSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="16" fill="#0b61d8"/>
    <path d="M10 14 30 11v22H10zm22-3 22-3v25H32zm-22 24h20v19l-20-3zm22 0h22v22l-22-3z" fill="#fff"/>
  </svg>
`;

const terminalSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="terminal" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stop-color="#1b2638"/>
        <stop offset="100%" stop-color="#0a1320"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#terminal)"/>
    <path d="M16 20 28 30 16 40" fill="none" stroke="#69a7ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32 42h16" fill="none" stroke="#d9e8ff" stroke-width="4" stroke-linecap="round"/>
  </svg>
`;

const wifiSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#e7eefb" d="M12 18.5 8.5 15a5 5 0 0 1 7 0zm0-4.8-5.8-5.1a10 10 0 0 1 11.6 0zm0-5.6L2 5a15.5 15.5 0 0 1 20 0z"/>
  </svg>
`;

const volumeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#e7eefb" d="M4 9h4l5-4v14l-5-4H4zm12.4 3a4.4 4.4 0 0 0-2.4-3.9v7.8a4.4 4.4 0 0 0 2.4-3.9zm0-8a10.3 10.3 0 0 1 0 16l-1.4-1.4a8.3 8.3 0 0 0 0-13.2z"/>
  </svg>
`;

const batterySvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <rect x="3" y="7" width="17" height="10" rx="2" fill="none" stroke="#e7eefb" stroke-width="2"/>
    <rect x="5" y="9" width="10" height="6" rx="1" fill="#7be495"/>
    <rect x="20" y="10" width="2" height="4" rx="1" fill="#e7eefb"/>
  </svg>
`;

const linkedinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="#0A66C2"/>
    <text x="32" y="45" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff" text-anchor="middle">in</text>
  </svg>
`;

export const WINDOWS_ICON = svgDataUri(windowsSvg);
export const CHROME_ICON = '/assets/common/brands/chrome.webp';
export const VS_CODE_ICON = '/assets/common/brands/visual-studio-code.webp';
export const GITHUB_ICON = '/assets/common/brands/github.webp';
export const RECYCLE_BIN_ICON = svgDataUri(recycleBinSvg);
export const TERMINAL_ICON = svgDataUri(terminalSvg);
export const NOTEPAD_ICON = '/assets/common/brands/text-file.webp';
export const SETTINGS_ICON = '/assets/common/brands/setting.webp';
export const WIFI_ICON = svgDataUri(wifiSvg);
export const VOLUME_ICON = svgDataUri(volumeSvg);
export const BATTERY_ICON = svgDataUri(batterySvg);
export const LINKEDIN_ICON = svgDataUri(linkedinSvg);

// TODO: 실제 LinkedIn 프로필 주소로 교체하세요 (예: https://www.linkedin.com/in/your-id)
export const LINKEDIN_URL = 'https://www.linkedin.com/';

const appIconSvg = (emoji: string, color: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${color}"/>
    <text x="32" y="44" font-size="30" text-anchor="middle">${emoji}</text>
  </svg>
`;

// Work은 박스 없이 큰 서류가방 이모지로 (데스크톱·모바일 공통)
const workIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <text x="32" y="50" font-size="54" text-anchor="middle">💼</text>
  </svg>
`;
export const WORK_ICON = svgDataUri(workIconSvg);

// 디지털 명함 (Card) 아이콘 — 아바타 + 정보 라인
const cardIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="cardg" x1="8" x2="56" y1="8" y2="56">
        <stop offset="0" stop-color="#818cf8"/>
        <stop offset="1" stop-color="#6d28d9"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#cardg)"/>
    <circle cx="24" cy="27" r="7" fill="#fff"/>
    <path d="M13 42c1.7-5.3 5.4-7.8 11-7.8S33.3 36.7 35 42z" fill="#fff"/>
    <rect x="39" y="22" width="13" height="3.4" rx="1.7" fill="#fff"/>
    <rect x="39" y="30" width="11" height="3.4" rx="1.7" fill="#fff" opacity=".8"/>
    <rect x="39" y="38" width="8" height="3.4" rx="1.7" fill="#fff" opacity=".6"/>
  </svg>
`;
export const CARD_ICON = svgDataUri(cardIconSvg);
export const GRU_ICON = '/assets/common/gru-icon.png';
export const HIRAX_ICON = svgDataUri(appIconSvg('💪', '#E23B3B'));
export const INOBUS_ICON = svgDataUri(appIconSvg('♻️', '#1F9D55'));
export const GRACE_ICON = svgDataUri(appIconSvg('👟', '#2F6FE0'));
export const DONGNAE_ICON = '/assets/projects/dongnae/icon.png';
export const CAFE_ICON = svgDataUri(appIconSvg('💬', '#0EA5A6'));
export const GAME_ICON = svgDataUri(appIconSvg('👥', '#7C3AED'));

export type LauncherAction =
  | { kind: 'page'; pageId: PageType }
  | { kind: 'folder'; folderId: 'projects' | 'recycle-bin' }
  | { kind: 'browser'; browserAppId: BrowserAppId }
  | { kind: 'code'; workspaceId: CodeWorkspaceId }
  | { kind: 'text-file'; fileId: TextFileId }
  | { kind: 'terminal' };

export type LauncherEntry = {
  id: string;
  label: string;
  icon: string;
  subtitle: string;
  keywords: string[];
  launch: LauncherAction;
};

export const BROWSER_APPS: Record<
  BrowserAppId,
  {
    title: string;
    icon: string;
    initialUrl: string;
    description: string;
  }
> = {
  'browser-home': {
    title: 'Chrome',
    icon: CHROME_ICON,
    initialUrl: BROWSER_HOME_URL,
    description: 'Google iframe 시작 페이지를 여는 browser shell',
  },
  blog: {
    title: 'Tech Blog',
    icon: '/assets/common/brands/blog.webp',
    initialUrl: 'https://jsbyun0301-bot.vercel.app/',
    description: '개인 기술 블로그 iframe 콘텐츠',
  },
  insta: {
    title: 'LinkedIn',
    icon: LINKEDIN_ICON,
    initialUrl: LINKEDIN_URL,
    description: 'LinkedIn 프로필 (외부 링크로 전환)',
  },
  github: {
    title: 'GitHub',
    icon: GITHUB_ICON,
    initialUrl: 'https://github.com/jsbyun0301-bot',
    description: 'GitHub 메인 페이지는 새 탭 전환으로 처리',
  },
};

const PORTFOLIO_GITHUB1S_TARGET = {
  owner: 'jsbyun0301-bot',
  repo: 'jsbyun0301-bot.github.io',
  branch: 'HEAD',
  path: 'src/pages/MainPage.tsx',
  title: 'Visual Studio Code',
} as const;

export const CODE_WORKSPACES: Record<
  CodeWorkspaceId,
  {
    title: string;
    icon: string;
    owner: string;
    repo: string;
    branch: string;
    path: string;
  }
> = {
  'portfolio-workspace': {
    ...PORTFOLIO_GITHUB1S_TARGET,
    icon: VS_CODE_ICON,
  },
};

export const WALLPAPERS: Record<
  WallpaperId,
  { id: WallpaperId; label: string; style: CSSProperties; accent: string }
> = {
  sonoma: {
    id: 'sonoma',
    label: 'Sonoma',
    style: {
      backgroundColor: '#1b2464',
      backgroundImage:
        'radial-gradient(120% 100% at 12% 6%, rgba(96,146,255,0.60) 0, transparent 46%), radial-gradient(110% 95% at 90% 16%, rgba(196,116,224,0.55) 0, transparent 46%), radial-gradient(140% 130% at 72% 104%, rgba(255,156,120,0.45) 0, transparent 52%), radial-gradient(110% 100% at 26% 98%, rgba(96,84,210,0.55) 0, transparent 56%), linear-gradient(150deg, #17225f 0%, #3a2f92 42%, #833f98 72%, #b95c7c 100%)',
      backgroundSize: 'cover',
    },
    accent: '#0a84ff',
  },
  ventura: {
    id: 'ventura',
    label: 'Ventura',
    style: {
      backgroundColor: '#0a2540',
      backgroundImage:
        'radial-gradient(120% 100% at 20% 12%, rgba(120,200,255,0.42) 0, transparent 45%), radial-gradient(120% 110% at 85% 90%, rgba(70,120,230,0.5) 0, transparent 52%), linear-gradient(160deg, #0a2447 0%, #14427a 46%, #2f74b8 78%, #56a7dd 100%)',
      backgroundSize: 'cover',
    },
    accent: '#2f74b8',
  },
  graphite: {
    id: 'graphite',
    label: 'Graphite',
    style: {
      background: 'linear-gradient(180deg, #313a54 0%, #29314a 100%)',
    },
    accent: '#8aa0c8',
  },
};

export const DEFAULT_DESKTOP_ITEMS: DesktopShortcutItem[] = [
  // 1행 — 핵심 (정체성 · 실무 · 프로젝트)
  {
    id: 'shortcut:about',
    kind: 'page',
    pageId: 'about',
    title: 'About Me',
    icon: '/assets/common/desktop/profile-shortcut.webp',
    position: { x: 28, y: 28 },
    isSystem: true,
  },
  {
    id: 'shortcut:work',
    kind: 'page',
    pageId: 'work',
    title: 'Work',
    icon: WORK_ICON,
    position: { x: 138, y: 28 },
    isSystem: true,
  },
  {
    id: 'shortcut:projects',
    kind: 'folder',
    folderId: 'projects',
    contentType: 'projects',
    title: 'Projects',
    icon: '/assets/common/desktop/folder-shortcut.webp',
    position: { x: 248, y: 28 },
    isSystem: true,
  },
  // 2행 — 요약 · 연락 · 링크 (Card · Contact · LinkedIn)
  {
    id: 'shortcut:card',
    kind: 'page',
    pageId: 'card',
    title: 'Card',
    icon: CARD_ICON,
    position: { x: 28, y: 152 },
    isSystem: true,
  },
  {
    id: 'shortcut:contact',
    kind: 'text-file',
    fileId: 'contact',
    title: 'CONTACT.txt',
    icon: NOTEPAD_ICON,
    position: { x: 138, y: 152 },
    isSystem: true,
  },
  {
    id: 'shortcut:linkedin',
    kind: 'page',
    pageId: 'insta',
    title: 'LinkedIn',
    icon: LINKEDIN_ICON,
    position: { x: 248, y: 152 },
    isSystem: true,
  },
  // 3행 — 코드 · 도구 (Terminal · GitHub · VS Code)
  {
    id: 'shortcut:terminal',
    kind: 'terminal',
    title: 'Terminal',
    icon: TERMINAL_ICON,
    position: { x: 28, y: 276 },
    isSystem: true,
  },
  {
    id: 'shortcut:github',
    kind: 'page',
    pageId: 'github',
    title: 'GitHub',
    icon: GITHUB_ICON,
    position: { x: 138, y: 276 },
    isSystem: true,
  },
  {
    id: 'shortcut:vscode',
    kind: 'code',
    workspaceId: 'portfolio-workspace',
    title: 'VS Code',
    icon: VS_CODE_ICON,
    position: { x: 248, y: 276 },
    isSystem: true,
  },
  // 4행 — 안내 · 시스템 (README · Chrome · Settings)
  {
    id: 'shortcut:readme',
    kind: 'text-file',
    fileId: 'readme',
    title: 'README.txt',
    icon: NOTEPAD_ICON,
    position: { x: 28, y: 400 },
    isSystem: true,
  },
  {
    id: 'shortcut:chrome',
    kind: 'page',
    pageId: 'chrome',
    title: 'Chrome',
    icon: CHROME_ICON,
    position: { x: 138, y: 400 },
    isSystem: true,
  },
  {
    id: 'shortcut:settings',
    kind: 'page',
    pageId: 'settings',
    title: 'Settings',
    icon: SETTINGS_ICON,
    position: { x: 248, y: 400 },
    isSystem: true,
  },
];

export const PINNED_APPS: LauncherEntry[] = [
  {
    id: 'pin:about',
    label: 'About',
    icon: '/assets/common/desktop/profile-shortcut.webp',
    subtitle: '프로필 페이지',
    keywords: ['about', 'profile', 'portfolio', '변지섭'],
    launch: { kind: 'page', pageId: 'about' },
  },
  {
    id: 'pin:work',
    label: 'Work',
    icon: WORK_ICON,
    subtitle: '실무 경험 (AI 품질 검증)',
    keywords: ['work', '업무', '경력', 'est', 'qc', '실무', 'career'],
    launch: { kind: 'page', pageId: 'work' },
  },
  {
    id: 'pin:projects',
    label: 'Projects',
    icon: '/assets/common/desktop/folder-shortcut.webp',
    subtitle: '프로젝트 폴더',
    keywords: ['projects', 'folder', 'portfolio'],
    launch: { kind: 'folder', folderId: 'projects' },
  },
  {
    id: 'pin:chrome',
    label: 'Chrome',
    icon: CHROME_ICON,
    subtitle: 'Pages 탭으로 여는 Google 시작 페이지',
    keywords: ['browser', 'chrome', 'google', 'webview'],
    launch: { kind: 'page', pageId: 'chrome' },
  },
  {
    id: 'pin:terminal',
    label: 'Terminal',
    icon: TERMINAL_ICON,
    subtitle: '포트폴리오 명령 라우터',
    keywords: ['terminal', 'powershell', 'command', 'shell'],
    launch: { kind: 'terminal' },
  },
  {
    id: 'pin:vscode',
    label: 'VS Code',
    icon: VS_CODE_ICON,
    subtitle: 'github1s 코드 보기',
    keywords: ['vscode', 'code', 'github1s', 'source'],
    launch: { kind: 'code', workspaceId: 'portfolio-workspace' },
  },
];

export const START_MENU_APPS: LauncherEntry[] = [
  ...PINNED_APPS,
  {
    id: 'start:card',
    label: 'Card',
    icon: CARD_ICON,
    subtitle: '한 장으로 보는 프로필 명함',
    keywords: ['card', '명함', 'profile', '소개', '변지섭'],
    launch: { kind: 'page', pageId: 'card' },
  },
  {
    id: 'start:github',
    label: 'GitHub',
    icon: GITHUB_ICON,
    subtitle: 'API 기반 프로필 요약',
    keywords: ['github', 'repo', 'repositories', '변지섭'],
    launch: { kind: 'page', pageId: 'github' },
  },
  {
    id: 'start:settings',
    label: 'Settings',
    icon: SETTINGS_ICON,
    subtitle: '배경과 데스크톱 설정',
    keywords: ['settings', 'wallpaper', 'personalize', '배경', '설정'],
    launch: { kind: 'page', pageId: 'settings' },
  },
  {
    id: 'start:notepad',
    label: 'Notepad',
    icon: NOTEPAD_ICON,
    subtitle: '텍스트 파일 뷰어',
    keywords: ['notepad', 'text files', 'txt', 'readme', '메모장'],
    launch: { kind: 'text-file', fileId: 'readme' },
  },
  {
    id: 'start:readme',
    label: 'README.txt',
    icon: NOTEPAD_ICON,
    subtitle: '셸 구조와 사용법',
    keywords: ['readme', 'guide', 'usage', 'start', '가이드'],
    launch: { kind: 'text-file', fileId: 'readme' },
  },
  {
    id: 'start:about-file',
    label: 'ABOUT.txt',
    icon: NOTEPAD_ICON,
    subtitle: '짧은 프로필 요약',
    keywords: ['about.txt', 'about file', 'summary', '소개'],
    launch: { kind: 'text-file', fileId: 'about-file' },
  },
  {
    id: 'start:contact',
    label: 'CONTACT.txt',
    icon: NOTEPAD_ICON,
    subtitle: '연락처 정보',
    keywords: ['contact', 'email', 'phone', '연락처'],
    launch: { kind: 'text-file', fileId: 'contact' },
  },
  {
    id: 'start:now',
    label: 'NOW.txt',
    icon: NOTEPAD_ICON,
    subtitle: '현재 집중 중인 일',
    keywords: ['now', 'current', 'focus', '현재'],
    launch: { kind: 'text-file', fileId: 'now' },
  },
  {
    id: 'start:linkedin',
    label: 'LinkedIn',
    icon: LINKEDIN_ICON,
    subtitle: 'LinkedIn 프로필 (준비 중)',
    keywords: ['linkedin', 'sns', 'social', '링크드인'],
    launch: { kind: 'page', pageId: 'insta' },
  },
];

export const START_MENU_RECOMMENDED_IDS = [
  'start:resume',
  'start:github',
  'start:settings',
  'start:notepad',
] as const;

export function getWallpaperStyle(wallpaperId: WallpaperId) {
  return (WALLPAPERS[wallpaperId] ?? WALLPAPERS.sonoma).style;
}
