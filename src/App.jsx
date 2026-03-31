import { Outlet } from 'react-router';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import useThemeStore from './stores/useThemeStore';

function App() {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen" data-theme={theme}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
