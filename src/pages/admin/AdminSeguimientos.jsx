// src/pages/admin/AdminSeguimientos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminObservationFollowUpTable from "../../components/AdminSeguimientoTable";
import FollowUpModal from "../../components/FollowUpModal";
import { toast } from "react-toastify";
import observador from "../../assets/logoObservadorNegro.png";

const AdminSeguimientos = () => {
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [selectedObsId, setSelectedObsId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Traer todas las observaciones
  const fetchObservaciones = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/observaciones`
      );
      setObservaciones(data);
    } catch {
      toast.error("Error al obtener observaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservaciones();
  }, []);

  // 2. Abrir modal de seguimiento
  const openFollowUpModal = (obsId) => {
    setSelectedObsId(obsId);
    setShowFollowUp(true);
  };

  // 3. Después de guardar seguimiento, recargar lista
  const handleFollowUpUpdated = async () => {
    setShowFollowUp(false);
    await fetchObservaciones();
  };

  // 4. Filtrado con guardias
  const filtered = observaciones.filter((obs) => {
    const term = search.toLowerCase();
    const estName = obs.estudiante?.nombre?.toLowerCase() || "";
    const estLast = obs.estudiante?.apellido?.toLowerCase() || "";
    const tipo = obs.tipo?.toLowerCase() || "";
    const desc = obs.descripcion?.toLowerCase() || "";
    const estado = obs.estado?.toLowerCase() || "";
    const crName = obs.creadoPor?.nombre?.toLowerCase() || "";
    const crLast = obs.creadoPor?.apellido?.toLowerCase() || "";

    return (
      estName.includes(term) ||
      estLast.includes(term) ||
      tipo.includes(term) ||
      desc.includes(term) ||
      estado.includes(term) ||
      crName.includes(term) ||
      crLast.includes(term)
    );
  });

  // 5. Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando observaciones…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img
          src={observador}
          alt="Observador Logo"
          className="h-10 mr-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Seguimientos
        </h1>
      </div>

      {/* Tabla de Observaciones con botón de seguimiento */}
      <AdminObservationFollowUpTable
        observations={paginated}
        onAddFollowUp={openFollowUpModal}
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal para agregar seguimiento */}
      {showFollowUp && selectedObsId && (
        <FollowUpModal
          observationId={selectedObsId}
          onClose={() => setShowFollowUp(false)}
          onUpdated={handleFollowUpUpdated}
        />
      )}
    </div>
  );
};

export default AdminSeguimientos;
