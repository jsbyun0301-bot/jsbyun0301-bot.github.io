import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import { resolveBrowserTarget } from '@/features/browser-window/browserPolicy';
import { BROWSER_APPS } from '@/features/desktop/config/shell';
import { GitHubProfilePanel } from '@/features/github/components/GitHubProfilePanel';
import { SettingsPage } from '@/features/settings/components/SettingsPage';
import type { PageType } from '@/stores/useDesktopStore';

type LazyComponent = LazyExoticComponent<ComponentType>;

const PAGE_CONTENT_MAP: Partial<Record<PageType, LazyComponent>> = {
  about: lazy(() => import('@/pages/ProfilePage')),
  awards: lazy(() => import('@/pages/PrizePage')),
  work: lazy(() => import('@/features/work/WorkPage')),
  card: lazy(() => import('@/features/card/CardPage')),
  insta: lazy(() => import('@/features/coming-soon/LinkedInComingSoon')),
  inobus: lazy(() => import('@/features/projects/inobus/Page')),
  hirax: lazy(() => import('@/features/projects/hirax/Page')),
  grace: lazy(() => import('@/features/projects/grace/Page')),
  dongnae: lazy(() =>
    import('@/features/projects/extra').then((m) => ({ default: m.DongnaePage }))
  ),
  cafe: lazy(() =>
    import('@/features/projects/extra').then((m) => ({ default: m.CafePage }))
  ),
  game: lazy(() =>
    import('@/features/projects/extra').then((m) => ({ default: m.GamePage }))
  ),
};

function EmbeddedPage({
  url,
  title,
  refreshToken,
}: {
  url: string;
  title: string;
  refreshToken: number;
}) {
  const target = resolveBrowserTarget(url);

  if (target.mode === 'iframe') {
    return (
      <iframe
        key={`${title}-${refreshToken}`}
        src={target.url}
        title={title}
        className='h-full w-full border-0 bg-white'
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
      />
    );
  }

  return (
    <div className='grid h-full place-items-center bg-[linear-gradient(180deg,#f8fafc_0%,#e9eef5_100%)] p-8'>
      <div className='w-full max-w-[760px] rounded-[28px] border border-white/70 bg-white/92 p-8 text-[#0f172a] shadow-[0_24px_60px_rgba(15,23,42,0.12)]'>
        <div className='text-[28px] font-semibold tracking-[-0.03em]'>
          {title}
        </div>
        <p className='mt-4 text-sm leading-7 text-[#475569]'>
          {target.reason}
        </p>
        <div className='mt-6 rounded-[20px] border border-[#dbe4f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#334155]'>
          {target.address}
        </div>
        <button
          onClick={() => window.open(target.url, '_blank', 'noopener,noreferrer')}
          className='mt-6 rounded-[18px] bg-[#0b61d8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#084eaf]'
        >
          새 탭으로 열기
        </button>
      </div>
    </div>
  );
}

export function PageContent({
  pageId,
  refreshToken = 0,
}: {
  pageId: PageType;
  refreshToken?: number;
}) {
  const Component = PAGE_CONTENT_MAP[pageId];

  if (Component) {
    return (
      <Suspense
        fallback={<div className='p-4 text-sm text-black/60'>Loading...</div>}
      >
        <Component key={`${pageId}-${refreshToken}`} />
      </Suspense>
    );
  }

  if (pageId === 'github') {
    return <GitHubProfilePanel key={`github-${refreshToken}`} />;
  }

  if (pageId === 'settings') {
    return <SettingsPage key={`settings-${refreshToken}`} />;
  }

  if (pageId === 'chrome') {
    return (
      <EmbeddedPage
        url={BROWSER_APPS['browser-home'].initialUrl}
        title='Chrome'
        refreshToken={refreshToken}
      />
    );
  }

  if (pageId === 'blog') {
    return (
      <EmbeddedPage
        url={BROWSER_APPS.blog.initialUrl}
        title={BROWSER_APPS.blog.title}
        refreshToken={refreshToken}
      />
    );
  }

  return (
    <EmbeddedPage
      url={BROWSER_APPS.insta.initialUrl}
      title={BROWSER_APPS.insta.title}
      refreshToken={refreshToken}
    />
  );
}
