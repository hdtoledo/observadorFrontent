import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaUser,
  FaBox,
  FaDashcube,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";
import observador from "../assets/logoObservadorNegro.png";

const Sidebar = ({ user: propUser, menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(propUser || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const adminItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Usuarios", icon: <FaUser />, path: "/admin/usuarios" },
    { name: "Observaciones", icon: <FaClipboardList />, path: "/admin/observaciones" },
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

  let menuItems = [];
  if (user?.rol === "admin") menuItems = adminItems;
  else if (user?.rol === "docente") menuItems = docenteItems;
  else if (user?.rol === "alumno") menuItems = alumnoItems;

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
        } md:block flex flex-col justify-between h-screen`}
      >
        {/* Logo */}
        <div>
          <div className="p-4 flex items-center justify-between bg-gray-200">
            <div className="flex items-center">
              <img src={observador} alt="Logo" className="h-8 mr-2" />
              <span className="text-gray-800 font-bold">Observador</span>
            </div>
            <button className="md:hidden" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Usuario */}
          <div className="p-4">
            <p className="text-gray-600">Bienvenido,</p>
            <p className="text-lg font-semibold">{user?.nombre || "Usuario"}</p>
            <p className="text-sm italic text-gray-500 capitalize">{user?.rol}</p>
          </div>

          {/* Menú */}
          <nav className="px-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 p-2 rounded"
            >
              <FaDashcube /> Inicio
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 p-2 rounded"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
