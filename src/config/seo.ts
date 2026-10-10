// NOTE: SEO_BASE_URL은 실제 배포 도메인(예: https://<github-username>.github.io)으로
// 배포 단계에서 확정합니다.
export const SEO_BASE_URL = 'https://jsbyun0301-bot.github.io';

export const SEO_SITE_NAME = '변지섭 포트폴리오';

export const SEO_IMAGE_URL = `${SEO_BASE_URL}/og-image.png`;

export type RouteSeo = {
  title: string;
  description: string;
  canonicalPath: string;
};

export const DEFAULT_SEO: RouteSeo = {
  title: '변지섭 | Data-Driven Planner Portfolio',
  description:
    '데이터에서 인사이트를 발견해 전략과 기획으로 연결하는 기획자 변지섭의 포트폴리오입니다. AI 더빙·번역 품질(QC), 데이터 분석, 전략 기획 경험을 소개합니다.',
  canonicalPath: '/',
};

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': DEFAULT_SEO,
  '/profile': {
    title: 'Profile | 변지섭 포트폴리오',
    description:
      '변지섭의 경력, 데이터 분석·기획 역량, 프로젝트, 교육 이력을 정리한 포트폴리오 페이지입니다.',
    canonicalPath: '/profile/',
  },
  '/prize': {
    title: 'Awards | 변지섭 포트폴리오',
    description:
      '변지섭의 수상, 대외활동, 프로젝트 성과를 확인할 수 있는 포트폴리오 페이지입니다.',
    canonicalPath: '/prize/',
  },
  '/github': {
    title: 'GitHub | 변지섭 포트폴리오',
    description:
      '변지섭의 GitHub 활동과 프로젝트를 확인할 수 있는 포트폴리오 페이지입니다.',
    canonicalPath: '/github/',
  },
  '/work': {
    title: '실무 경험 (AI 품질 검증 & 평가 자동화) | 변지섭 포트폴리오',
    description:
      'ESTsoft에서 번역 품질 이슈를 파악·분류하고 프롬프트로 개선한 뒤, LLM 자동 평가 파이프라인(Python·Gemini·Plotly)까지 직접 구축한 실무 경험입니다.',
    canonicalPath: '/work/',
  },
  '/card': {
    title: 'Card | 변지섭 포트폴리오',
    description:
      '데이터 기반 기획자 변지섭을 한 장으로 압축한 디지털 명함 — 핵심 역량과 연락처를 한눈에 확인할 수 있습니다.',
    canonicalPath: '/card/',
  },
  '/inobus': {
    title: '이노버스 리필스테이션 | 변지섭 포트폴리오',
    description:
      '친환경 리필스테이션에 배송을 더한 신규 플랫폼 비즈니스 전략을 기획한 이노버스 산학협력 프로젝트입니다.',
    canonicalPath: '/inobus/',
  },
  '/spacev': {
    title: '스페이스브이 단기임대 플랫폼 | 변지섭 포트폴리오',
    description:
      '대학가 고시원 현장 인터뷰로 공실 위험이라는 공급 병목을 규명하고, 어학당과 정규학기의 일정 차이를 활용한 연계 패키지를 기획한 스페이스브이 산학협력 프로젝트입니다.',
    canonicalPath: '/spacev/',
  },
  '/second': {
    title: '세컨신드롬 셀프스토리지 | 변지섭 포트폴리오',
    description:
      '셀프스토리지 다락의 입지 조건을 기준화해 매물 선별 방법론을 수립하고, 부동산 콘텐츠 채널 협업으로 공급자 유입 경로를 설계한 세컨신드롬 산학협력 프로젝트입니다.',
    canonicalPath: '/second/',
  },
  '/hirax': {
    title: '하이랙스 스마트 피트니스 | 변지섭 포트폴리오',
    description:
      '강남 상권 데이터를 분석하고, 기존 센터가 숙련자 중심이라 초심자 진입 장벽이 높다는 점을 문제로 정의해 개인화 서비스를 기획한 하이랙스 산학협력 프로젝트입니다.',
    canonicalPath: '/hirax/',
  },
  '/grace': {
    title: '그레이스 닥터숄 포지셔닝 | 변지섭 포트폴리오',
    description:
      '해외 브랜드 닥터숄의 국내 포지셔닝과 자사몰·입점 판매 전략을 제안한 그레이스 산학협력 프로젝트입니다.',
    canonicalPath: '/grace/',
  },
  '/dongnae': {
    title: '동내 문화 여행 서비스 | 변지섭 포트폴리오',
    description:
      '서울시 문화시설과 공공자전거(따릉이) 데이터를 결합한 여행 서비스를 기획한 공공데이터 공모전 프로젝트입니다.',
    canonicalPath: '/dongnae/',
  },
  '/cafe': {
    title: '언어 데이터 분석 | 변지섭 포트폴리오',
    description:
      'Python(NLTK·KeyBERT·KoNLPy·spaCy)으로 카페 리뷰 텍스트를 감성·키워드 분석한 언어 데이터 분석(NLP) 프로젝트입니다.',
    canonicalPath: '/cafe/',
  },
  '/game': {
    title: '소비자 유형 분석 | 변지섭 포트폴리오',
    description:
      'R 기반 설문 군집분석(K-Means)으로 게임 이용 소비자를 4개 유형으로 분류한 소비자 유형 분석 프로젝트입니다.',
    canonicalPath: '/game/',
  },
};
