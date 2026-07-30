import { BrowserRouter } from 'react-router-dom';
import { useExternalBrowserRedirect } from './hooks/useExternalBrowserRedirect';
import { useSeoMetadata } from './hooks/useSeoMetadata';
import AppRoutes from './routes/AppRoutes.tsx';
import FullscreenGate from '@/components/FullscreenGate/FullscreenGate.tsx';

function AppShell() {
  useExternalBrowserRedirect();
  useSeoMetadata();

  return (
    <>
      <FullscreenGate />
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
