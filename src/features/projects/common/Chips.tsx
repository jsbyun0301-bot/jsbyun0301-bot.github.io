import type { Chip } from './types';

export function Chips({ items }: { items: readonly Chip[] }) {
  return (
    <div className='flex flex-wrap gap-2.5'>
      {items.map(({ label, color }) => (
        <span
          key={label}
          className={[
            'inline-flex items-center gap-1.5',
            'px-2.5 py-1 rounded-full',
            'text-[13px] font-semibold',
            'bg-white/12 backdrop-blur-md',
            'border border-white/15 shadow-sm',
          ].join(' ')}
          style={color ? { borderColor: color } : undefined}
          title={label}
        >
          {color && (
            <span
              className='inline-block size-2 rounded-full'
              style={{ backgroundColor: color }}
            />
          )}
          {label}
        </span>
      ))}
    </div>
  );
}
