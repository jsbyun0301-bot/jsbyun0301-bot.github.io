import type { Chip } from './types';

export const SKILL_COLORS = {
  React: '#61DBFB',
  TypeScript: '#007acc',
  JavaScript: '#F0DB4F',
  Recoil: '#007AF4',
  SockJS: '#1f2937',
  STOMP: '#0f766e',
  'Chart.js': '#ff6384',
  Storybook: '#ff4785',
  'vanilla-extract': '#99F6E4',
  Vite: '#9575CD',
  axios: '#0A99E0',
} as const;

export const TOOL_COLORS = {
  'Visual Studio Code': '#b0a1ec',
  Notion: '#eeeeee',
  Figma: '#F24E1E',
  AWS: '#777777',
  Firebase: '#FFCA28',
} as const;

export const ROLE_COLORS = {
  '프론트엔드 리더': '#dbebdb',
  '아키텍처 설계': '#ffe2dd',
  '실시간 통신': '#f1c40f',
  '성능 최적화': '#fe340f',
  '프론트엔드 개발': '#dbebdb',
  퍼블리싱: '#ffe2dd',
  기획: '#f1c40f',
  '운영 및 홍보': '#fe340f',
} as const;

export const CATEGORY_COLORS = {
  WEB: '#f1780f',
} as const;

export const skillChip = (label: string): Chip => ({
  label,
  color: (SKILL_COLORS as Record<string, string>)[label] ?? '#3b82f6',
});

export const toolChip = (label: string): Chip => ({
  label,
  color: (TOOL_COLORS as Record<string, string>)[label] ?? '#64748b',
});

export const roleChip = (label: string): Chip => ({
  label,
  color: (ROLE_COLORS as Record<string, string>)[label] ?? '#e6eefc',
});

export const categoryChip = (label: string): Chip => ({
  label,
  color: (CATEGORY_COLORS as Record<string, string>)[label] ?? '#0ea5e9',
});
