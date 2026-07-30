import type { ReactNode } from 'react';
import { FolderIcon } from '@/components/FolderIcon';
import { useDesktopStore } from '@/stores/useDesktopStore';
import type { PageType } from '@/stores/useDesktopStore';
import { PAGE_TABS } from '@/features/pages-window/registry/page-registry';
import {
  CAFE_ICON,
  DONGNAE_ICON,
  GAME_ICON,
  GRACE_ICON,
  GRU_ICON,
  HIRAX_ICON,
  INOBUS_ICON,
} from '@/features/desktop/config/shell';

type ProjectTile = { id: PageType; title: string; icon: string };

// 그루 학회 산하 산학협력 프로젝트
const GRU_PROJECTS: ProjectTile[] = [
  { id: 'hirax', title: '하이랙스', icon: HIRAX_ICON },
  { id: 'inobus', title: '이노버스', icon: INOBUS_ICON },
  { id: 'grace', title: '그레이스', icon: GRACE_ICON },
];

// 그 외 개별 프로젝트
const OTHER_PROJECTS: ProjectTile[] = [
  { id: 'dongnae', title: '동내', icon: DONGNAE_ICON },
  { id: 'cafe', title: '언어 데이터 분석', icon: CAFE_ICON },
  { id: 'game', title: '소비자 유형 분석', icon: GAME_ICON },
];

function FolderGrid({ children }: { children: ReactNode }) {
  return (
    <div className='h-full w-full overflow-auto p-4 md:p-5'>
      <div className='grid [grid-template-columns:repeat(auto-fill,minmax(92px,1fr))] justify-items-start gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8'>
        {children}
      </div>
    </div>
  );
}

export default function FolderView() {
  const openPage = useDesktopStore((s) => s.openPage);
  const openFolder = useDesktopStore((s) => s.openFolder);

  return (
    <FolderGrid>
      <FolderIcon
        imageUrl={GRU_ICON}
        title='그루 (학회)'
        variant='folder'
        onClick={() =>
          openFolder({
            id: 'folder:gru',
            title: '그루 (학회)',
            icon: GRU_ICON,
            contentType: 'gru',
            folderId: 'gru',
          })
        }
      />
      {OTHER_PROJECTS.map((item) => (
        <FolderIcon
          key={item.id}
          imageUrl={item.icon}
          title={item.title}
          variant='folder'
          onClick={() => openPage(PAGE_TABS[item.id])}
        />
      ))}
    </FolderGrid>
  );
}

export function GruFolderView() {
  const openPage = useDesktopStore((s) => s.openPage);

  return (
    <FolderGrid>
      {GRU_PROJECTS.map((item) => (
        <FolderIcon
          key={item.id}
          imageUrl={item.icon}
          title={item.title}
          variant='folder'
          onClick={() => openPage(PAGE_TABS[item.id])}
        />
      ))}
    </FolderGrid>
  );
}
