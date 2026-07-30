import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { ACTIVITIES } from '@/features/profile/data/activities';

export function ActivitiesSection() {
  return (
    <Element name='activities'>
      <Section title='🤝 Activities'>
        {ACTIVITIES.map((a) => (
          <div
            key={a.org}
            className='mb-4 border border-[#e2e2e2] rounded-[14px] p-5 bg-[#fafafa] shadow-sm'
          >
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <div className='text-[18px] font-bold'>{a.org}</div>
              <span className='text-[12px] font-semibold text-[#1f2937] bg-[#e6eefc] px-2 py-1 rounded-full'>
                {a.role}
              </span>
            </div>

            <div className='flex flex-wrap gap-2 text-[12px] text-[#555] mb-3'>
              <span className='bg-white border border-[#e5e7eb] px-2 py-1 rounded'>
                기간: {a.period}
              </span>
            </div>

            {a.highlights && a.highlights.length > 0 && (
              <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5'>
                {a.highlights.map((h, i) => (
                  <li key={i} className='mb-2'>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>
    </Element>
  );
}
