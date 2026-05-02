import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Shield, AlertTriangle, Save, Upload, ToggleRight, ToggleLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const tabs = [
    { id: 'general', label: 'GENERAL' },
    { id: 'account', label: 'ACCOUNT' },
    { id: 'security', label: 'SECURITY' },
    { id: 'notifications', label: 'NOTIFICATIONS' },
  ];

  const [formData, setFormData] = useState({
    gymName: 'ALIEN Performance',
    email: 'admin@alien.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fitness St, Gym City',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: 'success', text: 'Settings saved successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black font-headline text-white uppercase italic">
          SYSTEM <span className="text-primary-fixed">SETTINGS</span>
        </h1>
        <p className="text-gray-400 mt-1">Configure your gym management system.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded border ${
          message.type === 'success' 
            ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed' 
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-white/5">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-headline font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-fixed text-primary-fixed'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Gym Identity */}
              <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-headline font-bold text-white">Gym Identity</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      GYM NAME
                    </label>
                    <input
                      type="text"
                      value={formData.gymName}
                      onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      SUPPORT EMAIL
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
                      PHONE
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
                      ADDRESS
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {activeTab === 'account' && (
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary-fixed" />
                <h3 className="text-lg font-headline font-bold text-white">Admin Profile</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    ROLE
                  </label>
                  <input
                    type="text"
                    value={user?.role || ''}
                    disabled
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm text-primary-fixed"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary-fixed" />
                  <h3 className="text-lg font-headline font-bold text-white">Security Settings</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg">
                    <div>
                      <p className="text-sm font-headline font-bold text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add extra security to your account</p>
                    </div>
                    <ToggleRight className="w-10 h-6 text-primary-fixed" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg">
                    <div>
                      <p className="text-sm font-headline font-bold text-white">Session Timeout</p>
                      <p className="text-xs text-gray-500">Auto logout after 30 minutes</p>
                    </div>
                    <ToggleRight className="w-10 h-6 text-primary-fixed" />
                  </div>
                </div>
              </div>

              <div className="bg-error/5 border border-error/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-error" />
                  <h3 className="text-lg font-headline font-bold text-error">Danger Zone</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Destructive actions that cannot be reversed.
                </p>
                <button className="px-4 py-3 bg-error text-white rounded-lg text-sm font-headline font-bold hover:bg-error/80 transition-colors">
                  Delete All Data
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-headline font-bold text-white mb-6">Notification Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg">
                  <div>
                    <p className="text-sm font-headline font-bold text-white">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <ToggleRight className="w-10 h-6 text-primary-fixed" />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg">
                  <div>
                    <p className="text-sm font-headline font-bold text-white">Push Notifications</p>
                    <p className="text-xs text-gray-500">Browser push notifications</p>
                  </div>
                  <ToggleLeft className="w-10 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Admin Profile Card */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-fixed" />
                </div>
                <div>
                  <h4 className="text-lg font-headline font-bold text-white">{user?.name || 'Admin'}</h4>
                  <p className="text-xs text-gray-500">CHIEF OPERATIONS OFFICER</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">2FA STATUS</span>
              <ToggleRight className="w-10 h-6 text-primary-fixed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
