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
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Observaciones
    </h2>

    <div className="relative max-w-sm mx-auto mb-6">
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Buscar por estudiante, tipo, descripción, estado…"
        className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none"
      />
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-[800px] w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="px-4 py-3">Estudiante</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Creado por</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {observations.map(obs => (
            <tr key={obs._id} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-3">{obs.estudiante.nombre} {obs.estudiante.apellido}</td>
              <td className="px-4 py-3 capitalize">{obs.tipo}</td>
              <td className="px-4 py-3">{obs.descripcion}</td>
              <td className="px-4 py-3 capitalize">{obs.estado}</td>
              <td className="px-4 py-3">{obs.creadoPor.nombre} {obs.creadoPor.apellido}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onAddFollowUp(obs._id)}
                  className="px-4 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Seguimiento
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i+1}
            onClick={() => onPageChange(i+1)}
            className={`px-3 py-1 rounded ${
              currentPage===i+1 ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i+1}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default AdminObservationFollowUpTable;
