import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminSchedule = () => {
  const [view, setView] = useState('week');
  const [currentWeek, setCurrentWeek] = useState(1);

  const stats = {
    totalClasses: 24,
    ongoing: 6,
    available: 112,
  };

  const scheduleData = [
    { id: 1, title: 'Elite HIIT', trainer: 'Yuki H.', time: '13:00', duration: '60 min', type: 'hiit', day: 1 },
    { id: 2, title: 'Combat Cross', trainer: 'Alex R.', time: '14:00', duration: '45 min', type: 'combat', day: 2 },
    { id: 3, title: 'Zen Yoga', trainer: 'Luna M.', time: '14:30', duration: '90 min', type: 'yoga', day: 2 },
    { id: 4, title: 'Power Lifting', trainer: 'Marcus K.', time: '16:00', duration: '120 min', type: 'strength', day: 3 },
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
          <p className="text-gray-400 mt-1">Manage class flow and facility utilization.</p>
        </div>
        <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <Plus className="w-4 h-4" />
          NEW CLASS
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
        </motion.div>
      </div>

      {/* Schedule Calendar */}
      <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
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
              {[1, 2, 3, 4, 5].map((day) => (
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
                            className={`p-3 rounded-lg border ${getClassTypeColor(session.type)}`}
                          >
                            <p className="text-xs font-headline font-bold mb-1">{session.title}</p>
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
    </div>
  );
};

export default AdminSchedule;
