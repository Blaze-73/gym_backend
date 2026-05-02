import { Outlet } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
