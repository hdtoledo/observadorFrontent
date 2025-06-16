// src/pages/admin/AdminObservations.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminObservationTable from "../../components/AdminObservationTable";
import AdminObservationModal from "../../components/AdminObservationModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import observador from "../../assets/logoobservadornegro.png";

const AdminObservations = () => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedObs, setSelectedObs] = useState(null);
  const [mode, setMode] = useState("edit"); // "edit" | "create"
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1) Traer todas las observaciones (populadas)
  const fetchObservations = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/observaciones`);
      setObservations(data);
    } catch {
      toast.error("Error al obtener observaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservations();
  }, []);

  // 2) Eliminar observación
  const eliminarObservation = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la observación permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/observaciones/${id}`);
        setObservations((o) => o.filter((x) => x._id !== id));
        toast.success("Observación eliminada correctamente");
      } catch {
        toast.error("Error al eliminar observación");
      }
    }
  };

  // 3) Abrir modal de edición
  const openEditModal = (obs) => {
    setSelectedObs(obs);
    setMode("edit");
    setShowModal(true);
  };

  // 4) Abrir modal de creación
  const openCreateModal = () => {
    setSelectedObs({
      estudiante: "",
      tipo: "academica",
      descripcion: "",
      estado: "pendiente",
    });
    setMode("create");
    setShowModal(true);
  };

  // 5) Guardar cambios en edición
  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/observaciones/${selectedObs._id}`,
        selectedObs
      );
      // Reemplazamos la observación actualizada en el array
      setObservations((prev) =>
        prev.map((o) => (o._id === data.observation._id ? data.observation : o))
      );
      setShowModal(false);
      toast.success("Observación actualizada correctamente");
    } catch {
      toast.error("Error al actualizar observación");
    }
  };

  // 6) Crear nueva observación: en lugar de “prepend” directo, recargamos la lista
  const handleCreateObservation = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const payload = {
        estudiante: selectedObs.estudiante,
        tipo: selectedObs.tipo,
        descripcion: selectedObs.descripcion,
        creadoPor: currentUser._id,
      };
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/observaciones`, payload);

      // Volver a traer todo el listado (para que venga fully populated)
      await fetchObservations();

      setShowModal(false);
      toast.success("Observación creada correctamente");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear observación");
    }
  };

  // 7) Filtrado (con guardias para evitar toLowerCase sobre undefined)
  const filtered = observations.filter((o) => {
    const term = search.toLowerCase();
    const nombre = o.estudiante?.nombre?.toLowerCase() || "";
    const apellido = o.estudiante?.apellido?.toLowerCase() || "";
    const tipo = o.tipo?.toLowerCase() || "";
    const estado = o.estado?.toLowerCase() || "";
    return (
      nombre.includes(term) ||
      apellido.includes(term) ||
      tipo.includes(term) ||
      estado.includes(term)
    );
  });
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando observaciones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={observador} alt="Observador Logo" className="h-10 mr-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Observaciones
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Crear Observación
        </button>
      </div>

      {/* Tabla y buscador */}
      <AdminObservationTable
        observations={paginated}
        onEdit={openEditModal}
        onDelete={eliminarObservation}
        onAddFollowUp={(obs) => {
          // Abrir modal de seguimiento pasando la observación completa
          setSelectedObs(obs);
          setMode("followup");
          setShowModal(true);
        }}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de creación/edición observación o seguimiento */}
      {showModal && mode !== "followup" && (
        <AdminObservationModal
          mode={mode}
          selectedObs={selectedObs}
          onClose={() => setShowModal(false)}
          onChange={setSelectedObs}
          onSave={handleSaveChanges}
          onCreate={handleCreateObservation}
        />
      )}

      {/* Modal para agregar Seguimiento */}
      {showModal && mode === "followup" && (
        <FollowUpModal
          observationId={selectedObs._id}
          onClose={() => setShowModal(false)}
          onUpdated={() => {
            fetchObservations();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminObservations;
