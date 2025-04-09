import React, { useEffect, useState } from 'react';
import { getStores, createStore, updateStore, deleteStore } from '../../data/repository/StoreRepository';
import { StoreDTO } from '../../data/models/StoreDTO';
import './StoreView.css';

const StoreView = () => {
  const [stores, setStores] = useState<StoreDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newStore, setNewStore] = useState<StoreDTO>({ Nombre: '', Ubicacion: '' });
  const [editingStore, setEditingStore] = useState<StoreDTO | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
      } catch (error) {
        console.error('Error al obtener las tiendas:', error);
      }
    };
    fetchStores();
  }, []);

  const handleCreate = async () => {
    if (!newStore.Nombre || !newStore.Ubicacion) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      const created = await createStore(newStore);
      setStores((prev) => [...prev, created]);
      setShowForm(false);
      setNewStore({ Nombre: '', Ubicacion: '' });
    } catch (error) {
      console.error('Error al crear la tienda:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editingStore || !editingStore.Nombre || !editingStore.Ubicacion) {
      alert('Completa los campos.');
      return;
    }

    try {
      await updateStore(id, editingStore);

      const updatedStores = await getStores();
      setStores(updatedStores);

      setEditingStore(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Ocurrió un error al guardar los cambios.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta tienda?')) {
      try {
        await deleteStore(id);
        setStores((prev) => prev.filter((s) => s.ID !== id));
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className="store-view">
      <h1>Gestión de Tiendas</h1>

      <div className="button-container">
        <button onClick={() => { setShowForm(true); setEditingStore(null); }}>
          Crear Tienda
        </button>
      </div>

      <div className="store-grid">
        {stores.map((store) => (
          <div key={store.ID} className="store-card">
            <div className="store-image">
              <img src={`https://i.pinimg.com/736x/97/1e/87/971e87ecfaf56cb66e82726f15ec1f1e.jpg`} alt={store.Nombre} />
            </div>
            <div className="store-info">
              <h3>{store.Nombre}</h3>
              <p>{store.Ubicacion}</p>
              <div className="store-actions">
                <button className="edit" onClick={() => { setEditingStore(store); setShowForm(true); }}>Editar</button>
                <button className="delete" onClick={() => handleDelete(store.ID!)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showForm || editingStore) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingStore ? 'Editar Tienda' : 'Crear Tienda'}</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={editingStore ? editingStore.Nombre : newStore.Nombre}
              onChange={(e) =>
                editingStore
                  ? setEditingStore({ ...editingStore, Nombre: e.target.value })
                  : setNewStore({ ...newStore, Nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={editingStore ? editingStore.Ubicacion : newStore.Ubicacion}
              onChange={(e) =>
                editingStore
                  ? setEditingStore({ ...editingStore, Ubicacion: e.target.value })
                  : setNewStore({ ...newStore, Ubicacion: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button className="cancel" onClick={() => { setShowForm(false); setEditingStore(null); }}>Cancelar</button>
              <button
                className="save"
                onClick={() => editingStore ? handleUpdate(editingStore.ID!) : handleCreate()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreView;
