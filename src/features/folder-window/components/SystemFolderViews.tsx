export function EmptyFolderView({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='grid h-full place-items-center p-8 text-center'>
      <div className='max-w-[420px]'>
        <div className='text-[24px] font-semibold text-[#0f172a]'>{title}</div>
        <div className='mt-3 text-sm leading-7 text-[#64748b]'>
          {description}
        </div>
      </div>
    </div>
  );
}
