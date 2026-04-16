import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Users, Plus, Search, Filter, 
  ChevronLeft, ChevronRight, MapPin, User
} from 'lucide-react';

const AdminSchedule = () => {
  const [view, setView] = useState('week'); // day, week, month
  const [currentWeek, setCurrentWeek] = useState(1);

  const stats = {
    totalClasses: 24,
    ongoing: 6,
    available: 112,
    cancelled: 0,
  };

  const upcomingSessions = [
    { id: 1, name: 'POWER LIFT FUNDAMENTALS', time: 'Today • 2:00 PM', spots: '8/12', status: 'OPEN' },
    { id: 2, name: 'MOBILITY FLOW', time: 'Today • 4:30 PM', spots: '15/20', status: 'OPEN' },
    { id: 3, name: 'HEAVY BAG BLAST', time: 'Tomorrow • 7:00 AM', spots: '5/15', status: 'LIMITED' },
  ];

  const systemAlerts = [
    { id: 1, type: 'alert', title: 'MAINTENANCE ALERT', desc: 'Bio-Mech Zone 3 unavailable for next 2 hours', time: '2:00 PM - 4:00 PM' },
  ];

  const scheduleData = [
    { id: 1, title: 'Elite HIIT', trainer: 'Yuki H.', time: '13:00', duration: '60 min', type: 'hiit', day: 13 },
    { id: 2, title: 'Combat Cross', trainer: 'Alex R.', time: '14:00', duration: '45 min', type: 'combat', day: 14 },
    { id: 3, title: 'Zen Yoga', trainer: 'Luna M.', time: '14:30', duration: '90 min', type: 'yoga', day: 14 },
    { id: 4, name: 'Power Lifting', trainer: 'Marcus K.', time: '16:00', duration: '120 min', type: 'strength', day: 15 },
  ];

  const getClassTypeColor = (type) => {
    switch (type) {
      case 'hiit': return 'bg-primary-fixed/20 border-primary-fixed text-primary-fixed';
      case 'combat': return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'yoga': return 'bg-blue-500/20 border-blue-500 text-blue-400';
      case 'strength': return 'bg-purple-500/20 border-purple-500 text-purple-400';
      default: return 'bg-gray-600/20 border-gray-600 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-headline text-white uppercase italic">
            SCHEDULE <span className="text-primary-fixed">ARCHITECTURE</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage class flow and facility utilization across all training zones.</p>
        </div>
        <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <Plus className="w-4 h-4" />
          NEW CLASS SESSION
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">TOTAL CLASSES</span>
          </div>
          <p className="text-3xl font-black font-headline text-white">{stats.totalClasses}</p>
          <p className="text-xs text-gray-500 mt-1">This Week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-primary-fixed" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">ONGOING</span>
          </div>
          <p className="text-3xl font-black font-headline text-primary-fixed">{stats.ongoing}</p>
          <p className="text-xs text-gray-500 mt-1">Live Sessions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">AVAILABLE SLOTS</span>
          </div>
          <p className="text-3xl font-black font-headline text-white">{stats.available}</p>
          <p className="text-xs text-gray-500 mt-1">Open Spots</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">CANCELLED</span>
          </div>
          <p className="text-3xl font-black font-headline text-gray-500">{stats.cancelled}</p>
          <p className="text-xs text-gray-500 mt-1">This Week</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Calendar */}
        <div className="lg:col-span-2 bg-surface-container-high border border-white/5 rounded-xl p-6">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-headline font-bold">Week {currentWeek}</span>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {['day', 'week', 'month'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-headline transition-colors ${
                    view === v
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-surface-container-highest text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-3 text-left text-xs font-headline uppercase text-gray-500">TIME</th>
                  {[12, 13, 14, 15, 16, 17, 18].map((hour) => (
                    <th key={hour} className="px-4 py-3 text-center text-xs font-headline uppercase text-gray-500">
                      {hour}:00
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[13, 14, 15, 16].map((day) => (
                  <tr key={day} className="border-b border-white/5">
                    <td className="px-4 py-8 text-xs font-headline text-gray-500 border-r border-white/5">
                      Day {day}
                    </td>
                    {[12, 13, 14, 15, 16, 17, 18].map((hour) => {
                      const session = scheduleData.find(s => s.day === day && parseInt(s.time) === hour);
                      return (
                        <td key={hour} className="px-2 py-8 border-r border-white/5 min-w-[100px]">
                          {session && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`p-3 rounded-lg border ${getClassTypeColor(session.type || session.name?.toLowerCase().includes('yoga') ? 'yoga' : session.name?.toLowerCase().includes('combat') ? 'combat' : 'hiit')}`}
                            >
                              <p className="text-xs font-headline font-bold mb-1">{session.title || session.name}</p>
                              <p className="text-[10px] opacity-75">{session.trainer}</p>
                              <p className="text-[10px] opacity-75">{session.duration}</p>
                            </motion.div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-headline font-bold text-white">UPCOMING SESSIONS</h3>
              <button className="text-xs text-primary-fixed font-headline hover:underline">VIEW ALL</button>
            </div>

            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 bg-surface-container-highest/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-headline font-bold text-white">{session.name}</h4>
                    <span className={`text-[10px] px-2 py-1 rounded-full uppercase ${
                      session.status === 'OPEN' ? 'bg-primary-fixed/10 text-primary-fixed' :
                      session.status === 'LIMITED' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-gray-600/10 text-gray-400'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{session.time}</p>
                  <p className="text-xs text-gray-400">{session.spots} spots</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <h3 className="text-lg font-headline font-bold text-white mb-4">SYSTEM ALERTS</h3>

            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                    <h4 className="text-sm font-headline font-bold text-error">{alert.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{alert.desc}</p>
                  <p className="text-[10px] text-gray-500">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Preview */}
          <div className="relative bg-surface-container-high border border-white/5 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Facility"
              className="w-full h-48 object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-sm font-headline font-bold text-white mb-2">TRAINING ZONES</h4>
              <p className="text-xs text-gray-400">Live capacity monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSchedule;
