import { ProjectDetail } from './common';
import type { ProjectData } from './common/types';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from './common/constants';

const DONGNAE_DATA: ProjectData = {
  title: '동내 — 문화 여행 서비스 기획',
  hero: '',
  summary:
    '서울시 문화시설과 공공자전거(따릉이)를 연결한 여행 서비스 기획 (문화공공데이터 활용 경진대회)',
  highlights: ['공공데이터 기반 서비스 기획', '테마 여행·코스 공유 기능 설계'],
  responsibilities: [
    {
      title: '서비스 컨셉 · 시장 분석',
      items: [
        '문화 인프라 + 공공자전거를 결합한 <자전거와 함께하는 서울시 여행> 기획',
        '공유경제·코로나19·건강 관심 상승 등 시장 배경 분석',
      ],
    },
    {
      title: '핵심 기능 기획',
      items: [
        '테마 여행 추천(장소·길안내·회원 선호 기반)',
        '나만의 여행코스 제작·공유(루트 계산·사진/영상 첨부·키워드 검색)',
        '따릉이 위치·이용현황 연동 페이지 구성',
      ],
    },
    {
      title: '데이터 처리',
      items: [
        '공공자전거·랜드마크·자전거 코스 데이터 수집·전처리',
        '전처리 데이터 기반 비즈니스 모델 설정 및 앱 프로토타입 구상',
      ],
    },
  ],
  outcomes: [
    '공공데이터 기반 여행 서비스 기획서·앱 프로토타입 구상',
    '커뮤니티 기반 데이터 축적·선순환 모델 제안',
  ],
  skills: [
    skillChip('공공데이터'),
    skillChip('서비스 기획'),
    skillChip('데이터 전처리'),
    skillChip('프로토타이핑'),
  ],
  tools: [toolChip('PowerPoint')],
  period: '2022.07 ~ 2022.09',
  membersLabel: '소속',
  members: '팀 <따옴>',
  roles: [roleChip('데이터 분석'), roleChip('서비스 기획')],
  category: categoryChip('기획 · 공모전'),
  sections: [
    {
      title: '앱 프로토타입 — 화면별 기능',
      layout: 'showcase',
      images: [
        {
          src: '/assets/projects/dongnae/app-home.png',
          alt: '홈 — 나의 여행 일지 · 추천 코스',
          points: [
            '운행 정보를 여행 일지로 저장해 이전 기록을 홈에서 바로 열람',
            '마음에 들었던 코스를 다시 불러와 재이용',
            '커뮤니티에 공유된 지역 기반 추천 코스를 함께 노출',
          ],
        },
        {
          src: '/assets/projects/dongnae/app-bike-map.png',
          alt: '따릉이 연동 — 대여소 위치 · 보유 대수',
          points: [
            '보관소 위치 데이터로 현재 위치에서 가장 가까운 대여소 안내',
            '대여소별 자전거 종류(일반·새싹)와 보유 대수 표시',
            '이용권·월정액 구매를 앱 안에 넣어 두 앱을 오갈 필요 제거',
          ],
        },
        {
          src: '/assets/projects/dongnae/app-theme-list.png',
          alt: '테마 제공 — 문화시설 큐레이션',
          points: [
            '예술시설(미술관·박물관·전시관)·공원·전통시장·한강·역사시설 등으로 테마화',
            '문화 공공데이터로 각 장소의 위치·기본 정보 제공',
            '회원 선호도 데이터 기반으로 취향에 맞는 주변 장소 추천',
          ],
        },
        {
          src: '/assets/projects/dongnae/app-theme-detail.png',
          alt: '테마 상세 — 장소 정보 · 길안내',
          points: [
            '위치 기반으로 인접한 테마 장소를 보여주고 목적지까지 길안내',
            '목적지를 두 곳 이상 지정하면 경유 경로로 연결',
            '자주 선택되는 목적지를 저장해 테마별 추천 코스로 활용',
          ],
        },
        {
          src: '/assets/projects/dongnae/app-course.png',
          alt: '나만의 여행코스 — 경로 · 거리 · 소요시간',
          points: [
            '여러 테마의 목적지를 섞어 나만의 코스를 구성하는 핵심 기능',
            'CCH 알고리즘으로 두 장소를 잇는 최적 경로 계산',
            '경로에 cost를 부여해 편안한 길·최단 경로 등 옵션 제공',
            '완성된 코스를 운행거리·소요시간과 함께 저장',
          ],
        },
        {
          src: '/assets/projects/dongnae/app-community.png',
          alt: '커뮤니티 — 코스 공유 · 해시태그 검색',
          points: [
            '주 수요층 20~40대의 개성 중시·SNS 기반 소통 특성을 반영',
            '직접 만든 코스에 사진·영상과 감상평을 함께 공유',
            '해시태그로 키워드를 지정해 다른 이용자가 쉽게 검색',
            '축적된 게시물이 다시 추천 코스 데이터로 순환',
          ],
        },
      ],
    },
  ],
};

const CAFE_DATA: ProjectData = {
  title: '언어 데이터 분석',
  hero: '',
  summary:
    'Python(NLTK·KeyBERT·KoNLPy·spaCy)으로 카페 리뷰 텍스트를 감성·키워드 분석한 언어 데이터 분석 프로젝트',
  highlights: [
    '감성분석 긍정 42 / 부정 8 등 긍정 우세 도출',
    'NLTK · KeyBERT · KoNLPy · spaCy 활용',
  ],
  responsibilities: [
    {
      title: '감성 분석',
      items: [
        'Google Trans로 영문 번역 후 NLTK SentimentIntensityAnalyzer로 polarity 산출',
        'compound 값 기준으로 리뷰 긍·부정 판별 (코드 직접 작성)',
        '결과: 긍정 42 / 부정 8 등 대체로 긍정 우세 확인',
      ],
    },
    {
      title: '키워드 분석',
      items: [
        '불용어 목록 구성 및 데이터 정제',
        'KeyBERT로 핵심 키워드 추출(top_n=35)',
        'KoNLPy(Kkma) 형태소 분석 + spaCy로 키워드 연관 술어·논항 도출',
      ],
    },
    {
      title: '인사이트 도출',
      items: [
        '분위기·인테리어·빈티지 등 방문 동기 관련 특징 추출',
        '자영업자에게 VOC 기반 강·약점 및 전략 방향 제시',
      ],
    },
  ],
  outcomes: [
    '리뷰 데이터에서 방문 동기·카페 특징 인사이트 도출',
    'VOC 기반 강·약점 및 전략 방향성 제시',
  ],
  skills: [
    skillChip('Python'),
    skillChip('NLTK'),
    skillChip('KeyBERT'),
    skillChip('KoNLPy'),
    skillChip('spaCy'),
  ],
  roles: [roleChip('데이터 분석')],
  category: categoryChip('데이터 분석'),
  sections: [
    {
      title: '감성 분석 — 코드 작성',
      bullets: [
        '한글 리뷰를 Google Trans로 영문 변환한 뒤 NLTK SentimentIntensityAnalyzer로 polarity 산출',
        'For문으로 전체 리뷰를 순회하며 neg·neu·pos·compound 점수를 계산하도록 직접 코드 작성',
        'compound 값 0.1을 기준으로 긍정·부정을 판별해 리뷰별 방향성을 한눈에 확인',
      ],
      images: [
        {
          src: '/assets/projects/cafe/sentiment-code.png',
          alt: 'compound 기준 긍·부정 판별 코드',
        },
      ],
    },
    {
      title: '감성 분석 — 결과',
      bullets: [
        '리뷰 50건을 분석해 긍정 42 / 부정 8로 긍정 피드백이 주를 이루는 것을 확인',
        '"분위기가 좋다", "커피가 맛있다" 등 긍정 리뷰의 compound 값이 0.9 이상으로 높게 측정',
        '중립 문장(정보성 리뷰)은 compound 0.0으로 분류되어 부정과 구분이 필요함을 확인',
      ],
      images: [
        {
          src: '/assets/projects/cafe/sentiment-result.png',
          alt: '리뷰별 감성 점수와 긍·부정 판정 결과',
        },
      ],
    },
    {
      title: '키워드 · 연관 술어 분석',
      bullets: [
        '불용어 목록을 직접 구성해 데이터를 정제한 뒤 KeyBERT로 핵심 키워드 추출',
        'KoNLPy(Kkma)로 형태소를 분석하고, spaCy로 각 키워드에 연결된 술어·논항을 도출',
        '"분위기 — 좋다", "인테리어 — 빈티지"처럼 키워드가 어떤 맥락으로 쓰였는지까지 파악',
      ],
      images: [
        {
          src: '/assets/projects/cafe/keyword-spacy-code.png',
          alt: 'spaCy로 키워드 연관 술어·논항 추출',
        },
      ],
    },
  ],
};

const GAME_DATA: ProjectData = {
  title: '소비자 유형 분석',
  hero: '',
  summary:
    'R 기반 설문 군집분석(K-Means)으로 게임 이용 소비자를 4개 유형으로 분류한 데이터 분석 프로젝트',
  highlights: [
    'K-Means로 소비자 4개 유형 도출',
    'Scheffe · Games-Howell 검정으로 유의성 검증',
  ],
  responsibilities: [
    {
      title: '설문 설계 · 수집',
      items: [
        'Google Form으로 7개 파트 설문 설계(스크리닝·행동패턴·이용동기·개성요인·콘텐츠·인구통계)',
        '2차 자료 기반으로 행동·사이코그래픽스·라이프스타일 유형 가설 설정',
      ],
    },
    {
      title: '군집 분석',
      items: [
        '설문 전처리 → K-Means 군집분석 → 2차 자료 연결',
        '관계지향·성취추구·호기심체험·일상여가 4개 유형 도출',
      ],
    },
    {
      title: '통계 검정 · 활용',
      items: [
        'Scheffe·Games-Howell 검정으로 군집 간 차이 유의성 검증',
        '유형별 특성에 맞춘 상품·서비스 추천 방향 제시',
      ],
    },
  ],
  outcomes: [
    '설문 기반 소비자 4유형 도출 및 통계 검증',
    '유형별 맞춤 상품 추천 방향 제시',
  ],
  skills: [
    skillChip('R'),
    skillChip('K-Means'),
    skillChip('통계 검정'),
    skillChip('Google Form'),
  ],
  roles: [roleChip('데이터 분석')],
  category: categoryChip('데이터 분석'),
  sections: [
    {
      title: '설문 설계 · 응답 분석',
      bullets: [
        'Google Form으로 7개 파트(스크리닝·행동패턴·이용동기·개성요인·콘텐츠·인구통계) 설문 설계',
        '응답을 시청 시기·시청 이유 등으로 나눠 기초 분포를 확인',
      ],
      images: [
        { src: '/assets/projects/game/survey.png', alt: '시청 시기·시청 이유 등 설문 응답 분포' },
      ],
    },
    {
      title: '군집 분석 · 통계 검증 (3단계)',
      bullets: [
        '① K-means 군집분석 — elbow·silhouette로 적정 군집 수를 검토해 k=4로 설정, 4개 군집(7·10·18·12명) 도출',
        '② 등분산성 검정(Bartlett) 결과에 따라 ANOVA 수행 — 군집 간 차이의 통계적 유의성 확인',
        '③ 등분산성 충족 여부에 따라 Scheffe / Games-Howell 사후검정을 구분 적용해 어떤 군집끼리 다른지 검증',
      ],
      images: [
        {
          src: '/assets/projects/game/step1-kmeans.png',
          alt: '① K-means — k=4로 군집 도출 (7·10·18·12명)',
        },
        {
          src: '/assets/projects/game/step2-anova.png',
          alt: '② 등분산성 검정 후 ANOVA로 군집 간 차이 확인',
        },
        {
          src: '/assets/projects/game/step3-posthoc.png',
          alt: '③ Scheffe · Games-Howell 사후검정으로 차이 검증',
        },
      ],
    },
    {
      title: '4개 소비자 유형 도출',
      bullets: [
        '군집별 평균을 비교해 관계지향·성취추구·호기심체험·일상여가 4개 유형으로 해석',
        '사회관계·스트레스 해소·과시·성취·자기효능감 등 변수별 상대적 특성을 정리',
      ],
      images: [
        {
          src: '/assets/projects/game/clusters.png',
          alt: '군집별 변수 평균 비교로 4개 유형 해석',
        },
      ],
    },
    {
      title: '유형별 특성 — 교차분석',
      bullets: [
        '과금 액수·플레이 시간·플레이 빈도·성별을 유형별로 교차분석해 프로파일링',
        '유형별 특성에 맞춘 상품·서비스 추천 방향을 제시',
      ],
      images: [
        {
          src: '/assets/projects/game/crosstab.png',
          alt: '유형별 과금·플레이시간·빈도·성별 교차분석',
        },
      ],
    },
  ],
};

export function DongnaePage() {
  return <ProjectDetail data={DONGNAE_DATA} />;
}

export function CafePage() {
  return <ProjectDetail data={CAFE_DATA} />;
}

export function GamePage() {
  return <ProjectDetail data={GAME_DATA} />;
}
