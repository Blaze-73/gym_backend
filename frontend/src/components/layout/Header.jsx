import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Bell, Grid3x3, LogOut, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-between px-8 h-20">
      <div className="flex items-center bg-surface-container-highest/50 px-4 py-2 rounded-full border border-white/5 w-96 focus-within:ring-1 focus-within:ring-primary-fixed/30 transition-all">
        <Search className="text-on-surface-variant text-xl w-5 h-5" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-neutral-600 w-full ml-2 outline-none"
          placeholder="Search parameters..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button className="text-neutral-400 hover:text-white transition-opacity">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-neutral-400 hover:text-white transition-opacity">
            <Grid3x3 className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 pl-6 border-l border-white/10"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-on-surface leading-none">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-primary-fixed uppercase tracking-tighter">
                {isAdmin() ? 'Level 9 Admin' : 'Member'}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-primary-fixed overflow-hidden bg-surface-container-high flex items-center justify-center">
              {user?.avatar ? (
                <img className="h-full w-full object-cover" src={user.avatar} alt={user.name} />
              ) : (
                <User className="w-6 h-6 text-on-surface-variant" />
              )}
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-high border border-white/5 rounded-lg shadow-xl py-2 z-50">
              <Link
                to="/profile"
                className="px-4 py-2 text-sm text-on-surface hover:bg-white/5 flex items-center gap-2"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-error hover:bg-white/5 flex items-center gap-2 text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
