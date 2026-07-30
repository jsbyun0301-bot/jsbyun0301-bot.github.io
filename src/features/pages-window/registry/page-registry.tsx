import {
  CAFE_ICON,
  CARD_ICON,
  CHROME_ICON,
  DONGNAE_ICON,
  GAME_ICON,
  GRACE_ICON,
  HIRAX_ICON,
  INOBUS_ICON,
  LINKEDIN_ICON,
  LINKEDIN_URL,
  SETTINGS_ICON,
  WORK_ICON,
} from '@/features/desktop/config/shell';
import type { PageTab, PageType } from '@/stores/useDesktopStore';

export const PORTFOLIO_DEPLOY_ORIGIN = 'https://jsbyun0301-bot.github.io';

export const PAGE_TABS: Record<PageType, PageTab> = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: '/assets/common/desktop/profile-shortcut.webp',
  },
  awards: {
    id: 'awards',
    title: 'Awards',
    icon: '/assets/common/awards/awards-icon.webp',
  },
  chrome: {
    id: 'chrome',
    title: 'Chrome',
    icon: CHROME_ICON,
  },
  blog: {
    id: 'blog',
    title: 'Tech Blog',
    icon: '/assets/common/brands/blog.webp',
  },
  insta: {
    id: 'insta',
    title: 'LinkedIn',
    icon: LINKEDIN_ICON,
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: '/assets/common/brands/github.webp',
  },
  work: {
    id: 'work',
    title: 'Work',
    icon: WORK_ICON,
  },
  card: {
    id: 'card',
    title: 'Card',
    icon: CARD_ICON,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: SETTINGS_ICON,
  },
  inobus: {
    id: 'inobus',
    title: '이노버스 · 리필스테이션',
    icon: INOBUS_ICON,
  },
  hirax: {
    id: 'hirax',
    title: '하이랙스 · 스마트피트니스',
    icon: HIRAX_ICON,
  },
  grace: {
    id: 'grace',
    title: '그레이스 · 닥터숄',
    icon: GRACE_ICON,
  },
  dongnae: {
    id: 'dongnae',
    title: '동내 · 문화 여행앱',
    icon: DONGNAE_ICON,
  },
  cafe: {
    id: 'cafe',
    title: '언어 데이터 분석',
    icon: CAFE_ICON,
  },
  game: {
    id: 'game',
    title: '소비자 유형 분석',
    icon: GAME_ICON,
  },
};

export const PAGE_PATHS: Partial<Record<PageType, string>> = {
  about: '/profile',
  awards: '/prize',
  github: '/github',
  work: '/work',
  card: '/card',
  settings: '/settings',
  inobus: '/inobus',
  hirax: '/hirax',
  grace: '/grace',
  dongnae: '/dongnae',
  cafe: '/cafe',
  game: '/game',
};

export function getPortfolioOrigin() {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }

  return PORTFOLIO_DEPLOY_ORIGIN;
}

export function getAbsolutePortfolioUrl(path: string) {
  return `${getPortfolioOrigin()}${path}`;
}

export function getPageAddress(pageId: PageType) {
  if (pageId === 'chrome') {
    return 'https://www.google.com/webhp?igu=1';
  }

  if (pageId === 'blog') {
    return 'https://jsbyun0301-bot.vercel.app/';
  }

  if (pageId === 'insta') {
    return LINKEDIN_URL;
  }

  const internalPath = PAGE_PATHS[pageId];

  if (internalPath) {
    return getAbsolutePortfolioUrl(internalPath);
  }

  return getAbsolutePortfolioUrl('/');
}
