import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Lock, Trash2 } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileAPI.update(formData);
      updateUser(response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    setLoading(true);
    try {
      await profileAPI.updatePassword(passwordData);
      setMessage({ type: 'success', text: 'Password updated successfully' });
      setShowPasswordForm(false);
      setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Password update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black font-headline text-white uppercase italic">
          Profile Settings
        </h2>
        <p className="text-on-surface-variant mt-1">Manage your account information</p>
      </header>

      {message.text && (
        <div className={`mb-6 p-4 rounded border ${
          message.type === 'success' 
            ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed' 
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high p-8 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-headline font-bold text-on-surface">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-primary-fixed hover:text-white transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-headline uppercase tracking-wider">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-headline uppercase tracking-wider">Cancel</span>
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="flex items-center gap-2 text-primary-fixed hover:text-white transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-headline uppercase tracking-wider">Save</span>
                </button>
              </div>
            )}
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-10 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-10 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-10 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-10 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Password Change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-high p-8 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-headline font-bold text-on-surface">Security</h3>
            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center gap-2 text-primary-fixed hover:text-white transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm font-headline uppercase tracking-wider">Change Password</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
                }}
                className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-headline uppercase tracking-wider">Cancel</span>
              </button>
            )}
          </div>

          {showPasswordForm && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  className="w-full bg-surface-container-highest border border-white/5 rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-headline text-on-surface-variant uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new_password_confirmation}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                    className="w-full bg-surface-container-highest border border-white/5 rounded px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed/50"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 btn-primary disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-high p-8 border border-error/20"
        >
          <h3 className="text-xl font-headline font-bold text-error mb-4">Danger Zone</h3>
          <p className="text-on-surface-variant text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-error/10 border border-error/20 text-error font-headline text-xs tracking-widest uppercase hover:bg-error/20 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
