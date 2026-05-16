import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Plus, Trash2, LayoutGrid, List } from 'lucide-react';
import { schedulesAPI, coachesAPI } from '@/services/api';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  
  const [formData, setFormData] = useState({
    class_name: '', coach_id: '', day_of_week: 'Monday', start_time: '09:00', end_time: '10:00', capacity: 20, room: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching schedules and coaches...");
      const [schedRes, coachRes] = await Promise.all([
        schedulesAPI.getAll(),
        coachesAPI.getAll()
      ]);

      // --- LOGGING FOR DEBUGGING ---
      console.log("Raw Schedule Response:", schedRes.data);
      console.log("Raw Coach Response:", coachRes.data);

      // Handle Laravel's different response types (Paginated vs Array)
      const schedulesData = schedRes.data.data || schedRes.data;
      setSchedules(Array.isArray(schedulesData) ? schedulesData : []);

      const coachData = coachRes.data.data || coachRes.data;
      setCoaches(Array.isArray(coachData) ? coachData : []);
      
      console.log("Processed Schedules:", schedulesData);
      console.log("Processed Coaches:", coachData);

    } catch (e) {
      console.error("API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await schedulesAPI.create({
        ...formData,
        coach_id: parseInt(formData.coach_id),
        capacity: parseInt(formData.capacity)
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this class?")) {
      try {
        await schedulesAPI.delete(id);
        fetchData();
      } catch (e) {
        alert("Delete failed");
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed" />
    </div>
  );

  return (
    <div className="space-y-8 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-headline text-white uppercase italic">
            SCHEDULE <span className="text-primary-fixed">ARCHITECTURE</span>
          </h1>
          <p className="text-gray-400 mt-1">Orchestrate gym flow and instructor assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-high rounded-xl p-1 border border-white/5">
            <button onClick={() => setIsGridView(true)} className={`p-2 rounded-lg transition-all ${isGridView ? 'bg-primary-fixed text-black' : 'text-gray-400'}`}><LayoutGrid className="w-4 h-4"/></button>
            <button onClick={() => setIsGridView(false)} className={`p-2 rounded-lg transition-all ${!isGridView ? 'bg-primary-fixed text-black' : 'text-gray-400'}`}><List className="w-4 h-4"/></button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-primary-fixed text-black rounded-xl text-sm font-headline font-black uppercase hover:scale-105 transition-transform shadow-lg shadow-primary-fixed/20">
            <Plus className="w-4 h-4" /> NEW CLASS
          </button>
        </div>
      </div >

      {schedules.length === 0 ? (
        <div className="py-32 text-center bg-surface-container-high rounded-3xl border border-dashed border-white/10">
          <Calendar className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-500 uppercase">No Active Schedules</h2>
          <p className="text-gray-600 mt-2">Start by adding your first training class.</p>
        </div>
      ) : (
        <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-3"}>
          {schedules.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-surface-container-high border border-white/5 rounded-2xl transition-all group hover:border-primary-fixed/50 ${isGridView ? 'p-6' : 'p-4 flex items-center justify-between'}`}
            >
              <div className={isGridView ? "" : "flex items-center gap-6"}>
                <div className="p-3 bg-primary-fixed/10 rounded-xl text-primary-fixed">
                  <Clock className="w-5 h-5" />
                </div >
                <div>
                  <h3 className="text-lg font-black font-headline text-white uppercase">{item.class_name}</h3>
                  <p className="text-primary-fixed text-xs font-bold uppercase tracking-widest">{item.coach?.name || 'Sheduling...'}</p>
                </div >
              </div >

              <div className={isGridView ? "grid grid-cols-2 gap-4 mt-6 text-[10px] font-headline text-gray-400 uppercase" : "flex items-center gap-6 text-xs font-headline text-gray-400 uppercase"}>
                <div className="flex items-center gap-2"><Calendar className="w-3 h-3 text-primary-fixed" /> {item.day_of_week}</div>
                <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-primary-fixed" /> {item.start_time} - {item.end_time}</div>
                <div className="flex items-center gap-2"><Users className="w-3 h-3 text-primary-fixed" /> {item.capacity} Slots</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-primary-fixed rounded-full" /> {item.room || 'Main Gym'}</div>
              </div >

              <div className={isGridView ? "mt-6 flex justify-end" : "ml-auto"}>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div >
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Class" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Class Name</label>
              <input type="text" value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" placeholder="e.g. Power Lifting Elite" required />
            </div >
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Assign Coach</label>
              <select value={formData.coach_id} onChange={e => setFormData({...formData, coach_id: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" required>
                <option value="">Select Coach</option>
                {coaches.map(c => (
                  <option key={c.id} value={c.user_id}>{c.user?.name || `Coach ${c.id}`}</option>
                ))}
              </select>
            </div >
          </div >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Day</label>
              <select value={formData.day_of_week} onChange={e => setFormData({...formData, day_of_week: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div >
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Capacity</label>
              <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" required />
            </div >
          </div >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Start Time</label>
              <input type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" required />
            </div >
            <div>
              <label className="block text-xs font-headline text-gray-500 uppercase mb-2">End Time</label>
              <input type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" required />
            </div >
          </div >
          <div>
            <label className="block text-xs font-headline text-gray-500 uppercase mb-2">Room / Zone</label>
            <input type="text" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-fixed" placeholder="e.g. Studio A" />
          </div >
          <Button type="submit" className="w-full py-4">Create Class</Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSchedule;
