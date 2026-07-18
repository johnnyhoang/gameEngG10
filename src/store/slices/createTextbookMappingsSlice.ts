import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { textbookMappingService } from '../../services/textbookMappingService';
import { toast } from '../../utils/toast';

export const createTextbookMappingsSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState,
    | 'textbookMappings'
    | 'fetchTextbookMappings'
    | 'addTextbookMapping'
    | 'updateTextbookMapping'
    | 'deleteTextbookMapping'
  >
> = (set, get) => ({
  textbookMappings: [],

  fetchTextbookMappings: async () => {
    try {
      const mappings = await textbookMappingService.fetch();
      set({ textbookMappings: mappings });
    } catch (e) {
      console.error('[fetchTextbookMappings]', e);
    }
  },

  addTextbookMapping: async (mapping) => {
    const result = await textbookMappingService.create(mapping);
    if (result.success) {
      toast.success(`📚 Đã thêm ánh xạ "${mapping.categoryKey}"!`);
      await get().fetchTextbookMappings();
      return true;
    }
    toast.error(result.error || 'Không thể tạo ánh xạ SGK');
    return false;
  },

  updateTextbookMapping: async (key, mapping) => {
    const result = await textbookMappingService.update(key, mapping);
    if (result.success) {
      toast.success(`📚 Đã cập nhật ánh xạ "${key}"!`);
      await get().fetchTextbookMappings();
      return true;
    }
    toast.error(result.error || 'Không thể cập nhật ánh xạ SGK');
    return false;
  },

  deleteTextbookMapping: async (key) => {
    const success = await textbookMappingService.delete(key);
    if (success) {
      toast.success(`🗑️ Đã xóa cấu hình "${key}"!`);
      await get().fetchTextbookMappings();
      return true;
    }
    toast.error('Không thể xóa cấu hình ánh xạ SGK');
    return false;
  },
});
