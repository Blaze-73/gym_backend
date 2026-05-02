import { useState, useEffect } from 'react';
import { usersAPI, membershipsAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Plus, Mail, Phone, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await usersAPI.getAll();
      setMembers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  const stats = {
    total: members.length,
    admins: members.filter(m => m.role === 'admin').length,
    clients: members.filter(m => m.role === 'client').length,
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
          <p className="text-gray-400 mt-1">Manage and track all gym members.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high border border-white/5 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">TOTAL MEMBERS</p>
              <p className="text-3xl font-black font-headline text-white">{stats.total}</p>
            </div>
            <Users className="w-6 h-6 text-gray-500 opacity-50" />
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
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ADMINS</p>
              <p className="text-3xl font-black font-headline text-primary-fixed">{stats.admins}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-primary-fixed opacity-50" />
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
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">CLIENTS</p>
              <p className="text-3xl font-black font-headline text-white">{stats.clients}</p>
            </div>
            <Users className="w-6 h-6 text-white opacity-50" />
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
              placeholder="Filter by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Member</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Role</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                          <span className="text-primary-fixed font-bold">{member.name?.charAt(0) || 'U'}</span>
                        </div>
                        <div>
                          <p className="font-headline font-bold text-white">{member.name}</p>
                          <p className="text-xs text-gray-500">ID: #{member.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-3 h-3 text-gray-500" />
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-headline font-bold uppercase rounded-full ${
                        member.role === 'admin'
                          ? 'bg-primary-fixed/10 text-primary-fixed'
                          : 'bg-surface-container-highest text-gray-300'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {member.created_at ? new Date(member.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No members found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <p className="text-sm text-gray-500">
              Showing {((currentPage - 1) * membersPerPage) + 1} to {Math.min(currentPage * membersPerPage, filteredMembers.length)} of {filteredMembers.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-surface-container-highest border border-white/10 rounded-lg disabled:opacity-50 hover:bg-white/5 transition-colors"
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
                      : 'bg-surface-container-highest text-gray-400 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-surface-container-highest border border-white/10 rounded-lg disabled:opacity-50 hover:bg-white/5 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMembers;
