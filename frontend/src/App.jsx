import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import useScrollToTop from './hooks/useScrollToTop.js';
import YouTubeLayout from './layouts/YouTubeLayout.jsx';

const App = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useScrollToTop();

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReloadKey((prev) => prev + 1);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <YouTubeLayout onReload={handleReload} isLoading={isLoading}>
      <div key={reloadKey}>
        <Outlet />
      </div>
    </YouTubeLayout>
  );
};

export default App;
