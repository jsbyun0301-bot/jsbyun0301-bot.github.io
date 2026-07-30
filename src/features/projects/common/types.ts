export type Chip = Readonly<{ label: string; color?: string }>;

export type ProjectImageItem = {
  src: string;
  alt?: string;
  /** showcase 레이아웃에서 이미지 옆에 표시할 상세 설명 */
  description?: string;
  /** showcase 레이아웃에서 이미지 옆에 표시할 불릿 설명 */
  points?: string[];
};

export type ProjectSection = {
  title: string;
  bullets?: string[];
  images?: (string | ProjectImageItem)[];
  /** showcase: 이미지(왼쪽) + 설명(오른쪽)을 한 행씩 나열 */
  layout?: 'showcase';
};

export type ProjectData = {
  title: string;
  hero: string;
  featuredAssets?: readonly string[];
  summary?: string;
  highlights?: string[];
  responsibilities?: { title: string; items: string[] }[];
  outcomes?: string[];
  skills?: readonly Chip[];
  tools?: readonly Chip[];
  period?: string;
  membersLabel?: string;
  members?: string;
  roles?: readonly Chip[];
  contribution?: string;
  result?: string | string[];
  category?: Chip;
  githubUrl?: string;
  // 이미지 없는 섹션(카드 그리드) 위에 표시할 상위 묶음 제목/설명
  sectionsTitle?: string;
  sectionsIntro?: string;
  sections?: ProjectSection[];
};
