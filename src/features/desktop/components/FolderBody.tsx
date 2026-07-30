import type { FC } from 'react';
import type { FolderWindow, FolderContentType } from '@/stores';
import FolderView, {
  GruFolderView,
} from '@/features/folder-window/components/FolderView';
import { EmptyFolderView } from '@/features/folder-window/components/SystemFolderViews';

const FOLDER_CONTENT: Record<FolderContentType, FC<{ title: string }>> = {
  projects: FolderView,
  gru: GruFolderView,
  'user-folder': ({ title }) => (
    <EmptyFolderView
      title={title}
      description='This folder is empty for now. Use it as a visual desktop detail or a staging area for future content.'
    />
  ),
  'recycle-bin': () => (
    <EmptyFolderView
      title='Recycle Bin'
      description='The bin is intentionally empty in this version of the desktop shell.'
    />
  ),
};

export function FolderBody({ win }: { win: FolderWindow }) {
  const Content = FOLDER_CONTENT[win.contentType];
  return (
    <div className='app-scroll w-full h-full min-h-0 overflow-auto bg-[#f0f0f0]'>
      <Content title={win.title} />
    </div>
  );
}
