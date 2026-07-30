import { useEffect, useRef } from 'react';

type PrizeModalProps = {
  imageSrc: string;
  onClose: () => void;
};

export default function PrizeModal({ imageSrc, onClose }: PrizeModalProps) {
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
        aria-label='Award image preview'
        tabIndex={-1}
        className='w-full max-w-[450px] mt-[-80px] outline-none'
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt='Award image'
          className='w-full object-contain'
        />
      </div>
    </div>
  );
}
