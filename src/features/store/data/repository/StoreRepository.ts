import axios from 'axios';
import { StoreDTO } from '../models/StoreDTO';

const API_URL = 'http://localhost:8080/tiendas';

export const getStores = async (): Promise<StoreDTO[]> => {
  const response = await axios.get(API_URL);
  return response.data.map((store: any) => ({
    ID: store.id,
    Nombre: store.nombre,
    Ubicacion: store.ubicacion,
  }));
};

export const createStore = async (store: StoreDTO): Promise<StoreDTO> => {
  const response = await axios.post('http://localhost:8080/tiendas', {
    nombre: store.Nombre,
    ubicacion: store.Ubicacion,
  });
  return {
    ID: response.data.id,
    Nombre: response.data.nombre,
    Ubicacion: response.data.ubicacion,
  };
};

export const updateStore = async (id: number, store: StoreDTO): Promise<StoreDTO> => {
  const response = await axios.put(`http://localhost:8080/tiendas/${id}`, {
    nombre: store.Nombre,
    ubicacion: store.Ubicacion,
  });

  if (!response.data) {
    throw new Error('El backend no devolvió datos actualizados.');
  }

  return {
    ID: response.data.id,
    Nombre: response.data.nombre,
    Ubicacion: response.data.ubicacion,
  };
};

export const deleteStore = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};