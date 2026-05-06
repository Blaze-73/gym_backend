import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * Placeholder page for creating a new training program.
 * In a full implementation this would present a form to define the program
 * (name, description, goal, duration, etc.) and POST it to the backend.
 */
const NewProgram = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    setSubmitting(true);
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    // After creation, redirect to the programs list
    navigate('/programs');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-high border border-white/5 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-black font-headline mb-4">Create New Program</h2>
        <p className="mb-6 text-gray-400">Placeholder page – implement form as needed.</p>
        <button
          onClick={handleCreate}
          disabled={submitting}
          className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create Program'}
        </button>
      </motion.div>
    </div>
  );
};

export default NewProgram;