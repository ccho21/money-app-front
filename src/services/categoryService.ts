import { fetchCategoriesAPI } from '@/features/category/api';
import { useCategoryStore } from '@/stores/useCategoryStore';

export const fetchCategories = async () => {
  const { setCategories, setLoading, setError } = useCategoryStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await fetchCategoriesAPI();
    setCategories(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '카테고리 불러오기 실패';
    setError(message);
  } finally {
    setLoading(false);
  }
};
