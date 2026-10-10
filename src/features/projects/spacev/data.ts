import type { ProjectData } from '@/features/projects/common/types';
import {
  SPACEV_HIGHLIGHTS,
  SPACEV_OUTCOMES,
  SPACEV_RESPONSIBILITIES,
  SPACEV_SECTIONS,
  SPACEV_SUMMARY,
} from './content';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

export const SPACEV_DATA: ProjectData = {
  title: '단기임대 플랫폼 공급자 유치 전략',
  hero: '',
  featuredAssets: [],
  summary: SPACEV_SUMMARY,
  highlights: SPACEV_HIGHLIGHTS,
  responsibilities: SPACEV_RESPONSIBILITIES,
  outcomes: SPACEV_OUTCOMES,
  skills: [
    skillChip('수요 검증'),
    skillChip('현장 인터뷰'),
    skillChip('타겟 세분화'),
    skillChip('서비스 기획'),
    skillChip('전략 기획'),
  ],
  tools: [toolChip('Excel'), toolChip('PowerPoint')],
  period: '2023.09 ~ 2023.12',
  membersLabel: '소속',
  members: '성균관대 스타트업 실천경영전략학회 <그루> · 스페이스브이 산학협력',
  roles: [roleChip('서비스 기획'), roleChip('수요 검증'), roleChip('현장 조사')],
  result: ['산학협력 우수상', '고시원 5곳 인터뷰로 공급 병목 규명'],
  category: categoryChip('기획 · 전략'),
  sections: SPACEV_SECTIONS,
};
