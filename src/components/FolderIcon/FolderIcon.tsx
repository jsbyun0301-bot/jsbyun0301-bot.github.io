type Props = {
  imageUrl: string;
  title: string;
  onClick?: () => void;
  className?: string;
  imageFrameClassName?: string;
  variant?: 'desktop' | 'folder';
};

export function FolderIcon({
  imageUrl,
  title,
  onClick,
  className,
  imageFrameClassName,
  variant = 'desktop',
}: Props) {
  const labelTone =
    variant === 'folder'
      ? 'text-black/90 group-hover:text-black'
      : 'text-white/90 group-hover:text-white';

  const tileTone =
    variant === 'folder'
      ? 'hover:bg-black/5 focus-visible:bg-black/10'
      : 'hover:bg-white/10 focus-visible:bg-white/15';

  const labelShadow = variant === 'desktop' ? 'drop-shadow' : '';

  return (
    <button
      onClick={onClick}
      aria-label={title}
      className={[
        'group w-[88px] h-[112px] md:w-[96px] md:h-[96px]',
        'inline-flex flex-col items-center justify-center gap-2',
        'rounded-xl transition-colors',
        'bg-transparent p-0 border-0 appearance-none',
        'focus:outline-none focus-visible:ring-0',
        tileTone,
        className ?? '',
      ].join(' ')}
    >
      <div
        className={[
          'size-12 md:size-14 shrink-0 grid place-items-center',
          imageFrameClassName ?? '',
        ].join(' ')}
      >
        <img
          src={imageUrl}
          alt={title}
          className='w-full h-full object-contain select-none pointer-events-none transition-transform group-hover:scale-105'
          draggable={false}
        />
      </div>
      <span
        className={[
          'text-center leading-tight',
          'text-[11px] md:text-sm font-medium',
          'max-w-[84px] md:max-w-[92px]',
          'line-clamp-2',
          labelTone,
          labelShadow,
        ].join(' ')}
      >
        {title}
      </span>
    </button>
  );
}
