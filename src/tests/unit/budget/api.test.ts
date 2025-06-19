import {
    fetchBudgetByCategoryAPI,
    createBudgetCategoryAPI,
    updateBudgetCategoryAPI,
    fetchGroupedBudgetCategoryAPI,
  } from '@/modules/budget/api';
  import { get, post, put } from '@/modules/shared/common/api';
  import { buildQuery } from '@/modules/budget/types/budgetBuildQuery';
  import type {
    BudgetCategoryCreateRequest,
    BudgetCategoryUpdateRequest,
    BudgetQuery,
  } from '@/modules/budget/types/types';
  
  jest.mock('@/modules/shared/common/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  }));
  
  jest.mock('@/modules/budget/types/budgetBuildQuery', () => ({
    buildQuery: jest.fn(() => 'q')
  }));
  
  const mockedGet = get as jest.Mock;
  const mockedPost = post as jest.Mock;
  const mockedPut = put as jest.Mock;
  const mockedBuildQuery = buildQuery as jest.Mock;
  
  describe('budget api', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('fetchBudgetByCategoryAPI calls get with built query', () => {
      mockedGet.mockResolvedValue('result');
      const params: BudgetQuery = { startDate: 'a', endDate: 'b' };
      const result = fetchBudgetByCategoryAPI(params);
      expect(mockedBuildQuery).toHaveBeenCalledWith(params);
      expect(mockedGet).toHaveBeenCalledWith('/budgets/by-category?q');
      expect(result).resolves.toBe('result');
    });
  
    it('createBudgetCategoryAPI posts data', () => {
      const payload: BudgetCategoryCreateRequest = {
        categoryId: '1',
        amount: 100,
        startDate: 's',
        endDate: 'e',
      };
      createBudgetCategoryAPI(payload);
      expect(mockedPost).toHaveBeenCalledWith('/budgets/by-category', payload);
    });
  
    it('updateBudgetCategoryAPI puts data', () => {
      const payload: BudgetCategoryUpdateRequest = { amount: 200 };
      updateBudgetCategoryAPI('id1', payload);
      expect(mockedPut).toHaveBeenCalledWith('/budgets/by-category/id1', payload);
    });
  
    it('fetchGroupedBudgetCategoryAPI calls get with built query', () => {
      const params: BudgetQuery = { startDate: 's', endDate: 'e' };
      fetchGroupedBudgetCategoryAPI('cat', params);
      expect(mockedBuildQuery).toHaveBeenCalledWith(params);
      expect(mockedGet).toHaveBeenCalledWith('/budgets/by-category/cat?q');
    });
  });