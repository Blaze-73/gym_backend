import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, Users, Dumbbell, CreditCard, 
  Calendar, Settings, HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Members', icon: Users },
    { path: '/admin/products', label: 'Products', icon: Dumbbell },
    { path: '/admin/orders', label: 'Revenue', icon: CreditCard },
    { path: '/admin/schedule', label: 'Schedule', icon: Calendar },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const clientNavItems = [
    { path: '/profile', label: 'Profile', icon: Users },
    { path: '/attendance', label: 'Attendance', icon: Dumbbell },
    { path: '/orders', label: 'Orders', icon: CreditCard },
    { path: '/plans', label: 'Plans', icon: Calendar },
    { path: '/store', label: 'Store', icon: LayoutDashboard },
  ];

  const navItems = isAdmin() ? adminNavItems : clientNavItems;

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-neutral-900 border-r border-white/5 flex flex-col h-full py-8 px-4 z-50">
      <div className="mb-12 px-4">
        <h1 className="text-2xl font-black tracking-[0.1em] text-primary-fixed font-headline">
          {isAdmin() ? 'ALIEN' : 'FITNESS'}
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant font-headline mt-1">
          {isAdmin() ? 'PERFORMANCE' : 'MANAGEMENT'}
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive
                  ? 'flex items-center gap-4 px-4 py-3 rounded text-primary-fixed font-bold border-r-4 border-primary-fixed bg-white/5 font-headline tracking-wider uppercase text-sm'
                  : 'flex items-center gap-4 px-4 py-3 rounded text-neutral-500 hover:text-white transition-colors font-headline tracking-wider uppercase text-sm hover:bg-neutral-800/50'
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6 px-4">
        {isAdmin() && (
          <button className="w-full py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-xs tracking-widest rounded hover:scale-[0.98] transition-transform uppercase">
            LOG WORKOUT
          </button>
        )}
        <Link to="/support" className="flex items-center gap-4 px-4 py-3 rounded text-neutral-500 hover:text-white transition-colors font-headline tracking-wider uppercase text-sm hover:bg-neutral-800/50">
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
