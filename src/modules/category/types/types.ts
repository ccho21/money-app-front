export type CategoryType = 'income' | 'expense';

export interface CategoryDetail {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
}

export interface CategoryCreateRequest {
  name: string;
  icon: string;
  color?: string;
  type: CategoryType;
}

export type CategoryUpdateRequest = Partial<CategoryCreateRequest>;
