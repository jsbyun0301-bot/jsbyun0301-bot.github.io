type FieldRowProps = {
  label: string;
  children: React.ReactNode;
};

export function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full px-3 md:px-4 py-6 leading-relaxed text-[#333] bg-[#f9f9f9] break-keep'>
      <div className='max-w-7xl mx-auto'>{children}</div>
    </div>
  );
}

export function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div
      className={[
        'grid grid-cols-1 md:grid-cols-12 items-start gap-3',
        'py-2 border-b border-[#e5e7eb] last:border-b-0',
      ].join(' ')}
    >
      <div className='md:col-span-2 text-sm md:text-[15px] font-semibold'>
        {label}
      </div>
      <div className='md:col-span-10 min-w-0 text-[15px]'>{children}</div>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='text-2xl font-extrabold mt-0 mb-3 text-black'>{children}</h2>
  );
}

export function Divider() {
  return <hr className='w-full h-px bg-gray-300 border-0 my-2.5' />;
}
