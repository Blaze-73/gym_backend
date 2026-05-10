import { Outlet } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';

// Mobile: pt-16 clears the fixed top header rendered by ClientSidebar
// Desktop: lg:ml-[280px] clears the fixed left sidebar, no top padding needed
const ClientLayout = () => (
  <div className="min-h-screen bg-black text-white">
    <ClientSidebar />
    <main className="lg:ml-[280px] min-h-screen pt-16 lg:pt-0">
      <Outlet />
    </main>
  </div>
);

export default ClientLayout;