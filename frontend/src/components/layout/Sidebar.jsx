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

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // En móvil, mostrar header con hamburguesa
  if (isMobile) {
    return (
      <>
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <h2 className="text-xl font-bold tracking-wider">
            ADMIN<span className="text-blue-500">PRO</span>
          </h2>
          <button onClick={toggleMenu} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Overlay cuando el menú está abierto */}
        {isOpen && (
          <div 
            className="fixed inset-0 top-16 bg-black bg-opacity-50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Menú lateral para móvil */}
        {isOpen && (
          <div className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900 text-white flex flex-col z-40">
            <nav className="flex-1 px-4 mt-6">
              <NavLink
                to="/productos"
                onClick={handleNavClick}
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
        )}
      </>
    );
  }

  // En desktop, mostrar sidebar normal
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-wider">
          ADMIN<span className="text-blue-500">PRO</span>
        </h2>
      </div>
      <nav className="flex-1 px-4 mt-6">
        <NavLink
          to="/productos"
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
  );
};

export default Sidebar;