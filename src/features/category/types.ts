// 📄 src/types/category.ts

export type CategoryType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string; // Optional
}

export interface CreateCategoryInput {
  name: string;
  type: CategoryType;
  icon?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  type?: CategoryType;
  icon?: string;
}
