import { useEffect } from 'react';

type PreloadPriority = 'auto' | 'high' | 'low';
type IdleSchedulerWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const preloadedImages = new Set<string>();

function hasImagePreloadLink(src: string) {
  return Array.from(
    document.head.querySelectorAll<HTMLLinkElement>(
      'link[rel="preload"][as="image"]'
    )
  ).some((link) => link.href === new URL(src, window.location.href).href);
}

function ensurePreloadLink(src: string, priority: PreloadPriority) {
  if (hasImagePreloadLink(src)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;

  if (priority !== 'auto') {
    link.setAttribute('fetchpriority', priority);
  }

  document.head.appendChild(link);
}

export function preloadImage(
  src: string,
  priority: PreloadPriority = 'auto'
) {
  if (typeof window === 'undefined' || !src || preloadedImages.has(src)) {
    return;
  }

  preloadedImages.add(src);
  ensurePreloadLink(src, priority);

  const image = new Image();
  image.decoding = 'async';

  if (priority !== 'auto') {
    image.setAttribute('fetchpriority', priority);
  }

  image.src = src;
}

function scheduleWarmPreload(src: string) {
  if (typeof window === 'undefined' || !src || preloadedImages.has(src)) {
    return () => {};
  }

  const idleWindow = window as IdleSchedulerWindow;

  if (typeof idleWindow.requestIdleCallback === 'function') {
    const handle = idleWindow.requestIdleCallback(() => preloadImage(src));
    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const timeoutId = window.setTimeout(() => preloadImage(src), 150);
  return () => window.clearTimeout(timeoutId);
}

export function useImagePreload(
  images: readonly string[],
  { enabled = true }: { enabled?: boolean } = {}
) {
  const imageKey = images.filter(Boolean).join('|');

  useEffect(() => {
    if (!enabled) return;

    const orderedImages = imageKey.split('|').filter(Boolean);
    const [firstImage, ...remainingImages] = orderedImages;

    if (firstImage) {
      preloadImage(firstImage, 'high');
    }

    const cleanupFns = remainingImages.map((src) => scheduleWarmPreload(src));

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [enabled, imageKey]);
}
