// src/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUser, FaBox, FaDashcube, FaChalkboardTeacher, FaClipboardList  } from "react-icons/fa";
import observador from "../assets/logoobservadornegro.png";

const Sidebar = ({ user: propUser, onLogout, menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  // Arrays de items para cada rol
  const adminItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Usuarios", icon: <FaUser />, path: "/admin/usuarios" },
    { name: "Observaciones", icon: <FaClipboardList  />, path: "/admin/observaciones" },
    { name: "Seguimientos", icon: <FaBox />, path: "/admin/seguimientos" },
  ];

  const docenteItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Observaciones", icon: <FaChalkboardTeacher />, path: "/observaciones" },
    { name: "Seguimientos", icon: <FaBox />, path: "/seguimientos" },
  ];

  const alumnoItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Mis Observaciones", icon: <FaBox />, path: "/seguimientos-alumno" },
  ];

  // Determinar qué menú usar según el rol
  let menuItems = [];
  if (user?.rol === "admin") {
    menuItems = adminItems;
  } else if (user?.rol === "docente") {
    menuItems = docenteItems;
  } else if (user?.rol === "alumno") {
    menuItems = alumnoItems;
  }

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`bg-white w-64 shadow-lg fixed md:relative z-20 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block flex flex-col justify-start h-screen`}
      >
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-between bg-[#D3D3D3]">
          <div className="flex items-center">
            <img
              src={observador}
              alt="Observador Estudiantil Logo"
              className="h-8 mr-2"
            />
            <span className="text-gray-800 font-bold">Observador</span>
          </div>
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Información de usuario */}
        <div className="p-4 text-left overflow-y-auto flex-1">
          <div className="mb-6">
            <p className="font-medium text-gray-700">Bienvenido,</p>
            <p className="font-semibold text-gray-800">
              {user?.nombre || "Usuario"}
            </p>
            <p className="text-sm italic text-gray-600 capitalize">
              {user?.rol || "rol"}
            </p>
          </div>

          {/* Navegación según rol */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-md"
            >
              <FaDashcube /> Inicio
            </Link>

            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-md"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
