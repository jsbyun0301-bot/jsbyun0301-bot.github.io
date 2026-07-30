import { create } from 'zustand';

export type TerminalLineKind = 'command' | 'output' | 'error' | 'meta';

export type TerminalLine = {
  id: string;
  kind: TerminalLineKind;
  text: string;
};

type TerminalSession = {
  id: 'main';
  lines: TerminalLine[];
};

type TerminalState = {
  sessions: Record<string, TerminalSession>;
  ensureSession: (id: 'main') => void;
  appendLines: (id: 'main', lines: Omit<TerminalLine, 'id'>[]) => void;
  clearSession: (id: 'main') => void;
  resetTerminal: () => void;
};

const createLineId = () =>
  `terminal-line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createWelcomeLines = (): TerminalLine[] => [
  {
    id: createLineId(),
    kind: 'meta',
    text: '변지섭 · Portfolio Terminal',
  },
  {
    id: createLineId(),
    kind: 'meta',
    text: "Type 'help' to list supported commands.",
  },
];

function createSession(id: 'main'): TerminalSession {
  return {
    id,
    lines: createWelcomeLines(),
  };
}

export const useDesktopTerminalStore = create<TerminalState>()((set) => ({
  sessions: {},
  ensureSession: (id) =>
    set((state) =>
      state.sessions[id]
        ? state
        : {
            sessions: {
              ...state.sessions,
              [id]: createSession(id),
            },
          }
    ),
  appendLines: (id, lines) =>
    set((state) => {
      const session = state.sessions[id] ?? createSession(id);
      return {
        sessions: {
          ...state.sessions,
          [id]: {
            ...session,
            lines: [
              ...session.lines,
              ...lines.map((line) => ({
                ...line,
                id: createLineId(),
              })),
            ],
          },
        },
      };
    }),
  clearSession: (id) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [id]: {
          id,
          lines: [],
        },
      },
    })),
  resetTerminal: () => set({ sessions: {} }),
}));
