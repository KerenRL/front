import { StoreDTO } from '../data/models/StoreDTO';
import { getStores, createStore, updateStore, deleteStore } from '../data/repository/StoreRepository';

export class StoreUseCase {
  async fetchStores(): Promise<StoreDTO[]> {
    try {
      return await getStores();
    } catch (error) {
      console.error('Error al obtener las tiendas:', error);
      throw error;
    }
  }

  async createStore(store: StoreDTO): Promise<StoreDTO> {
    try {
      return await createStore(store);
    } catch (error) {
      console.error('Error al crear la tienda:', error);
      throw error;
    }
  }

  async updateStore(id: number, store: StoreDTO): Promise<StoreDTO> {
    try {
      return await updateStore(id, store);
    } catch (error) {
      console.error('Error al actualizar la tienda:', error);
      throw error;
    }
  }

  async deleteStore(id: number): Promise<void> {
    try {
      await deleteStore(id);
    } catch (error) {
      console.error('Error al eliminar la tienda:', error);
      throw error;
    }
  }
}