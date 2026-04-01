import Sidebar from './Sidebar';
import useIsMobile from '../../hooks/useIsMobile';

const Layout = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${!isMobile && 'h-screen'} bg-slate-100`}>
      <Sidebar />
      <main className={`${isMobile ? 'w-full mt-16' : 'flex-1'} overflow-y-auto p-4 md:p-8`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;