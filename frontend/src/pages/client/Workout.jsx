import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle, Clock, Flame, Dumbbell, ChevronRight, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  // List of available protocols (programs) for selection
  const [protocols, setProtocols] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial data load: fetch workout by URL id (if present) and load protocols list
  useEffect(() => {
    // Load protocols (programs) for the dropdown
    const fetchProtocols = async () => {
      try {
        const response = await fetch('/api/programs');
        const data = await response.json();
        setProtocols(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch protocols:', err);
      }
    };

    fetchProtocols();

    if (id) {
      fetchWorkout();
    } else {
      // No workout ID – allow user to select a protocol
      setLoading(false);
    }

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const fetchWorkout = async (workoutId = id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/workouts/${workoutId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Workout not found');
      }
      
      const data = await response.json();
      setWorkout(data);
    } catch (err) {
      console.error('Failed to fetch workout:', err);
      setError('Failed to load workout');
    } finally {
      setLoading(false);
    }
  };

  // Load a protocol (program) and start its first workout
  const loadProtocol = async () => {
    if (!selectedProtocol) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/programs/${selectedProtocol}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Program not found');
      const program = await response.json();
      // Assume program.workouts is an array; pick the first workout id
      const firstWorkoutId = program.workouts?.[0]?.id;
      if (firstWorkoutId) {
        // Reset state for new workout
        setCurrentExercise(0);
        setCompletedExercises([]);
        setElapsedTime(0);
        setLoading(true);
        setError(null);
        fetchWorkout(firstWorkoutId);
      } else {
        setError('Selected protocol has no workouts');
      }
    } catch (err) {
      console.error('Failed to load protocol:', err);
      setError('Failed to load protocol');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteExercise = (index) => {
    if (!completedExercises.includes(index)) {
      setCompletedExercises([...completedExercises, index]);
    }
    if (index < (workout?.exercises?.length || 0) - 1) {
      setCurrentExercise(index + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-fixed border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Show an error banner if something went wrong, but still render the page so the user can pick a protocol
  const errorBanner = error ? (
    <div className="bg-red-900/80 text-white p-4 rounded mb-4">
      <p>{error}</p>
    </div>
  ) : null;

  const progress = workout?.exercises?.length > 0
    ? (completedExercises.length / workout.exercises.length) * 100
    : 0;

  // If no workout data is loaded yet (no id and no protocol selected), show a friendly placeholder with protocol selector
  if (!workout) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        {errorBanner}
        <div className="text-center mb-8">
          <Dumbbell className="w-20 h-20 text-primary-fixed mx-auto mb-6" />
            <h2 className="text-3xl font-black font-headline uppercase italic mb-4">Ready to Train?</h2>
            <p className="text-gray-400 text-center max-w-md">
              Choose your training program below and let's crush your goals together!
            </p>
</div>
{/* Protocol selector and load button */}
<div className="flex flex-col sm:flex-row items-center gap-4">
  <select
    value={selectedProtocol}
    onChange={(e) => setSelectedProtocol(e.target.value)}
    className="bg-surface-container-high text-white rounded-xl px-4 py-3 min-w-[250px] border border-white/5 focus:border-primary-fixed focus:outline-none"
  >
    <option value="">Select Training Program</option>
    {protocols.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ))}
  </select>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={loadProtocol}
    disabled={!selectedProtocol}
    className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Begin Workout
  </motion.button>
</div>
</div>
);
}

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black font-headline text-white uppercase italic">
                {workout?.name || 'Workout'}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {workout?.duration_minutes} min • {workout?.calories_burned} cal
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Protocol selector */}
              <select
                value={selectedProtocol}
                onChange={(e) => setSelectedProtocol(e.target.value)}
                className="bg-surface-container-high text-white rounded px-3 py-2"
              >
            <option value="">Switch Program</option>
            {protocols.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            onClick={loadProtocol}
            disabled={!selectedProtocol}
            className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded hover:bg-primary-fixed/90 transition-colors"
          >
            Switch
          </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full">
                <Clock className="w-4 h-4 text-primary-fixed" />
                <span className="font-mono font-bold">{formatTime(elapsedTime)}</span>
              </div>
              <button
                onClick={() => navigate('/programs')}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>SESSION PROGRESS</span>
              <span className="text-primary-fixed font-bold">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-primary-fixed"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Exercise */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {workout?.exercises?.[currentExercise] && (
              <div className="bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden">
                {/* Exercise Image */}
                <div className="relative aspect-video bg-surface-container-highest">
                    {workout.exercises[currentExercise].image ? (
                      <img
                        src={workout.exercises[currentExercise].image}
                        alt={workout.exercises[currentExercise].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Dumbbell className="w-24 h-24 text-gray-600" />
                      </div>
                    )}
                </div>

                {/* Exercise Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-black font-headline text-white uppercase">
                        {workout.exercises[currentExercise].name}
                      </h2>
                      <p className="text-gray-400 mt-1">
                        {workout.exercises[currentExercise].muscle_group || 'Full Body'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-black font-headline text-primary-fixed">
                          {workout.exercises[currentExercise].pivot?.sets || 3}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">Sets</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black font-headline text-primary-fixed">
                          {workout.exercises[currentExercise].pivot?.reps || 12}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">Reps</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCompleteExercise(currentExercise)}
                      className="flex-1 py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-primary-fixed/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete Set
                    </motion.button>
                    
                    {currentExercise < (workout?.exercises?.length || 0) - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentExercise(currentExercise + 1)}
                        className="p-4 bg-surface-container-highest border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Exercise List */}
        <div className="space-y-4">
          <h3 className="text-lg font-headline font-bold uppercase tracking-wider">
            All Exercises ({workout?.exercises?.length || 0})
          </h3>
          
          {workout?.exercises?.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentExercise(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentExercise === index
                  ? 'bg-primary-fixed/10 border-primary-fixed/50'
                  : 'bg-surface-container-high border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  completedExercises.includes(index)
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container-highest text-gray-400'
                }`}>
                  {completedExercises.includes(index) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-headline font-bold">{exercise.name}</h4>
                  <p className="text-sm text-gray-500">
                    {exercise.pivot?.sets || 3} sets × {exercise.pivot?.reps || 12} reps
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Workout;
