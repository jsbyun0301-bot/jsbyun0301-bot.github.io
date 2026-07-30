import { useCallback, useEffect, useState } from 'react';

export function useFullscreen(target?: HTMLElement | null) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    !!document.fullscreenElement
  );

  const request = useCallback(async () => {
    const el = target ?? document.documentElement;
    if (document.fullscreenElement) return;
    await el.requestFullscreen();
  }, [target]);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  return { isFullscreen, request, exit };
}
