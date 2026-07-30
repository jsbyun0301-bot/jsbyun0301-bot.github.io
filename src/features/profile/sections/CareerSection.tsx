import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { CAREER } from '@/features/profile/data/career';

export function CareerSection() {
  return (
    <Element name='career'>
      <Section title='🎞️ Career'>
        {CAREER.map((c) => (
          <div
            key={c.org}
            className='mb-6 border border-[#e2e2e2] rounded-[14px] p-5 bg-[#fafafa] shadow-sm'
          >
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <div className='text-[18px] font-bold'>{c.org}</div>
              <span className='text-[12px] font-semibold text-[#1f2937] bg-[#e6eefc] px-2 py-1 rounded-full'>
                {c.role}
              </span>
            </div>

            <div className='flex flex-wrap gap-2 text-[12px] text-[#555] mb-3'>
              <span className='bg-white border border-[#e5e7eb] px-2 py-1 rounded'>
                기간: {c.period}
              </span>
              {c.stacks?.map((s) => (
                <span
                  key={s}
                  className='bg-white border border-[#e5e7eb] px-2 py-1 rounded'
                >
                  {s}
                </span>
              ))}
            </div>

            {c.highlights && c.highlights.length > 0 && (
              <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5 mb-4'>
                {c.highlights.map((h, i) => (
                  <li key={i} className='mb-2'>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {c.projects && c.projects.length > 0 && (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {c.projects.map((p) => (
                  <div
                    key={p.title}
                    className='bg-white border border-[#ececec] rounded-[12px] p-4'
                  >
                    <div className='text-[15px] font-bold mb-1'>
                      {p.title}
                    </div>
                    <div className='text-[13px] text-[#555] mb-2'>
                      {p.summary}
                    </div>

                    <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5 mb-3'>
                      {p.contributions.map((line, i) => (
                        <li key={i} className='mb-1'>
                          {line}
                        </li>
                      ))}
                    </ul>

                    {p.outcomes && p.outcomes.length > 0 && (
                      <div className='mb-3'>
                        {p.outcomes.map((o, i) => (
                          <div
                            key={i}
                            className='text-[13px] font-semibold text-[#111827] mb-1'
                          >
                            {o}
                          </div>
                        ))}
                      </div>
                    )}

                    {p.stacks && p.stacks.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {p.stacks.map((s) => (
                          <span
                            key={s}
                            className='bg-[#f3f4f6] text-[#333] text-xs px-2 py-1 rounded'
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>
    </Element>
  );
}
