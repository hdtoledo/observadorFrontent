// src/components/AdminObservationModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const tiposPosibles = [
  { value: "academica", label: "Académica" },
  { value: "comportamentalPositiva", label: "Comportamental Positiva" },
  { value: "comportamentalNegativa", label: "Comportamental Negativa" },
];

const estadosPosibles = [
  { value: "pendiente", label: "Pendiente" },
  { value: "enSeguimiento", label: "En Seguimiento" },
  { value: "resuelta", label: "Resuelta" },
];

const AdminObservationModal = ({
  mode = "edit", // "edit" | "create"
  selectedObs,
  onClose,
  onChange,
  onSave,
  onCreate,
}) => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    if (mode === "create") {
      const fetchEstudiantes = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users?rol=alumno`
          );
          setEstudiantes(data);
        } catch {
          // ignorar error
        }
      };
      fetchEstudiantes();
    }
  }, [mode]);

  if (!selectedObs) return null;

  const handleSubmit = () => {
    if (mode === "edit") {
      onSave();
    } else {
      onCreate();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
          {mode === "edit" ? "Editar Observación" : "Crear Observación"}
        </h2>

        <div className="space-y-4">
          {mode === "create" && (
            <select
              value={selectedObs.estudiante}
              onChange={(e) =>
                onChange({ ...selectedObs, estudiante: e.target.value })
              }
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
            >
              <option value="">-- Selecciona Estudiante --</option>
              {estudiantes.map((est) => (
                <option key={est._id} value={est._id}>
                  {est.nombre} {est.apellido} ({est.correo})
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedObs.tipo}
            onChange={(e) =>
              onChange({ ...selectedObs, tipo: e.target.value })
            }
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          >
            {tiposPosibles.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <textarea
            value={selectedObs.descripcion}
            onChange={(e) =>
              onChange({ ...selectedObs, descripcion: e.target.value })
            }
            rows={4}
            placeholder="Descripción de la observación"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {mode === "edit" && (
            <select
              value={selectedObs.estado}
              onChange={(e) =>
                onChange({ ...selectedObs, estado: e.target.value })
              }
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
            >
              {estadosPosibles.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800 transition"
          >
            {mode === "edit" ? "Guardar Cambios" : "Crear Observación"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminObservationModal;
