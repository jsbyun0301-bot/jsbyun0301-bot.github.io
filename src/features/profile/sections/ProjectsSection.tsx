import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { ProjectList } from '@/features/profile/components/ProjectList';
import { PROJECTS } from '@/features/profile/data/projects';

export function ProjectsSection() {
  return (
    <Element name='projects'>
      <Section title='🚀 Projects'>
        <ProjectList projects={PROJECTS} />
      </Section>
    </Element>
  );
}
