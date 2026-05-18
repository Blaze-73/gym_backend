import { useState, useEffect, useMemo } from 'react';
import { usersAPI, membershipsAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { Users, Search, CheckCircle, XCircle, Clock } from 'lucide-react';

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
    setLoading(true);
    try {
      const response = await usersAPI.getAll();
      const data = response.data.data || response.data;
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMembershipStatus = async (membershipId, status) => {
    try {
      await membershipsAPI.updateStatus(membershipId, { status });
      // Fetch members again to update the UI status
      fetchMembers();
    } catch (error) {
      alert('Error updating status: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [members, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-headline text-white uppercase italic">
            MEMBER <span className="text-primary-fixed">DIRECTORY</span>
          </h1>
          <p className="text-gray-400 mt-1">Approve requests and manage user access.</p>
        </div>
      </div>

      <div className="bg-surface-container-high border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
      </div>

      <div className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Member</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Role</th>
                <th className="px-6 py-4 text-left text-xs font-headline uppercase tracking-wider text-gray-500">Membership Status</th>
                <th className="px-6 py-4 text-right text-xs font-headline uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedMembers.map((member) => {
                // Find the most recent membership for this user
                const membership = member.memberships?.[0];
                return (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary-fixed font-bold">
                          {member.name?.charAt(0)}
                        </div>
                        <p className="font-headline font-bold text-white">{member.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${member.role === 'admin' ? 'bg-primary-fixed/10 text-primary-fixed' : 'bg-white/5 text-gray-300'}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {membership ? (
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                          membership.status === 'active' ? 'bg-green-500/10 text-green-400' : 
                          membership.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-error/10 text-error'
                        }`}>
                          {membership.status}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600 italic">No Plan</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {membership?.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => updateMembershipStatus(membership.id, 'active')}
                            className="p-2 bg-primary-fixed/20 text-primary-fixed rounded-lg hover:bg-primary-fixed hover:text-black transition-all"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => updateMembershipStatus(membership.id, 'rejected')}
                            className="p-2 bg-error/20 text-error rounded-lg hover:bg-error hover:text-white transition-all"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden divide-y divide-white/5">
          {paginatedMembers.map((member) => (
            <div key={member.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary-fixed font-bold">{member.name?.charAt(0)}</div>
                  <p className="font-bold text-white">{member.name}</p>
                </div>
                {member.memberships?.[0]?.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => updateMembershipStatus(member.memberships[0].id, 'active')} className="p-2 bg-primary-fixed text-black rounded-lg"><CheckCircle className="w-4 h-4" /></button>
                    <button onClick={() => updateMembershipStatus(member.memberships[0].id, 'rejected')} className="p-2 bg-error text-white rounded-lg"><XCircle className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">{member.email} • {member.role}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-sm text-gray-500">Showing {paginatedMembers.length} members</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-1 bg-white/5 rounded-lg disabled:opacity-50">Prev</button>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-1 bg-white/5 rounded-lg disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers;
