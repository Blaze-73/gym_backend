import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Dumbbell, Utensils, Users,
  Settings, LogOut, Menu, X, ShoppingBag, ShoppingCart,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { NotificationBell } from '@/components/common/NotificationDropdown';
import CartDrawer from '@/components/common/CartDrawer';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/programs'  },
  { icon: Dumbbell,        label: 'Workouts',   path: '/workout'   },
  { icon: Utensils,        label: 'Nutrition',  path: '/nutrition' },
  { icon: Users,           label: 'Coaches',    path: '/coaches'   },
  { icon: ShoppingBag,     label: 'Store',      path: '/store'     },
  { icon: Settings,        label: 'Settings',   path: '/settings'  },
];

/* ── shared nav link with animated active bar ── */
const NavLink = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${isActive ? 'bg-primary-fixed/10 text-primary-fixed' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      {isActive && (
        <motion.span
          layoutId="clientActiveBar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-primary-fixed"
        />
      )}
      <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'text-primary-fixed' : 'group-hover:scale-110'}`} />
      <span className="font-headline font-bold text-sm uppercase tracking-wider">{item.label}</span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-fixed shadow-[0_0_6px_#daf900]" />}
    </Link>
  );
};

/* ── sidebar body content (shared desktop + drawer) ── */
const SidebarBody = ({ onClose, location, user, onLogout }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
      <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-sm bg-primary-fixed shadow-[0_0_8px_#daf900]" />
        <span className="text-xl font-black font-headline text-white tracking-widest">ALIEN</span>
      </Link>
      {onClose && (
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>

    {/* User strip */}
    <div className="px-5 py-4 border-b border-white/5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-fixed/20 border border-primary-fixed/40 flex items-center justify-center flex-shrink-0">
          <span className="text-primary-fixed font-black font-headline text-lg leading-none">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-headline font-bold text-white text-sm truncate">{user?.name || 'Athlete'}</p>
          <p className="text-[11px] text-primary-fixed uppercase tracking-wider truncate">Member</p>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <p className="px-4 mb-3 text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-gray-600">Navigation</p>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          item={item}
          isActive={item.path === '/programs' ? location.pathname === '/programs' : location.pathname.startsWith(item.path)}
          onClick={onClose}
        />
      ))}
    </nav>

    {/* Logout */}
    <div className="px-3 py-4 border-t border-white/5 flex-shrink-0">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-error
                   hover:bg-error/10 rounded-xl transition-all duration-200 group"
      >
        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="font-headline font-bold text-sm uppercase tracking-wider">Logout</span>
      </button>
    </div>
  </div>
);

/* ══════════════════════════════════════════ */
const ClientSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try { logout(); } catch { /* ignore */ }
      localStorage.removeItem('token');
      window.location.replace('/');
    }
  };

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Cart drawer — rendered at root level of this component */}
      <CartDrawer />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[50]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="lg:hidden fixed left-0 top-0 h-full w-[280px] z-[55] bg-[#111] border-r border-white/5"
          >
            <SidebarBody onClose={() => setIsOpen(false)} location={location} user={user} onLogout={handleLogout} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[280px] z-40 bg-[#111] border-r border-white/5">
        <SidebarBody onClose={null} location={location} user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile top header — logo LEFT, controls RIGHT */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[45] h-16 bg-[#111]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-primary-fixed shadow-[0_0_6px_#daf900]" />
          <span className="text-lg font-black font-headline text-white tracking-widest">ALIEN</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Notification bell */}
          <NotificationBell />

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-400 hover:text-white transition-colors touch-manipulation"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-0.5
                               bg-primary-fixed text-black text-[9px] font-black rounded-full
                               flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Burger */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white/5 border border-white/10 rounded-lg touch-manipulation hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-error/10 text-error rounded-lg
                       hover:bg-error/20 transition-colors touch-manipulation text-xs font-headline font-bold uppercase"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Out</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default ClientSidebar;