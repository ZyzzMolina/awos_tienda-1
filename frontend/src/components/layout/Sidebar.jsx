import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

const Sidebar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menú hamburguesa para móvil */}
      {isMobile && (
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold tracking-wider">
            ADMIN<span className="text-blue-500">PRO</span>
          </h2>
          <button onClick={toggleMenu} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar para desktop o móvil abierto */}
      {!isMobile || isOpen ? (
        <div className={`${isMobile ? 'fixed inset-0 top-16 z-40 w-full' : 'w-64'} bg-slate-900 text-white flex flex-col 
          ${isMobile ? 'max-w-64' : 'h-full'}`}>
          {!isMobile && (
            <div className="p-6">
              <h2 className="text-2xl font-bold tracking-wider">
                ADMIN<span className="text-blue-500">PRO</span>
              </h2>
            </div>
          )}
          <nav className="flex-1 px-4 mt-6">
            <NavLink
              to="/productos"
              onClick={() => isMobile && setIsOpen(false)}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <ShoppingBag size={20} /> Inventario
            </NavLink>
          </nav>
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-400 hover:bg-slate-800 w-full px-4 py-3 rounded-lg transition"
            >
              <LogOut size={20} /> Salir
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;