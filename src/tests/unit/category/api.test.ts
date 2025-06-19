import {
    fetchCategoriesAPI,
    fetchCategoryByIdAPI,
    createCategoryAPI,
    updateCategoryAPI,
    deleteCategoryAPI,
  } from '@/modules/category/api';
  import { get, post, patch, del } from '@/modules/shared/common/api';
  import type { CategoryCreateRequest, CategoryUpdateRequest } from '@/modules/category/types/types';
  
  jest.mock('@/modules/shared/common/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    del: jest.fn(),
  }));
  
  const mockedGet = get as jest.Mock;
  const mockedPost = post as jest.Mock;
  const mockedPatch = patch as jest.Mock;
  const mockedDel = del as jest.Mock;
  
  describe('category api', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('fetchCategoriesAPI calls get', () => {
      mockedGet.mockResolvedValue(['c']);
      const result = fetchCategoriesAPI();
      expect(mockedGet).toHaveBeenCalledWith('/categories');
      expect(result).resolves.toEqual(['c']);
    });
  
    it('fetchCategoryByIdAPI calls get with id', () => {
      mockedGet.mockResolvedValue('c');
      const result = fetchCategoryByIdAPI('id1');
      expect(mockedGet).toHaveBeenCalledWith('/categories/id1');
      expect(result).resolves.toBe('c');
    });
  
    it('createCategoryAPI posts data', () => {
      const payload: CategoryCreateRequest = {
        name: 'Food',
        type: 'expense',
        icon: '🍔',
      };
      createCategoryAPI(payload);
      expect(mockedPost).toHaveBeenCalledWith('/categories', payload);
    });
  
    it('updateCategoryAPI patches data', () => {
      const payload: CategoryUpdateRequest = { name: 'New' };
      updateCategoryAPI('id2', payload);
      expect(mockedPatch).toHaveBeenCalledWith('/categories/id2', payload);
    });
  
    it('deleteCategoryAPI deletes path', () => {
      deleteCategoryAPI('id3');
      expect(mockedDel).toHaveBeenCalledWith('/categories/id3');
    });
  });