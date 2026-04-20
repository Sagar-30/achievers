import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AwardView from './AwardView';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/award/:id" element={<AwardView />} />
      </Routes>
    </BrowserRouter>
  )
}