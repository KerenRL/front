import React, { useEffect, useState } from 'react';
import { PerfumeDTO } from '../../data/models/PerfumeDTO';
import { getPerfumes, createPerfume, updatePerfume, deletePerfume } from '../../data/repository/PerfumeRepository';
import './PerfumeView.css';

const PerfumeView = () => {
  const [perfumes, setPerfumes] = useState<PerfumeDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPerfume, setCurrentPerfume] = useState<PerfumeDTO>({
    ID: 0,
    Marca: '',
    Modelo: '',
    Precio: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      const data = await getPerfumes();
      setPerfumes(data);
    } catch (error) {
      console.error('Error al obtener los perfumes:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPerfume({
      ...currentPerfume,
      [name]: name === 'Precio' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPerfume.Marca || !currentPerfume.Modelo || currentPerfume.Precio <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      if (isEditing && currentPerfume.ID) {
        await updatePerfume(currentPerfume.ID, currentPerfume);

        await fetchPerfumes();
      } else {
        const created = await createPerfume(currentPerfume);
        setPerfumes([...perfumes, created]);
      }
      resetForm();
    } catch (error) {
      console.error('Error al guardar el perfume:', error);
      alert('Ocurrió un error al guardar el perfume.');
    }
  };

  const handleEdit = (perfume: PerfumeDTO) => {
    setCurrentPerfume({ ...perfume });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este perfume?')) {
      try {
        await deletePerfume(id);
        setPerfumes(perfumes.filter(p => p.ID !== id));
      } catch (error) {
        console.error('Error al eliminar el perfume:', error);
      }
    }
  };

  const resetForm = () => {
    setCurrentPerfume({ ID: 0, Marca: '', Modelo: '', Precio: 0 });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Catálogo de Perfumes</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300"
          >
            + Nuevo Perfume
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de perfumes */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perfumes.map((perfume) => (
              <div
                key={perfume.ID}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{perfume.Marca}</h3>
                      <p className="text-gray-600">{perfume.Modelo}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                      ${perfume.Precio.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(perfume)}
                      className="text-indigo-500 hover:text-indigo-700 font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(perfume.ID!)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario fijo */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isEditing ? 'Editar Perfume' : 'Nuevo Perfume'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="marca" className="block text-gray-700 font-medium mb-2">
                    Marca
                  </label>
                  <input
                    id="marca"
                    name="Marca"
                    type="text"
                    value={currentPerfume.Marca}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingrese la marca"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="modelo" className="block text-gray-700 font-medium mb-2">
                    Modelo
                  </label>
                  <input
                    id="modelo"
                    name="Modelo"
                    type="text"
                    value={currentPerfume.Modelo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingrese el modelo"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="precio" className="block text-gray-700 font-medium mb-2">
                    Precio
                  </label>
                  <input
                    id="precio"
                    name="Precio"
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentPerfume.Precio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingrese el precio"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    {isEditing ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfumeView;