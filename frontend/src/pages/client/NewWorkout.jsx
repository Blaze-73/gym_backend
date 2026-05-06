import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * Simple placeholder page for creating a new workout.
 * In a full implementation this would contain a form to input workout details
 * and submit them to the backend API. For now it just demonstrates navigation
 * and provides a basic UI so the dashboard quick‑action link works.
 */
const NewWorkout = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    setSubmitting(true);
    // Placeholder: In a real app you would POST to /api/workouts
    // Simulate a short delay then navigate back to the dashboard.
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    navigate('/programs');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-high border border-white/5 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-black font-headline mb-4">Create New Workout</h2>
        <p className="mb-6 text-gray-400">This is a placeholder. Implement the form as needed.</p>
        <button
          onClick={handleCreate}
          disabled={submitting}
          className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create Workout'}
        </button>
      </motion.div>
    </div>
  );
};

export default NewWorkout;