import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DEFAULT_DESKTOP_ITEMS } from '@/features/desktop/config/shell';
import { resolveDesktopShortcutPosition } from '@/features/desktop/utils/shortcutGrid';
import type {
  DesktopPosition,
  DesktopShortcutItem,
} from './desktopModels';

type LayoutState = {
  items: DesktopShortcutItem[];
  moveItem: (id: string, position: DesktopPosition) => void;
  createFolder: (position: DesktopPosition) => string;
  renameFolder: (id: string, title: string) => void;
  removeFolder: (id: string) => void;
  resetLayout: () => void;
};

const createFolderId = () =>
  `custom-folder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function normalizeLayoutItems(
  items: DesktopShortcutItem[] | undefined
): DesktopShortcutItem[] {
  const storedItems = items ?? [];
  const defaultIds = new Set(DEFAULT_DESKTOP_ITEMS.map((item) => item.id));
  const occupiedPositions: DesktopPosition[] = [];

  const reservePosition = (position: DesktopPosition) => {
    const resolved = resolveDesktopShortcutPosition(position, occupiedPositions);
    occupiedPositions.push(resolved);
    return resolved;
  };

  const systemItems = DEFAULT_DESKTOP_ITEMS.map((defaultItem) => {
    const storedItem = storedItems.find((item) => item.id === defaultItem.id);
    return storedItem
      ? {
          ...defaultItem,
          position: reservePosition(storedItem.position),
        }
      : {
          ...defaultItem,
          position: reservePosition(defaultItem.position),
        };
  });

  const customItems = storedItems
    .filter((item) => !defaultIds.has(item.id) && !item.isSystem)
    .map((item) => ({
      ...item,
      position: reservePosition(item.position),
    }));
  return [...systemItems, ...customItems];
}

export const useDesktopLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      items: normalizeLayoutItems(DEFAULT_DESKTOP_ITEMS),
      moveItem: (id, position) =>
        set((s) => ({
          items: s.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  position: resolveDesktopShortcutPosition(
                    position,
                    s.items
                      .filter((entry) => entry.id !== id)
                      .map((entry) => entry.position)
                  ),
                }
              : item
          ),
        })),
      createFolder: (position) => {
        const id = createFolderId();
        set((s) => ({
          items: [
            ...s.items,
            {
              id,
              kind: 'folder',
              folderId: id,
              contentType: 'user-folder',
              title: 'New Folder',
              icon: '/assets/common/desktop/folder-shortcut.webp',
              position: resolveDesktopShortcutPosition(
                position,
                s.items.map((item) => item.position)
              ),
              mutable: true,
            },
          ],
        }));
        return id;
      },
      renameFolder: (id, title) =>
        set((s) => ({
          items: s.items.map((item) =>
            item.id === id && item.kind === 'folder' && item.mutable
              ? { ...item, title: title.trim() || item.title }
              : item
          ),
        })),
      removeFolder: (id) =>
        set((s) => ({
          items: s.items.filter((item) => item.id !== id),
        })),
      resetLayout: () => set({ items: DEFAULT_DESKTOP_ITEMS }),
    }),
    {
      name: 'desktop_layout',
      version: 8,
      migrate: () => ({
        // 버전 변경 시 데스크톱 아이콘을 기본 배치로 초기화한다.
        items: normalizeLayoutItems(DEFAULT_DESKTOP_ITEMS),
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<LayoutState> | undefined;
        return {
          ...currentState,
          ...persisted,
          items: normalizeLayoutItems(persisted?.items),
        };
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);
