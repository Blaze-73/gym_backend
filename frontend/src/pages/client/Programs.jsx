import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Dumbbell, TrendingUp, Play, ChevronRight, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [activeProgram, setActiveProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('all');

  useEffect(() => {
    fetchPrograms();
    fetchActiveProgram();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      const data = await response.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
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

  const handleEnroll = async (programId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user-programs/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ program_id: programId }),
      });
      
      if (response.ok) {
        fetchActiveProgram();
      }
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = selectedGoal === 'all' || program.goal === selectedGoal;
    return matchesSearch && matchesGoal;
  });

  const goals = ['all', 'hypertrophy', 'strength', 'endurance', 'weight_loss'];

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
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-surface-container-high border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black font-headline text-white uppercase italic">
                TRAINING <span className="text-primary-fixed">PROGRAMS</span>
              </h1>
              <p className="text-gray-400 mt-2">Engineered protocols for peak human condition.</p>
            </div>
            <Link to="/workout/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Workout
              </motion.button>
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-highest border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`px-4 py-2 rounded-lg text-sm font-headline font-bold uppercase whitespace-nowrap transition-colors ${
                    selectedGoal === goal
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-surface-container-highest text-gray-400 hover:text-white'
                  }`}
                >
                  {goal.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Program */}
        {activeProgram && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black font-headline uppercase">
                <span className="text-primary-fixed">ACTIVE</span> PROTOCOL
              </h2>
              <Link to={`/workout/${activeProgram.program?.workouts?.[0]?.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Resume Training
                </motion.button>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-primary-fixed/20 to-surface-container-high border border-primary-fixed/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                      Active Protocol
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-headline text-white uppercase mb-2">
                    {activeProgram.program?.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{activeProgram.program?.description}</p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-fixed" />
                      <span className="text-sm">Week {activeProgram.current_week} / {activeProgram.program?.duration_weeks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-fixed" />
                      <span className="text-sm">Day {activeProgram.current_day}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>PROGRESS</span>
                      <span className="text-primary-fixed font-bold">{activeProgram.completion_percentage}%</span>
                    </div>
                    <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeProgram.completion_percentage}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-primary-fixed"
                      />
                    </div>
                  </div>
                </div>

                {/* Calendar Preview */}
                <div className="bg-surface-container-highest/50 rounded-xl p-6">
                  <h4 className="text-sm font-headline font-bold uppercase text-gray-500 mb-4">
                    Performance Calendar
                  </h4>
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-xs text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs font-headline ${
                          i + 1 === activeProgram.current_day
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container-highest text-gray-400'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Program Library */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black font-headline uppercase">
              Protocol <span className="text-gray-500">Library</span>
            </h2>
            <button className="text-primary-fixed text-sm font-headline font-bold uppercase hover:underline">
              Browse All
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-surface-container-highest overflow-hidden">
                  {program.thumbnail ? (
                    <img
                      src={program.thumbnail}
                      alt={program.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Dumbbell className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                      {program.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black font-headline text-white uppercase mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{program.days_per_week} days/wk</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEnroll(program.id)}
                    className="w-full py-3 bg-surface-container-highest border border-white/10 text-white font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed hover:border-primary-fixed transition-colors"
                  >
                    View Program
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Programs;
