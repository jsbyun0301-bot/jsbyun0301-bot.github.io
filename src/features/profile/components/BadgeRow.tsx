import type { Badge } from '../types';

export function BadgeRow({ title, items }: { title: string; items: Badge[] }) {
  return (
    <div className='border border-[#e2e2e2] rounded-[14px] p-4 bg-[#fafafa] shadow-sm'>
      <div className='text-[16px] font-bold mb-2'>{title}</div>
      <div className='flex flex-wrap gap-2'>
        {items.map((b) => (
          <img key={b.label} src={b.imgUrl} alt={b.label} />
        ))}
      </div>
    </div>
  );
}
