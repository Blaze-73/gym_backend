import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, Check } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Image & Text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Gym Equipment"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-center p-16 max-w-xl">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <span className="text-3xl font-black font-headline text-white tracking-widest">ALIEN</span>
          </Link>

          <div className="mb-8">
            <span className="inline-block px-4 py-1 bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed text-xs font-headline font-bold uppercase tracking-wider rounded-full mb-4">
              Premium Fitness Experience
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black font-headline leading-tight mb-6">
            <span className="text-white">REDEFINE</span><br />
            <span className="text-gray-400">YOUR</span><br />
            <span className="text-primary-fixed">LIMITS.</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Join an exclusive community of athletes. Access world-class equipment, personalized coaching, and a space designed for peak performance.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=100&q=80`}
                    alt="Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-headline font-bold">Join 2,400+ elite members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black font-headline text-white">Create Account</h1>
              <p className="text-gray-400 text-sm mt-1">Start your transformation journey today.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/login" className="text-sm font-headline text-gray-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="px-5 py-2 bg-white text-black rounded-full text-sm font-headline font-bold">Join Now</Link>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-600"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-600"
                  placeholder="06 25 12 54 25"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black font-headline font-bold text-sm uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-fixed hover:underline font-headline font-bold">
              Sign In
            </Link>
          </p>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500 uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-headline">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-headline">Apple</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
