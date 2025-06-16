// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Páginas de usuario
import Dashboard from "./pages/Dashboard";
import Observaciones from "./pages/admin/AdminObservations"; // si luego quieres separar, muévela a pages/alumno/MyObservaciones

// Páginas de administrador
import Usuarios from "./pages/admin/UserList";
import Seguimientos from "./pages/admin/AdminSeguimientos";
import AdminWelcome from "./components/Welcome";

// Layouts y rutas protegidas
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AlumnoResumen from "./pages/alumno/AlumnoResumen";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Layout para usuario (docente o alumno) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserLayout user={user} onLogout={onLogout} />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* Ruta para que docentes/alumnos vean sus observaciones */}
          <Route path="observaciones" element={<Observaciones />} />
          <Route path="seguimientos-alumno" element={<AlumnoResumen />} />
          <Route path="seguimientos" element={<Seguimientos />} />

        </Route>

        {/* Layout para admin */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout user={user} onLogout={onLogout} />
            </AdminRoute>
          }
        >
          <Route index element={<AdminWelcome user={user} />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="seguimientos" element={<Seguimientos />} />
          {/* Ruta para que el admin vea todas las observaciones */}
          <Route path="observaciones" element={<Observaciones />} />
        </Route>

        {/* 404 genérico */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
};

export default App;
