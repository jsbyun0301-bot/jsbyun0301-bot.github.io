import type { ProjectData } from '@/features/projects/common/types';
import {
  SECOND_HIGHLIGHTS,
  SECOND_OUTCOMES,
  SECOND_RESPONSIBILITIES,
  SECOND_SECTIONS,
  SECOND_SUMMARY,
} from './content';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

export const SECOND_DATA: ProjectData = {
  title: '셀프스토리지 매물 발굴 방법론',
  hero: '',
  featuredAssets: [],
  summary: SECOND_SUMMARY,
  highlights: SECOND_HIGHLIGHTS,
  responsibilities: SECOND_RESPONSIBILITIES,
  outcomes: SECOND_OUTCOMES,
  skills: [
    skillChip('B2B 공급 발굴'),
    skillChip('기준 설계'),
    skillChip('프로세스 기획'),
    skillChip('데이터 분석'),
    skillChip('전략 기획'),
  ],
  tools: [toolChip('Excel'), toolChip('PowerPoint')],
  period: '2023.09 ~ 2023.12',
  membersLabel: '소속',
  members: '성균관대 스타트업 실천경영전략학회 <그루> · 세컨신드롬 산학협력',
  roles: [roleChip('전략 기획'), roleChip('프로세스 설계'), roleChip('데이터 분석')],
  result: ['산학협력 우수상', '매물 선별 기준 문서화 및 제안 플로우 설계'],
  category: categoryChip('기획 · 전략'),
  sections: SECOND_SECTIONS,
};
