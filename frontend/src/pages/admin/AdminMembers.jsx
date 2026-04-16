import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, Filter, Plus, Download, MoreVertical,
  CheckCircle, AlertCircle, Clock, TrendingUp, Mail, Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminMembers = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      // API call would go here
      // const response = await membersAPI.getAll();
      // setMembers(response.data);
      
      // Mock data matching screenshot
      setMembers([
        {
          id: 1,
          name: 'Alex Rivers',
          email: 'alex.rivers@email.com',
          phone: '+1 (555) 0123',
          age: 28,
          gender: 'M',
          plan: 'VIP ELITE',
          status: 'active',
          goalProgress: 78,
          goal: 'Strength Phase',
          coach: 'Marcus Kane',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
          joined: '2023-01-15',
        },
        {
          id: 2,
          name: 'Jordan Smith',
          email: 'j.smith@email.com',
          phone: '+1 (555) 0421',
          age: 31,
          gender: 'M',
          plan: 'PREMIUM',
          status: 'expired',
          goalProgress: 42,
          goal: 'Endurance',
          coach: 'Sarah Lin',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
          joined: '2023-03-20',
        },
        {
          id: 3,
          name: 'Elena Vance',
          email: 'vance.e@gym.com',
          phone: '+1 (555) 0878',
          age: 25,
          gender: 'F',
          plan: 'VIP ELITE',
          status: 'active',
          goalProgress: 91,
          goal: 'Muscle Gain',
          coach: 'Marcus Kane',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
          joined: '2022-11-08',
        },
        {
          id: 4,
          name: 'Taylor Kim',
          email: 'kim_t@email.com',
          phone: '+1 (555) 7721',
          age: 35,
          gender: 'F',
          plan: 'BASIC',
          status: 'suspended',
          goalProgress: 15,
          goal: 'On Hold',
          coach: 'None',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
          joined: '2024-01-05',
        },
        {
          id: 5,
          name: 'Chris Brown',
          email: 'chris.b@email.com',
          phone: '+1 (555) 3456',
          age: 29,
          gender: 'M',
          plan: 'PREMIUM',
          status: 'active',
          goalProgress: 65,
          goal: 'Fat Loss',
          coach: 'Sarah Lin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
          joined: '2023-06-12',
        },
        {
          id: 6,
          name: 'Maya Patel',
          email: 'maya.p@email.com',
          phone: '+1 (555) 8901',
          age: 27,
          gender: 'F',
          plan: 'VIP ELITE',
          status: 'active',
          goalProgress: 88,
          goal: 'Competition Prep',
          coach: 'Marcus Kane',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
          joined: '2023-02-28',
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === 'all' || member.plan.toLowerCase().includes(planFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const membersPerPage = 10;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  const handleSelectMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
    setShowBulkActions(selectedMembers.length > 0 || selectedMembers.includes(memberId));
  };

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    expired: members.filter(m => m.status === 'expired').length,
    new: members.filter(m => {
      const joinDate = new Date(m.joined);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return joinDate >= monthAgo;
    }).length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-primary-fixed/10 text-primary-fixed border-primary-fixed/20';
      case 'expired': return 'bg-error/10 text-error border-error/20';
      case 'suspended': return 'bg-gray-600/10 text-gray-400 border-gray-600/20';
      default: return 'bg-gray-600/10 text-gray-400 border-gray-600/20';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'VIP ELITE': return 'bg-primary-fixed/10 text-primary-fixed';
      case 'PREMIUM': return 'bg-secondary/10 text-secondary';
      case 'BASIC': return 'bg-gray-600/10 text-gray-400';
      default: return 'bg-gray-600/10 text-gray-400';
    }
  };

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
            MEMBER <span className="text-primary-fixed">DIRECTORY</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage and track high-performance athletic profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform flex items-center gap-2">
            <Plus className="w-4 h-4" />
            NEW MEMBER
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">TOTAL MEMBERS</p>
              <p className="text-3xl font-black font-headline text-white">{stats.total.toLocaleString()}</p>
            </div>
            <Users className="w-6 h-6 text-gray-500 opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary-fixed" />
            <span className="text-sm font-headline text-primary-fixed">12% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ACTIVE NOW</p>
              <p className="text-3xl font-black font-headline text-primary-fixed">{stats.active}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-primary-fixed opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-headline text-primary-fixed">Live check-in feed</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">EXPIRED</p>
              <p className="text-3xl font-black font-headline text-error">{stats.expired}</p>
            </div>
            <AlertCircle className="w-6 h-6 text-error opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-headline text-error">Requires attention</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">NEW (THIS MONTH)</p>
              <p className="text-3xl font-black font-headline text-white">+{stats.new}</p>
            </div>
            <Plus className="w-6 h-6 text-gray-500 opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-headline text-primary-fixed">New Record</span>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-high border border-white/5 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Filter by name, ID or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors placeholder:text-gray-500"
            />
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
          >
            <option value="all">Plan: All</option>
            <option value="vip">VIP ELITE</option>
            <option value="premium">PREMIUM</option>
            <option value="basic">BASIC</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={() => {
              setSearchQuery('');
              setPlanFilter('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-surface-container-highest border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers(paginatedMembers.map(m => m.id));
                      } else {
                        setSelectedMembers([]);
                      }
                    }}
                    className="w-4 h-4 rounded bg-surface-container-highest border-white/10 accent-primary-fixed"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">MEMBER</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">CONTACT</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">MEMBERSHIP</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">STATUS</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">GOAL PROGRESS</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">ASSIGNED COACH</th>
                <th className="px-6 py-4 text-right text-xs font-headline uppercase tracking-wider text-gray-500">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="w-4 h-4 rounded bg-surface-container-highest border-white/10 accent-primary-fixed"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-headline font-bold text-white">{member.name}</p>
                        <p className="text-xs text-gray-500">Age: {member.age} • {member.gender === 'M' ? 'Male' : 'Female'}</p>
                        <p className="text-xs text-gray-500">#{String(member.id).padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-3 h-3 text-gray-500" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-3 h-3 text-gray-500" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full ${getPlanColor(member.plan)}`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full border ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-fixed rounded-full"
                          style={{ width: `${member.goalProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-headline text-white">{member.goalProgress}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{member.goal}</p>
                  </td>
                  <td className="px-6 py-4">
                    {member.coach !== 'None' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                          <Users className="w-3 h-3 text-primary-fixed" />
                        </div>
                        <span className="text-sm text-gray-300">{member.coach}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * membersPerPage) + 1} to {Math.min(currentPage * membersPerPage, filteredMembers.length)} of {filteredMembers.length} members
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-surface-container-highest border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg font-headline font-bold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container-highest text-gray-400 hover:bg-white/5'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-surface-container-highest border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-lg font-headline font-bold text-white mb-4">RECENT ACTIVITY</h3>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-surface-container-highest/50 rounded-lg">
                <div className="w-10 h-10 bg-surface-container-highest rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-surface-container-highest rounded w-3/4"></div>
                  <div className="h-2 bg-surface-container-highest rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-lg font-headline font-bold text-white mb-4">GROWTH ANALYTICS</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
              const heights = [30, 45, 60, 75, 100, 65, 40];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heights[i]}%` }}
                    transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                    className={`w-full rounded-t-lg ${
                      i === 4 ? 'bg-primary-fixed' : 'bg-surface-container-highest'
                    }`}
                  />
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary-fixed/30 z-40"
      >
        <Plus className="w-6 h-6 text-on-primary-fixed" />
      </motion.button>
    </div>
  );
};

export default AdminMembers;
