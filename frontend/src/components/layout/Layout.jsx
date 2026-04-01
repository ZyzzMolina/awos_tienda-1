import Sidebar from './Sidebar';
import useIsMobile from '../../hooks/useIsMobile';

const Layout = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col ${!isMobile && 'h-screen'} bg-slate-100`}>
      <Sidebar />
      <main className={`${!isMobile ? 'flex-1 overflow-y-auto' : 'overflow-y-auto pb-4'} p-4 md:p-8`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;