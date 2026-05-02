import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Award, Clock, Search, Filter, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Coaches = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [sortBy, setSortBy] = useState('ranking');

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/coaches', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCoaches(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch coaches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (coachId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/coach/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ coach_id: coachId }),
      });
      setShowContactModal(false);
      alert('Coach request sent successfully!');
    } catch (error) {
      console.error('Failed to contact coach:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-fixed border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/20 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed text-xs font-headline font-bold uppercase tracking-wider rounded-full mb-4 w-fit"
          >
            2 Coaches Featured
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black font-headline text-white uppercase italic mb-4"
          >
            ELITE PERFORMANCE<br />
            <span className="text-primary-fixed">ARCHITECTS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mb-8"
          >
            Access the most advanced human performance consultants on the planet. Specialized in biological optimization, biomechanical efficiency, and elite mindset training.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider w-fit"
          >
            INITIATE SCAN
          </motion.button>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Coach */}
        {coaches.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-0 bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden">
              {/* Image */}
              <div className="relative aspect-video lg:aspect-auto">
                {coaches[0].avatar ? (
                  <img
                    src={coaches[0].avatar}
                    alt={coaches[0].user?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                    <Users className="w-32 h-32 text-gray-600" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-black font-headline text-white uppercase">
                    {coaches[0].user?.name || 'Coach'}
                  </h3>
                  <p className="text-primary-fixed font-headline">{coaches[0].specialization || 'Performance Coach'}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                    HEAD PERFORMANCE ARCHITECT
                  </span>
                </div>

                <h2 className="text-3xl font-black font-headline text-white uppercase mb-2">
                  Bio-Optimization Lead
                </h2>
                <p className="text-gray-400 mb-6">
                  Viktor specializes in high-stakes physical transformations, leveraging real-time biomarker tracking to dictate intensity protocols.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-surface-container-highest rounded-xl">
                    <p className="text-xs text-gray-500 uppercase mb-1">Active Clients</p>
                    <p className="text-2xl font-black font-headline text-white">
                      {coaches[0].clients_count || 12}/15
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-highest rounded-xl">
                    <p className="text-xs text-gray-500 uppercase mb-1">Experience</p>
                    <p className="text-2xl font-black font-headline text-white">
                      {coaches[0].experience_years || 13} YRS
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCoach(coaches[0]);
                    setShowContactModal(true);
                  }}
                  className="w-full py-4 bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
                >
                  BOOK CONSULTATION
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black font-headline uppercase">Available Architects</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search coaches..."
                className="bg-surface-container-high border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-fixed/50 w-64"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container-high border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary-fixed/50"
            >
              <option value="ranking">Sorted by: Ranking</option>
              <option value="experience">Sorted by: Experience</option>
              <option value="availability">Sorted by: Availability</option>
            </select>
          </div>
        </div>

        {/* Coach Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coaches.slice(1).map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-surface-container-highest">
                {coach.avatar ? (
                  <img
                    src={coach.avatar}
                    alt={coach.user?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-24 h-24 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full ${
                    coach.is_available !== false
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {coach.is_available !== false ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-black font-headline text-white uppercase mb-2">
                  {coach.user?.name || 'Coach'}
                </h3>
                <p className="text-sm text-primary-fixed mb-4">{coach.specialization || 'Performance Coach'}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">{coach.rating || 5.0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{coach.experience_years || 0} yrs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCoach(coach);
                      setShowContactModal(true);
                    }}
                    className="flex-1 py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed hover:border-primary-fixed transition-colors text-sm"
                  >
                    CONTACT
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-surface-container-highest border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary-fixed/10 border border-primary-fixed/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-black font-headline text-white uppercase mb-4">
            CAN'T FIND YOUR MATCH?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Our algorithm can analyze your performance data and recommend the perfect architect for your specific biological profile.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider"
          >
            RUN MATCHING ALGORITHM
          </motion.button>
        </motion.section>
      </main>

      {/* Contact Modal */}
      {showContactModal && selectedCoach && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface-container-high border border-white/5 rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-black font-headline text-white uppercase mb-4">
              Contact {selectedCoach.user?.name}
            </h3>
            <p className="text-gray-400 mb-6">
              Ready to begin your transformation? Send a consultation request.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase rounded-xl hover:bg-white/5 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleContact(selectedCoach.id)}
                className="flex-1 py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold uppercase rounded-xl hover:bg-primary-fixed/90 transition-colors"
              >
                SEND REQUEST
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Coaches;
