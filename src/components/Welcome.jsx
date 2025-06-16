import React from "react";
import observador from "../assets/logoObservadorNegro.png";

const Welcome = ({ user }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-start justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        {/* Cabecera con logo y título */}
        <div className="flex items-center mb-6">
          <img src={observador} alt="Logo Observador" className="h-10 mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Observador - Panel de Administración
          </h1>
        </div>

        {/* Mensaje de bienvenida */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bienvenido, <span className="text-blue-600">{user?.nombre}</span>!
        </h2>
        <p className="text-gray-600 mb-6">
          Has ingresado como{" "}
          <span className="italic text-gray-800">{user?.rol}</span>.
        </p>

        {/* Mensajes según rol */}
        {user?.rol === "admin" && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
            <p className="text-blue-700">
              Tienes acceso completo a todas las funcionalidades del panel.
            </p>
          </div>
        )}
        {user?.rol === "pasante" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
            <p className="text-yellow-700">
              Puedes gestionar tu perfil y ver tus pedidos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
