import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/components/products/Cart';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AdminLayout from '@/components/layout/AdminLayout';
import ClientLayout from '@/components/layout/ClientLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminMembers from '@/pages/admin/AdminMembers';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminSchedule from '@/pages/admin/AdminSchedule';
import AdminAddProduct from '@/pages/admin/AdminAddProduct';
import AdminSettings from '@/pages/admin/AdminSettings';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Profile from '@/pages/client/Profile';
import Attendance from '@/pages/client/Attendance';
import Orders from '@/pages/client/Orders';
import Store from '@/pages/public/Store';
import Plans from '@/pages/public/Plans';
import ProductDetail from '@/pages/public/ProductDetail';
import Home from '@/pages/public/Home';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/plans" element={<Plans />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="members" element={<AdminMembers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/add" element={<AdminAddProduct />} />
                <Route path="schedule" element={<AdminSchedule />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Client Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ClientLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Profile />} />
              </Route>

              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <ClientLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Attendance />} />
              </Route>

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <ClientLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Orders />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
