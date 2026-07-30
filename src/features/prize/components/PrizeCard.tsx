type PrizeCardProps = {
  src: string;
  title: string;
  date: string;
  organization: string;
  description: string;
  priority?: boolean;
  onClick: () => void;
  className?: string;
};

export default function PrizeCard({
  src,
  title,
  date,
  organization,
  description,
  priority = false,
  onClick,
  className,
}: PrizeCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={[
        'w-full max-w-[340px] flex flex-col items-center text-left cursor-pointer',
        'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden',
        'transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl',
        className || '',
      ].join(' ')}
      aria-label={title}
    >
      <div className='w-full h-[200px] p-2.5 overflow-hidden flex justify-center items-center bg-gray-100'>
        <img
          src={src}
          alt={`${title} 이미지`}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          width={320}
          height={200}
          className='w-full h-full object-contain block'
        />
      </div>

      <div className='w-full p-4 space-y-1.5'>
        <div className='text-[1.1rem] font-bold text-[#101010]'>{title}</div>
        <div className='text-sm text-[#888]'>{date}</div>
        <div className='text-[0.95rem] text-[#444]'>{organization}</div>
        <div className='text-[0.95rem] text-[#444]'>{description}</div>
      </div>
    </button>
  );
}
