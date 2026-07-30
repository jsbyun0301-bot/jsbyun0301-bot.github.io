import { ABOUT } from '@/features/profile/data/about';
import { prizeList } from '@/features/prize/data/prizeData';

export const DESKTOP_FEATURED_ASSETS = [
  '/assets/common/desktop/profile-shortcut.webp',
  '/assets/common/desktop/folder-shortcut.webp',
  '/assets/common/brands/chrome.webp',
  '/assets/common/brands/visual-studio-code.webp',
  '/assets/common/brands/github.webp',
  '/assets/common/awards/awards-icon.webp',
  '/assets/common/gru-icon.png',
  '/assets/projects/dongnae/icon.png',
] as const;

export const PROFILE_FEATURED_ASSETS = [ABOUT.avatarSrc] as const;

export const AWARDS_FEATURED_ASSETS: readonly string[] = prizeList
  .slice(0, 4)
  .map((prize) => prize.src);
