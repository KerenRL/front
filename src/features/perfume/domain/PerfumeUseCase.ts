import { PerfumeDTO } from '../data/models/PerfumeDTO';
import { getPerfumes, createPerfume, updatePerfume, deletePerfume } from '../data/repository/PerfumeRepository';

export class PerfumeUseCase {
  async fetchPerfumes(): Promise<PerfumeDTO[]> {
    try {
      return await getPerfumes();
    } catch (error) {
      console.error('Error al obtener los perfumes:', error);
      throw error;
    }
  }

  async createPerfume(perfume: PerfumeDTO): Promise<PerfumeDTO> {
    try {
      return await createPerfume(perfume);
    } catch (error) {
      console.error('Error al crear el perfume:', error);
      throw error;
    }
  }

  async updatePerfume(id: number, perfume: PerfumeDTO): Promise<PerfumeDTO> {
    try {
      return await updatePerfume(id, perfume);
    } catch (error) {
      console.error('Error al actualizar el perfume:', error);
      throw error;
    }
  }

  async deletePerfume(id: number): Promise<void> {
    try {
      await deletePerfume(id);
    } catch (error) {
      console.error('Error al eliminar el perfume:', error);
      throw error;
    }
  }
}