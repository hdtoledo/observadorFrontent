// src/pages/admin/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUserTable from "../../components/AdminUserTable";
import AdminEditUserModal from "../../components/AdminEditUserModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import observador from "../../assets/logoObservadorNegro.png";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("edit"); // "edit" | "create"
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsuarios = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setUsuarios(data);
    } catch {
      toast.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
        setUsuarios((u) => u.filter((x) => x._id !== id));
        toast.success("Usuario eliminado correctamente");
      } catch {
        toast.error("Error al eliminar usuario");
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setMode("edit");
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedUser({
      nombre: "",
      apellido: "",
      tipoIdentificacion: "",
      numIdentificacion: "",
      correo: "",
      grado: "",
      rol: "alumno",
    });
    setMode("create");
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${selectedUser._id}`,
        // En edición, enviamos TODO el objeto completo
        selectedUser
      );
      setUsuarios((u) =>
        u.map((x) => (x._id === data.user._id ? data.user : x))
      );
      setShowModal(false);
      toast.success("Usuario actualizado correctamente");
    } catch {
      toast.error("Error al actualizar usuario");
    }
  };

  const handleCreateUser = async () => {
    try {
      // Al crear, enviamos solo los campos que el backend requiere.
      const payload = {
        nombre: selectedUser.nombre,
        apellido: selectedUser.apellido,
        tipoIdentificacion: selectedUser.tipoIdentificacion,
        numIdentificacion: selectedUser.numIdentificacion,
        correo: selectedUser.correo,
        grado: selectedUser.grado,
        rol: selectedUser.rol,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        payload
      );
      // data.user viene sin password (tal como lo devolvía el backend)
      setUsuarios((u) => [data.user, ...u]);
      setShowModal(false);
      toast.success("Usuario creado correctamente");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear usuario");
    }
  };

  const filtered = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.correo.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando usuarios...</p>
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
            Gestión de Usuarios
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Crear usuario
        </button>
      </div>

      {/* Tabla y buscador */}
      <AdminUserTable
        usuarios={paginated}
        onEdit={openEditModal}
        onDelete={eliminarUsuario}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de creación/edición */}
      {showModal && (
        <AdminEditUserModal
          mode={mode}
          selectedUser={selectedUser}
          onClose={() => setShowModal(false)}
          onChange={setSelectedUser}
          onSave={handleSaveChanges}
          onCreate={handleCreateUser}
        />
      )}
    </div>
  );
};

export default UserList;
