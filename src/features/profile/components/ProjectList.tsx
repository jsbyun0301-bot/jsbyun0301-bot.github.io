import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

const GROUP_ORDER = ['ESTsoft 실무', '학회 산학협력', '공모전', '전공 프로젝트'];

export function ProjectList({ projects }: { projects: Project[] }) {
  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: projects.filter((p) => p.group === g),
  })).filter((g) => g.items.length > 0);

  const ungrouped = projects.filter((p) => !p.group);

  return (
    <div className='flex flex-col gap-8'>
      {grouped.map(({ group, items }) => (
        <div key={group}>
          <div className='mb-3 flex items-center gap-2'>
            <span className='text-[15px] font-bold text-[#1c1c1c]'>{group}</span>
            <span className='text-[13px] text-[#888]'>{items.length}</span>
            <span className='flex-1 border-t border-[#e2e2e2]' />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {items.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </div>
      ))}
      {ungrouped.length > 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {ungrouped.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
