import { createContext, useContext, type ReactNode } from 'react';

export const PAGES_SCROLL_CONTAINER_ID = 'pages-scroll-container';

const PageScrollContainerContext = createContext<string | null>(null);

export function PageScrollContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageScrollContainerContext.Provider value={PAGES_SCROLL_CONTAINER_ID}>
      {children}
    </PageScrollContainerContext.Provider>
  );
}

export function usePageScrollContainerId() {
  return useContext(PageScrollContainerContext) ?? undefined;
}
