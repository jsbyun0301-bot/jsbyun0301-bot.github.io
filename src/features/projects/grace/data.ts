import type { ProjectData } from '@/features/projects/common/types';
import {
  GRACE_HIGHLIGHTS,
  GRACE_OUTCOMES,
  GRACE_RESPONSIBILITIES,
  GRACE_SECTIONS,
  GRACE_SUMMARY,
} from './content';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

export const GRACE_DATA: ProjectData = {
  title: '그레이스 · 닥터숄 포지셔닝',
  hero: '',
  featuredAssets: [
    '/assets/projects/grace/store.png',
    '/assets/projects/grace/product-page.png',
  ],
  summary: GRACE_SUMMARY,
  highlights: GRACE_HIGHLIGHTS,
  responsibilities: GRACE_RESPONSIBILITIES,
  outcomes: GRACE_OUTCOMES,
  skills: [
    skillChip('브랜드 전략'),
    skillChip('포지셔닝'),
    skillChip('이커머스 기획'),
    skillChip('타겟 분석'),
  ],
  tools: [toolChip('PowerPoint'), toolChip('네이버 스마트스토어')],
  period: '2023.10 ~ 2023.12',
  membersLabel: '소속',
  members: '스타트업 전략학회 <그루> · 그레이스 산학협력',
  roles: [
    roleChip('브랜드 전략'),
    roleChip('이커머스 기획'),
    roleChip('입점 제안'),
  ],
  result: ['닥터숄 국내 포지셔닝·판매 전략 제안', '산학협력 아이디어 우수상'],
  category: categoryChip('기획 · 전략'),
  sections: GRACE_SECTIONS,
};
