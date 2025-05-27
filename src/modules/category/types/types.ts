export type CategoryType = 'income' | 'expense';

export interface CategoryDetailDTO {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
}

export interface CategoryCreateRequestDTO extends BaseCategoryDTO {
  name: string;
  icon: string;
  color?: string;
  type: CategoryType;
}

export type CategoryUpdateRequestDTO = Partial<CategoryCreateRequestDTO>;

export interface BaseCategoryDTO {
  name: string;
  icon: string;
  color?: string;
  type: CategoryType;
}
