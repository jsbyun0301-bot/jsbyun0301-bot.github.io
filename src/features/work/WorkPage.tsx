import { ProjectDetail } from '@/features/projects/common';
import type { ProjectData } from '@/features/projects/common/types';
import {
  categoryChip,
  roleChip,
  skillChip,
  toolChip,
} from '@/features/projects/common/constants';

// 실무 경험 (ESTsoft — AI 번역·더빙 품질 검증 & 평가 자동화)
// "내가 한 일·역량" 중심. 내부 시스템 명칭/수치는 일반화, 공개 툴(Gemini·Python 등)은 유지.
const EST_WORK: ProjectData = {
  title: 'AI 번역·더빙 품질 검증 & 평가 자동화',
  hero: '',
  summary:
    'ESTsoft AI 더빙 서비스에서 번역 품질 이슈를 파악·분류하고, 프롬프트 개선을 적용한 뒤, 축적한 데이터를 기반으로 LLM 자동 평가 파이프라인까지 직접 구축한 실무 경험입니다.',
  highlights: [
    '플랫폼의 주요 번역 이슈를 유형화하고 프롬프트 개선으로 대응',
    '축적한 이슈·개선 데이터로 LLM 자동 평가 파이프라인을 직접 구축 (Python)',
    '수천 건 규모의 번역을 자동 평가·분석해 품질 이슈를 한눈에 파악',
  ],
  responsibilities: [
    {
      title: '① 번역 이슈 파악 · 분류',
      items: [
        '더빙 번역 품질을 검토하며 플랫폼의 주요 번역 이슈를 파악',
        '반복되는 오류를 유형(카테고리)으로 분류해 문제 지형을 구조화',
        '의미 정확성·자연스러움·문맥·용어·현지화 등 다차원 기준으로 평가',
      ],
    },
    {
      title: '② 개선 적용 (프롬프트 개선)',
      items: [
        '이슈별 발생 원인에 접근해 개선 방향을 도출',
        '프롬프트·용어 처리를 수정하고 개선 전후 품질을 검증',
        '지역 스타일(미국/영국 영어) 분리 등 구체적 개선을 적용',
      ],
    },
    {
      title: '③ 자동 평가 엔진 구축',
      items: [
        '축적된 이슈·개선 데이터를 기반으로 LLM 자동 평가 파이프라인을 직접 개발',
        '번역을 자동 채점·오류 분류하고 이슈를 한눈에 분석하도록 리포트화',
        '수작업 평가를 확장 가능·일관된 체계로 전환',
      ],
    },
    {
      title: '음성(TTS) 품질 평가',
      items: [
        'ElevenLabs·BytePlus 등 TTS 솔루션을 발음·억양·감정 표현·발화 안정성 기준으로 비교',
        '한국어·영어·중국어·일본어 등 언어별 발화 이슈 진단',
      ],
    },
    {
      title: '타부서 협력 — AI 휴먼 다국어 검토',
      items: [
        '인터랙티브 팀의 AI 휴먼(사람과 소통·대행하는 AI) 다국어화를 위해 언어 검토를 여러 차례 지원',
        '영어·중국어를 중심으로 발화·표현의 자연스러움과 정확성을 검토',
        '다국적 사용자 대상 커뮤니케이션 품질을 검증',
      ],
    },
  ],
  outcomes: [
    '번역 이슈를 유형화하고 개선을 적용해 품질 향상에 기여',
    '수작업 QC를 자동화된 확장 가능 평가 체계로 전환',
    '배포 의사결정을 데이터 근거로 지원',
  ],
  skills: [
    skillChip('LLM 평가'),
    skillChip('Prompt Engineering'),
    skillChip('데이터 파이프라인'),
    skillChip('통계 분석'),
    skillChip('데이터 시각화'),
    skillChip('AI 품질평가'),
  ],
  tools: [
    toolChip('Python'),
    toolChip('Gemini'),
    toolChip('Plotly'),
    toolChip('ElevenLabs'),
    toolChip('Notion'),
  ],
  period: '2025.08 ~ 2026.07',
  membersLabel: '소속',
  members: 'ESTsoft · AI 품질 검증 인턴',
  roles: [
    roleChip('AI 품질 검증(QC)'),
    roleChip('프롬프트 개선'),
    roleChip('평가 자동화 개발'),
    roleChip('다국어 언어 검토'),
  ],
  category: categoryChip('실무 · 인턴'),
  sectionsTitle: '번역 평가 자동화 파이프라인',
  sectionsIntro:
    '이슈 파악·개선 과정에서 쌓은 데이터를 원클릭 자동 평가 체계로 전환했습니다.\n번역 데이터 → LLM 자동 평가 → 시각화 리포트까지 잇는 Python 파이프라인을 직접 구축했고, 아래 4개 구성요소로 이뤄집니다.',
  sections: [
    {
      title: '데이터 추출과 어댑터 변환',
      bullets: [
        'DB에서 추출한 원천 데이터를 평가 엔진 입력 규격으로 자동 전처리·정규화',
        '여러 언어쌍의 양방향 데이터를 하나의 입력 형식으로 통합해 병렬 처리',
      ],
    },
    {
      title: 'LLM 평가 엔진',
      bullets: [
        'Gemini 기반으로 5대 기준(의미 정확성·언어적 자연성·문맥 일관성·용어 일관성·현지화 적절성)에 따라 자동 채점',
        '점수와 함께 부여 이유, 오류 유형, 이상 번역 구간을 생성',
        '1차 필터링 후 2차 심각도를 평가하는 2단계 구조로 설계',
        '모델 신뢰도가 낮거나 분류가 모호한 건은 사람 검수로 분리해 AI와 사람의 역할을 분담',
      ],
    },
    {
      title: '정규화 적재와 운영 자동화',
      bullets: [
        '평가 결과를 표준 스키마로 변환해 적재',
        '중단 지점부터 재개되는 체크포인트와 중복 평가 방지로 비용을 절감',
        '실행 전 비용·시간을 프리플라이트로 추정하고, 일·주 평가를 누적해 월간 통합 리포트를 생성',
      ],
    },
    {
      title: '분석 프레임워크와 시각화 리포트',
      bullets: [
        '4축(일상 비중·반복성·누적 비중·심각도)으로 오류 유형별 위험도를 자동 판정',
        '새 언어쌍이 들어오면 데이터 분포를 분석해 등급 기준값을 자동 산출 (별도 튜닝 불필요)',
        '배포 전후 품질을 통계적으로 비교하고 분포 변화를 감지',
        'Plotly 기반 동적 차트와 날짜 필터를 담은 단일 HTML 리포트로 출력',
      ],
    },
  ],
};

export default function WorkPage() {
  return <ProjectDetail data={EST_WORK} />;
}
