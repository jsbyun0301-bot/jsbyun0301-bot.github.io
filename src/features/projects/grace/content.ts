import type { ProjectSection } from '@/features/projects/common/types';

export const GRACE_SUMMARY =
  '해외 브랜드 닥터숄(Dr.Scholls)의 국내 포지셔닝과 자사몰·입점 판매 전략 제안 (그레이스 산학협력)';

export const GRACE_HIGHLIGHTS = [
  '"Work맨을 위한 Walk 서포트" 포지셔닝 컨셉 도출',
  '산학협력 아이디어 우수상',
];

export const GRACE_RESPONSIBILITIES = [
  {
    title: '포지셔닝 전략',
    items: [
      '인솔 수요와 직업군(타겟)을 분석해 포지셔닝 컨셉 도출',
      '"Work맨을 위한 Walk 서포트" 컨셉으로 브랜드 방향 설정',
      '직업군별 카테고리(구두/작업화/풋케어)와 페인포인트 정의',
    ],
  },
  {
    title: '자사몰 판매 전략',
    items: [
      '네이버 스마트스토어 기반 자사몰 구성 및 라이브커머스 연계',
      'SNS 런칭·시즌제 이벤트 등 유입 전략 설계',
      '상세페이지에 미↔한 사이즈 비교표·정보형 인솔 가이드·리뷰 노출',
    ],
  },
  {
    title: 'B2B 입점 제안',
    items: [
      '생산직 종사자 인터뷰 기반으로 서브원(SERVEONE) 입점 전략 수립',
      '기업 Heritage·임상검증·제품 가이드를 담은 입점 제안서 작성',
    ],
  },
];

export const GRACE_OUTCOMES = [
  '닥터숄 국내 포지셔닝 컨셉 및 직업군 카테고리 설계',
  '자사몰·라이브커머스·B2B 입점을 아우르는 판매 전략 제안',
  '산학협력기업 아이디어 우수상 수상',
];

export const GRACE_SECTIONS: ProjectSection[] = [
  {
    title: '자사몰 구성 전략',
    bullets: [
      '국내 이용률·연령대와 라이브커머스 연계를 근거로 네이버 스마트스토어를 자사몰 채널로 선정',
      'SNS 런칭·가입 혜택·시즌 이벤트를 묶어 초기 유입 동선 설계',
      '브랜드를 처음 접하는 방문자에게 "왜 닥터숄인지"를 한눈에 전달하는 구성',
    ],
    images: ['/assets/projects/grace/store.png'],
  },
  {
    title: '상품 페이지 구성',
    bullets: [
      '해외 브랜드 구매의 가장 큰 장벽인 사이즈 문제를 미국↔한국 비교표로 해소',
      '발 통증·직업군 등 문제 유형별 인솔 추천 가이드를 정보형 콘텐츠로 구성',
      '정성 리뷰를 상단에 노출해 페이지 신뢰도와 정보량을 동시에 강화',
    ],
    images: ['/assets/projects/grace/product-page.png'],
  },
];
