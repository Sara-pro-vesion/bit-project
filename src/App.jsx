import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CharityPage from './pages/CharityPage';
import Profile from './pages/Profile';
import DonorPage from './pages/DonorPage';


const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

                if (loading) return <div>Loading...</div>;
                if (!user) return <Navigate to="/login" />;
                if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

function AppRoutes() {
  return (
    <Routes>



      {/* Public Routes */}
      <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />

      {/* Charity Routes */}
      <Route
        path="/CharityHome"
        element={
          <ProtectedRoute allowedRole="charity">
                        <CharityPage />
          </ProtectedRoute>
        }
      />

      {/* Donor Routes */}
      <Route
        path="/DonorHome"
      element={
        <ProtectedRoute allowedRole="donor">
            <DonorPage />
                      </ProtectedRoute>
        }
      />

      {/* Common Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
      <AppRoutes />
      </Router>
    </AuthProvider>
  );
}