import { Outlet } from 'react-router';
import useThemeStore from './stores/useThemeStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className='min-h-screen' data-theme={theme}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
