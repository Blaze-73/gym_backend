import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Save, Upload, ToggleRight, ToggleLeft, Crown, Lock, Instagram } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/services/api';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birth_date: '',
    fitness_goal: '',
    measurement_unit: 'metric',
    height_cm: '',
    weight_kg: '',
    workout_reminders: true,
    nutrition_alerts: true,
    system_updates: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birth_date: user.birth_date || '',
        fitness_goal: user.fitness_goal || '',
        measurement_unit: user.measurement_unit || 'metric',
        height_cm: user.height_cm || '',
        weight_kg: user.weight_kg || '',
        workout_reminders: user.workout_reminders ?? true,
        nutrition_alerts: user.nutrition_alerts ?? true,
        system_updates: user.system_updates ?? false,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileAPI.update(formData);
      updateUser(response.data.user || response.data);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/5"
      >
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-black font-headline text-white uppercase italic">
            USER <span className="text-primary-fixed">SETTINGS</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your performance profile and protocol preferences.</p>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border mb-8 ${
              message.type === 'success'
                ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed'
                : 'bg-error/10 border-error/20 text-error'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Management */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary-fixed" />
                <h2 className="text-xl font-headline font-bold uppercase">Profile Management</h2>
              </div>

              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 bg-primary-fixed/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <User className="w-12 h-12 text-primary-fixed" />
                  )}
                </div>
                <div className="flex-1">
                  <button className="px-4 py-2 bg-surface-container-highest border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Change Avatar
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      Email Identity
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      value={formData.birth_date}
                      onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>
                </div>

                {/* Social Hub */}
                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    Social Hub
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Instagram handle"
                        className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                      />
                    </div>
                    <button className="p-3 bg-primary-fixed text-on-primary-fixed rounded-lg">
                      <Instagram className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.section>

            {/* Training Preferences */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary-fixed" />
                <h2 className="text-xl font-headline font-bold uppercase">Training Preferences</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    Measurement Units
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFormData({ ...formData, measurement_unit: 'metric' })}
                      className={`flex-1 py-3 rounded-lg font-headline font-bold text-sm uppercase ${
                        formData.measurement_unit === 'metric'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-highest text-gray-400'
                      }`}
                    >
                      Metric (kg)
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, measurement_unit: 'imperial' })}
                      className={`flex-1 py-3 rounded-lg font-headline font-bold text-sm uppercase ${
                        formData.measurement_unit === 'imperial'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-highest text-gray-400'
                      }`}
                    >
                      Imperial (lb)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    Intensity Profile
                  </label>
                  <select
                    value={formData.fitness_goal}
                    onChange={(e) => setFormData({ ...formData, fitness_goal: e.target.value })}
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                  >
                    <option value="">Select Profile</option>
                    <option value="hypertrophy">Hypertrophy</option>
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                  </select>
                </div>
              </div>

              {/* Primary Objectives */}
              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  Primary Objectives
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['hypertrophy', 'strength', 'endurance'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, fitness_goal: goal })}
                      className={`p-4 rounded-xl border font-headline font-bold text-sm uppercase transition-colors ${
                        formData.fitness_goal === goal
                          ? 'bg-primary-fixed/10 border-primary-fixed text-primary-fixed'
                          : 'bg-surface-container-highest border-white/5 text-gray-400'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Global Notifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-primary-fixed" />
                <h2 className="text-xl font-headline font-bold uppercase">Global Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                  <div>
                    <p className="text-sm font-headline font-bold">Workout Reminders</p>
                    <p className="text-xs text-gray-500">Stay on track with training alerts</p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, workout_reminders: !formData.workout_reminders })}
                    className="text-primary-fixed"
                  >
                    {formData.workout_reminders ? (
                      <ToggleRight className="w-12 h-6" />
                    ) : (
                      <ToggleLeft className="w-12 h-6 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                  <div>
                    <p className="text-sm font-headline font-bold">Nutrition Alerts</p>
                    <p className="text-xs text-gray-500">Track macros and hydration goals</p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, nutrition_alerts: !formData.nutrition_alerts })}
                    className="text-primary-fixed"
                  >
                    {formData.nutrition_alerts ? (
                      <ToggleRight className="w-12 h-6" />
                    ) : (
                      <ToggleLeft className="w-12 h-6 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                  <div>
                    <p className="text-sm font-headline font-bold">System Updates</p>
                    <p className="text-xs text-gray-500">New features and protocol updates</p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, system_updates: !formData.system_updates })}
                    className="text-primary-fixed"
                  >
                    {formData.system_updates ? (
                      <ToggleRight className="w-12 h-6" />
                    ) : (
                      <ToggleLeft className="w-12 h-6 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Membership Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-primary-fixed/20 to-surface-container-high border border-primary-fixed/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-8 h-8 text-primary-fixed" />
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-2xl font-black font-headline text-white uppercase mb-2">Elite</h3>
              <p className="text-sm text-gray-400 mb-4">Renewal: Oct 26, 2025</p>
              <button className="w-full py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold uppercase text-sm rounded-xl hover:bg-primary-fixed/90 transition-colors">
                Manage Subscription
              </button>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary-fixed" />
                <h3 className="font-headline font-bold uppercase">Security</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full p-4 bg-surface-container-highest rounded-xl text-left hover:bg-white/5 transition-colors">
                  <p className="text-sm font-headline font-bold">Update Password</p>
                  <p className="text-xs text-gray-500">Last changed: 30 days ago</p>
                </button>

                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                  <div>
                    <p className="text-sm font-headline font-bold">Two-Factor Auth</p>
                  </div>
                  <ToggleLeft className="w-12 h-6 text-gray-500" />
                </div>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-6"
            >
              <h3 className="font-headline font-bold uppercase mb-4">Need Protocol Support?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Our system architects are available 24/7 for technical and performance inquiries.
              </p>
              <button className="w-full py-3 bg-surface-container-highest border border-white/10 text-primary-fixed font-headline font-bold uppercase text-sm rounded-xl hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">
                Open Secure Comms
              </button>
            </motion.div>
          </div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky bottom-8 mt-8 flex items-center justify-end gap-4"
        >
          <button className="px-6 py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase rounded-xl hover:bg-white/5 transition-colors">
            Discard
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-primary-fixed text-on-primary-fixed font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Protocol Changes'}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
