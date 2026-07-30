import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { PAGE_TABS } from '@/features/pages-window/registry/page-registry';
import { WALLPAPERS } from '@/features/desktop/config/shell';
import { resolveDesktopShortcutPosition } from '@/features/desktop/utils/shortcutGrid';
import {
  useDesktopLayoutStore,
  useDesktopPreferencesStore,
  useDesktopStore,
  useDesktopTerminalStore,
  useDesktopTextFilesStore,
} from '@/stores';
import type {
  DesktopPosition,
  DesktopShortcutItem,
} from '@/stores/desktopModels';
import { playSystemSound } from '@/utils/systemSounds';

function clampPosition(position: DesktopPosition) {
  return {
    x: Math.max(18, Math.min(position.x, window.innerWidth - 140)),
    y: Math.max(18, Math.min(position.y, window.innerHeight - 180)),
  };
}

function toDesktopPosition(
  clientX: number,
  clientY: number,
  surfaceRect: DOMRect
) {
  return clampPosition({
    x: clientX - surfaceRect.left - 44,
    y: clientY - surfaceRect.top - 44,
  });
}

function ContextMenu({
  x,
  y,
  items,
}: {
  x: number;
  y: number;
  items: Array<{ label: string; onClick: () => void; danger?: boolean }>;
}) {
  return (
    <div
      data-desktop-context-menu
      className='fixed z-[9998] min-w-[220px] rounded-[18px] border border-white/50 bg-[#f7f9fc]/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl'
      style={{ left: x, top: y }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className={[
            'flex w-full items-center rounded-xl px-3 py-2 text-left text-[13px] transition-colors',
            item.danger
              ? 'text-[#b42318] hover:bg-[#fff1f0]'
              : 'text-[#0f172a] hover:bg-white',
          ].join(' ')}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function DesktopShortcutTile({
  item,
  selected,
  editing,
  onSelect,
  onOpen,
  onMove,
  resolveDropPosition,
  onCommitRename,
  onContextMenu,
}: {
  item: DesktopShortcutItem;
  selected: boolean;
  editing: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onMove: (position: DesktopPosition) => void;
  resolveDropPosition: (position: DesktopPosition) => DesktopPosition;
  onCommitRename: (title: string) => void;
  onContextMenu: (event: MouseEvent) => void;
}) {
  const [draftTitle, setDraftTitle] = useState(item.title);
  const [dragging, setDragging] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(item.position);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const justDraggedRef = useRef(false);
  const lastClickAtRef = useRef(0);

  useEffect(() => {
    setPreviewPosition(item.position);
    setDraftTitle(item.title);
  }, [item.position, item.title]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || editing) return;

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: item.position.x,
      originY: item.position.y,
    };
    setPreviewPosition(item.position);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const next = {
      x: dragRef.current.originX + (event.clientX - dragRef.current.startX),
      y: dragRef.current.originY + (event.clientY - dragRef.current.startY),
    };

    if (
      !dragging &&
      (Math.abs(event.clientX - dragRef.current.startX) > 4 ||
        Math.abs(event.clientY - dragRef.current.startY) > 4)
    ) {
      setDragging(true);
    }

    setPreviewPosition(resolveDropPosition(next));
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current && dragging) {
      onMove(previewPosition);
      justDraggedRef.current = true;
      window.setTimeout(() => {
        justDraggedRef.current = false;
      }, 120);
    } else if (!justDraggedRef.current) {
      const now = Date.now();
      onSelect();
      if (now - lastClickAtRef.current < 280) {
        lastClickAtRef.current = 0;
        playSystemSound('open');
        onOpen();
      } else {
        lastClickAtRef.current = now;
      }
    }

    dragRef.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className='absolute z-10 select-none'
      style={{ left: previewPosition.x, top: previewPosition.y }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={onContextMenu}
    >
      <div
        className={[
          'group inline-flex h-[112px] w-[92px] flex-col items-center justify-center gap-2 rounded-2xl border border-transparent px-2 py-2 text-white transition-colors',
          selected
            ? 'border-white/35 bg-white/14 shadow-[0_18px_34px_rgba(15,23,42,0.16)]'
            : 'hover:bg-white/10',
          dragging ? 'opacity-90' : '',
        ].join(' ')}
      >
        <div
          className={[
            'grid size-14 shrink-0 place-items-center',
            item.iconFrameClassName ?? '',
          ].join(' ')}
        >
          <img
            src={item.icon}
            alt={item.title}
            className='pointer-events-none h-full w-full object-contain transition-transform group-hover:scale-105'
            draggable={false}
          />
        </div>

        {editing ? (
          <input
            autoFocus
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={() => onCommitRename(draftTitle)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onCommitRename(draftTitle);
              }
              if (event.key === 'Escape') {
                setDraftTitle(item.title);
                onCommitRename(item.title);
              }
            }}
            className='w-full rounded-lg bg-black/40 px-2 py-1 text-center text-[12px] font-medium text-white outline-none ring-1 ring-white/35'
          />
        ) : (
          <span className='max-w-[84px] text-center text-[12px] font-medium leading-tight text-white drop-shadow'>
            {item.title}
          </span>
        )}
      </div>
    </div>
  );
}

type MenuState =
  | null
  | { kind: 'desktop'; x: number; y: number }
  | { kind: 'shortcut'; x: number; y: number; itemId: string };

export function DesktopSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const items = useDesktopLayoutStore((s) => s.items);
  const moveItem = useDesktopLayoutStore((s) => s.moveItem);
  const createFolder = useDesktopLayoutStore((s) => s.createFolder);
  const renameFolder = useDesktopLayoutStore((s) => s.renameFolder);
  const removeFolder = useDesktopLayoutStore((s) => s.removeFolder);
  const resetLayout = useDesktopLayoutStore((s) => s.resetLayout);

  const wallpaperId = useDesktopPreferencesStore((s) => s.wallpaperId);
  const setWallpaper = useDesktopPreferencesStore((s) => s.setWallpaper);
  const resetPreferences = useDesktopPreferencesStore((s) => s.resetPreferences);

  const openPage = useDesktopStore((s) => s.openPage);
  const openFolder = useDesktopStore((s) => s.openFolder);
  const openBrowser = useDesktopStore((s) => s.openBrowser);
  const openCodeWorkspace = useDesktopStore((s) => s.openCodeWorkspace);
  const openTextFileWindow = useDesktopStore((s) => s.openTextFileWindow);
  const openTerminalWindow = useDesktopStore((s) => s.openTerminalWindow);
  const resetWindows = useDesktopStore((s) => s.resetWindows);

  const resetTextFiles = useDesktopTextFilesStore((s) => s.resetTextFiles);
  const resetTerminal = useDesktopTerminalStore((s) => s.resetTerminal);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<MenuState>(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);

  const wallpaperList = useMemo(() => Object.values(WALLPAPERS), []);
  const resolveShortcutDropPosition = (
    itemId: string,
    position: DesktopPosition
  ) =>
    resolveDesktopShortcutPosition(
      position,
      items
        .filter((item) => item.id !== itemId)
        .map((item) => item.position)
    );

  useEffect(() => {
    if (!contextMenu) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-desktop-context-menu]')) return;
      setContextMenu(null);
      setEditingFolderId(null);
    };

    window.addEventListener('pointerdown', onPointerDown, true);
    return () => window.removeEventListener('pointerdown', onPointerDown, true);
  }, [contextMenu]);

  const cycleWallpaper = () => {
    const currentIndex = wallpaperList.findIndex(
      (wallpaper) => wallpaper.id === wallpaperId
    );
    const next = wallpaperList[(currentIndex + 1) % wallpaperList.length];
    setWallpaper(next.id);
  };

  const resetDesktop = () => {
    resetLayout();
    resetPreferences();
    resetTextFiles();
    resetTerminal();
    resetWindows();
    setSelectedId(null);
    setContextMenu(null);
    playSystemSound('click');
  };

  const handleOpenItem = (item: DesktopShortcutItem) => {
    setSelectedId(item.id);

    switch (item.kind) {
      case 'page':
        openPage(PAGE_TABS[item.pageId]);
        break;
      case 'folder':
        openFolder({
          id: `folder:${item.folderId}`,
          folderId: item.folderId,
          title: item.title,
          icon: item.icon,
          contentType: item.contentType,
        });
        break;
      case 'browser':
        openBrowser(item.browserAppId);
        break;
      case 'code':
        openCodeWorkspace(item.workspaceId);
        break;
      case 'text-file':
        openTextFileWindow(item.fileId);
        break;
      case 'terminal':
        openTerminalWindow();
        break;
    }
  };

  const handleDesktopContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setSelectedId(null);
    setContextMenu({
      kind: 'desktop',
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleNewFolder = () => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect || !contextMenu) return;
    const id = createFolder(toDesktopPosition(contextMenu.x, contextMenu.y, rect));
    setSelectedId(id);
    setEditingFolderId(id);
    setContextMenu(null);
    playSystemSound('open');
  };

  const currentMenuItems = useMemo(() => {
    if (!contextMenu) return [];

    if (contextMenu.kind === 'desktop') {
      return [
        { label: 'New Folder', onClick: handleNewFolder },
        {
          label: 'Open Terminal',
          onClick: () => {
            openTerminalWindow();
            setContextMenu(null);
          },
        },
        {
          label: 'Open README.txt',
          onClick: () => {
            openTextFileWindow('readme');
            setContextMenu(null);
          },
        },
        {
          label: 'Change Wallpaper',
          onClick: () => {
            cycleWallpaper();
            setContextMenu(null);
            playSystemSound('click');
          },
        },
        {
          label: 'Open Settings',
          onClick: () => {
            openPage(PAGE_TABS.settings);
            setContextMenu(null);
          },
        },
        { label: 'Reset Desktop', onClick: resetDesktop, danger: true },
      ];
    }

    const item = items.find((entry) => entry.id === contextMenu.itemId);
    if (!item) return [];

    const actions: Array<{
      label: string;
      onClick: () => void;
      danger?: boolean;
    }> = [
      {
        label: 'Open',
        onClick: () => {
          handleOpenItem(item);
          setContextMenu(null);
        },
      },
    ];

    if (item.kind === 'folder' && item.mutable) {
      actions.push(
        {
          label: 'Rename',
          onClick: () => {
            setEditingFolderId(item.id);
            setContextMenu(null);
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            removeFolder(item.id);
            setContextMenu(null);
          },
          danger: true,
        }
      );
    }

    return actions;
  }, [
    contextMenu,
    items,
    openPage,
    openTerminalWindow,
    openTextFileWindow,
    removeFolder,
  ]);

  return (
    <div
      ref={surfaceRef}
      className='absolute inset-0 z-0 overflow-hidden'
      onContextMenu={handleDesktopContextMenu}
      onPointerDown={(event) => {
        if (event.target === surfaceRef.current) {
          setSelectedId(null);
          setContextMenu(null);
          setEditingFolderId(null);
        }
      }}
    >
      {items.map((item) => (
        <DesktopShortcutTile
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          editing={editingFolderId === item.id}
          onSelect={() => {
            setSelectedId(item.id);
            setEditingFolderId(null);
            setContextMenu(null);
            playSystemSound('click');
          }}
          onOpen={() => handleOpenItem(item)}
          onMove={(position) => moveItem(item.id, position)}
          resolveDropPosition={(position) =>
            resolveShortcutDropPosition(item.id, position)
          }
          onCommitRename={(title) => {
            renameFolder(item.id, title);
            setEditingFolderId(null);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setSelectedId(item.id);
            setContextMenu({
              kind: 'shortcut',
              x: event.clientX,
              y: event.clientY,
              itemId: item.id,
            });
          }}
        />
      ))}

      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 to-transparent' />

      {contextMenu && currentMenuItems.length > 0 ? (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={currentMenuItems}
        />
      ) : null}
    </div>
  );
}
