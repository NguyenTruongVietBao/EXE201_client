import { Outlet } from 'react-router';
import useThemeStore from './stores/useThemeStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function App() {
  const { theme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email_verified_at) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className='h-screen' data-theme={theme}>
      {isAuthenticated && <Header />}
      <Outlet />
      <Toaster />
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
