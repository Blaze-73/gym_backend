import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Shield, AlertTriangle, Trash2, 
  Save, Upload, ToggleLeft, ToggleRight
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [twoFA, setTwoFA] = useState(true);

  const tabs = [
    { id: 'general', label: 'GENERAL' },
    { id: 'account', label: 'ACCOUNT' },
    { id: 'membership', label: 'MEMBERSHIP' },
    { id: 'staff', label: 'STAFF' },
    { id: 'notifications', label: 'NOTIFICATIONS' },
    { id: 'payments', label: 'PAYMENTS' },
    { id: 'system', label: 'SYSTEM' },
  ];

  const staff = [
    { id: 1, name: 'Marcus Aris', role: 'Lead Instructor', department: 'Human Performance' },
    { id: 2, name: 'Sarah Lansing', role: 'Head Recruiter', department: 'Member Logistics' },
  ];

  const tiers = [
    { name: 'BASIC', price: 49, popular: false },
    { name: 'PREMIUM', price: 129, popular: true },
    { name: 'ZENITH VIP', price: 299, popular: false },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black font-headline text-white uppercase italic">
          SYSTEM <span className="text-primary-fixed">SETTINGS</span>
        </h1>
        <p className="text-gray-400 mt-1">Configure your high-performance environment and administrative protocols.</p>
      </div>

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
          {/* Gym Identity */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-headline font-bold text-white">Gym Identity</h3>
              <span className="px-3 py-1 bg-primary-fixed/10 text-primary-fixed text-xs font-headline uppercase rounded-full">
                PROTOCOL ALPHA
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  LEGAL BRAND NAME
                </label>
                <input
                  type="text"
                  defaultValue="QUALID GHZ PERFORMANCE"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  PHYSICAL HQ ADDRESS
                </label>
                <input
                  type="text"
                  defaultValue="720 INDUSTRIAL BLVD, AUSTIN TX"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  SUPPORT EMAIL
                </label>
                <input
                  type="email"
                  defaultValue="hq@qualidghz.com"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  SYSTEM LOGO
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
                    <span className="text-lg font-black text-white">A</span>
                  </div>
                  <button className="px-4 py-2 bg-surface-container-highest border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    REPLACE ASSET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* OS Environment */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <h3 className="text-lg font-headline font-bold text-white mb-6">OS Environment</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  INTERFACE MODE
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>
                  <select className="flex-1 bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50">
                    <option>Dark Black</option>
                    <option>Light</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  LANGUAGE
                </label>
                <select className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  TIMEZONE
                </label>
                <select className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50">
                  <option>UTC -6 (CST)</option>
                  <option>UTC -5 (EST)</option>
                  <option>UTC -8 (PST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-headline font-bold text-white">Membership Tiers</h3>
              <button className="px-4 py-2 bg-surface-container-highest border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors">
                MANAGE PLANS
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-4 rounded-xl border ${
                    tier.popular ? 'border-primary-fixed bg-primary-fixed/5' : 'border-white/5 bg-surface-container-highest'
                  }`}
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {tier.popular ? 'POPULAR' : 'ENTRY'}
                  </p>
                  <h4 className="text-lg font-headline font-bold text-white mb-2">{tier.name}</h4>
                  <p className="text-2xl font-black font-headline text-primary-fixed">${tier.price}<span className="text-sm text-gray-400">/mo</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Hierarchy */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <h3 className="text-lg font-headline font-bold text-white mb-6">Staff Hierarchy</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-left text-xs font-headline uppercase text-gray-500">PERSONNEL</th>
                    <th className="px-4 py-3 text-left text-xs font-headline uppercase text-gray-500">ACTIVE ROLE</th>
                    <th className="px-4 py-3 text-left text-xs font-headline uppercase text-gray-500">DEPARTMENT</th>
                    <th className="px-4 py-3 text-right text-xs font-headline uppercase text-gray-500">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {staff.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                            <span className="text-primary-fixed font-bold">{member.name.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-headline text-white">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 bg-surface-container-highest text-gray-300 text-xs font-headline rounded-full">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400">{member.department}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-xs text-primary-fixed font-headline hover:underline">EDIT</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-error/5 border border-error/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-error" />
              <h3 className="text-lg font-headline font-bold text-error">Danger Zone</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Destructive actions that cannot be reversed. Proceed with extreme caution.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-error/10 border border-error/20 rounded-lg">
                <div>
                  <h4 className="text-sm font-headline font-bold text-error mb-1">Deactivate System Instance</h4>
                  <p className="text-xs text-gray-400">Temporarily suspend all client access and payment processing.</p>
                </div>
                <button className="px-4 py-2 bg-error text-white rounded-lg text-sm font-headline font-bold hover:bg-error/80 transition-colors">
                  DEACTIVATE
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-highest border border-white/5 rounded-lg">
                <div>
                  <h4 className="text-sm font-headline font-bold text-white mb-1">Purge Global Cache</h4>
                  <p className="text-xs text-gray-400">Reset all temporary session data and re-index performance metrics.</p>
                </div>
                <button className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors">
                  PURGE CACHE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Admin Profile */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-fixed" />
                </div>
                <div>
                  <h4 className="text-lg font-headline font-bold text-white">QUALID GHZ</h4>
                  <p className="text-xs text-gray-500">CHIEF OPERATIONS OFFICER</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-primary-fixed/10 text-primary-fixed text-xs font-headline uppercase rounded-full">
                VERIFIED
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">2FA SECURITY STATUS</span>
              <button
                onClick={() => setTwoFA(!twoFA)}
                className="relative inline-flex items-center cursor-pointer"
              >
                {twoFA ? (
                  <ToggleRight className="w-10 h-6 text-primary-fixed" />
                ) : (
                  <ToggleLeft className="w-10 h-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
