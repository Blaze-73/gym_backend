import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Save, Upload, ToggleRight, ToggleLeft, Crown, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI, membershipsAPI } from '@/services/api';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [membership, setMembership] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', birth_date: '', fitness_goal: '', measurement_unit: 'metric', height_cm: '', weight_kg: '', workout_reminders: true, nutrition_alerts: true, system_updates: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '', email: user.email || '', phone: user.phone || '', birth_date: user.birth_date || '', fitness_goal: user.fitness_goal || '', measurement_unit: user.measurement_unit || 'metric', height_cm: user.height_cm || '', weight_kg: user.weight_kg || '', workout_reminders: user.workout_reminders ?? true, nutrition_alerts: user.nutrition_alerts ?? true, system_updates: user.system_updates ?? false,
      });
      fetchMembership();
    }
  }, [user]);

  const fetchMembership = async () => {
    try {
      const res = await membershipsAPI.getAll(); // Simple way to find current user's membership
      const mine = res.data.find(m => m.user_id === user.id);
      setMembership(mine);
    } catch (err) { console.error(err); }
  };

  const handleCancelMembership = async () => {
    if (!window.confirm('Are you sure you want to cancel your membership?')) return;
    try {
      await membershipsAPI.delete(membership.id);
      setMembership(null);
      setMessage({ type: 'success', text: 'Membership cancelled successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to cancel membership.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileAPI.update(formData);
      updateUser(response.data.user || response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-black font-headline text-white uppercase italic">
            USER <span className="text-primary-fixed">SETTINGS</span>
          </h1>
        </div >
      </motion.header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {message.text && (
          <motion.div className={`p-4 rounded-xl border mb-8 ${message.type === 'success' ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed' : 'bg-error/10 border-error/20 text-error'}`}>
            {message.text}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section className="bg-surface-container-high border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary-fixed" />
                <h2 className="text-xl font-headline font-bold uppercase">Profile Management</h2>
              </div >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Display Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50" />
                  </div >
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Email</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50" />
                  </div >
                </div >
                <button type="submit" disabled={loading} className="px-8 py-3 bg-primary-fixed text-black font-bold uppercase rounded-xl hover:scale-105 transition-all disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.section>
          </div >

          <div className="space-y-6">
            <motion.div className="bg-gradient-to-b from-primary-fixed/20 to-surface-container-high border border-primary-fixed/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-8 h-8 text-primary-fixed" />
                <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full ${membership?.status === 'active' ? 'bg-primary-fixed text-black' : 'bg-gray-600 text-white'}`}>
                  {membership?.status || 'No Plan'}
                </span>
              </div >
              <h3 className="text-2xl font-black font-headline text-white uppercase mb-2">{membership?.plan?.name || 'No Active Plan'}</h3>
              <p className="text-sm text-gray-400 mb-4">Renewal: {membership?.end_date || 'N/A'}</p>
              
              {membership && (
                <button 
                  onClick={handleCancelMembership}
                  className="w-full py-3 bg-error/10 text-error border border-error/20 font-headline font-bold uppercase text-sm rounded-xl hover:bg-error hover:text-white transition-all"
                >
                  Cancel Membership
                </button>
              )}
            </motion.div>
          </div >
        </div >
      </main>
    </div >
  );
};

export default Settings;
