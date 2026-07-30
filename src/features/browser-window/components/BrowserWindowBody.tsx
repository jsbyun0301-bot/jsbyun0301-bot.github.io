import { resolveBrowserTarget } from '@/features/browser-window/browserPolicy';
import type { BrowserAppId } from '@/stores';

function ExternalFallback({
  title,
  address,
  reason,
}: {
  title: string;
  address: string;
  reason: string;
}) {
  return (
    <div className='grid h-full place-items-center bg-[linear-gradient(180deg,#f8fafc_0%,#e9eef5_100%)] p-8'>
      <div className='w-full max-w-[760px] rounded-[28px] border border-white/70 bg-white/92 p-8 text-[#0f172a] shadow-[0_24px_60px_rgba(15,23,42,0.12)]'>
        <div className='text-[28px] font-semibold tracking-[-0.03em]'>{title}</div>
        <p className='mt-4 text-sm leading-7 text-[#475569]'>{reason}</p>
        <div className='mt-6 rounded-[20px] border border-[#dbe4f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#334155]'>
          {address}
        </div>
        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            onClick={() => window.open(address, '_blank', 'noopener,noreferrer')}
            className='rounded-[18px] bg-[#0b61d8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#084eaf]'
          >
            새 탭으로 열기
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrowserWindowBody({
  browserAppId,
  url,
  refreshToken = 0,
  onIframeFocus,
}: {
  browserAppId: BrowserAppId;
  url: string;
  refreshToken?: number;
  onIframeFocus?: () => void;
}) {
  const target = resolveBrowserTarget(url);

  if (target.mode === 'external') {
    return (
      <ExternalFallback
        title={target.title}
        address={target.address}
        reason={target.reason}
      />
    );
  }

  return (
    <iframe
      key={`${browserAppId}-${target.url}-${refreshToken}`}
      src={target.url}
      title={target.title}
      className='h-full w-full border-0 bg-white'
      loading='lazy'
      referrerPolicy='strict-origin-when-cross-origin'
      onFocus={onIframeFocus}
    />
  );
}
