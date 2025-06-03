import { Outlet, Navigate } from 'react-router';
import useThemeStore from './stores/useThemeStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className='h-screen' data-theme={theme}>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
