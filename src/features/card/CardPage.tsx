import { ABOUT } from '@/features/profile/data/about';
import { CONTACT } from '@/features/profile/data/contact';

const GITHUB_URL = 'https://github.com/jsbyun0301-bot';

const KEYWORDS = ['AI 프로덕트 QC', '데이터 분석', '전략 기획'];

type CardLink = { label: string; href?: string; disabled?: boolean };

export default function CardPage() {
  const email = CONTACT.items.find((item) => item.label === 'Email');

  const links: CardLink[] = [
    { label: 'GitHub', href: GITHUB_URL },
    { label: 'LinkedIn', disabled: true },
    { label: 'Email', href: email?.href ?? 'mailto:jsbyun0301@gmail.com' },
  ];

  return (
    <div className='grid min-h-full w-full place-items-center bg-[linear-gradient(155deg,#eef2ff_0%,#faf5ff_45%,#fdf2f8_100%)] px-5 py-8'>
      <div className='w-full max-w-[400px] rounded-[30px] border border-white/70 bg-white/95 px-8 py-9 text-center shadow-[0_30px_80px_rgba(15,23,42,0.16)] backdrop-blur'>
        <div className='mx-auto h-28 w-28 overflow-hidden rounded-full shadow-[0_10px_28px_rgba(15,23,42,0.18)] ring-4 ring-white'>
          <img
            src={ABOUT.avatarSrc}
            alt={`${ABOUT.name} 프로필`}
            className='h-full w-full object-cover'
            loading='eager'
          />
        </div>

        <h1 className='mt-5 flex flex-wrap items-baseline justify-center gap-2 text-[26px] font-bold text-[#0f172a]'>
          {ABOUT.name}
          <span className='text-[15px] font-medium text-[#94a3b8]'>
            Jiseob Byun
          </span>
        </h1>

        <div className='mt-1 text-[15px] font-semibold text-[#4f46e5]'>
          {ABOUT.role}
        </div>

        <p className='mx-auto mt-4 max-w-[330px] text-[15px] leading-relaxed text-[#475569]'>
          데이터로 AI 프로덕트 품질을 검증·개선하고,
          <br />
          인사이트를 전략·기획으로 잇는 기획자
        </p>

        <div className='mt-5 flex flex-wrap justify-center gap-2'>
          {KEYWORDS.map((keyword) => (
            <span
              key={keyword}
              className='rounded-full bg-[#eef2ff] px-3 py-1 text-[12px] font-semibold text-[#3730a3]'
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className='my-6 h-px w-full bg-[#e5e7eb]' />

        <div className='flex flex-wrap justify-center gap-2'>
          {links.map((link) =>
            link.disabled ? (
              <span
                key={link.label}
                title='준비 중'
                className='inline-flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-4 py-2 text-[13px] font-semibold text-[#94a3b8]'
              >
                {link.label}
                <span className='text-[11px] font-medium'>· 준비중</span>
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                // mailto는 새 탭을 열면 빈 탭이 남으므로 현재 창에서 처리한다.
                {...(link.href?.startsWith('mailto:')
                  ? { title: link.href.replace('mailto:', '') }
                  : { target: '_blank', rel: 'noreferrer' })}
                className='rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-[13px] font-semibold text-[#334155] transition-colors hover:bg-[#f8fafc]'
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
