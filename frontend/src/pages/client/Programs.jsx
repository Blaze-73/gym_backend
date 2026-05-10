import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Dumbbell, TrendingUp, Play, ChevronRight, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [activeProgram, setActiveProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchPrograms();
    fetchActiveProgram();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      // Mock API call - replace with real API
      const mockData = [
        {
          id: 1,
          name: 'HYPERTROPHY 2.0',
          description: 'Advanced muscle growth protocol with progressive overload',
          thumbnail: 'https://source.unsplash.com/random/600x400/?gym,weights',
          goal: 'hypertrophy',
          difficulty: 'Advanced',
          duration_weeks: 12,
          days_per_week: 5,
        },
        {
          id: 2,
          name: 'STRENGTH FOUNDATION',
          description: 'Build raw strength with compound lifts and perfect form',
          thumbnail: 'https://source.unsplash.com/random/600x400/?gym,barbell',
          goal: 'strength',
          difficulty: 'Intermediate',
          duration_weeks: 8,
          days_per_week: 4,
        },
        {
          id: 3,
          name: 'ENDURANCE MATRIX',
          description: 'High intensity endurance training for peak performance',
          thumbnail: 'https://source.unsplash.com/random/600x400/?gym,running',
          goal: 'endurance',
          difficulty: 'Advanced',
          duration_weeks: 10,
          days_per_week: 6,
        },
        {
          id: 4,
          name: 'WEIGHT LOSS ACCELERATOR',
          description: 'Science-backed fat loss with metabolic conditioning',
          thumbnail: 'https://source.unsplash.com/random/600x400/?gym,yoga,fitness',
          goal: 'weight_loss',
          difficulty: 'Beginner',
          duration_weeks: 12,
          days_per_week: 4,
        },
      ];
      setPrograms(mockData);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveProgram = async () => {
    try {
      // Mock active program data
      const mockActiveProgram = {
        program: {
          name: 'HYPERTROPHY 2.0',
          description: 'Advanced muscle growth protocol with progressive overload',
          duration_weeks: 12,
          workouts: [{ id: 123 }, { id: 456 }],
        },
        current_week: 3,
        current_day: 15,
        completion_percentage: 35,
      };
      setActiveProgram(mockActiveProgram);
    } catch (error) {
      console.error('Failed to fetch active program:', error);
    }
  };

  const handleEnroll = async (programId) => {
    try {
      setEnrollLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Update UI state
      const enrolledProgram = programs.find(p => p.id === programId);
      setActiveProgram({
        program: enrolledProgram,
        current_week: 1,
        current_day: 1,
        completion_percentage: 0,
      });
    } catch (error) {
      console.error('Failed to enroll:', error);
      // Show error message
    } finally {
      setEnrollLoading(false);
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
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface section-padding">
      {/* Success Toast - Bottom right */}
      {showSuccess && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-4 right-4 bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-xl shadow-lg z-50 neon-glow"
        >
          <span className="font-bold">ENROLLED SUCCESSFULLY!</span>
        </motion.div>
      )}

      {/* Header - Responsive */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-surface-container-high border-b border-white/5 section-padding"
      >
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-black font-headline text-white uppercase italic">
                TRAINING <span className="text-primary-fixed">PROGRAMS</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm md:text-base">Engineered protocols for peak human condition.</p>
            </div>
            <Link to="/workout/new" className="w-full sm:w-auto">
              <Button variant="primary" className="text-tappable">
                <Plus size={16} className="w-5 h-5" />
                NEW WORKOUT
              </Button>
            </Link>
          </div>

          {/* Search & Filter - Mobile responsive */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  disabled={enrollLoading}
                  className={`px-3 py-2 rounded-full text-xs font-headline font-bold uppercase transition-colors min-height-[40px] ${
                    selectedGoal === goal
                      ? 'bg-primary-fixed text-on-primary-fixed neon-glow'
                      : 'bg-surface-container-highest text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {goal.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container section-padding">
        {/* Active Program - Responsive */}
        {activeProgram && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-black font-headline uppercase">
                <span className="text-primary-fixed">ACTIVE</span> PROTOCOL
              </h2>
              <Link to="/workout/1" className="w-full md:w-auto">
                <Button variant="primary" className="text-tappable">
                  <Play className="w-5 h-5" />
                  Resume TRAINING
                </Button>
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.005 }}
              className="card neon-glow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge-active">ACTIVE PROTOCOL</span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-black font-headline text-white uppercase mb-3">
                    {activeProgram.program?.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{activeProgram.program?.description}</p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-5 h-5 text-primary-fixed" />
                      <span>Week {activeProgram.current_week} / {activeProgram.program?.duration_weeks}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-5 h-5 text-primary-fixed" />
                      <span>Day {activeProgram.current_day}</span>
                    </div>
                  </div>

                  {/* Progress Bar - Mobile responsive */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">PROGRESS</span>
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

                {/* Calendar Preview - Responsive */}
                <div className="card">
                  <h4 className="text-sm font-headline font-bold uppercase text-gray-500 mb-4">
                    Performance Calendar
                  </h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded flex items-center justify-center ${
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
            </motion.div>
          </motion.section>
        )}

        {/* Program Library */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-black font-headline uppercase">
              Protocol <span className="text-gray-500">Library</span>
            </h2>
            <button
              onClick={() => alert('Browse all programs functionality coming soon!')}
              disabled={enrollLoading}
              className="btn-secondary text-sm min-height-[40px]"
            >
              BROWSE ALL
            </button>
          </div>

          {/* Program Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.length === 0 ? (
              <div className="col-span-full empty-state">
                <div className="text-6xl text-gray-600 mb-4">
                  <Dumbbell />
                </div>
                <h3 className="font-bold text-white">No programs found</h3>
                <p className="text-gray-400 text-center max-w-md mx-auto">
                  Try adjusting your search or filters to find available training protocols.
                </p>
              </div>
            ) : (
              filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-surface-container-highest overflow-hidden rounded-lg mb-4">
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
                    <div className="absolute top-3 left-3">
                      <span className="badge-active text-xs">
                        {program.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black font-headline text-white uppercase mb-2">
                        {program.name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {program.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-4 h-4" />
                        <span>{program.duration_weeks} weeks</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-4 h-4" />
                        <span>{program.days_per_week} days/wk</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleEnroll(program.id)}
                      disabled={enrollLoading || activeProgram?.program?.id === program.id}
                      variant="secondary"
                      className="w-full text-tappable"
                    >
                      {enrollLoading && activeProgram?.program?.id === program.id ? (
                        'ENROLLING...'
                      ) : activeProgram?.program?.id === program.id ? (
                        'ACTIVE PROTOCOL'
                      ) : (
                        'ENROLL NOW'
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      
      </main>
    </div>  
  );
};

export default Programs;
