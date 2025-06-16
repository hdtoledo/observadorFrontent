// src/components/AdminObservationTable.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const AdminObservationTable = ({
  observations,
  onDelete,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Lista de Observaciones
      </h2>

      {/* Buscador */}
      <div className="relative max-w-sm mx-auto mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por estudiante, tipo o estado..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="px-4 py-3">Estudiante</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Creado por</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((o) => {
              const alumno = o.estudiante || { nombre: "-", apellido: "" };
              const creador = o.creadoPor || { nombre: "-", apellido: "" };
              return (
                <tr
                  key={o._id}
                  className="bg-gray-50 hover:bg-gray-100 rounded transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {alumno.nombre} {alumno.apellido}
                  </td>
                  <td className="px-4 py-3 text-gray-700 capitalize">
                    {o.tipo}
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-700">
                    {o.estado}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {creador.nombre} {creador.apellido}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onDelete(o._id)}
                      className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded transition ${
                currentPage === i + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminObservationTable;
