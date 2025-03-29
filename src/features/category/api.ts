// 📄 features/categories/api/category.ts

import { get } from '@/features/shared/api';
import { Category } from '@/features/category/types';

export const fetchCategoriesAPI = () => {
  return get<Category[]>('/categories');
};
