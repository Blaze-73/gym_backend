import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const Plans = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'STARTER PULSE',
      price: 49,
      period: '/month',
      popular: false,
      features: [
        '24/7 Access to Gym',
        'Standard Equipment',
        'Locker Room Access',
        'Personal Trainer',
      ],
      savings: null,
    },
    {
      id: 2,
      name: 'INTERSTELLAR',
      price: 399,
      period: '/month',
      popular: true,
      savings: 'SAVE $188 ANNUALLY',
      features: [
        'VIP 24/7 Access',
        'All Premium Equipment',
        'Sauna & Steam Room',
        '12 Free Trainer Sessions',
        'Alien Nutrition Plan',
        'Priority Booking',
        'Guest Passes (2/month)',
      ],
    },
    {
      id: 3,
      name: 'ALPHA ORBIT',
      price: 129,
      period: '/month',
      popular: false,
      features: [
        '24/7 Access to Gym',
        'All Standard Equipment',
        '3 Free Guest Passes',
        'Recovery Zone Access',
      ],
    },
  ];

  const handleJoinPlan = (plan) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleConfirmRequest = () => {
    // This would send a request to the backend
    console.log('Membership request sent for plan:', selectedPlan);
    setShowModal(false);
    // Show success message
    alert('Your membership request has been sent to admin for approval. You will be notified once approved.');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black font-headline text-white tracking-widest">ALIEN</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
               <Link to="/plans" className="text-sm font-headline text-primary-fixed transition-colors uppercase tracking-wider">Plans</Link>
               <Link to="/#gym" className="text-sm font-headline text-gray-400 hover:text-white transition-colors uppercase tracking-wider">Visual</Link>
               <Link to="/store" className="text-sm font-headline text-gray-400 hover:text-white transition-colors uppercase tracking-wider">Store</Link>
               {/* Show Dashboard for authenticated users, otherwise show Membership (login) */}
               {isAuthenticated ? (
                 <Link to="/programs" className="text-sm font-headline text-gray-400 hover:text-white transition-colors uppercase tracking-wider">Dashboard</Link>
               ) : (
                 <Link to="/login" className="text-sm font-headline text-gray-400 hover:text-white transition-colors uppercase tracking-wider">Membership</Link>
               )}
            </div>

            <div className="flex items-center gap-4">
               {isAuthenticated ? (
                 <Link to="/programs" className="px-6 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform">
                   Dashboard
                 </Link>
               ) : (
                 <>
                   <Link to="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-headline hover:bg-white/10 transition-colors">
                     Login
                   </Link>
                   <Link to="/register" className="px-6 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform">
                     Sign In
                   </Link>
                 </>
               )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="text-primary-fixed text-lg font-headline uppercase tracking-widest">
              Build Power
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-headline mb-6"
          >
            CHOOSE YOUR <span className="text-primary-fixed">LEVEL.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Unlock your alien potential with our premium membership plans. No excuses, just results.
          </motion.p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-surface-container-high border rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? 'border-primary-fixed shadow-2xl shadow-primary-fixed/20 scale-105'
                    : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase tracking-wider rounded-full">
                    Best Value
                  </div>
                )}

                {plan.savings && (
                  <div className="text-center mb-4">
                    <span className="text-xs text-primary-fixed font-headline uppercase tracking-wider">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-headline font-bold text-white uppercase mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black font-headline text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-fixed/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-fixed" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleJoinPlan(plan)}
                  className={`w-full py-4 font-headline font-bold text-sm uppercase tracking-widest rounded-full transition-all ${
                    plan.popular
                      ? 'bg-primary-fixed text-on-primary-fixed hover:scale-105'
                      : 'bg-surface-container-highest text-white hover:bg-white/10'
                  }`}
                >
                  JOIN NOW
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-12 border-y border-white/5 bg-surface-container-high/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['PUMA', 'NIKE', 'adidas', 'THE NORTH FACE', 'UNDER ARMOUR'].map((brand, i) => (
              <div key={i} className="text-2xl font-bold text-white/30 hover:text-white/80 transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-fixed/10 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="Gym Equipment"
                className="relative rounded-3xl w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
                WELCOME TO OUR <span className="text-primary-fixed">GYM</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Here you will find <span className="text-primary-fixed">all what</span> you need to change your <span className="text-primary-fixed">life</span> and shape it to the <span className="text-primary-fixed">better</span>.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Our facility is equipped with state-of-the-art bio-mechanic machines and expert coaches ready to push your boundaries. Join the elite. Become Alien.
              </p>
              <Link
                to="/#gym"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-all"
              >
                EXPLORE MORE
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Request Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Membership Request"
        size="md"
      >
        {selectedPlan && (
          <div className="space-y-6">
            <div className="bg-surface-container-highest rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-headline font-bold text-white">{selectedPlan.name}</h4>
                  <p className="text-gray-400 text-sm">Membership Plan</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black font-headline text-primary-fixed">${selectedPlan.price}</p>
                  <p className="text-gray-400 text-xs">{selectedPlan.period}</p>
                </div>
              </div>

              <div className="space-y-2">
                {selectedPlan.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-primary-fixed" />
                    {feature}
                  </div>
                ))}
                {selectedPlan.features.length > 4 && (
                  <p className="text-xs text-gray-500">+{selectedPlan.features.length - 4} more features</p>
                )}
              </div>
            </div>

            <div className="bg-primary-fixed/10 border border-primary-fixed/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-fixed flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-headline font-bold text-primary-fixed mb-1">
                    Admin Approval Required
                  </p>
                  <p className="text-xs text-gray-400">
                    Your membership request will be sent to our admin team for verification. You'll receive an email within 24-48 hours with confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmRequest}
                className="flex-1"
              >
                Submit Request
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Plans;
