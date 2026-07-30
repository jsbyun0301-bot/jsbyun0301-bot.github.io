import { Element } from 'react-scroll';
import { Section } from '@/features/profile/components/Section';
import { CONTACT } from '@/features/profile/data/contact';

export function ContactSection() {
  return (
    <Element name='contact'>
      <Section title='📪 Contact'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {CONTACT.items.map((item) => (
            <div
              key={item.label}
              className='border border-[#e2e2e2] rounded-[14px] p-4 bg-[#fafafa] shadow-sm'
            >
              <div className='text-[12px] text-[#666] mb-2'>
                {item.emoji ? `${item.emoji} ` : ''}
                {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  className='text-[16px] font-semibold text-[#0b61d8]'
                >
                  {item.value}
                </a>
              ) : (
                <div className='text-[16px] font-semibold text-[#0b61d8]'>
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </Element>
  );
}
