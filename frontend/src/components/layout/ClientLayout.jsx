import { Outlet } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ClientSidebar />
      <main className="lg:ml-[280px] pt-16 lg:pt-20 min-h-screen p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
