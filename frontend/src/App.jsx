import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/components/products/Cart';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminLayout from '@/components/layout/AdminLayout';
import ClientLayout from '@/components/layout/ClientLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Public Pages
import Home from '@/pages/public/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Store from '@/pages/public/Store';
import Plans from '@/pages/public/Plans';
import ProductDetail from '@/pages/public/ProductDetail';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminAddProduct from '@/pages/admin/AdminAddProduct';
import AdminMembers from '@/pages/admin/AdminMembers';
import AdminSchedule from '@/pages/admin/AdminSchedule';
import AdminSettings from '@/pages/admin/AdminSettings';

// Client Pages
import Programs from '@/pages/client/Programs';
import Workout from '@/pages/client/Workout';
import Nutrition from '@/pages/client/Nutrition';
import Coaches from '@/pages/client/Coaches';
import Settings from '@/pages/client/Settings';

function AppRoutes() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      {/* Render Login page regardless of authentication to avoid redirect loops */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to={isAdmin() ? "/admin" : "/programs"} /> : <Register />} />
      <Route path="/store" element={<Store />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requireAdmin />}> 
        <Route element={<AdminLayout />}> 
          <Route index element={<AdminDashboard />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Client Routes – only for non‑admin authenticated users */}
      <Route path="/programs" element={<ProtectedRoute requireNonAdmin />}> 
        <Route element={<ClientLayout />}> 
          <Route index element={<Programs />} />
        </Route>
      </Route>
      <Route path="/workout/*" element={<ProtectedRoute requireNonAdmin />}> 
        <Route element={<ClientLayout />}> 
          <Route index element={<Workout />} />
          <Route path="*" element={<Workout />} />
        </Route>
      </Route>
      <Route path="/nutrition/*" element={<ProtectedRoute requireNonAdmin />}> 
        <Route element={<ClientLayout />}> 
          <Route index element={<Nutrition />} />
          <Route path="*" element={<Nutrition />} />
        </Route>
      </Route>
      <Route path="/coaches/*" element={<ProtectedRoute requireNonAdmin />}> 
        <Route element={<ClientLayout />}> 
          <Route index element={<Coaches />} />
          <Route path="*" element={<Coaches />} />
        </Route>
      </Route>
      <Route path="/settings/*" element={<ProtectedRoute requireNonAdmin />}> 
        <Route element={<ClientLayout />}> 
          <Route index element={<Settings />} />
          <Route path="*" element={<Settings />} />
        </Route>
      </Route>

      {/* Redirects */}
      <Route path="/profile" element={<Navigate to="/programs" replace />} />
      <Route path="/attendance" element={<Navigate to="/programs" replace />} />
      <Route path="/orders" element={<Navigate to="/store" replace />} />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Global navigation and footer */}
          <Navbar />
          <AppRoutes />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
