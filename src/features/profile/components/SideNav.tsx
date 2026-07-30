import { Link } from 'react-scroll';
import { usePageScrollContainerId } from '@/features/pages-window/context/PageScrollContext';
import {
  DESKTOP_SCROLL_OFFSET,
  MOBILE_SCROLL_OFFSET,
  NAV_ITEMS,
} from '../data/nav';

export function SideNav({
  orientation = 'vertical',
}: {
  orientation?: 'vertical' | 'horizontal';
}) {
  const isHorizontal = orientation === 'horizontal';
  const scrollContainerId = usePageScrollContainerId();
  const offset = isHorizontal
    ? MOBILE_SCROLL_OFFSET
    : DESKTOP_SCROLL_OFFSET;

  return (
    <nav
      className={[
        'flex gap-2',
        isHorizontal
          ? 'horizontal-scroll overflow-x-auto pb-2'
          : 'w-full max-w-[118px] flex-col py-1',
      ].join(' ')}
    >
      {NAV_ITEMS.map(({ name, target }) => (
        <Link
          key={target}
          to={target}
          spy
          smooth
          duration={320}
          offset={offset}
          containerId={scrollContainerId}
          activeClass='!border-[#0b61d8] !bg-[#0b61d8] !text-white shadow-[0_10px_24px_rgba(11,97,216,0.18)]'
          className={[
            'inline-flex cursor-pointer items-center rounded-full border border-transparent px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-[#4b5563] transition-all',
            isHorizontal
              ? 'shrink-0 bg-white/80 shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
              : 'w-full bg-transparent hover:border-[#dbe8ff] hover:bg-white hover:text-[#0b61d8]',
          ].join(' ')}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
