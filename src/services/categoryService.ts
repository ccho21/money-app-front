// 📄 src/services/category.service.ts

import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
  getCategoryByIdAPI,
  updateCategoryAPI,
} from '@/features/category/api';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/features/category/types';
import { useCategoryFormStore } from '@/stores/useCategoryFormStore';
import { useCategoryStore } from '@/stores/useCategoryStore';

// 전체 카테고리 리스트 가져오기
export const fetchCategories = async () => {
  try {
    const data = await getCategoriesAPI();
    useCategoryStore.getState().setCategories(data);
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : '카테고리 목록 불러오기 실패'
    );
  }
};

// 카테고리 생성
export const createCategory = async (input: CreateCategoryInput) => {
  try {
    await createCategoryAPI(input);
    await fetchCategories(); // 성공 후 목록 리패치
    useCategoryFormStore.getState().reset();
  } catch (err) {
    console.error(err instanceof Error ? err.message : '카테고리 생성 실패');
    throw err;
  }
};

// 카테고리 수정
export const updateCategory = async (
  id: string,
  input: UpdateCategoryInput
) => {
  try {
    await updateCategoryAPI(id, input);
    await fetchCategories();
  } catch (err) {
    console.error(err instanceof Error ? err.message : '카테고리 수정 실패');
    throw err;
  }
};

// 카테고리 삭제
export const deleteCategory = async (id: string) => {
  try {
    await deleteCategoryAPI(id);
    await fetchCategories();
  } catch (err) {
    console.error(err instanceof Error ? err.message : '카테고리 삭제 실패');
  }
};

// 단일 카테고리 조회 → edit 시 초기값 세팅용
export const fillCategoryForm = async (id: string) => {
  try {
    const data = await getCategoryByIdAPI(id);
    useCategoryFormStore.getState().fillForm(data);
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : '카테고리 불러오기 실패'
    );
  }
};
