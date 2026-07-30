import type { DesktopTextFile, TextFileId } from '@/stores/desktopModels';

export const SYSTEM_TEXT_FILES: Record<TextFileId, DesktopTextFile> = {
  readme: {
    id: 'readme',
    title: 'README.txt',
    description: '포트폴리오 안내',
    isReadOnly: true,
    content: `변지섭 · 데스크톱 포트폴리오

- macOS 데스크톱에서 영감을 받은 포트폴리오입니다.
- 창, Dock, 상단 메뉴바, Spotlight 검색으로 정보를 탐색합니다.
- 기획자이지만 필요한 도구는 직접 만든다는 점을 이 사이트로 보여줍니다.

빠른 시작

1. 바탕화면 아이콘이나 Dock을 눌러 창 열기
2. 상단 메뉴바의 🔍 Spotlight로 빠르게 검색
3. 제어 센터(우측 상단)에서 배경화면 변경
4. Terminal에서 'open work' 같은 명령으로 빠르게 이동
5. Work(실무)·Projects·About에서 상세 이력 확인
`,
  },
  'about-file': {
    id: 'about-file',
    title: 'ABOUT.txt',
    description: '짧은 소개',
    isReadOnly: true,
    content: `변지섭 (Jiseob Byun)
Data-Driven Planner

- 데이터 분석으로 인사이트를 도출해 전략·기획으로 연결
- ESTsoft · AI 더빙·번역 품질(QC) 검증 (2025.08~2026.07)
- Python·Excel·AI(LLM) 등 실무에 필요한 도구는 직접 익혀 활용

자세한 내용은 About·Work·Projects 페이지에서 확인할 수 있습니다.
`,
  },
  contact: {
    id: 'contact',
    title: 'CONTACT.txt',
    description: '연락처',
    isReadOnly: true,
    content: `CONTACT

Email: jsbyun0301@gmail.com
Phone: 010-7671-6557
GitHub: https://github.com/jsbyun0301-bot
LinkedIn: (준비 중)
`,
  },
  now: {
    id: 'now',
    title: 'NOW.txt',
    description: '요즘 집중하는 일',
    isReadOnly: true,
    content: `NOW

- ESTsoft에서 AI 더빙·번역 품질(QC) 검증 인턴을 마치고 다음 커리어를 탐색 중
- 데이터 기반 기획·그로스·AI 프로덕트 방향에 관심
- 학회·공모전·데이터 프로젝트 경험을 케이스 스터디로 정리
- 이 포트폴리오처럼, 필요한 것을 직접 만드는 연습
`,
  },
};

export const SYSTEM_TEXT_FILE_LIST = Object.values(SYSTEM_TEXT_FILES);

export function getTextFileById(fileId: TextFileId) {
  return SYSTEM_TEXT_FILES[fileId];
}
