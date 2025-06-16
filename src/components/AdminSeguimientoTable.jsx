// src/components/AdminSeguimientoTable.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const AdminObservationFollowUpTable = ({
  observations,
  onAddFollowUp,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mx-auto max-w-7xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Observaciones
      </h2>

      {/* Buscador */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full sm:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por estudiante, tipo, descripción, estado…"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-600"
          />
        </div>
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="px-3 sm:px-4 py-2 text-left">Estudiante</th>
              <th className="px-3 sm:px-4 py-2 text-left">Tipo</th>
              <th className="px-3 sm:px-4 py-2 text-left">Descripción</th>
              <th className="px-3 sm:px-4 py-2 text-left">Estado</th>
              <th className="px-3 sm:px-4 py-2 text-left">Creado por</th>
              <th className="px-3 sm:px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((obs) => {
              const alumno = obs.estudiante || { nombre: "-", apellido: "" };
              const creador = obs.creadoPor || { nombre: "-", apellido: "" };
              return (
                <tr key={obs._id} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition">
                  <td className="px-3 sm:px-4 py-2 whitespace-normal">
                    {alumno.nombre} {alumno.apellido}
                  </td>
                  <td className="px-3 sm:px-4 py-2 capitalize">{obs.tipo}</td>
                  <td className="px-3 sm:px-4 py-2 break-words">
                    {obs.descripcion}
                  </td>
                  <td className="px-3 sm:px-4 py-2 capitalize">{obs.estado}</td>
                  <td className="px-3 sm:px-4 py-2 whitespace-normal">
                    {creador.nombre} {creador.apellido}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-center">
                    <button
                      onClick={() => onAddFollowUp(obs._id)}
                      className="inline-block px-2 sm:px-4 py-1 text-sm sm:text-base font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Seguimiento
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
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                currentPage === i + 1
                  ? "bg-sky-700 text-white"
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

export default AdminObservationFollowUpTable;
