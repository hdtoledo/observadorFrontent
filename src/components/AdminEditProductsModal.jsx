// src/components/AdminEditProductsModal.js
import React, { useState } from "react";

const AdminEditProductsModal = ({
  product,
  onClose,
  onChange,
  onSave,
  onCreate,
  isEditing,
}) => {
  const [previewImage, setPreviewImage] = useState(
    product.imagen && typeof product.imagen === "string"
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.imagen}`
      : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onChange({ ...product, imagen: file });
    }
  };

  const handleSubmit = () => {
    isEditing ? onSave() : onCreate();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isEditing ? "text-green-700" : "text-blue-700"
          }`}
        >
          {isEditing ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={product.nombre}
            onChange={(e) => onChange({ ...product, nombre: e.target.value })}
            placeholder="Nombre del producto"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <input
            type="number"
            value={product.cantidad}
            onChange={(e) =>
              onChange({ ...product, cantidad: e.target.value })
            }
            placeholder="Cantidad"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <input
            type="text"
            value={product.descripcion}
            onChange={(e) =>
              onChange({ ...product, descripcion: e.target.value })
            }
            placeholder="Descripción"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <select
            value={product.categoria}
            onChange={(e) =>
              onChange({ ...product, categoria: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          >
            <option value="">Seleccione una categoría</option>
            <option value="Maquinaria">Maquinaria</option>
            <option value="Herramienta">Herramienta</option>
            <option value="Equipo">Equipo</option>
          </select>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Vista previa"
              className="mt-2 w-full h-40 object-cover rounded border"
            />
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
            className={`px-4 py-2 text-white rounded transition ${
              isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProductsModal;
