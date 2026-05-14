import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Award, Clock, Search, MessageCircle } from 'lucide-react';
import { coachesAPI } from '@/services/api';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await coachesAPI.getAll();
      setCoaches(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch coaches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (coachId) => {
    try {
      await coachesAPI.assign({ coach_id: coachId });
      setShowContactModal(false);
      alert('Coach request sent successfully!');
    } catch (error) {
      console.error('Failed to contact coach:', error);
      alert('Error sending request.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-primary-fixed border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/20 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-black font-headline text-white uppercase italic mb-4">
            ELITE PERFORMANCE<br />
            <span className="text-primary-fixed">ARCHITECTS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">Access the most advanced human performance consultants on the planet.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black font-headline uppercase">Available Architects</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search coaches..." className="bg-surface-container-high border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-fixed/50 w-full sm:w-64" />
          </div>
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coaches.map((coach, index) => (
            <motion.div key={coach.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden group">
              <div className="relative aspect-square bg-surface-container-highest">
                {coach.avatar ? <img src={coach.avatar} alt={coach.user?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center"><Users className="w-24 h-24 text-gray-600" /></div>}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full ${coach.is_available !== false ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-gray-600 text-gray-300'}`}>
                    {coach.is_available !== false ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black font-headline text-white uppercase mb-2">{coach.user?.name || 'Coach'}</h3>
                <p className="text-sm text-primary-fixed mb-4">{coach.specialization || 'Performance Coach'}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span className="text-sm font-bold">{coach.rating || 5.0}</span></div>
                  <div className="flex items-center gap-1 text-sm text-gray-500"><Clock className="w-4 h-4" /><span>{coach.experience_years || 0} yrs</span></div>
                </div>
                <button onClick={() => { setSelectedCoach(coach); setShowContactModal(true); }} className="w-full py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed hover:text-black transition-colors text-sm">
                  CONTACT
                </button>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      {showContactModal && selectedCoach && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-white/5 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-black font-headline text-white uppercase mb-4">Contact {selectedCoach.user?.name}</h3>
            <p className="text-gray-400 mb-6">Ready to begin your transformation? Send a consultation request.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowContactModal(false)} className="flex-1 py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase rounded-xl hover:bg-white/5 transition-colors">CANCEL</button>
              <button onClick={() => handleContact(selectedCoach.id)} className="flex-1 py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold uppercase rounded-xl hover:bg-primary-fixed/90 transition-colors">SEND REQUEST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coaches;
