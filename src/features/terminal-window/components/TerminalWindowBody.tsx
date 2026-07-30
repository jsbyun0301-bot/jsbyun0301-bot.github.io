import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { WALLPAPERS } from '@/features/desktop/config/shell';
import { PAGE_TABS } from '@/features/pages-window/registry/page-registry';
import {
  useDesktopPreferencesStore,
  useDesktopStore,
  useDesktopTerminalStore,
  useDesktopTextFilesStore,
} from '@/stores';
import type { TerminalLine } from '@/stores/useDesktopTerminalStore';

const HELP_LINES = [
  '지원 명령',
  'help',
  'clear',
  'exit',
  'open about',
  'open work',
  'open card',
  'open projects',
  'open github',
  'open browser',
  'open settings',
  'open notepad',
  'wallpaper list',
  'wallpaper set <id>',
];

const PROMPT = 'jiseob@macbook ~ %';

function formatPrompt(command: string) {
  return `${PROMPT} ${command}`;
}

function lineClassName(kind: TerminalLine['kind']) {
  switch (kind) {
    case 'command':
      return 'text-[#dce8ff]';
    case 'error':
      return 'text-[#ffb4b4]';
    case 'meta':
      return 'text-[#7fb6ff]';
    default:
      return 'text-[#d7dee8]';
  }
}

export function TerminalWindowBody() {
  const ensureSession = useDesktopTerminalStore((s) => s.ensureSession);
  const appendLines = useDesktopTerminalStore((s) => s.appendLines);
  const clearSession = useDesktopTerminalStore((s) => s.clearSession);
  const lines = useDesktopTerminalStore(
    (s) => s.sessions.main?.lines ?? []
  );

  const openPage = useDesktopStore((s) => s.openPage);
  const openFolder = useDesktopStore((s) => s.openFolder);
  const openTextFileWindow = useDesktopStore((s) => s.openTextFileWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const setWallpaper = useDesktopPreferencesStore((s) => s.setWallpaper);
  const lastOpenedFileId = useDesktopTextFilesStore((s) => s.lastOpenedFileId);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ensureSession('main');
  }, [ensureSession]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lines]);

  const wallpaperListText = useMemo(
    () =>
      Object.values(WALLPAPERS).map(
        (wallpaper) => `${wallpaper.id} - ${wallpaper.label}`
      ),
    []
  );

  const executeCommand = (rawCommand: string) => {
    const command = rawCommand.trim();

    if (!command) {
      return;
    }

    const normalized = command.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === 'clear') {
      clearSession('main');
      return;
    }

    appendLines('main', [{ kind: 'command', text: formatPrompt(command) }]);

    if (normalized === 'help') {
      appendLines(
        'main',
        HELP_LINES.map((text) => ({ kind: 'output' as const, text }))
      );
      return;
    }

    if (normalized === 'exit') {
      appendLines('main', [
        { kind: 'meta', text: 'Terminal window closed.' },
      ]);
      closeWindow('terminal:main');
      return;
    }

    if (normalized === 'open about') {
      openPage(PAGE_TABS.about);
      appendLines('main', [{ kind: 'meta', text: 'About page opened.' }]);
      return;
    }

    if (normalized === 'open projects') {
      openFolder({
        id: 'folder:projects',
        folderId: 'projects',
        title: 'Projects',
        icon: '/assets/common/desktop/folder-shortcut.webp',
        contentType: 'projects',
      });
      appendLines('main', [
        { kind: 'meta', text: 'Projects folder opened.' },
      ]);
      return;
    }

    if (normalized === 'open work') {
      openPage(PAGE_TABS.work);
      appendLines('main', [{ kind: 'meta', text: 'Work page opened.' }]);
      return;
    }

    if (normalized === 'open card') {
      openPage(PAGE_TABS.card);
      appendLines('main', [{ kind: 'meta', text: 'Card opened.' }]);
      return;
    }

    if (normalized === 'open github') {
      openPage(PAGE_TABS.github);
      appendLines('main', [{ kind: 'meta', text: 'GitHub page opened.' }]);
      return;
    }

    if (normalized === 'open browser') {
      openPage(PAGE_TABS.chrome);
      appendLines('main', [{ kind: 'meta', text: 'Chrome page opened.' }]);
      return;
    }

    if (normalized === 'open settings') {
      openPage(PAGE_TABS.settings);
      appendLines('main', [{ kind: 'meta', text: 'Settings opened.' }]);
      return;
    }

    if (normalized === 'open notepad') {
      openTextFileWindow(lastOpenedFileId);
      appendLines('main', [
        { kind: 'meta', text: `${lastOpenedFileId}.txt opened.` },
      ]);
      return;
    }

    if (normalized === 'wallpaper list') {
      appendLines(
        'main',
        wallpaperListText.map((text) => ({ kind: 'output' as const, text }))
      );
      return;
    }

    if (normalized.startsWith('wallpaper set ')) {
      const nextWallpaperId = normalized.replace('wallpaper set ', '').trim();

      if (nextWallpaperId in WALLPAPERS) {
        setWallpaper(nextWallpaperId as keyof typeof WALLPAPERS);
        appendLines('main', [
          {
            kind: 'meta',
            text: `Wallpaper changed to ${nextWallpaperId}.`,
          },
        ]);
        return;
      }

      appendLines('main', [
        {
          kind: 'error',
          text: `Unknown wallpaper id: ${nextWallpaperId}`,
        },
        {
          kind: 'output',
          text: 'Try: wallpaper list',
        },
      ]);
      return;
    }

    appendLines('main', [
      {
        kind: 'error',
        text: `Unknown command: ${command}`,
      },
      {
        kind: 'output',
        text: 'Examples: open about, wallpaper list, wallpaper set sonoma',
      },
      ...HELP_LINES.map((text) => ({ kind: 'output' as const, text })),
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) {
      return;
    }

    setHistory((current) => [command, ...current.filter((item) => item !== command)]);
    setHistoryIndex(null);
    executeCommand(command);
    setInput('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHistoryIndex((current) => {
        const nextIndex = current === null ? 0 : Math.min(current + 1, history.length - 1);
        const nextCommand = history[nextIndex];
        if (nextCommand) {
          setInput(nextCommand);
        }
        return nextIndex;
      });
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (current === null) {
          return null;
        }

        const nextIndex = current - 1;
        if (nextIndex < 0) {
          setInput('');
          return null;
        }

        setInput(history[nextIndex] ?? '');
        return nextIndex;
      });
    }
  };

  return (
    <div
      className='flex h-full w-full min-h-0 min-w-0 flex-col bg-[radial-gradient(circle_at_top,#1c2741_0%,#0a1018_55%,#060a10_100%)] font-mono text-[13px]'
      onPointerDown={() => inputRef.current?.focus()}
    >
      <div className='border-b border-white/10 px-4 py-3 text-[12px] text-[#8aa2c9]'>
        변지섭 · Portfolio Terminal
      </div>

      <div ref={scrollRef} className='min-h-0 flex-1 overflow-y-auto px-4 py-4'>
        <div className='space-y-2'>
          {lines.map((line) => (
            <div key={line.id} className={lineClassName(line.kind)}>
              {line.text}
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='border-t border-white/10 bg-black/20 px-4 py-3'
      >
        <label className='flex items-center gap-3 rounded-[18px] border border-white/10 bg-black/25 px-3 py-3 text-[#dce8ff] focus-within:border-[#3b82f6]'>
          <span className='shrink-0 text-[#7fb6ff]'>{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize='off'
            autoCorrect='off'
            className='min-w-0 flex-1 bg-transparent text-[#dce8ff] outline-none placeholder:text-[#7085a8]'
            placeholder='help'
          />
        </label>
      </form>
    </div>
  );
}
