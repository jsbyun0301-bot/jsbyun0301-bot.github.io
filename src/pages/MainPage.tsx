import { useEffect, useState } from 'react';
import { getWallpaperStyle } from '@/features/desktop/config/shell';
import { DesktopSurface } from '@/features/desktop/components/DesktopSurface';
import { DESKTOP_FEATURED_ASSETS } from '@/config/featured-assets';
import { useDesktopPreferencesStore } from '@/stores';
import Desktop from '@/features/desktop/components/Desktop';
import { IPhoneShell } from '@/features/mobile/components/IPhoneShell';
import { useImagePreload } from '@/utils/preloadAssets';

export default function MainPage() {
  const wallpaperId = useDesktopPreferencesStore((s) => s.wallpaperId);
  const [preloadDesktopAssets, setPreloadDesktopAssets] = useState(() =>
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const update = () => setPreloadDesktopAssets(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useImagePreload(DESKTOP_FEATURED_ASSETS, { enabled: preloadDesktopAssets });

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div
        className='
          relative hidden h-full w-full
          bg-cover bg-center bg-no-repeat
          text-white md:block
        '
        style={getWallpaperStyle(wallpaperId)}
      >
        <DesktopSurface />
        <Desktop />
      </div>
      <div className='block h-full w-full md:hidden'>
        <IPhoneShell />
      </div>
    </div>
  );
}
