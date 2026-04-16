import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Calendar, Dumbbell, Settings, 
  Bell, Search, LogOut, Menu, X, Plus, ChevronDown, Package
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { user, logout, isAdmin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Update the navItems in src/components/layout/AdminLayout.jsx

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/members', label: 'Members', icon: Users },
  { path: '/admin/schedule', label: 'Schedule', icon: Calendar },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];


  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  if (!isAdmin()) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-surface-container-high border-r border-white/5 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl font-black font-headline text-white tracking-widest">ALIEN</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-fixed/10 text-primary-fixed border-l-4 border-primary-fixed'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-headline font-bold text-sm uppercase tracking-wider whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center">
              <span className="text-primary-fixed font-bold">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-headline font-bold truncate">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 truncate">System Manager</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-20 bg-surface-container-high/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          {/* Search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search members, activities, or data..."
                className="w-full bg-surface-container-high border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-fixed rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-4 pr-2 py-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm font-headline font-bold">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-primary-fixed uppercase tracking-tighter">System Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center border-2 border-primary-fixed/30">
                  <span className="text-primary-fixed font-bold">{user?.name?.charAt(0) || 'A'}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-surface-container-high border border-white/5 rounded-lg shadow-xl py-2 z-50"
                  >
                    <Link
                      to="/admin/settings"
                      className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-error hover:bg-white/5 transition-colors text-left flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
