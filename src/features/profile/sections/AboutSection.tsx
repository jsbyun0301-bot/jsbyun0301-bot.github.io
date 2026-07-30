import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { ABOUT } from '@/features/profile/data/about';

export function AboutSection() {
  return (
    <Element name='about'>
      <Section>
        <div className='my-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6'>
          <img
            src={ABOUT.avatarSrc}
            alt='profile'
            loading='eager'
            decoding='async'
            className='h-[133px] w-[100px] shrink-0 rounded-[34px] object-cover object-top shadow sm:h-[180px] sm:w-[135px] md:h-[213px] md:w-[160px]'
          />
          <div className='flex min-w-0 flex-col gap-2'>
            <h1 className='text-[22px] font-bold'>{ABOUT.name}</h1>
            <span className='text-[15px] text-[#777]'>{ABOUT.role}</span>
            {ABOUT.birth ? (
              <span className='text-[15px] text-[#777]'>{ABOUT.birth}</span>
            ) : null}
            {ABOUT.paragraphs.map((t, i) => (
              <p key={i} className='text-[15px] leading-relaxed text-[#444]'>
                {t}
              </p>
            ))}
          </div>
        </div>
      </Section>
    </Element>
  );
}
