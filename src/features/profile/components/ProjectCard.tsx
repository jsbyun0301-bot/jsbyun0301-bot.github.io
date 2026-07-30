import type { Project } from '../types';

export function ProjectCard({ p }: { p: Project }) {
  const Title = (
    <h3 className='text-[20px] font-extrabold text-[#0b61d8]'>{p.title}</h3>
  );

  return (
    <div className='w-full max-w-full border border-[#e2e2e2] rounded-[14px] p-5 bg-[#fafafa] overflow-hidden break-words shadow-sm'>
      <div className='mb-3'>
        <div className='flex flex-wrap items-center gap-2'>
          {p.link ? (
            <a href={p.link} target='_blank' rel='noopener noreferrer'>
              {Title}
            </a>
          ) : (
            Title
          )}
          <span className='text-[12px] font-semibold text-[#1f2937] bg-[#e6eefc] px-2 py-1 rounded-full'>
            {p.role}
          </span>
        </div>
        {p.subtitle && (
          <div className='mt-1 text-sm text-[#555]'>{p.subtitle}</div>
        )}
      </div>

      <div className='flex flex-wrap gap-3 text-[12px] text-[#555] mb-3'>
        {p.period && (
          <span className='bg-white border border-[#e5e7eb] px-2 py-1 rounded'>
            기간: {p.period}
          </span>
        )}
        {p.teamSize && (
          <span className='bg-white border border-[#e5e7eb] px-2 py-1 rounded'>
            팀: {p.teamSize}
          </span>
        )}
      </div>

      {p.highlights && p.highlights.length > 0 && (
        <div className='mb-3'>
          {p.highlights.map((h, i) => (
            <div
              key={i}
              className='text-sm font-semibold text-[#111827] mb-1'
            >
              {h}
            </div>
          ))}
        </div>
      )}

      <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5'>
        {p.points.map((line, i) => (
          <li key={i} className='mb-2'>
            {line}
          </li>
        ))}
      </ul>

      <div className='flex flex-wrap gap-2 mt-4'>
        {p.stacks.map((s) => (
          <span
            key={s}
            className='bg-[#eee] text-[#333] text-xs px-2 py-1 rounded'
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
