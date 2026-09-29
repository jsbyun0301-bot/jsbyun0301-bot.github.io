import type { ProjectSection } from '@/features/projects/common/types';

export const HIRAX_SUMMARY =
  '강남점 상권 데이터 분석을 근거로 "개인화" 포지셔닝 전략과 AI 맞춤 서비스를 기획 (하이랙스 산학협력 해커톤)';

export const HIRAX_HIGHLIGHTS = [
  '1인가구 수 ↔ 점포 수 상관분석 (R² 0.46, p < 0.001)',
  '산학협력 아이디어 우수상',
];

export const HIRAX_RESPONSIBILITIES = [
  {
    title: '상권 데이터 분석 · 인사이트 도출',
    items: [
      '강남권 1인가구 수와 스포츠 점포 수의 상관관계를 분석',
      'R² 0.463, P값 0.0005로 두 요소의 상관관계를 통계적으로 입증',
      '분석 근거를 바탕으로 "개인화" 트렌드를 전략 방향으로 설정',
    ],
  },
  {
    title: 'AI 컨디션 맞춤 서비스 기획',
    items: [
      '당일 컨디션·통증 부위·희망 운동 부위 입력 → AI 루틴 추천 설계',
      '앱과 키오스크를 연동한 4단계 입력 UI 기획',
      '휴대폰 소지 여부와 무관하게 이용 가능한 접점 설계',
    ],
  },
  {
    title: '개인화 고객경험 설계',
    items: [
      '성향별(집중형/소통형) 카드키 밴드 색상 차별 제공 아이디어',
      '태블릿을 통한 프로 호출 등 부담 없는 소통 장치 설계',
      '피트니스 부정 경험층을 위한 낮은 진입장벽 전략',
    ],
  },
];

export const HIRAX_OUTCOMES = [
  '상관분석으로 개인화 전략의 데이터 근거 확보',
  'AI 컨디션 맞춤 서비스 UI 및 개인화 CX 제안',
  '산학협력기업 아이디어 우수상 수상',
];

export const HIRAX_SECTIONS: ProjectSection[] = [
  {
    title: '인사이트 도출 — 상관관계 분석',
    bullets: [
      '강남권 1인가구 수와 스포츠 점포 수의 상관관계 분석',
      'R² 0.463 · P값 0.0005로 상관관계 유의성 입증',
      '"개인화" 트렌드에 맞춘 고도 개인화 시스템 전략 방향 설정',
    ],
    images: ['/assets/projects/hirax/correlation.png'],
  },
  {
    title: 'AI 컨디션 맞춤 서비스 UI',
    bullets: [
      '당일 컨디션·통증 부위·희망 운동 부위를 입력하면 AI가 그날의 운동 루틴을 추천',
      '입력 과정을 4단계로 나눠 부담 없이 진행되도록 UI 설계',
      '앱과 키오스크를 연동해 휴대폰 소지 여부와 무관하게 이용 가능한 접점 확보',
    ],
    images: ['/assets/projects/hirax/ai-ui.png'],
  },
  {
    title: '개인 성향별 키밴드 차별화',
    bullets: [
      '집중형·소통형 성향에 따라 카드키 밴드 색상을 다르게 제공해 서로의 운동 방식을 존중',
      '태블릿으로 트레이너를 호출해 말 걸기 부담 없이 케어받을 수 있는 장치 설계',
      '피트니스에 부정적 경험이 있는 이용자도 들어오기 쉬운 낮은 진입장벽 전략',
    ],
    images: ['/assets/projects/hirax/keyband.png'],
  },
];
