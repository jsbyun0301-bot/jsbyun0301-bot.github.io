import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, type ReactNode } from 'react';
import {
  IPhoneShell,
  type PhoneInitialApp,
} from '@/features/mobile/components/IPhoneShell';

const MainPage = lazy(() => import('@/pages/MainPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const PrizePage = lazy(() => import('@/pages/PrizePage'));
const GitHubProfilePanel = lazy(() =>
  import('@/features/github/components/GitHubProfilePanel').then((module) => ({
    default: module.GitHubProfilePanel,
  }))
);
const SettingsPage = lazy(() =>
  import('@/features/settings/components/SettingsPage').then((module) => ({
    default: module.SettingsPage,
  }))
);
const Inobus = lazy(() => import('@/features/projects/inobus/Page'));
const Hirax = lazy(() => import('@/features/projects/hirax/Page'));
const Grace = lazy(() => import('@/features/projects/grace/Page'));
const WorkPage = lazy(() => import('@/features/work/WorkPage'));
const CardPage = lazy(() => import('@/features/card/CardPage'));
const DongnaePage = lazy(() =>
  import('@/features/projects/extra').then((m) => ({ default: m.DongnaePage }))
);
const CafePage = lazy(() =>
  import('@/features/projects/extra').then((m) => ({ default: m.CafePage }))
);
const GamePage = lazy(() =>
  import('@/features/projects/extra').then((m) => ({ default: m.GamePage }))
);
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function MobileAwareRoute({
  initialApp,
  children,
}: {
  initialApp: PhoneInitialApp;
  children: ReactNode;
}) {
  return (
    <>
      <div className='hidden min-h-screen md:block'>{children}</div>
      <div className='block h-screen md:hidden'>
        <IPhoneShell initialApp={initialApp} />
      </div>
    </>
  );
}

const AppRoutes = () => (
  <Suspense fallback={<div className='p-4 text-white/80'>Loading...</div>}>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route
        path='/profile'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'about' }}>
            <ProfilePage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/prize'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'awards' }}>
            <PrizePage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/github'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'github' }}>
            <GitHubProfilePanel />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/work'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'work' }}>
            <WorkPage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/card'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'card' }}>
            <CardPage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'settings' }}>
            <SettingsPage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/inobus'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'inobus' }}>
            <Inobus />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/hirax'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'hirax' }}>
            <Hirax />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/grace'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'grace' }}>
            <Grace />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/dongnae'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'dongnae' }}>
            <DongnaePage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/cafe'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'cafe' }}>
            <CafePage />
          </MobileAwareRoute>
        }
      />
      <Route
        path='/game'
        element={
          <MobileAwareRoute initialApp={{ kind: 'page', pageId: 'game' }}>
            <GamePage />
          </MobileAwareRoute>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
