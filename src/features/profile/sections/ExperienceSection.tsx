import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { EXPERIENCE } from '@/features/profile/data/experience';

export function ExperienceSection() {
  return (
    <Element name='experience'>
      <Section title='📚 Experience'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {EXPERIENCE.map((sec) => (
            <div
              key={sec.title}
              className='border border-[#e2e2e2] rounded-[14px] p-5 bg-[#fafafa] shadow-sm'
            >
              <div className='text-[16px] font-bold mb-2'>{sec.title}</div>
              <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5'>
                {sec.lines.map((l, i) => (
                  <li key={i} className='mb-2'>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </Element>
  );
}
