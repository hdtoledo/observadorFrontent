import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import observador from "../assets/logoObservadorNegro.png";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/forgot-password`, { correo });
      toast.success("Revisa tu correo para restablecer tu contraseña");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al enviar el correo");
    }
  };

  return (
    <div className="min-h-screen bg-[#D3D3D3] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={observador} alt="SENA Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo registrado"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Enviar correo de recuperación
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700 space-y-2 text-sm">
          <p>
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Iniciar Sesión
            </a>
          </p>
          <p>
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Crear Cuenta
            </a>
          </p>
          <p>
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Volver al inicio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
