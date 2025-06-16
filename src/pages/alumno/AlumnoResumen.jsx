// src/pages/alumno/AlumnoResumen.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AlumnoSeguimientoTable from "../../components/AlumnoSeguimientoTable";
import AlumnoSeguimientoModal from "../../components/AlumnoSeguimientoModal";
import { toast } from "react-toastify";

const AlumnoResumen = () => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedObs, setSelectedObs] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchObservations = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser?._id) {
        toast.error("No se encontró usuario en el almacenamiento local");
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/observaciones/estudiante?estudianteId=${currentUser._id}`
      );
      const data = res.data;
      if (!Array.isArray(data)) {
        console.error("Esperaba un array de observaciones, recibí:", data);
        toast.error("Error: respuesta inesperada del servidor");
        setObservations([]);
      } else {
        setObservations(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener tus observaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservations();
  }, []);

  const openRespondModal = (obs) => {
    setSelectedObs(obs);
    setShowModal(true);
  };

  const handleReplied = (updatedObs) => {
    setObservations((prev) =>
      prev.map((o) => (o._id === updatedObs._id ? updatedObs : o))
    );
  };

  // Filtrado (seguro porque ahora observations es siempre array)
  const filtered = observations.filter((o) => {
    const term = search.toLowerCase();
    return (
      o.tipo.toLowerCase().includes(term) ||
      o.descripcion.toLowerCase().includes(term) ||
      o.estado.toLowerCase().includes(term)
    );
  });

  // Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando tus observaciones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Encabezado */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Observaciones</h1>
      </div>

      {/* Tabla */}
      <AlumnoSeguimientoTable
        observations={paginated}
        onRespond={openRespondModal}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedObs && (
        <AlumnoSeguimientoModal
          observation={selectedObs}
          onClose={() => setShowModal(false)}
          onReplied={handleReplied}
        />
      )}
    </div>
  );
};

export default AlumnoResumen;
