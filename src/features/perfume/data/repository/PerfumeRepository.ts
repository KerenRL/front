import axios from 'axios';
import { PerfumeDTO } from '../models/PerfumeDTO';

const API_URL = 'http://localhost:8080/perfumes';

export const getPerfumes = async (): Promise<PerfumeDTO[]> => {
  const response = await axios.get(API_URL);
  return response.data.map((perfume: any) => ({
    ID: perfume.id,
    Marca: perfume.marca,
    Modelo: perfume.modelo,
    Precio: perfume.precio,
  }));
};

export const createPerfume = async (perfume: PerfumeDTO): Promise<PerfumeDTO> => {
  const response = await axios.post(API_URL, {
    marca: perfume.Marca,
    modelo: perfume.Modelo,
    precio: perfume.Precio,
  });
  return {
    ID: response.data.id,
    Marca: response.data.marca,
    Modelo: response.data.modelo,
    Precio: response.data.precio,
  };
};

export const updatePerfume = async (id: number, perfume: PerfumeDTO): Promise<PerfumeDTO> => {
  const response = await axios.put(`${API_URL}/${id}`, {
    marca: perfume.Marca,
    modelo: perfume.Modelo,
    precio: perfume.Precio,
  });
  return {
    ID: response.data.id,
    Marca: response.data.marca,
    Modelo: response.data.modelo,
    Precio: response.data.precio,
  };
};

export const deletePerfume = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};