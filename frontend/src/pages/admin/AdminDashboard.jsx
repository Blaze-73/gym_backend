import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, AlertTriangle, TrendingUp, Download, Plus, Clock, Zap, CheckCircle } from 'lucide-react';
import { dashboardAPI, attendanceAPI, membershipsAPI } from '@/services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [activeStreams, setActiveStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchActiveStreams();
    
    const interval = setInterval(() => {
      fetchActiveStreams();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.get();
      setDashboardData(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      setDashboardData({
        total_users: 0,
        total_clients: 0,
        active_memberships: 0,
        total_revenue: 0,
        monthly_revenue: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveStreams = async () => {
    try {
      const response = await attendanceAPI.getActive();
      setActiveStreams(response.data.active_users || []);
    } catch (error) {
      console.error('Failed to fetch active streams:', error);
      setActiveStreams([]);
    }
  };

  const statCards = [
    { title: 'TOTAL MEMBERS', value: dashboardData?.total_clients || 0, change: '+12%', positive: true, icon: Users, color: 'text-primary-fixed' },
    { title: 'MONTHLY REVENUE', value: `$${(dashboardData?.monthly_revenue || 0).toLocaleString()}`, change: '+8.4%', positive: true, icon: DollarSign, color: 'text-primary-fixed' },
    { title: 'ACTIVE MEMBERSHIPS', value: dashboardData?.active_memberships || 0, change: 'Today', positive: null, icon: Activity, color: 'text-white' },
    { title: 'EXPIRING SOON', value: dashboardData?.expiring_soon || 0, change: '-3%', positive: false, icon: AlertTriangle, color: 'text-error' },
  ];

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
          <Link to="/admin/products/add">
            <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Product
            </button>
          </Link>
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
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Stream */}
      <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
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
          {activeStreams.length > 0 ? (
            activeStreams.slice(0, 5).map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-surface-container-highest/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary-fixed" />
                  </div>
                  <div>
                    <p className="text-sm font-headline font-bold text-white">{stream.user?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">Checked In</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">
                    {new Date(stream.check_in).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active check-ins at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
