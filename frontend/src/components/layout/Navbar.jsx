import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/components/products/Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { cart, setIsCartOpen } = useCart();

  // FIX: Safely calculate cart count
  const cartCount = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  // Base navigation links (visible to unauthenticated users)
  // Base navigation links (visible to all users). Added Plans link to ensure at least 4 options.
  // Base navigation links (visible to all users). Added Membership link to ensure at least 4 options.
  const baseLinks = [
    { to: '/plans', label: 'Plans' },
    { to: '/#gym', label: 'Visual' },
    { to: '/store', label: 'Store' },
    { to: '/login', label: 'Membership' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black font-headline text-white tracking-widest">ALIEN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Dashboard link for all authenticated users */}
            {isAuthenticated && (
              <Link
                to={isAdmin() ? '/admin' : '/programs'}
                className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider"
              >
                Dashboard
              </Link>
            )}
            {/* Visual and Store links are always available */}
            {baseLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {/* Show Dashboard link only for non‑admin users. Admins already are in admin area. */}
                  {!isAdmin() && (
                    <Link
                      to="/programs"
                      className="px-5 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform"
                    >
                      Dashboard
                    </Link>
                  )}
                  {/* Logout button for client */}
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        logout();
                        navigate('/');
                      }
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-error/10 text-error rounded-full hover:bg-error/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-headline hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

            {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-surface-container-high border-t border-white/5"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Visual and Store links are always available */}
            {baseLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block text-base font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 space-y-3">
              {isAuthenticated ? (
                <Link
                  to={isAdmin() ? '/admin' : '/programs'}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold text-center"
                >
                  {isAdmin() ? 'Admin Dashboard' : 'Client Dashboard'}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-headline text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-3 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold text-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
