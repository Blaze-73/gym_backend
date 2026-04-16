import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

const ClientLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-20 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
