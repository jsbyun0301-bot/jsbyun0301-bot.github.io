import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { prizeList } from '@/features/prize/data/prizeData';

export function AwardsSection() {
  return (
    <Element name='awards'>
      <Section title='🏆 Awards & Certifications'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {prizeList.map((p) => (
            <div
              key={p.title}
              className='border border-[#e2e2e2] rounded-[14px] p-4 bg-[#fafafa] shadow-sm'
            >
              <div className='flex items-start justify-between gap-2'>
                <div className='text-[16px] font-bold leading-snug'>
                  {p.title}
                </div>
                <span className='shrink-0 text-[12px] font-medium text-[#888]'>
                  {p.date}
                </span>
              </div>
              <div className='mt-1 text-[13px] font-semibold text-[#1f2937]'>
                {p.organization}
              </div>
              {p.description && (
                <div className='mt-2 text-[15px] text-[#444] leading-relaxed'>
                  {p.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </Element>
  );
}
