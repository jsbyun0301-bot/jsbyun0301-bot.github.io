import { useEffect, useRef } from 'react';

type ProjectImageModalProps = {
  imageSrc: string;
  alt?: string;
  onClose: () => void;
};

export function ProjectImageModal({
  imageSrc,
  alt,
  onClose,
}: ProjectImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        dialogRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]'
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-label='Project image preview'
        tabIndex={-1}
        className='relative w-full max-w-[1600px] px-4 outline-none'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='닫기'
          className='absolute -top-1 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[18px] font-semibold text-[#111] shadow-md hover:bg-white'
        >
          ×
        </button>
        <img
          src={imageSrc}
          alt={alt || 'Project image'}
          className='w-full max-h-[92vh] rounded-lg object-contain shadow-2xl'
        />
      </div>
    </div>
  );
}
