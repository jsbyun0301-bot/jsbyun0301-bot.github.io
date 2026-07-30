import type { ProjectData } from '@/features/projects/common/types';
import {
  HIRAX_HIGHLIGHTS,
  HIRAX_OUTCOMES,
  HIRAX_RESPONSIBILITIES,
  HIRAX_SECTIONS,
  HIRAX_SUMMARY,
} from './content';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

export const HIRAX_DATA: ProjectData = {
  title: '하이랙스 스마트 피트니스',
  hero: '',
  featuredAssets: [
    '/assets/projects/hirax/correlation.png',
    '/assets/projects/hirax/ai-ui.png',
    '/assets/projects/hirax/keyband.png',
  ],
  summary: HIRAX_SUMMARY,
  highlights: HIRAX_HIGHLIGHTS,
  responsibilities: HIRAX_RESPONSIBILITIES,
  outcomes: HIRAX_OUTCOMES,
  skills: [
    skillChip('상권 분석'),
    skillChip('회귀분석'),
    skillChip('포지셔닝'),
    skillChip('UX 기획'),
    skillChip('데이터 시각화'),
  ],
  tools: [toolChip('Excel'), toolChip('PowerPoint')],
  period: '2023',
  membersLabel: '소속',
  members: '스타트업 전략학회 <그루> · 하이랙스 산학협력',
  roles: [
    roleChip('데이터 분석'),
    roleChip('전략 기획'),
    roleChip('UX 기획'),
  ],
  result: ['상관분석 R² 0.46 (p<0.001)', '산학협력 아이디어 우수상'],
  category: categoryChip('기획 · 전략'),
  sections: HIRAX_SECTIONS,
};
