import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Calendar, Utensils, Users, Settings, LogOut, Menu, X, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ClientSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Removed duplicate "Programs" entry; Dashboard already points to /programs
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/programs' },
    { icon: Dumbbell, label: 'Workouts', path: '/workout' },
    { icon: Utensils, label: 'Nutrition', path: '/nutrition' },
    { icon: Users, label: 'Coaches', path: '/coaches' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      // After logout, return to landing page
      navigate('/');
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface-container-high border border-white/10 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : 0 }}
        className="fixed left-0 top-0 h-full w-64 bg-surface-container-high border-r border-white/5 z-50 lg:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black font-headline text-white tracking-widest">ALIEN</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
              <span className="text-primary-fixed font-bold text-lg">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="font-headline font-bold text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 uppercase">{user?.role || 'Client'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-fixed/10 text-primary-fixed'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-headline font-bold text-sm uppercase">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-headline font-bold text-sm uppercase">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default ClientSidebar;
