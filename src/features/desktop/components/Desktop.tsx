import { useMemo } from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { WindowShell } from './WindowShell';
import { TaskbarInline } from './Taskbar';

export default function Desktop() {
  const windows = useDesktopStore((s) => s.windows);

  const list = useMemo(
    () =>
      windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex),
    [windows]
  );

  return (
    <>
      <div className='absolute inset-0 z-50 pointer-events-none'>
        {list.map((w) => (
          <WindowShell key={w.id} win={w} />
        ))}
      </div>
      <TaskbarInline />
    </>
  );
}
