import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Save, ToggleRight, ToggleLeft, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/services/api';

const Toggle = ({ checked, onChange }) => (
  <button onClick={onChange} className={`transition-colors ${checked ? 'text-primary-fixed' : 'text-gray-600'}`}>
    {checked ? <ToggleRight className="w-12 h-6" /> : <ToggleLeft className="w-12 h-6" />}
  </button>
);

const AdminSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const INITIAL = {
    gymName: 'ALIEN Performance',
    supportEmail: user?.email || 'admin@alien.com',
    phone: '+212 6 00 00 00 00',
    address: 'Elite Fitness District, Performance Zone 42',
    name: user?.name || '',
    email: user?.email || '',
    emailNotifications: true,
    pushNotifications: false,
    memberAlerts: true,
    orderAlerts: true,
    systemUpdates: false,
  };

  const [form, setForm] = useState(INITIAL);

  const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3500);
  };

  const handleSave = async (e) => {
  e?.preventDefault();
  setSaving(true);
  try {
    if (activeTab === 'account') {
      const payload = { 
        name: form.name, 
        email: form.email,
        // Admin can also update their phone/city here
        phone: form.phone 
      };
      const res = await profileAPI.update(payload);
      updateUser(res.data.user || res.data);
    } else if (activeTab === 'notifications') {
      const payload = {
        emailNotifications: form.emailNotifications,
        pushNotifications: form.pushNotifications,
        memberAlerts: form.memberAlerts,
        orderAlerts: form.orderAlerts,
        systemUpdates: form.systemUpdates,
      };
      await profileAPI.updateSettings(payload);
    }
    showMsg('success', 'Settings synchronized with server!');
  } catch (err) {
    showMsg('error', err.response?.data?.message || 'Update failed.');
  } finally {
    setSaving(false);
  }
};


  const handleDiscard = () => {
    setForm(INITIAL);
    showMsg('success', 'Changes discarded.');
  };

  const handleDangerDelete = () => {
    if (window.confirm('⚠️ This will permanently delete ALL data. This cannot be undone. Are you absolutely sure?')) {
      showMsg('error', 'Action blocked — contact your system administrator.');
    }
  };

  const TABS = ['general', 'account', 'security', 'notifications'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black font-headline uppercase italic">
          SYSTEM <span className="text-primary-fixed">SETTINGS</span>
        </h1>
        <p className="text-gray-400 mt-1">Configure your gym management system.</p>
      </div>

      {/* Alert */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-headline
            ${message.type === 'success'
              ? 'bg-primary-fixed/10 border-primary-fixed/30 text-primary-fixed'
              : 'bg-error/10 border-error/30 text-error'
            }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/5 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-headline font-black uppercase tracking-wider whitespace-nowrap
                        border-b-2 -mb-px transition-colors
              ${activeTab === tab ? 'border-primary-fixed text-primary-fixed' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── General ── */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="bg-surface-container-high border border-white/5 rounded-2xl p-6 space-y-5">
          <h3 className="font-headline font-black uppercase text-sm text-gray-300">Gym Identity</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: 'Gym Name',      key: 'gymName'      },
              { label: 'Support Email', key: 'supportEmail', type: 'email' },
              { label: 'Phone',         key: 'phone',        type: 'tel'   },
              { label: 'Address',       key: 'address'      },
            ].map(({ label, key, type = 'text' }) => (
              <div key={key}>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-gray-500 mb-2">{label}</label>
                <input
                  type={type} value={form[key]} onChange={set(key)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <SaveBar onSave={handleSave} onDiscard={handleDiscard} saving={saving} />
        </form>
      )}

      {/* ── Account ── */}
      {activeTab === 'account' && (
        <form onSubmit={handleSave} className="bg-surface-container-high border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-primary-fixed" />
            <h3 className="font-headline font-black uppercase text-sm text-gray-300">Admin Profile</h3>
          </div>
          {[
            { label: 'Name',  key: 'name'  },
            { label: 'Email', key: 'email', type: 'email' },
          ].map(({ label, key, type = 'text' }) => (
            <div key={key}>
              <label className="block text-xs font-headline font-bold uppercase tracking-wider text-gray-500 mb-2">{label}</label>
              <input
                type={type} value={form[key]} onChange={set(key)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-headline font-bold uppercase tracking-wider text-gray-500 mb-2">Role</label>
            <input
              value={user?.role || 'admin'} disabled
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-primary-fixed cursor-not-allowed"
            />
          </div>
          <SaveBar onSave={handleSave} onDiscard={handleDiscard} saving={saving} />
        </form>
      )}

      {/* ── Security ── */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-surface-container-high border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary-fixed" />
              <h3 className="font-headline font-black uppercase text-sm text-gray-300">Security Settings</h3>
            </div>
            <ToggleRow label="Two-Factor Authentication" sub="Add extra security to your account" checked={true} onChange={() => {}} />
            <ToggleRow label="Session Timeout (30 min)"  sub="Auto-logout after inactivity"       checked={true} onChange={() => {}} />
            <div className="pt-2">
              <button
                onClick={() => showMsg('success', 'Password reset link sent to your email.')}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-headline font-bold uppercase hover:bg-white/10 transition-colors"
              >
                <Lock className="w-4 h-4" /> Change Password
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-error" />
              <h3 className="font-headline font-black uppercase text-sm text-error">Danger Zone</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">Destructive actions that cannot be undone.</p>
            <button
              onClick={handleDangerDelete}
              className="px-5 py-3 bg-error/10 text-error border border-error/30 rounded-xl text-sm font-headline font-black uppercase hover:bg-error/20 transition-colors"
            >
              Delete All Data
            </button>
          </div>
        </div>
      )}

      {/* ── Notifications ── */}
      {activeTab === 'notifications' && (
        <div className="bg-surface-container-high border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-5 h-5 text-primary-fixed" />
            <h3 className="font-headline font-black uppercase text-sm text-gray-300">Notification Preferences</h3>
          </div>
          <ToggleRow label="Email Notifications" sub="Receive updates via email"             checked={form.emailNotifications} onChange={() => toggle('emailNotifications')} />
          <ToggleRow label="Push Notifications"  sub="Browser push notifications"            checked={form.pushNotifications}  onChange={() => toggle('pushNotifications')} />
          <ToggleRow label="New Member Alerts"   sub="Notify when members join"              checked={form.memberAlerts}        onChange={() => toggle('memberAlerts')} />
          <ToggleRow label="Order Alerts"        sub="Notify on new orders"                  checked={form.orderAlerts}         onChange={() => toggle('orderAlerts')} />
          <ToggleRow label="System Updates"      sub="Platform feature announcements"        checked={form.systemUpdates}       onChange={() => toggle('systemUpdates')} />
          <div className="pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-primary-fixed text-black rounded-xl font-headline font-black uppercase text-sm hover:scale-[1.02] transition-transform disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── shared sub-components ── */
const ToggleRow = ({ label, sub, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
    <div>
      <p className="text-sm font-headline font-bold text-white">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const SaveBar = ({ onSave, onDiscard, saving }) => (
  <div className="flex gap-3 pt-2">
    <button
      type="button" onClick={onDiscard}
      className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-headline font-bold uppercase hover:bg-white/10 transition-colors"
    >
      Discard
    </button>
    <button
      type="submit" disabled={saving}
      className="px-6 py-3 bg-primary-fixed text-black rounded-xl text-sm font-headline font-black uppercase hover:scale-[1.02] transition-transform disabled:opacity-60 flex items-center gap-2"
    >
      {saving ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
      Save Changes
    </button>
  </div>
);

export default AdminSettings;