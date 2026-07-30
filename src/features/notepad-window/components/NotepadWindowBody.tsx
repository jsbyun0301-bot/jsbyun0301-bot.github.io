import { useEffect, useMemo } from 'react';
import { useDesktopTextFilesStore } from '@/stores';
import type { TextFileId } from '@/stores';

function getLineCount(content: string) {
  return content.split(/\r?\n/).length;
}

export function NotepadWindowBody({ fileId }: { fileId: TextFileId }) {
  const file = useDesktopTextFilesStore((s) => s.files[fileId]);
  const updateFileContent = useDesktopTextFilesStore((s) => s.updateFileContent);
  const markFileOpened = useDesktopTextFilesStore((s) => s.markFileOpened);

  useEffect(() => {
    markFileOpened(fileId);
  }, [fileId, markFileOpened]);

  const lineCount = useMemo(
    () => (file ? getLineCount(file.content) : 0),
    [file]
  );

  if (!file) {
    return (
      <div className='grid h-full w-full place-items-center bg-[#f8fafc] text-sm text-[#64748b]'>
        텍스트 파일을 찾지 못했습니다.
      </div>
    );
  }

  return (
    <div className='flex h-full w-full min-h-0 min-w-0 flex-col bg-[#f3f6fb] text-[#0f172a]'>
      <div className='border-b border-[#dbe4f0] bg-[linear-gradient(180deg,#f8fbff_0%,#eef3f9_100%)] px-5 py-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <div>
            <div className='text-[18px] font-semibold tracking-[-0.03em]'>
              {file.title}
            </div>
            <div className='mt-1 text-sm text-[#64748b]'>{file.description}</div>
          </div>
          <div className='ml-auto flex items-center gap-2'>
            <span className='rounded-full border border-[#dbe4f0] bg-white px-3 py-1 text-xs font-semibold text-[#334155]'>
              Plain Text
            </span>
            <span className='rounded-full bg-[#0f172a] px-3 py-1 text-xs font-semibold text-white'>
              {file.isReadOnly ? 'Read Only' : 'Editable'}
            </span>
          </div>
        </div>
      </div>

      <div className='min-h-0 flex-1 bg-white p-3'>
        <textarea
          value={file.content}
          readOnly={file.isReadOnly}
          onChange={(event) => updateFileContent(fileId, event.target.value)}
          spellCheck={false}
          className='h-full w-full resize-none rounded-[20px] border border-[#dbe4f0] bg-white px-4 py-4 font-mono text-[13px] leading-7 text-[#0f172a] outline-none'
        />
      </div>

      <div className='flex items-center justify-between border-t border-[#dbe4f0] bg-[#f8fbff] px-4 py-2 text-xs text-[#64748b]'>
        <span>{lineCount} lines</span>
        <span>{file.isReadOnly ? '시스템 텍스트 파일' : '사용자 편집 가능'}</span>
      </div>
    </div>
  );
}
