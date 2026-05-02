import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Utensils, Users, TrendingUp, Activity, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    workoutsCompleted: 0,
    programsActive: 0,
    caloriesBurned: 0,
    workoutsThisWeek: 0,
  });
  const [activeProgram, setActiveProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchActiveProgram();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user-workouts/statistics', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          workoutsCompleted: data.completed_workouts || 0,
          programsActive: 1,
          caloriesBurned: data.total_calories || 0,
          workoutsThisWeek: data.total_workouts || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveProgram = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user-programs/active', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setActiveProgram(data);
      }
    } catch (error) {
      console.error('Failed to fetch active program:', error);
    }
  };

  const quickActions = [
    { title: 'Start Workout', icon: Dumbbell, link: '/workout', color: 'text-primary-fixed' },
    { title: 'View Programs', icon: Calendar, link: '/programs', color: 'text-blue-400' },
    { title: 'Track Nutrition', icon: Utensils, link: '/nutrition', color: 'text-green-400' },
    { title: 'Find Coach', icon: Users, link: '/coaches', color: 'text-purple-400' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      {/* Welcome Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary-fixed/10 to-surface-container-high border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Welcome Back</p>
            <h1 className="text-5xl font-black font-headline text-white uppercase italic">
              {user?.name?.split(' ')[0] || 'Athlete'}
            </h1>
            <p className="text-xl text-gray-400 mt-4">Ready to crush your goals today?</p>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Workouts Completed', value: stats.workoutsCompleted, icon: Activity, color: 'text-primary-fixed' },
            { label: 'Active Programs', value: stats.programsActive, icon: Calendar, color: 'text-blue-400' },
            { label: 'Calories Burned', value: stats.caloriesBurned.toLocaleString(), icon: TrendingUp, color: 'text-green-400' },
            { label: 'This Week', value: stats.workoutsThisWeek, icon: Clock, color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-surface-container-high border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl font-black font-headline text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-black font-headline uppercase mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-surface-container-high border border-white/5 rounded-2xl p-6 cursor-pointer group"
                >
                  <action.icon className={`w-10 h-10 ${action.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-lg font-headline font-bold">{action.title}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Active Program */}
        {activeProgram && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black font-headline uppercase">Active Protocol</h2>
              <Link to="/programs" className="text-primary-fixed text-sm font-headline font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="bg-gradient-to-r from-primary-fixed/20 to-surface-container-high border border-primary-fixed/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-black font-headline text-white uppercase mb-2">
                    {activeProgram.program?.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{activeProgram.program?.description}</p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-fixed" />
                      <span className="text-sm">Week {activeProgram.current_week} / {activeProgram.program?.duration_weeks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary-fixed" />
                      <span className="text-sm">{activeProgram.completion_percentage}% Complete</span>
                    </div>
                  </div>

                  <Link to={`/workout`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider"
                    >
                      Continue Training
                    </motion.button>
                  </Link>
                </div>

                {/* Progress */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>PROGRESS</span>
                      <span className="text-primary-fixed font-bold">{activeProgram.completion_percentage}%</span>
                    </div>
                    <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeProgram.completion_percentage}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-primary-fixed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-highest/50 rounded-xl">
                      <p className="text-2xl font-black font-headline text-white">{activeProgram.current_week}</p>
                      <p className="text-xs text-gray-500 uppercase">Current Week</p>
                    </div>
                    <div className="p-4 bg-surface-container-highest/50 rounded-xl">
                      <p className="text-2xl font-black font-headline text-white">{activeProgram.program?.duration_weeks}</p>
                      <p className="text-xs text-gray-500 uppercase">Total Weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-black font-headline uppercase mb-6">Recent Activity</h2>
          <div className="bg-surface-container-high border border-white/5 rounded-2xl p-8 text-center">
            <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Your workout history will appear here</p>
            <Link to="/programs">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider"
              >
                Start Your First Workout
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ClientDashboard;
