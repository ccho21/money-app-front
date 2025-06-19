import { buildQuery } from '@/modules/budget/types/budgetBuildQuery';
import { BudgetQuery } from '@/modules/budget/types/types';

describe('buildQuery', () => {
  it('builds query string with start and end dates', () => {
    const params: BudgetQuery = {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    };
    const result = buildQuery(params);
    expect(result).toBe('startDate=2025-01-01&endDate=2025-01-31');
  });

  it('includes timeframe when provided', () => {
    const params: BudgetQuery = {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      timeframe: 'monthly',
    } as BudgetQuery; // timeframe type is Timeframe
    const result = buildQuery(params);
    expect(result).toBe(
      'startDate=2025-01-01&endDate=2025-01-31&timeframe=monthly'
    );
  });

  it('omits empty values', () => {
    const params: BudgetQuery = { startDate: '', endDate: '2025-01-31' };
    const result = buildQuery(params);
    expect(result).toBe('endDate=2025-01-31');
  });
});
