import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, Heart, TrendingUp, Users, Award, Zap,
  Menu, X, Star, ChevronDown, CheckCircle,
  Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter,
  ArrowRight, Flame, Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const gymRef = useRef(null);
  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Plans', href: '/plans' },
    { name: 'Visual', href: '#gym', scroll: true },
    { name: 'Store', href: '/store' },
    { name: 'Membership', href: '/login', requireAuth: true },
  ];

  const handleNavClick = (link, e) => {
    e.preventDefault();
    if (link.requireAuth && !isAuthenticated) {
      navigate('/login');
      return;
    }
    if (link.scroll && gymRef.current) {
      gymRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(link.href);
  };

  const testimonials = [
    { name: 'Marcus T.', role: 'Member since 2022', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', rating: 5, text: 'Best gym experience ever! The equipment is top-notch and the trainers really care about your progress.' },
    { name: 'James R.', role: 'Elite Member', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', rating: 5, text: 'Transformed my life completely. Down 40lbs and feeling stronger than I ever have. The community here is incredible.' },
    { name: 'David K.', role: 'Member since 2023', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', rating: 5, text: 'Worth every penny. The 24/7 access fits my schedule perfectly and the facilities are always clean.' },
    { name: 'Sarah M.', role: 'Premium Member', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', rating: 4, text: 'Great equipment and knowledgeable staff. The group classes are my favorite part of the membership.' },
    { name: 'Alex P.', role: 'Member since 2021', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80', rating: 5, text: 'The tracking system keeps me accountable. I can see my progress over time which motivates me to keep going.' },
  ];

  const programs = [
    { icon: Heart, title: 'Cardio Training', desc: 'Boost endurance and heart health with high-energy cardio sessions', price: '$29/PLAN', color: 'from-red-500/20 to-red-600/20', iconColor: 'text-red-400' },
    { icon: Zap, title: 'Strength Build', desc: 'Develop power and resilience through expert-designed strength workouts', price: '$39/PLAN', color: 'from-primary-fixed/20 to-primary-fixed/10', iconColor: 'text-primary-fixed', popular: true },
    { icon: TrendingUp, title: 'Fat Loss', desc: 'Drop pounds safely with dynamic workouts and fat-burning routines', price: '$35/PLAN', color: 'from-orange-500/20 to-orange-600/20', iconColor: 'text-orange-400' },
    { icon: Clock, title: 'HIIT Workouts', desc: 'Push limits with short, intense high-interval training sessions', price: '$45/PLAN', color: 'from-purple-500/20 to-purple-600/20', iconColor: 'text-purple-400' },
  ];

  const features = [
    { icon: Heart, title: 'Nutrition Guidance', desc: 'Personalized meal plans' },
    { icon: TrendingUp, title: 'Progress Tracking', desc: 'Monitor improvements' },
    { icon: Users, title: 'Community Support', desc: 'Train together' },
    { icon: Award, title: 'Expert Trainers', desc: 'Certified professionals' },
    { icon: Star, title: 'Premium Membership', desc: 'Exclusive access' },
    { icon: Dumbbell, title: 'Fitness Spaces', desc: 'Dedicated areas' },
  ];

  // Floating animation variants for stat cards
  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation removed – using global Navbar component */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* White Smoke/Glow Effect Behind Athlete */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          {/* Main glow */}
          <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl"></div>
          {/* Inner bright glow */}
          <div className="absolute inset-20 bg-white/10 rounded-full blur-2xl"></div>
          {/* Core light */}
          <div className="absolute inset-40 bg-white/15 rounded-full blur-xl"></div>
          {/* Smoke effect layers */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-l from-white/5 via-white/8 to-white/5 rounded-full blur-3xl"
          />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-fixed/5 via-black/80 to-black"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed text-xs font-headline font-bold uppercase tracking-wider rounded-full mb-6">
              Premium Fitness Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-headline leading-tight mb-8"
          >
            <span className="text-white">REDEFINE</span><br />
            <span className="text-gray-400">YOUR</span><br />
            <span className="text-primary-fixed">LIMITS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Join an exclusive community of athletes. Access world-class equipment, personalized coaching, and a space designed for peak performance.
          </motion.p>

          {/* Hero Image with Floating Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mb-16"
          >
            <div className="relative inline-block">
              {/* White smoke/glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-10 bg-white/15 rounded-full blur-2xl"></div>
                <div className="absolute inset-20 bg-white/20 rounded-full blur-xl"></div>
              </div>

              {/* Main Athlete Image */}
              <img
                src="https://imgs.search.brave.com/Q_CgjZCTVbnOvLRVYSb5gGMZgzEf9Z69rxouqP7BWXU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDcw/MDYyNTE2L3Bob3Rv/L3N0cm9uZy1tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTdDbGhWc0l4WU0y/d25YaWlVR3UwTkhD/OXJjSXNhMG5rS2JE/eEdyd0xuaG89"
                alt="Strong Athlete"
                className="relative w-[400px] md:w-[600px] h-auto object-contain drop-shadow-2xl z-10"
              />
              
              {/* Floating Stat Cards - Animated */}
              <motion.div
                variants={floatVariants}
                animate="float"
                className="absolute top-10 -left-8 md:-left-16 bg-surface-container-high/90 backdrop-blur-xl border border-primary-fixed/30 rounded-2xl p-4 shadow-2xl shadow-primary-fixed/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-primary-fixed" />
                  </div>
                  <div>
                    <p className="text-2xl font-black font-headline text-primary-fixed">850</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Calories</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatVariants}
                animate="float"
                transition={{ delay: 0.5 }}
                className="absolute top-10 -right-8 md:-right-16 bg-surface-container-high/90 backdrop-blur-xl border border-primary-fixed/30 rounded-2xl p-4 shadow-2xl shadow-primary-fixed/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-fixed" />
                  </div>
                  <div>
                    <p className="text-2xl font-black font-headline text-primary-fixed">2.4K</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Members</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatVariants}
                animate="float"
                transition={{ delay: 1 }}
                className="absolute bottom-10 -left-8 md:-left-16 bg-surface-container-high/90 backdrop-blur-xl border border-primary-fixed/30 rounded-2xl p-4 shadow-2xl shadow-primary-fixed/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary-fixed" />
                  </div>
                  <div>
                    <p className="text-2xl font-black font-headline text-primary-fixed">150+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Workouts</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatVariants}
                animate="float"
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 -right-8 md:-right-16 bg-surface-container-high/90 backdrop-blur-xl border border-primary-fixed/30 rounded-2xl p-4 shadow-2xl shadow-primary-fixed/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-fixed" />
                  </div>
                  <div>
                    <p className="text-2xl font-black font-headline text-primary-fixed">50+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Trainers</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating particles around */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0,
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                  }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    y: [0, -100, 0],
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute w-2 h-2 bg-primary-fixed rounded-full blur-sm"
                  style={{
                    left: `${50 + (Math.random() * 40 - 20)}%`,
                    top: `${50 + (Math.random() * 40 - 20)}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/register"
              className="group px-10 py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              REGISTER NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/store"
              className="px-10 py-4 bg-transparent border-2 border-white/20 text-white font-headline font-bold text-sm uppercase tracking-widest rounded-full hover:border-primary-fixed hover:bg-primary-fixed/10 transition-all"
            >
              BROWSE GEAR
            </Link>
          </motion.div>

          {/* Member Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                  <img
                    src={`https://imgs.search.brave.com/FWHa9QRttw1JSSHVgTxnaCCKeCisCTYKWv3idxlo3AI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy8zMzU0NTUv/cHJvZmlsZS1kZWZh/dWx0LnN2Zw`}
                    alt="Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Join <span className="text-white font-bold">2,400+</span> elite members</p>
          </motion.div>

          {/* Moving Brand Logos - Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-20 overflow-hidden"
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">Trusted by athletes using</p>
            <div className="relative">
              <motion.div
                animate={{ x: [0, -1200] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="flex gap-20 whitespace-nowrap"
              >
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-20">
                    {['PUMA', 'NIKE', 'adidas', 'THE NORTH FACE', 'UNDER ARMOUR', 'REEBOK'].map((brand, i) => (
                      <div key={i} className="text-3xl font-bold text-white/30 hover:text-white/80 transition-colors cursor-default">
                        {brand}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social Links - Left Side */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-30">
          <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-primary-fixed hover:text-primary-fixed transition-colors bg-black/50 backdrop-blur">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-primary-fixed hover:text-primary-fixed transition-colors bg-black/50 backdrop-blur">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-primary-fixed hover:text-primary-fixed transition-colors bg-black/50 backdrop-blur">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        >
          <ChevronDown className="w-8 h-8 text-primary-fixed animate-bounce" />
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-fixed/10 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"
                alt="Barbell"
                className="relative rounded-3xl w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
                Welcome To Our <span className="text-primary-fixed">GYM</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Here you will find <span className="text-primary-fixed">all what</span> you need to change your <span className="text-primary-fixed">life</span> and shape it to the <span className="text-primary-fixed">better</span>
              </p>
            </motion.div>
          </div>

          {/* Training Images - More Men */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary-fixed/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <img
                src="https://imgs.search.brave.com/Y9m3i-BszonMfoOA304q7BxXzWJuxqSNxLc1-8WXOYs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NjM5MTM1OS9waG90/by9tYWxlLWZpdG5l/c3MtY29hY2gtd2F0/Y2hpbmctYXMtYXRo/bGV0ZXMtYXJyaXZl/LWZvci13b3Jrb3V0/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0xRXd3S2wzRmlx/RUZscTZac2pnYTFL/eDlUZndxcXNtczdN/SUZwSlNKY0xJPQ"
                alt="Male Training"
                className="relative rounded-3xl w-full object-cover"
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-headline font-bold text-lg">Strength Training</p>
                <p className="text-gray-400 text-sm">For Men</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary-fixed/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <img
                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"
                alt="Female Training"
                className="relative rounded-3xl w-full object-cover"
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-headline font-bold text-lg">Fitness & Cardio</p>
                <p className="text-gray-400 text-sm">For Women</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gym Interior Section */}
      <section ref={gymRef} id="gym" className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black font-headline text-center mb-16"
          >
            What The <span className="text-primary-fixed">GYM</span> Looks Like From Inside
          </motion.h2>

          {/* Space */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-3xl font-black font-headline text-primary-fixed mb-4">SPACE</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                <span className="text-primary-fixed">Spacious</span> and well optimized for good <span className="text-primary-fixed">airflow</span> to guarantee a <span className="text-primary-fixed">comfortable</span> session to our dear customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="Gym Space"
                className="rounded-3xl w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Machines */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80"
                alt="Gym Machines"
                className="rounded-3xl w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black font-headline text-primary-fixed mb-4">MACHINES</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                The <span className="text-primary-fixed">GYM</span> is equipped with the latest most efficient <span className="text-primary-fixed">machines</span> to <span className="text-primary-fixed">grant</span> a great experience for the user
              </p>
            </motion.div>
          </div>

          {/* Staff */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-3xl font-black font-headline text-primary-fixed mb-4">STAFF</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                In This <span className="text-primary-fixed">GYM</span> You Will Find all what you <span className="text-primary-fixed">need</span> Whether its an <span className="text-primary-fixed">exceptional coach</span> or a great staff to <span className="text-primary-fixed">help Guide</span> you With whatever you <span className="text-primary-fixed">need</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.pexels.com/photos/33846716/pexels-photo-33846716.jpeg"
                alt="Gym Staff"
                className="rounded-3xl w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 bg-surface-container-high/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black font-headline">
              Inspired to <span className="text-primary-fixed">Inspire Your Best Self</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We're Your Partner In Achieving A Healthier, Stronger, And More Confident You. Elevate your potential with our elite coaching.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container-high border border-white/5 rounded-3xl p-8 md:p-12 mb-24"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary-fixed/20 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary-fixed" />
                    </div>
                    <div>
                      <span className="text-sm font-headline text-white block">{feature.title}</span>
                      <span className="text-xs text-gray-500">{feature.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80"
                  alt="Athlete"
                  className="w-[300px] h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-black font-headline mb-4">
              Discover <span className="text-primary-fixed">What Sets Us Apart</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-gradient-to-br ${program.color} border border-white/5 rounded-2xl p-6 hover:border-primary-fixed/30 transition-all group ${program.popular ? 'ring-2 ring-primary-fixed' : ''}`}
              >
                {program.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                    Popular
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${program.popular ? 'bg-primary-fixed' : 'bg-white/5'}`}>
                  <program.icon className={`w-6 h-6 ${program.popular ? 'text-on-primary-fixed' : program.iconColor}`} />
                </div>
                <h4 className="text-xl font-headline font-bold mb-2">{program.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{program.desc}</p>
                <button className="px-6 py-2 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full hover:scale-105 transition-transform">
                  {program.price}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Auto Scrolling */}
      <section ref={reviewsRef} className="py-24 px-4 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black font-headline text-center mb-4"
          >
            Customer <span className="text-primary-fixed">Reviews</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-12 h-12 fill-primary-fixed text-primary-fixed" />
              <span className="text-6xl font-black font-headline text-white">4.8/5</span>
            </div>
            <p className="text-gray-400 text-lg">Based on 2,784 reviews</p>
          </motion.div>

          {/* Auto-Scrolling Testimonials */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: -currentTestimonial * (350 + 24) }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-6"
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="min-w-[350px] bg-surface-container-high border border-white/5 rounded-2xl p-6 flex-shrink-0"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary-fixed text-primary-fixed" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-headline font-bold text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'w-8 bg-primary-fixed' : 'bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-primary-fixed/10 to-primary-fixed/5 border border-primary-fixed/20 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-fixed/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black font-headline text-white uppercase mb-4">
                Ready to Begin?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Join today and get your first week free. No commitments, no hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="group px-8 py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-all inline-flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/store" className="px-8 py-4 bg-surface-container-high text-white font-headline font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors border border-white/5">
                  Browse Store
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-2xl font-black font-headline text-white tracking-widest">ALIEN</span>
              <p className="text-gray-400 text-sm mt-4">Redefine Your Limits.</p>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/store" className="hover:text-primary-fixed transition-colors">Store</Link></li>
                <li><Link to="/login" className="hover:text-primary-fixed transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary-fixed transition-colors">Register</Link></li>
                <li><Link to="/plans" className="hover:text-primary-fixed transition-colors">Plans</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@alien.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Fitness St</li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Mon - Fri: 24 Hours</li>
                <li>Saturday: 24 Hours</li>
                <li>Sunday: 24 Hours</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 ALIEN Performance. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary-fixed/30 z-50"
      >
        <svg className="w-7 h-7 text-on-primary-fixed" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Home;
