import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import NotificationProvider from '@/components/common/NotificationDropdown';

// Layouts
import PublicLayout  from '@/components/layout/PublicLayout';
import AdminLayout   from '@/components/layout/AdminLayout';
import ClientLayout  from '@/components/layout/ClientLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Public pages
import Home          from '@/pages/public/Home';
import Login         from '@/pages/auth/Login';
import Register      from '@/pages/auth/Register';
import Store         from '@/pages/public/Store';
import Plans         from '@/pages/public/Plans';
import ProductDetail from '@/pages/public/ProductDetail';

// Admin pages
import AdminDashboard  from '@/pages/admin/AdminDashboard';
import AdminProducts   from '@/pages/admin/AdminProducts';
import AdminAddProduct from '@/pages/admin/AdminAddProduct';   // handles both add & edit
import AdminMembers    from '@/pages/admin/AdminMembers';
import AdminSchedule   from '@/pages/admin/AdminSchedule';
import AdminSettings   from '@/pages/admin/AdminSettings';

// Client pages
import Programs   from '@/pages/client/Programs'; // Retained for potential direct access via /programs/list
import ClientDashboard from '@/pages/client/ClientDashboard';
import Workout    from '@/pages/client/Workout';
import Nutrition  from '@/pages/client/Nutrition';
import Coaches    from '@/pages/client/Coaches';
import Settings   from '@/pages/client/Settings';
import NewWorkout from '@/pages/client/NewWorkout';
import NewProgram from '@/pages/client/NewProgram';

function AppRoutes() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed" />
    </div>
  );

  return (
    <Routes>
      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={isAdmin() ? '/admin' : '/programs'} replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to={isAdmin() ? '/admin' : '/programs'} replace /> : <Register />}
        />
        <Route path="/store"        element={<Store />} />
        <Route path="/plans"        element={<Plans />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>

      {/* ── Admin ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            {/* Wrap admin in its own notification context (admin-specific notifications) */}
            <NotificationProvider isAdmin>
              <AdminLayout />
            </NotificationProvider>
          </ProtectedRoute>
        }
      >
        <Route index                       element={<AdminDashboard />} />
        <Route path="members"              element={<AdminMembers />} />
        <Route path="schedule"             element={<AdminSchedule />} />
        <Route path="products"             element={<AdminProducts />} />
        <Route path="products/add"         element={<AdminAddProduct />} />
        <Route path="products/edit/:id"    element={<AdminAddProduct />} />  {/* ✅ edit route added */}
        <Route path="settings"             element={<AdminSettings />} />
      </Route>

      {/* ── Client ── */}
        <Route
          path="/programs"
          element={
            <ProtectedRoute requireNonAdmin>
              <NotificationProvider>
                <ClientLayout />
              </NotificationProvider>
            </ProtectedRoute>
          }
        >
          {/* The main client dashboard is now displayed at /programs */}
          <Route index element={<ClientDashboard />} />
          {/* Keep the Programs list component accessible via a sub‑route if needed */}
          <Route path="list" element={<Programs />} />
          <Route path="new" element={<NewProgram />} />
        </Route>

      <Route path="/workout"  element={<ProtectedRoute requireNonAdmin><NotificationProvider><ClientLayout /></NotificationProvider></ProtectedRoute>}>
        <Route index          element={<Workout />} />
        <Route path="new"     element={<NewWorkout />} />
        <Route path=":id"     element={<Workout />} />
      </Route>

      <Route path="/nutrition" element={<ProtectedRoute requireNonAdmin><NotificationProvider><ClientLayout /></NotificationProvider></ProtectedRoute>}>
        <Route index           element={<Nutrition />} />
      </Route>

      <Route path="/coaches"   element={<ProtectedRoute requireNonAdmin><NotificationProvider><ClientLayout /></NotificationProvider></ProtectedRoute>}>
        <Route index           element={<Coaches />} />
      </Route>

      <Route path="/settings"  element={<ProtectedRoute requireNonAdmin><NotificationProvider><ClientLayout /></NotificationProvider></ProtectedRoute>}>
        <Route index           element={<Settings />} />
      </Route>

      {/* ── Redirects ── */}
      <Route path="/profile"    element={<Navigate to="/programs" replace />} />
      <Route path="/attendance" element={<Navigate to="/programs" replace />} />
      <Route path="/orders"     element={<Navigate to="/store"    replace />} />

      {/* ── Catch all ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;