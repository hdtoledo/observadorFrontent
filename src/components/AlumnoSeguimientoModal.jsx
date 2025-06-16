// src/components/AlumnoSeguimientoModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AlumnoSeguimientoModal = ({ observation, onClose, onReplied }) => {
  const existingRespuesta = observation.respuestasEstudiante?.[0] || null;
  const [respuesta, setRespuesta] = useState(existingRespuesta?.respuesta || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!respuesta.trim()) {
      return toast.error("La respuesta no puede quedar vacía.");
    }
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/observaciones/${observation._id}/respuesta`,
        { respuesta, estudianteId: currentUser._id }
      );
      toast.success("Respuesta enviada.");
      onReplied(data.observation);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al enviar respuesta.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; top: 0; left: 0; width: 100%; }
          }
        `}
      </style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg animate-fade-in print-area overflow-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Imprimir */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Imprimir Reporte
            </button>
          </div>

          {/* Encabezado institución */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Institución Educativa</h1>
            <p className="text-sm text-gray-600">Reporte de Observación</p>
            <hr className="my-2" />
          </div>

          {/* Observación original */}
          <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-700">Observación Original</h3>
            <p><strong>Tipo:</strong> {observation.tipo}</p>
            <p><strong>Descripción:</strong> {observation.descripcion}</p>
            <p>
              <strong>Creada el:</strong>{" "}
              {new Date(observation.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Estado actual:</strong>{" "}
              <span className="capitalize">{observation.estado}</span>
            </p>
          </div>

          {/* Historial de seguimientos del docente */}
          {observation.seguimientos?.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Seguimientos del Docente</h3>
              {observation.seguimientos.map((s, i) => (
                <div key={i} className="mb-3">
                  <p className="italic">{s.comentario}</p>
                  <small className="text-gray-500">
                    — {s.quien.nombre} {s.quien.apellido} el{" "}
                    {new Date(s.fecha).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}

          {/* Historial de respuestas del alumno */}
          {observation.respuestasEstudiante?.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Tus Respuestas</h3>
              {observation.respuestasEstudiante.map((r, i) => (
                <div key={i} className="mb-3">
                  <p className="italic">{r.respuesta}</p>
                  <small className="text-gray-500">
                    el {new Date(r.fecha).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}

          {/* Formulario de respuesta */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Tu Respuesta:</label>
              <textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                rows={4}
                disabled={!!existingRespuesta}
                className={`w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none ${
                  existingRespuesta ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
              {existingRespuesta && (
                <p className="mt-2 text-sm text-red-600">
                  Solo se permite una respuesta por observación.
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
              {!existingRespuesta && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enviar Respuesta
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AlumnoSeguimientoModal;
