import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Dumbbell } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login(formData);
      navigate(response.user.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Gym"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-on-primary-fixed" />
            </div>
            <div>
              <span className="text-2xl font-black font-headline text-primary-fixed tracking-wider">ALIEN</span>
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Performance</span>
            </div>
          </div>
          <h2 className="text-4xl font-black font-headline text-white mb-4">Transform Your Body</h2>
          <p className="text-on-surface-variant text-lg max-w-md">
            Join over 1,200 members who have already started their fitness journey with us.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex lg:hidden items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black font-headline text-on-surface">Welcome Back</h1>
            <p className="text-on-surface-variant mt-2">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/5 rounded-xl pl-12 pr-4 py-4 text-on-surface focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/5 rounded-xl pl-12 pr-12 py-4 text-on-surface focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-surface-container-highest border-white/5" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-primary-fixed hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 btn-primary rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-fixed hover:underline font-headline font-bold">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-surface-container-high/50 border border-white/5 rounded-xl">
            <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-3 text-center">Demo Credentials</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Admin:</span>
                <span className="text-on-surface font-mono">admin@example.com / password</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Member:</span>
                <span className="text-on-surface font-mono">client@example.com / password</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
