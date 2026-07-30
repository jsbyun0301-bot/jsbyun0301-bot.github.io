import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  SYSTEM_TEXT_FILES,
  SYSTEM_TEXT_FILE_LIST,
} from '@/features/notepad/data/textFiles';
import type { DesktopTextFile, TextFileId } from './desktopModels';

type TextFileState = {
  files: Record<TextFileId, DesktopTextFile>;
  lastOpenedFileId: TextFileId;
  updateFileContent: (id: TextFileId, content: string) => void;
  markFileOpened: (id: TextFileId) => void;
  resetTextFiles: () => void;
};

const DEFAULT_LAST_OPENED_FILE_ID: TextFileId = 'readme';

function cloneSystemTextFiles(): Record<TextFileId, DesktopTextFile> {
  return SYSTEM_TEXT_FILE_LIST.reduce(
    (accumulator, file) => ({
      ...accumulator,
      [file.id]: { ...file },
    }),
    {} as Record<TextFileId, DesktopTextFile>
  );
}

function normalizeFiles(
  files: Partial<Record<TextFileId, Partial<DesktopTextFile>>> | undefined
) {
  return SYSTEM_TEXT_FILE_LIST.reduce((accumulator, systemFile) => {
    const stored = files?.[systemFile.id];
    // 읽기 전용 시스템 파일은 항상 최신 기본값을 사용한다.
    // (옛 localStorage 캐시가 새 콘텐츠를 덮어쓰지 않도록)
    const content = systemFile.isReadOnly
      ? systemFile.content
      : stored?.content ?? systemFile.content;

    return {
      ...accumulator,
      [systemFile.id]: {
        id: systemFile.id,
        title: systemFile.title,
        description: systemFile.description,
        isReadOnly: systemFile.isReadOnly,
        content,
      },
    };
  }, {} as Record<TextFileId, DesktopTextFile>);
}

// 저장된 lastOpenedFileId가 더 이상 없는 파일(id 삭제 등)이면 기본값으로 되돌린다.
function normalizeLastOpenedFileId(id: TextFileId | undefined): TextFileId {
  return id && id in SYSTEM_TEXT_FILES ? id : DEFAULT_LAST_OPENED_FILE_ID;
}

export const useDesktopTextFilesStore = create<TextFileState>()(
  persist(
    (set) => ({
      files: cloneSystemTextFiles(),
      lastOpenedFileId: DEFAULT_LAST_OPENED_FILE_ID,
      updateFileContent: (id, content) =>
        set((state) => {
          const file = state.files[id];
          if (!file || file.isReadOnly) {
            return state;
          }

          return {
            files: {
              ...state.files,
              [id]: {
                ...file,
                content,
              },
            },
          };
        }),
      markFileOpened: (id) => set({ lastOpenedFileId: id }),
      resetTextFiles: () =>
        set({
          files: cloneSystemTextFiles(),
          lastOpenedFileId: DEFAULT_LAST_OPENED_FILE_ID,
        }),
    }),
    {
      name: 'desktop_text_files',
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as
          | {
              files?: Partial<Record<TextFileId, Partial<DesktopTextFile>>>;
              lastOpenedFileId?: TextFileId;
            }
          | undefined;

        return {
          files: normalizeFiles(state?.files),
          lastOpenedFileId: normalizeLastOpenedFileId(state?.lastOpenedFileId),
        };
      },
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<TextFileState> | undefined;
        return {
          ...currentState,
          ...state,
          files: normalizeFiles(
            state?.files as Partial<Record<TextFileId, Partial<DesktopTextFile>>> | undefined
          ),
          lastOpenedFileId: normalizeLastOpenedFileId(state?.lastOpenedFileId),
        };
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function getStoredTextFile(id: TextFileId) {
  return useDesktopTextFilesStore.getState().files[id] ?? SYSTEM_TEXT_FILES[id];
}
