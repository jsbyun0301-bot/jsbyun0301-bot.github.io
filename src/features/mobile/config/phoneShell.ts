import type { CodeWorkspaceId, PageType, TextFileId } from '@/stores';
import {
  CAFE_ICON,
  CARD_ICON,
  CHROME_ICON,
  DONGNAE_ICON,
  GAME_ICON,
  GRACE_ICON,
  GRU_ICON,
  HIRAX_ICON,
  INOBUS_ICON,
  LINKEDIN_ICON,
  WORK_ICON,
} from '@/features/desktop/config/shell';

const svgDataUri = (markup: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;

// iOS 스타일 시스템 앱 아이콘 (스퀘어클, iOS 색감)
const phoneSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="8" x2="64" y1="8" y2="64">
        <stop offset="0" stop-color="#5ff07a"/>
        <stop offset="1" stop-color="#0bbf3f"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <path d="M25.5 20.5c-2.4 1.5-3.2 6.1-1.9 10.9 1.8 6.9 7.1 13.5 13.4 17.2 4.8 2.8 9.7 3.3 11.8 1.2l2.3-2.4c1.1-1.1 1-2.9-.2-3.9l-5.5-4.5c-1-.8-2.5-.8-3.5.1l-2.6 2.4c-4-2.2-7.1-5.4-9.3-9.5l2.4-2.4c1-1 1.1-2.5.3-3.6l-4.1-5.3c-.8-1.2-2.4-1.5-3.1-.2z" fill="#fff"/>
  </svg>
`;

const filesSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="11" y2="62">
        <stop offset="0" stop-color="#ffb457"/>
        <stop offset="1" stop-color="#f5842f"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <path d="M16 27c0-3.2 2.6-5.8 5.8-5.8h10.8l5 5.8h12.6c3.2 0 5.8 2.6 5.8 5.8v14.4c0 3.2-2.6 5.8-5.8 5.8H21.8c-3.2 0-5.8-2.6-5.8-5.8z" fill="#fff" opacity=".95"/>
  </svg>
`;

const settingsSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="9" y2="63">
        <stop offset="0" stop-color="#c4cad3"/>
        <stop offset="1" stop-color="#7c8493"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <g fill="#fff">
      <rect x="31" y="14" width="10" height="44" rx="4"/>
      <rect x="14" y="31" width="44" height="10" rx="4"/>
      <g transform="rotate(45 36 36)">
        <rect x="31" y="14" width="10" height="44" rx="4"/>
        <rect x="14" y="31" width="44" height="10" rx="4"/>
      </g>
    </g>
    <circle cx="36" cy="36" r="12" fill="url(#g)"/>
    <circle cx="36" cy="36" r="5.5" fill="#fff"/>
  </svg>
`;

const notesSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="9" y2="63">
        <stop offset="0" stop-color="#fff0a6"/>
        <stop offset="1" stop-color="#fbc531"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <rect x="18" y="17" width="36" height="38" rx="4" fill="#fff"/>
    <path d="M25 28h22M25 36h22M25 44h14" stroke="#e0a800" stroke-width="3" stroke-linecap="round"/>
  </svg>
`;

const terminalSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="9" y2="63">
        <stop offset="0" stop-color="#3b4657"/>
        <stop offset="1" stop-color="#12161d"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <path d="M21 27.5 31 35l-10 7.5" fill="none" stroke="#7dd3fc" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 44h15" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>
  </svg>
`;

const profileSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="9" y2="63">
        <stop offset="0" stop-color="#5b9dff"/>
        <stop offset=".55" stop-color="#8f7bff"/>
        <stop offset="1" stop-color="#f472b6"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <circle cx="36" cy="29" r="10" fill="#fff"/>
    <path d="M18 55c2.8-9.4 9.4-14.4 18-14.4S51.2 45.6 54 55" fill="#fff"/>
  </svg>
`;

const codeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <defs>
      <linearGradient id="g" x1="9" x2="63" y1="9" y2="63">
        <stop offset="0" stop-color="#38bdf8"/>
        <stop offset="1" stop-color="#0b63a6"/>
      </linearGradient>
    </defs>
    <rect width="72" height="72" rx="16" fill="url(#g)"/>
    <path d="M29 24 18 36l11 12M43 24l11 12-11 12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const githubSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
    <rect width="72" height="72" rx="16" fill="#1a1a1a"/>
    <circle cx="36" cy="36" r="21" fill="#fff"/>
    <path d="M36 18.5c-9.9 0-18 8-18 18 0 7.9 5.1 14.6 12.2 17 .9.2 1.2-.4 1.2-.9v-3.1c-5 1.1-6-2.1-6-2.1-.8-2-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.2 2 5.2 1.5.2-1.2.6-2 1.1-2.4-4-.5-8.2-2-8.2-8.8 0-1.9.7-3.5 1.8-4.8-.2-.4-.8-2.3.2-4.8 0 0 1.5-.5 4.9 1.8a17 17 0 0 1 8.9 0c3.4-2.3 4.9-1.8 4.9-1.8 1 2.5.4 4.4.2 4.8 1.1 1.3 1.8 2.9 1.8 4.8 0 6.8-4.2 8.3-8.2 8.8.7.6 1.2 1.7 1.2 3.4v4.5c0 .5.3 1.1 1.2.9A18 18 0 0 0 54 36.5c0-10-8.1-18-18-18z" fill="#1a1a1a"/>
  </svg>
`;

export const PHONE_SYSTEM_ICONS = {
  phone: svgDataUri(phoneSvg),
  files: svgDataUri(filesSvg),
  settings: svgDataUri(settingsSvg),
  notes: svgDataUri(notesSvg),
  terminal: svgDataUri(terminalSvg),
  profile: svgDataUri(profileSvg),
  code: svgDataUri(codeSvg),
  github: svgDataUri(githubSvg),
} as const;

export type PhoneFolderId = 'projects' | 'gru';

export type PhoneLaunch =
  | { kind: 'page'; pageId: PageType }
  | { kind: 'folder'; folderId: PhoneFolderId }
  | { kind: 'text-file'; fileId: TextFileId }
  | { kind: 'terminal' }
  | { kind: 'code'; workspaceId: CodeWorkspaceId };

export type PhoneApp = {
  id: string;
  label: string;
  icon: string;
  launch: PhoneLaunch;
  system?: boolean;
  // 박스 프레임 없이 아이콘 자체를 크게 표시 (예: Work)
  frameless?: boolean;
};

// 데스크톱 DEFAULT_DESKTOP_ITEMS 구성을 그대로 미러링한다.
export const PHONE_APPS: PhoneApp[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: PHONE_SYSTEM_ICONS.profile,
    launch: { kind: 'page', pageId: 'about' },
  },
  {
    id: 'work',
    label: 'Work',
    icon: WORK_ICON,
    launch: { kind: 'page', pageId: 'work' },
    frameless: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: PHONE_SYSTEM_ICONS.files,
    launch: { kind: 'folder', folderId: 'projects' },
  },
  {
    id: 'chrome',
    label: 'Chrome',
    icon: CHROME_ICON,
    launch: { kind: 'page', pageId: 'chrome' },
  },
  {
    id: 'readme',
    label: 'README',
    icon: PHONE_SYSTEM_ICONS.notes,
    launch: { kind: 'text-file', fileId: 'readme' },
  },
  {
    id: 'card',
    label: 'Card',
    icon: CARD_ICON,
    launch: { kind: 'page', pageId: 'card' },
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: PHONE_SYSTEM_ICONS.phone,
    launch: { kind: 'text-file', fileId: 'contact' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LINKEDIN_ICON,
    launch: { kind: 'page', pageId: 'insta' },
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: PHONE_SYSTEM_ICONS.github,
    launch: { kind: 'page', pageId: 'github' },
  },
  {
    id: 'code',
    label: 'VS Code',
    icon: PHONE_SYSTEM_ICONS.code,
    launch: { kind: 'code', workspaceId: 'portfolio-workspace' },
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: PHONE_SYSTEM_ICONS.terminal,
    launch: { kind: 'terminal' },
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: PHONE_SYSTEM_ICONS.settings,
    launch: { kind: 'page', pageId: 'settings' },
    system: true,
  },
  // Projects 폴더 내부 — 그루(학회) 하위 폴더 + 개별 프로젝트
  {
    id: 'gru',
    label: '그루',
    icon: GRU_ICON,
    launch: { kind: 'folder', folderId: 'gru' },
  },
  {
    id: 'inobus',
    label: '이노버스',
    icon: INOBUS_ICON,
    launch: { kind: 'page', pageId: 'inobus' },
  },
  {
    id: 'hirax',
    label: '하이랙스',
    icon: HIRAX_ICON,
    launch: { kind: 'page', pageId: 'hirax' },
  },
  {
    id: 'grace',
    label: '그레이스',
    icon: GRACE_ICON,
    launch: { kind: 'page', pageId: 'grace' },
  },
  {
    id: 'dongnae',
    label: '동내',
    icon: DONGNAE_ICON,
    launch: { kind: 'page', pageId: 'dongnae' },
  },
  {
    id: 'cafe',
    label: '언어분석',
    icon: CAFE_ICON,
    launch: { kind: 'page', pageId: 'cafe' },
  },
  {
    id: 'game',
    label: '소비자분석',
    icon: GAME_ICON,
    launch: { kind: 'page', pageId: 'game' },
  },
];

// 홈 화면 그리드 — 핵심 앱을 가시성 좋게 위에
export const PHONE_HOME_APP_IDS = [
  'about',
  'card',
  'work',
  'projects',
  'readme',
  'linkedin',
  'github',
  'code',
] as const;

// 하단 독 — 사소한/유틸 앱 위주
export const PHONE_DOCK_APP_IDS = ['contact', 'terminal', 'chrome', 'settings'] as const;

export const PHONE_FOLDER_APP_IDS: Record<PhoneFolderId, string[]> = {
  projects: ['gru', 'dongnae', 'cafe', 'game'],
  gru: ['hirax', 'inobus', 'grace'],
};

export const PHONE_FOLDER_TITLES: Record<PhoneFolderId, string> = {
  projects: 'Projects',
  gru: '그루 (학회)',
};

export const PHONE_APP_BY_ID = new Map(PHONE_APPS.map((app) => [app.id, app]));
