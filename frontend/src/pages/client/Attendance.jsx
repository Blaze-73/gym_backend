import { useState, useEffect } from 'react';
import { attendanceAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, LogOut, Calendar, TrendingUp } from 'lucide-react';

const Attendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    fetchHistory();
    checkActiveSession();
  }, []);

  useEffect(() => {
    let interval;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(checkInTime);
        const diff = Math.floor((now - start) / 1000);
        setElapsedTime(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const fetchHistory = async () => {
    try {
      const response = await attendanceAPI.history();
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const checkActiveSession = async () => {
    try {
      const response = await attendanceAPI.history();
      const activeSession = response.data.find(session => !session.check_out);
      if (activeSession) {
        setIsCheckedIn(true);
        setCheckInTime(activeSession.check_in);
      }
    } catch (error) {
      console.error('Failed to check active session:', error);
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const response = await attendanceAPI.checkIn();
      setIsCheckedIn(true);
      setCheckInTime(response.data.check_in);
      setMessage({ type: 'success', text: 'Checked in successfully' });
      fetchHistory();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Check-in failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await attendanceAPI.checkOut();
      setIsCheckedIn(false);
      setCheckInTime(null);
      setElapsedTime(0);
      setMessage({ type: 'success', text: 'Checked out successfully' });
      fetchHistory();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Check-out failed' });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black font-headline text-white uppercase italic">
          Attendance Tracking
        </h2>
        <p className="text-on-surface-variant mt-1">Monitor your gym sessions</p>
      </header>

      {message.text && (
        <div className={`mb-6 p-4 rounded border ${
          message.type === 'success' 
            ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed' 
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Check-in/Out Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-high p-8 border border-white/5 flex flex-col items-center justify-center min-h-[300px]"
        >
          {isCheckedIn ? (
            <>
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-primary-fixed mx-auto mb-4" />
                <h3 className="text-2xl font-headline font-bold text-on-surface">You're Checked In</h3>
                <p className="text-on-surface-variant mt-2">Started at {new Date(checkInTime).toLocaleTimeString()}</p>
              </div>
              
              <div className="text-6xl font-black font-headline text-primary-fixed mb-8">
                {formatTime(elapsedTime)}
              </div>

              <button
                onClick={handleCheckOut}
                disabled={loading}
                className="flex items-center gap-3 px-8 py-4 bg-error text-white font-headline font-bold text-sm tracking-widest uppercase rounded hover:bg-error/80 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                {loading ? 'Processing...' : 'Check Out'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <Clock className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                <h3 className="text-2xl font-headline font-bold text-on-surface">Ready to Train?</h3>
                <p className="text-on-surface-variant mt-2">Start your session now</p>
              </div>

              <button
                onClick={handleCheckIn}
                disabled={loading}
                className="flex items-center gap-3 px-8 py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm tracking-widest uppercase rounded hover:scale-105 transition-transform disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                {loading ? 'Processing...' : 'Check In'}
              </button>
            </>
          )}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-high p-8 border border-white/5"
        >
          <h3 className="text-xl font-headline font-bold text-on-surface mb-6">Weekly Stats</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-fixed" />
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">Sessions This Week</p>
                  <p className="text-2xl font-black font-headline text-on-surface">
                    {history.filter(h => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(h.check_in) >= weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-container/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary-container" />
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">Total Hours</p>
                  <p className="text-2xl font-black font-headline text-on-surface">
                    {Math.floor(history.reduce((acc, h) => acc + (h.duration_minutes || 0), 0) / 60)}h
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-container/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-tertiary-container" />
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm">Avg. Session</p>
                  <p className="text-2xl font-black font-headline text-on-surface">
                    {history.length > 0 
                      ? Math.round(history.reduce((acc, h) => acc + (h.duration_minutes || 0), 0) / history.length)
                      : 0} min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-container-low overflow-hidden border border-white/5"
      >
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-headline font-bold text-on-surface">Attendance History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-highest/30">
                <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Date</th>
                <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Check In</th>
                <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Check Out</th>
                <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Duration</th>
                <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((session, index) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-on-surface">{formatDate(session.check_in)}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {new Date(session.check_in).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {session.check_out ? new Date(session.check_out).toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {session.duration_minutes ? `${session.duration_minutes} min` : 'In Progress'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                      session.check_out 
                        ? 'bg-primary-fixed/10 text-primary-fixed border border-primary-fixed/20'
                        : 'bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20'
                    }`}>
                      {session.check_out ? 'Completed' : 'Active'}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant">
                    No attendance records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
