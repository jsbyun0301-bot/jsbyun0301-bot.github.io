export function Section({
  title,
  id,
  children,
  className,
}: {
  title?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={['my-6', className || ''].join(' ')}>
      {title && <div className='text-[20px] font-bold mb-[15px]'>{title}</div>}
      {children}
    </section>
  );
}
