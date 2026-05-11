import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Dumbbell } from 'lucide-react';

/**
 * Simple placeholder component for the client "Programs" page.
 * The original file mistakenly duplicated the entire routing configuration,
 * which caused the application to get stuck after login because React Router
 * attempted to mount a new router inside the existing one, leading to an
 * infinite render loop and navigation dead‑end.
 *
 * This component displays a list of the user's active programs (mocked for now)
 * and provides links to start a workout or view program details.
 */
const Programs = () => {
  // The API returns an array of UserProgram objects, each containing a nested `program`
  // relationship. We store the raw data but later reference the nested program fields.
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs for the logged‑in client – placeholder implementation.
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user-programs', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          // Store the array of enrolments (UserProgram) returned by the backend
          setPrograms(data);
        } else {
          console.error('Failed to fetch programs', response.status);
        }
      } catch (e) {
        console.error('Error fetching programs', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-fixed border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
        <Dumbbell className="w-20 h-20 text-primary-fixed mb-4" />
        <h2 className="text-2xl font-black font-headline mb-2">No Programs Found</h2>
        <p className="text-gray-400 mb-6">You don't have any active training programs yet.</p>
        <Link
          to="/programs/new"
          className="px-6 py-3 bg-primary-fixed text-on-primary-fixed rounded-xl font-headline font-bold"
        >
          Create New Program
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black font-headline mb-6">My Programs</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((enrollment) => {
          const prog = enrollment.program || {};
          return (
            <Link
              key={enrollment.id}
              to={`/programs/${enrollment.id}`}
              className="block p-4 border border-white/10 rounded-xl hover:border-primary-fixed transition"
            >
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2 text-primary-fixed" />
                <h2 className="text-xl font-bold">{prog.name || 'Unnamed Program'}</h2>
              </div>
              <p className="text-gray-400">{prog.description || 'No description provided.'}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
