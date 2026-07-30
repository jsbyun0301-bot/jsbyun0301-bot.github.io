import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { BadgeRow } from '@/features/profile/components/BadgeRow';
import {
  DATA_ANALYSIS_BADGES,
  DATA_VIZ_BADGES,
  AI_LLM_BADGES,
  PLANNING_BADGES,
  COLLAB_BADGES,
  FAMILIAR_BADGES,
} from '@/features/profile/data/skills';

export function SkillsSection() {
  return (
    <Element name='skills'>
      <Section title='🛠 Skills'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <BadgeRow title='📊 Data Analysis' items={DATA_ANALYSIS_BADGES} />
          <BadgeRow title='📈 Data Viz & BI' items={DATA_VIZ_BADGES} />
          <BadgeRow title='🤖 AI / LLM' items={AI_LLM_BADGES} />
          <BadgeRow title='🎨 Planning & Research' items={PLANNING_BADGES} />
          <BadgeRow title='🧰 Collaboration & Tools' items={COLLAB_BADGES} />
          <BadgeRow title='🌱 입문 · 학습 (Familiar)' items={FAMILIAR_BADGES} />
        </div>
      </Section>
    </Element>
  );
}
