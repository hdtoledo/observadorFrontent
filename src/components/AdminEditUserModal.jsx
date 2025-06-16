// src/components/AdminEditUserModal.jsx
import React from "react";

const AdminEditUserModal = ({
  mode = "edit",          // "edit" | "create"
  selectedUser,
  onClose,
  onChange,
  onSave,
  onCreate,
}) => {
  if (!selectedUser) return null;

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
          {mode === "edit" ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <div className="space-y-4">
          {/* Nombre */}
          <input
            type="text"
            value={selectedUser.nombre}
            onChange={(e) =>
              onChange({ ...selectedUser, nombre: e.target.value })
            }
            placeholder="Nombre"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {/* Apellido */}
          <input
            type="text"
            value={selectedUser.apellido}
            onChange={(e) =>
              onChange({ ...selectedUser, apellido: e.target.value })
            }
            placeholder="Apellido"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {/* Tipo de identificación */}
          <select
            value={selectedUser.tipoIdentificacion}
            onChange={(e) =>
              onChange({ ...selectedUser, tipoIdentificacion: e.target.value })
            }
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          >
            <option value="">Tipo de identificación</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="TI">Tarjeta de identidad</option>
            {/* Agrega más opciones si lo necesitas */}
          </select>

          {/* Número de identificación */}
          <input
            type="number"
            value={selectedUser.numIdentificacion}
            onChange={(e) =>
              onChange({ ...selectedUser, numIdentificacion: e.target.value })
            }
            placeholder="Número de identificación"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {/* Correo */}
          <input
            type="email"
            value={selectedUser.correo}
            onChange={(e) =>
              onChange({ ...selectedUser, correo: e.target.value })
            }
            placeholder="Correo"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {/* Grado */}
          <input
            type="text"
            value={selectedUser.grado}
            onChange={(e) =>
              onChange({ ...selectedUser, grado: e.target.value })
            }
            placeholder="Grado"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          />

          {/* Rol */}
          <select
            value={selectedUser.rol}
            onChange={(e) =>
              onChange({ ...selectedUser, rol: e.target.value })
            }
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-600 outline-none"
          >
            <option value="admin">Administrador</option>
            <option value="docente">Docente</option>
            <option value="alumno">Alumno</option>
          </select>
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
            {mode === "edit" ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserModal;
