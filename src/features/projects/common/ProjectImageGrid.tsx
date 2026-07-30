import { ProjectImageItem } from './types';

type ProjectImageGridProps = {
  items: ProjectImageItem[];
  onImageClick?: (item: ProjectImageItem) => void;
  className?: string;
  itemClassName?: string;
  layout?: 'grid' | 'scroll' | 'gallery';
};

export function ProjectImageGrid({
  items,
  onImageClick,
  className,
  itemClassName,
  layout = 'grid',
}: ProjectImageGridProps) {
  // gallery: 이미지를 잘라내지 않고 전체를 보여주며 캡션(alt)을 함께 노출한다.
  if (layout === 'gallery') {
    // 이미지가 적으면 열 수를 줄여 각 이미지가 크게 보이도록 한다.
    // 3열로 나열했을 때의 카드 크기(약 360px)를 기준으로 통일한다.
    const columnClass =
      items.length === 1
        ? 'grid-cols-1 max-w-[450px]'
        : items.length === 2
          ? 'grid-cols-1 sm:grid-cols-2 max-w-[920px]'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    const maxHeightClass = 'max-h-[330px]';

    return (
      <div className={['grid gap-4', columnClass, className ?? ''].join(' ')}>
        {items.map(({ src, alt }) => (
          <figure key={src} className='flex flex-col'>
            <div
              className={[
                'flex items-center justify-center rounded-[12px] border border-[#e5e7eb] bg-white p-2',
                'shadow-[0_4px_10px_rgba(0,0,0,0.06)]',
                onImageClick ? 'cursor-zoom-in' : '',
                itemClassName ?? '',
              ].join(' ')}
              onClick={() => onImageClick?.({ src, alt })}
            >
              <img
                src={src}
                alt={alt || ''}
                className={`${maxHeightClass} w-full object-contain`}
                loading='lazy'
                decoding='async'
              />
            </div>
            {alt && (
              <figcaption className='mt-2 text-center text-[13px] leading-snug text-[#555]'>
                {alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  if (layout === 'scroll') {
    return (
      <div
        className={[
          'horizontal-scroll flex gap-3 overflow-x-auto overscroll-x-contain pb-3 pr-1',
          'scroll-smooth snap-x snap-mandatory',
          className ?? '',
        ].join(' ')}
      >
        {items.map(({ src, alt }) => (
          <div
            key={src}
            className={[
              'group relative flex-shrink-0 w-[300px] sm:w-[400px] md:w-[460px]',
              'rounded-[10px] overflow-hidden border border-black/5',
              'shadow-[0_4px_8px_rgba(0,0,0,0.1)]',
              'bg-white',
              'snap-start',
              onImageClick ? 'cursor-zoom-in' : '',
              itemClassName ?? '',
            ].join(' ')}
            onClick={() => onImageClick?.({ src, alt })}
          >
            <img
              src={src}
              alt={alt || ''}
              className='block aspect-video w-full object-contain'
              loading='lazy'
              decoding='async'
              sizes='(min-width: 1024px) 460px, (min-width: 640px) 400px, 300px'
            />
            {onImageClick ? (
              <span className='pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100'>
                🔍 클릭해 확대
              </span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={[
        'grid grid-cols-2 lg:grid-cols-3',
        'gap-3 items-start',
        className ?? '',
      ].join(' ')}
    >
      {items.map(({ src, alt }) => (
        <div
          key={src}
          className={[
            'rounded-[10px] overflow-hidden',
            'shadow-[0_4px_8px_rgba(0,0,0,0.1)]',
            'bg-white/40',
            onImageClick ? 'cursor-zoom-in' : '',
            itemClassName ?? '',
          ].join(' ')}
          onClick={() => onImageClick?.({ src, alt })}
        >
          <img
            src={src}
            alt={alt || ''}
            className='w-full h-40 md:h-44 object-cover block'
            loading='lazy'
            decoding='async'
            sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw'
          />
        </div>
      ))}
    </div>
  );
}
