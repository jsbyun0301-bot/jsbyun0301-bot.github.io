import { useEffect, useMemo, useRef, useState } from 'react';
import type { PagesWindow, PageType } from '@/stores';
import { useDesktopStore } from '@/stores';
import {
  PageScrollContainerProvider,
  PAGES_SCROLL_CONTAINER_ID,
} from '@/features/pages-window/context/PageScrollContext';
import { PageContent } from '@/features/pages-window/registry/PageContent';
import { getPageAddress } from '@/features/pages-window/registry/page-registry';

function BackIcon() {
  return (
    <svg viewBox='0 0 16 16' className='h-4 w-4 fill-none stroke-current'>
      <path d='M9.5 3.5 5 8l4.5 4.5' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg viewBox='0 0 16 16' className='h-4 w-4 fill-none stroke-current'>
      <path d='M6.5 3.5 11 8l-4.5 4.5' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox='0 0 16 16' className='h-4 w-4 fill-none stroke-current'>
      <path
        d='M12.8 7.2A4.8 4.8 0 1 1 11.4 4M12 2.8v2.6H9.4'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function PagesBody({ win }: { win: PagesWindow }) {
  const { tabs, activeTabId } = win;
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
  const setActiveTab = useDesktopStore((s) => s.setActiveTab);
  const historySkipRef = useRef(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const [historyState, setHistoryState] = useState<{
    entries: PageType[];
    index: number;
  }>(() =>
    activeTab?.id
      ? {
          entries: [activeTab.id],
          index: 0,
        }
      : { entries: [], index: -1 }
  );

  useEffect(() => {
    if (!activeTab?.id) return;

    setHistoryState((current) => {
      if (historySkipRef.current) {
        historySkipRef.current = false;
        return current;
      }

      if (current.entries[current.index] === activeTab.id) {
        return current;
      }

      const nextEntries = [
        ...current.entries.slice(0, current.index + 1),
        activeTab.id,
      ];

      return {
        entries: nextEntries,
        index: nextEntries.length - 1,
      };
    });
  }, [activeTab?.id]);

  const address = activeTab ? getPageAddress(activeTab.id) : '';
  const isEmbeddedPage =
    activeTab?.id === 'chrome' ||
    activeTab?.id === 'blog' ||
    activeTab?.id === 'insta';

  const canGoBack = historyState.index > 0;
  const canGoForward =
    historyState.index >= 0 && historyState.index < historyState.entries.length - 1;

  const navigateHistory = (nextIndex: number) => {
    if (
      nextIndex < 0 ||
      nextIndex >= historyState.entries.length ||
      nextIndex === historyState.index
    ) {
      return;
    }

    historySkipRef.current = true;
    setHistoryState((current) => ({
      ...current,
      index: nextIndex,
    }));
    setActiveTab(historyState.entries[nextIndex]);
  };

  const scrollClassName = useMemo(
    () =>
      isEmbeddedPage
        ? 'flex-1 min-h-0 overflow-hidden p-0'
        : 'app-scroll flex-1 min-h-0 overflow-y-auto overscroll-y-contain p-0',
    [isEmbeddedPage]
  );

  if (!activeTab) {
    return <div className='p-6 text-sm text-black/60'>No tab selected.</div>;
  }

  return (
    <div className='flex h-full w-full min-h-0 flex-col bg-[#f7f9fc]'>
      <div className='border-b border-black/30 bg-[linear-gradient(180deg,#34363a_0%,#2d2f33_100%)] px-3 pb-3 pt-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigateHistory(historyState.index - 1)}
            disabled={!canGoBack}
            className='grid size-8 place-items-center rounded-full text-white/65 transition-colors enabled:hover:bg-white/8 enabled:hover:text-white disabled:opacity-25'
            title='Back'
          >
            <BackIcon />
          </button>
          <button
            onClick={() => navigateHistory(historyState.index + 1)}
            disabled={!canGoForward}
            className='grid size-8 place-items-center rounded-full text-white/65 transition-colors enabled:hover:bg-white/8 enabled:hover:text-white disabled:opacity-25'
            title='Forward'
          >
            <ForwardIcon />
          </button>
          <button
            onClick={() => setRefreshToken((token) => token + 1)}
            className='grid size-8 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/8 hover:text-white'
            title='Refresh'
          >
            <RefreshIcon />
          </button>

          <div className='flex min-w-0 flex-1 items-center rounded-full border border-white/8 bg-black/20 px-4 py-2 text-[12px] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'>
            <img
              src={activeTab.icon}
              alt=''
              className='mr-3 h-4 w-4 shrink-0 rounded-sm object-contain'
            />
            <span className='truncate'>{address}</span>
          </div>
        </div>
      </div>

      <div
        id={PAGES_SCROLL_CONTAINER_ID}
        className={[
          scrollClassName,
          '[&_img]:max-w-full [&_img]:h-auto [&_img]:object-contain [&_iframe]:w-full [&_iframe]:h-full',
        ].join(' ')}
      >
        <PageScrollContainerProvider>
          <PageContent pageId={activeTab.id} refreshToken={refreshToken} />
        </PageScrollContainerProvider>
      </div>
    </div>
  );
}
