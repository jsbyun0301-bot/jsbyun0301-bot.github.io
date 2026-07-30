import { CONTACT } from '@/features/profile/data/contact';

export default function LinkedInComingSoon() {
  const email = CONTACT.items.find((item) => item.label === 'Email');
  const mailto = email?.href ?? 'mailto:jsbyun0301@gmail.com';

  return (
    <div className='grid min-h-full w-full place-items-center bg-[linear-gradient(160deg,#eef3fb_0%,#f7f9fc_100%)] p-8 text-center'>
      <div className='w-full max-w-[420px] rounded-[26px] border border-[#e2e8f0] bg-white px-8 py-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'>
        <div className='mx-auto grid h-14 w-14 place-items-center rounded-[14px] bg-[#0a66c2] text-[26px] font-bold text-white'>
          in
        </div>
        <h1 className='mt-5 text-[22px] font-bold text-[#0f172a]'>
          LinkedIn 준비 중
        </h1>
        <p className='mt-3 text-sm leading-relaxed text-[#475569]'>
          프로필을 정리하고 있어요. 곧 공개할 예정입니다.
          <br />
          그동안 연락은 이메일로 편하게 주세요.
        </p>
        <a
          href={mailto}
          className='mt-6 inline-flex rounded-full bg-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#08529c]'
        >
          이메일로 연락하기
        </a>
      </div>
    </div>
  );
}
