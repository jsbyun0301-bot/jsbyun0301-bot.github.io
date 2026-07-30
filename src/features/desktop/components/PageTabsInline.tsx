import type { PagesWindow, PageType } from '@/stores';

export function PageTabsInline({
  win,
  onSetActiveTab,
  onCloseTab,
}: {
  win: PagesWindow;
  onSetActiveTab: (id: PageType) => void;
  onCloseTab: (id: PageType) => void;
}) {
  return (
    <div
      className='flex h-full min-w-0 items-end overflow-hidden pl-2 pr-1 pb-0 pt-[6px]'
      data-nodrag
    >
      <div className='tab-strip-scroll flex min-w-0 flex-1 items-end gap-0 overflow-x-auto overflow-y-hidden px-[8px]'>
        {win.tabs.map((t, index) => {
          const isActive = t.id === win.activeTabId;
          const prevTab = win.tabs[index - 1];
          const nextTab = win.tabs[index + 1];
          const showSeparator =
            !isActive &&
            prevTab?.id !== win.activeTabId &&
            nextTab?.id !== win.activeTabId &&
            index < win.tabs.length - 1;
          return (
            <div
              key={t.id}
              className={[
                'group relative mt-auto flex h-[30px] w-[148px] shrink-0 items-center overflow-visible px-[11px] text-[11px] select-none transition-colors',
                isActive
                  ? 'z-20 rounded-t-[10px] bg-[#4a4c4f] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                  : 'rounded-t-[10px] bg-transparent text-white/68 hover:bg-white/[0.05] hover:text-white/84',
              ].join(' ')}
              title={t.title}
            >
              {isActive ? (
                <>
                  <span
                    aria-hidden='true'
                    className='pointer-events-none absolute -left-[5px] bottom-0 h-[6px] w-[6px] bg-[#4a4c4f]'
                    style={{
                      WebkitMaskImage:
                        'radial-gradient(circle at top left, transparent 3.5px, black 4px)',
                      maskImage:
                        'radial-gradient(circle at top left, transparent 3.5px, black 4px)',
                    }}
                  />
                  <span
                    aria-hidden='true'
                    className='pointer-events-none absolute -right-[5px] bottom-0 h-[6px] w-[6px] bg-[#4a4c4f]'
                    style={{
                      WebkitMaskImage:
                        'radial-gradient(circle at top right, transparent 3.5px, black 4px)',
                      maskImage:
                        'radial-gradient(circle at top right, transparent 3.5px, black 4px)',
                    }}
                  />
                </>
              ) : null}

              {showSeparator ? (
                <span
                  aria-hidden='true'
                  className='pointer-events-none absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 bg-white/10'
                />
              ) : null}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSetActiveTab(t.id);
                }}
                aria-pressed={isActive}
                className='flex min-w-0 flex-1 items-center gap-2 text-left'
              >
                <img
                  src={t.icon}
                  alt=''
                  className='h-4 w-4 shrink-0 rounded-full object-contain'
                />
                <span className='truncate font-medium'>{t.title}</span>
              </button>

              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(t.id);
                }}
                aria-label='Close tab'
                className={[
                  'ml-1 grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors',
                  isActive
                    ? 'text-white/72 hover:bg-white/10 hover:text-white'
                    : 'text-white/52 hover:bg-white/8 hover:text-white/78',
                ].join(' ')}
              >
                <img
                  src='/assets/window-controls/close.webp'
                  alt=''
                  className='pointer-events-none h-[8px] w-[9px] select-none brightness-0 invert'
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
