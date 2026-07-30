import { WALLPAPERS } from '@/features/desktop/config/shell';
import {
  useDesktopPreferencesStore,
  useDesktopTextFilesStore,
} from '@/stores';

export function SettingsPage() {
  const wallpaperId = useDesktopPreferencesStore((s) => s.wallpaperId);
  const setWallpaper = useDesktopPreferencesStore((s) => s.setWallpaper);
  const soundEnabled = useDesktopPreferencesStore((s) => s.soundEnabled);
  const toggleSound = useDesktopPreferencesStore((s) => s.toggleSound);
  const lastBrowserUrl = useDesktopPreferencesStore((s) => s.lastBrowserUrl);
  const recentLauncherIds = useDesktopPreferencesStore((s) => s.recentLauncherIds);
  const lastOpenedFileId = useDesktopTextFilesStore((s) => s.lastOpenedFileId);

  return (
    <div className='min-h-full bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] p-6 text-[#0f172a]'>
      <div className='mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]'>
        <section className='rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]'>
          <div className='text-[30px] font-semibold tracking-[-0.04em]'>
            Personalization
          </div>
          <p className='mt-3 max-w-[700px] text-sm leading-7 text-[#475569]'>
            현재 셸은 배경과 일부 데스크톱 선호도를 localStorage에 저장합니다.
            배경을 바꾸면 다음 방문에도 그대로 유지됩니다.
          </p>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            {Object.values(WALLPAPERS).map((wallpaper) => (
              <button
                key={wallpaper.id}
                onClick={() => setWallpaper(wallpaper.id)}
                className={[
                  'rounded-[24px] border p-3 text-left transition-transform hover:-translate-y-0.5',
                  wallpaper.id === wallpaperId
                    ? 'border-[#7dc1ff] bg-[#edf6ff] shadow-[0_18px_40px_rgba(13,97,216,0.14)]'
                    : 'border-[#dbe4f0] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]',
                ].join(' ')}
              >
                <div className='h-32 rounded-[18px]' style={wallpaper.style} />
                <div className='mt-4 flex items-center justify-between gap-3'>
                  <div>
                    <div className='text-base font-semibold'>{wallpaper.label}</div>
                    <div className='mt-1 text-sm text-[#64748b]'>{wallpaper.id}</div>
                  </div>
                  {wallpaper.id === wallpaperId ? (
                    <span className='rounded-full bg-[#0b61d8] px-3 py-1 text-xs font-semibold text-white'>
                      Active
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className='space-y-5'>
          <div className='rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]'>
            <div className='text-[24px] font-semibold tracking-[-0.03em]'>
              Desktop preferences
            </div>
            <button
              onClick={toggleSound}
              className='mt-5 flex w-full items-center justify-between rounded-[22px] border border-[#dbe4f0] bg-[#f8fafc] px-4 py-4 text-left transition-colors hover:bg-white'
            >
              <div>
                <div className='text-sm font-semibold'>System sound</div>
                <div className='mt-1 text-sm text-[#64748b]'>
                  클릭과 전환 효과음 사용 여부
                </div>
              </div>
              <div className='rounded-full bg-[#0f172a] px-3 py-1 text-xs font-semibold text-white'>
                {soundEnabled ? 'On' : 'Off'}
              </div>
            </button>

            <div className='mt-4 rounded-[22px] border border-[#dbe4f0] bg-[#f8fafc] p-4 text-sm leading-7 text-[#334155]'>
              마지막 Browser URL: {lastBrowserUrl ?? '기록 없음'}
              <br />
              마지막 Notepad 파일: {lastOpenedFileId}
              <br />
              최근 실행 launcher 수: {recentLauncherIds.length}
            </div>
          </div>

          <div className='rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]'>
            <div className='text-[24px] font-semibold tracking-[-0.03em]'>
              Storage notes
            </div>
            <ul className='mt-4 space-y-3 text-sm leading-7 text-[#475569]'>
              <li>`desktop_layout` 에 바탕화면 아이콘 위치 저장</li>
              <li>`desktop_preferences` 에 배경, 소리, 최근 launcher 기록 저장</li>
              <li>`desktop_text_files` 에 텍스트 파일 상태 저장</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
