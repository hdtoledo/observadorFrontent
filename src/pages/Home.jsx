import { useEffect, useState } from "react";
import observador from "../assets/logoObservadorNegro.png";
import { Link } from "react-router-dom";
import { FaUserTie, FaFemale } from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-[#D3D3D3] shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <img src={observador} alt="Logo Observador" className="h-10" />
            <h1 className="text-2xl font-bold text-gray-800">Observador Estudiantil</h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="inline-flex items-center px-4 py-2 rounded-full border-2 border-white bg-white text-gray-700 font-semibold hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M12 7a4 4 0 110 8 4 4 0 010-8z" />
              </svg>
              {user ? "Ir al Dashboard" : "Iniciar Sesión"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="w-full max-w-5xl text-center py-12 px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Observador Estudiantil
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Plataforma educativa para registrar, consultar y analizar observaciones académicas y comportamentales de estudiantes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#D3D3D3] text-gray-800 font-semibold hover:bg-gray-400 transition"
          >
            {user ? "Ir al Dashboard" : "Comenzar Ahora"}
          </Link>
          <a
            href="#benefits"
            className="w-full sm:w-auto px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Ver Beneficios
          </a>
        </div>
      </main>

      {/* Beneficios */}
      <section id="benefits" className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Beneficios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Seguimiento Académico", desc: "Registra observaciones sobre el rendimiento académico." },
              { title: "Observaciones Comportamentales", desc: "Historial de comportamiento dentro del aula." },
              { title: "Acceso por Roles", desc: "Permisos según el rol: rector, docente, acudiente, etc." },
              { title: "Reportes Detallados", desc: "Análisis visual y exportación de observaciones." },
              { title: "Plataforma Intuitiva", desc: "Diseño amigable y accesible para toda la comunidad." },
              { title: "Soporte SENA", desc: "Desarrollado por aprendices con enfoque educativo." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600"
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aprendices */}
      <section id="team" className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Desarrolladores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Jorge Hios", icon: <FaUserTie size={48} /> },
              { name: "Louis Mosquera", icon: <FaUserTie size={48} /> },
              { name: "Diana Mora", icon: <FaFemale size={48} /> },
              { name: "Karent Vargas", icon: <FaFemale size={48} /> },
            ].map((dev, idx) => (
              <div key={idx} className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white mb-4">
                  {dev.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{dev.name}</h4>
                <p className="text-gray-600">Aprendiz ADSO</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 py-6 px-4 border-t">
        <p className="text-sm">© {new Date().getFullYear()} Observador Estudiantil - SENA.</p>
      </footer>
    </div>
  );
};

export default Home;
