import type { ProjectData } from '@/features/projects/common/types';
import {
  INOBUS_HIGHLIGHTS,
  INOBUS_OUTCOMES,
  INOBUS_RESPONSIBILITIES,
  INOBUS_SECTIONS,
  INOBUS_SUMMARY,
} from './content';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

export const INOBUS_DATA: ProjectData = {
  title: '리필스테이션 배송 전략',
  hero: '',
  featuredAssets: [
    '/assets/projects/inobus/revenue-model.png',
    '/assets/projects/inobus/userflow.png',
    '/assets/projects/inobus/revenue-calc.png',
  ],
  summary: INOBUS_SUMMARY,
  highlights: INOBUS_HIGHLIGHTS,
  responsibilities: INOBUS_RESPONSIBILITIES,
  outcomes: INOBUS_OUTCOMES,
  skills: [
    skillChip('전략 기획'),
    skillChip('데이터 분석'),
    skillChip('시장 분석'),
    skillChip('수익모델'),
    skillChip('고객여정지도'),
  ],
  tools: [toolChip('Excel'), toolChip('PowerPoint')],
  period: '2023.04 ~ 2023.07',
  membersLabel: '소속',
  members: '스타트업 전략학회 <그루> · 이노버스 산학협력',
  roles: [
    roleChip('전략 기획'),
    roleChip('데이터 분석'),
    roleChip('수익모델 설계'),
  ],
  result: ['산학협력 아이디어 우수상', '1,200세대 기준 연 추정매출 약 969만 원'],
  category: categoryChip('기획 · 전략'),
  sections: INOBUS_SECTIONS,
};
