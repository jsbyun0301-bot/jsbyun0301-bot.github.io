export function DotItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-5 mb-2.5 text-base font-bold text-[#333] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#333]">
      {children}
    </div>
  );
}
