import { Header, Footer } from '../components/index.js';

const YouTubeLayout = ({ onReload, isLoading, children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-[#0f0f0f] dark:text-white">
      <Header onReload={onReload} isLoading={isLoading} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default YouTubeLayout;

