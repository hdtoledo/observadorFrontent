// src/components/FollowUpModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FollowUpModal = ({ observationId, onClose, onUpdated }) => {
  const [obs, setObs] = useState(null);
  const [comentario, setComentario] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("enSeguimiento");

  // Carga detalles de la observación
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/observaciones`)
      .then(({ data }) => {
        const detalle = data.find(o => o._id === observationId);
        setObs(detalle);
        // Inicializamos select al estado actual si existe
        if (detalle) setNuevoEstado(detalle.estado);
      })
      .catch(() => toast.error("No se pudo cargar la observación."));
  }, [observationId]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!comentario.trim()) {
      return toast.error("El comentario no puede quedar vacío.");
    }
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/observaciones/${observationId}/seguimiento`,
        { comentario, nuevoEstado, quien: currentUser._id }
      );
      toast.success("Seguimiento agregado.");
      onUpdated();
    } catch {
      toast.error("Error al agregar seguimiento.");
    }
  };

  const handlePrint = () => window.print();

  if (!obs) return null;

  const isClosed = obs.estado === "resuelta";

  return (
    <>
      {/* Estilos de impresión */}
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; top:0; left:0; width:100%; }
          }
        `}
      </style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg animate-fade-in print-area overflow-auto max-h-[90vh]"
          onClick={e => e.stopPropagation()}
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

          {/* Encabezado */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Institución Educativa</h1>
            <p className="text-sm text-gray-600">Reporte de Observación</p>
            <hr className="my-2" />
          </div>

          {/* Observación original */}
          <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-700">
              Observación Original
            </h3>
            <p><strong>Tipo:</strong> {obs.tipo}</p>
            <p><strong>Descripción:</strong> {obs.descripcion}</p>
            <p>
              <strong>Creada el:</strong>{" "}
              {new Date(obs.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Estado actual:</strong>{" "}
              <span className="capitalize">{obs.estado}</span>
            </p>
          </div>

          {/* Historial de seguimientos */}
          {obs.seguimientos?.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Historial de Seguimientos</h3>
              {obs.seguimientos.map((s, i) => (
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
          {obs.respuestasEstudiante?.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Respuestas del Alumno</h3>
              {obs.respuestasEstudiante.map((r, i) => (
                <div key={i} className="mb-3">
                  <p className="italic">{r.respuesta}</p>
                  <small className="text-gray-500">
                    el {new Date(r.fecha).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}

          {/* Formulario de seguimiento */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Comentario:</label>
              <textarea
                rows={4}
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                disabled={isClosed}
                className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-600 outline-none ${
                  isClosed ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado:</label>
              <select
                value={nuevoEstado}
                onChange={e => setNuevoEstado(e.target.value)}
                disabled={isClosed}
                className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-600 outline-none ${
                  isClosed ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="pendiente">Pendiente</option>
                <option value="enSeguimiento">En Seguimiento</option>
                <option value="resuelta">Resuelta</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isClosed}
                className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ${
                  isClosed ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Guardar Seguimiento
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FollowUpModal;
