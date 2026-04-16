import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, Activity, AlertTriangle, TrendingUp, 
  Download, Plus, Eye, Clock, Zap, CheckCircle
} from 'lucide-react';
import { dashboardAPI, attendanceAPI } from '@/services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [activeStreams, setActiveStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchActiveStreams();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchActiveStreams();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.get();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      // Mock data for demo
      setDashboardData({
        totalMembers: 1248,
        monthlyRevenue: 42850,
        dailyCheckins: 156,
        pendingRenewals: 42,
        revenueGrowth: [65, 45, 85, 55, 95, 75],
        tierDistribution: { premium: 65, standard: 25, basic: 10 },
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveStreams = async () => {
    try {
      const response = await attendanceAPI.getActive();
      setActiveStreams(response.data);
    } catch (error) {
      console.error('Failed to fetch active streams:', error);
      // Mock data
      setActiveStreams([
        { id: 1, user: { name: 'Oualid Ghz' }, action: 'CHECKED IN', time: '2 mins ago', type: 'checkin' },
        { id: 2, user: { name: 'Sarah Miller' }, action: 'PENDING RENEWAL', time: '1 hour ago', type: 'renewal' },
        { id: 3, user: { name: 'Mohammed Ali' }, action: 'MEMBERSHIP EXPIRED', time: '3 hours ago', type: 'expired' },
        { id: 4, user: { name: 'Elena Kross' }, action: 'COMPLETED WORKOUT', time: '4 hours ago', type: 'workout' },
        { id: 5, user: { name: 'Karim Benz' }, action: 'JOINED ALIEN', time: '5 hours ago', type: 'join' },
      ]);
    }
  };

  const statCards = [
    { 
      title: 'TOTAL MEMBERS', 
      value: dashboardData?.totalMembers || 1248, 
      change: '+12%', 
      positive: true,
      icon: Users,
      color: 'text-primary-fixed'
    },
    { 
      title: 'MONTHLY REVENUE', 
      value: `$${(dashboardData?.monthlyRevenue || 42850).toLocaleString()}`, 
      change: '+8.4%', 
      positive: true,
      icon: DollarSign,
      color: 'text-primary-fixed'
    },
    { 
      title: 'DAILY CHECK-INS', 
      value: dashboardData?.dailyCheckins || 156, 
      change: 'Today', 
      positive: null,
      icon: Activity,
      color: 'text-white'
    },
    { 
      title: 'PENDING RENEWALS', 
      value: dashboardData?.pendingRenewals || 42, 
      change: '-3%', 
      positive: false,
      icon: AlertTriangle,
      color: 'text-error'
    },
  ];

  const revenueData = dashboardData?.revenueGrowth || [65, 45, 85, 55, 95, 75];
  const maxRevenue = Math.max(...revenueData);

  const tierData = dashboardData?.tierDistribution || { premium: 65, standard: 25, basic: 10 };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-headline text-white uppercase italic">
            OPERATIONS <span className="text-primary-fixed">OVERVIEW</span>
          </h1>
          <p className="text-gray-400 mt-1">Real-time performance metrics for Alien Headquarters.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Member
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface-container-high border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className={`text-3xl font-black font-headline ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color} opacity-50`} />
            </div>
            <div className="flex items-center gap-2">
              {stat.positive !== null && (
                <TrendingUp className={`w-4 h-4 ${stat.positive ? 'text-primary-fixed' : 'text-error'}`} />
              )}
              <span className={`text-sm font-headline ${
                stat.positive === true ? 'text-primary-fixed' : 
                stat.positive === false ? 'text-error' : 
                'text-gray-500'
              }`}>
                {stat.change}
              </span>
              {stat.positive === false && (
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-headline font-bold text-white">REVENUE GROWTH</h3>
              <p className="text-xs text-gray-500 mt-1">LAST 6 MONTHS</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">LAST 6 MONTHS</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2">
            {revenueData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className={`w-full rounded-t-lg ${
                    index === revenueData.length - 1 
                      ? 'bg-primary-fixed' 
                      : 'bg-surface-container-highest'
                  }`}
                />
                <span className="text-xs text-gray-500 uppercase">
                  {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][index]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-headline font-bold text-white">TIER DISTRIBUTION</h3>
            <p className="text-xs text-gray-500 mt-1">MEMBERSHIP LEVELS</p>
          </div>

          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle
                className="stroke-surface-container-highest"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeWidth="3"
              />
              <circle
                className="stroke-primary-fixed"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeDasharray={`${tierData.premium}, 100`}
                strokeWidth="3"
              />
              <circle
                className="stroke-secondary"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeDasharray={`${tierData.standard}, 100`}
                strokeDashoffset={`-${tierData.premium}`}
                strokeWidth="3"
              />
              <circle
                className="stroke-gray-600"
                cx="18"
                cy="18"
                fill="none"
                r="16"
                strokeDasharray={`${tierData.basic}, 100`}
                strokeDashoffset={`-${tierData.premium + tierData.standard}`}
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-black font-headline text-white">{dashboardData?.totalMembers || '1.2K'}</p>
                <p className="text-xs text-gray-500 uppercase">TOTAL</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-fixed rounded-full"></div>
                <span className="text-sm text-gray-300">PREMIUM ELITE</span>
              </div>
              <span className="text-sm font-headline font-bold text-white">{tierData.premium}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-gray-300">STANDARD PLUS</span>
              </div>
              <span className="text-sm font-headline font-bold text-white">{tierData.standard}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-sm text-gray-300">BASIC ALIEN</span>
              </div>
              <span className="text-sm font-headline font-bold text-white">{tierData.basic}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-headline font-bold text-white">ACTIVE STREAM</h3>
              <p className="text-xs text-gray-500 mt-1">LIVE MEMBER ACTIVITY</p>
            </div>
            <Link to="/admin/members" className="text-primary-fixed text-sm font-headline hover:underline">
              VIEW ALL ACTIVITY
            </Link>
          </div>

          <div className="space-y-4">
            {(Array.isArray(activeStreams) ? activeStreams : []).map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-surface-container-highest/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stream.type === 'checkin' ? 'bg-primary-fixed/20' :
                    stream.type === 'renewal' ? 'bg-secondary/20' :
                    stream.type === 'expired' ? 'bg-error/20' :
                    stream.type === 'workout' ? 'bg-primary-fixed/20' :
                    'bg-primary-fixed/20'
                  }`}>
                    {stream.type === 'checkin' ? <CheckCircle className="w-5 h-5 text-primary-fixed" /> :
                     stream.type === 'renewal' ? <Clock className="w-5 h-5 text-secondary" /> :
                     stream.type === 'expired' ? <AlertTriangle className="w-5 h-5 text-error" /> :
                     stream.type === 'workout' ? <Zap className="w-5 h-5 text-primary-fixed" /> :
                     <Users className="w-5 h-5 text-primary-fixed" />}
                  </div>
                  <div>
                    <p className="text-sm font-headline font-bold text-white">{stream.user.name}</p>
                    <p className="text-xs text-gray-500">{stream.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{stream.time}</span>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="12" cy="19" r="2"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facility Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative bg-surface-container-high border border-white/5 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Facility"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>

          <div className="relative p-6 h-full flex flex-col justify-end">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full mb-3">
                PEAK HOURS
              </span>
              <h3 className="text-2xl font-black font-headline text-white uppercase mb-2">
                FACILITY<br/>THROUGHPUT:<br/>
                <span className="text-primary-fixed">OPTIMAL</span>
              </h3>
              <p className="text-sm text-gray-400">
                All systems functional. HVAC at 19°C. Lighting sequence: KINETIC active.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-headline hover:bg-white/20 transition-colors">
                ENTER ADMIN VIEW
              </button>
              <button className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 text-on-primary-fixed" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
