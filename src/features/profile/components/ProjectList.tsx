import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {projects.map((p) => (
        <ProjectCard key={p.title} p={p} />
      ))}
    </div>
  );
}
