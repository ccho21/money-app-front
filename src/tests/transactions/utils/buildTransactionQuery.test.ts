// src/tests/transaction/utils/buildTransactionQuery.test.ts
import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import { buildTransactionQuery } from '@/modules/transaction/utils/buildTransactionQuery';

describe('buildTransactionQuery', () => {
  it('should include required fields', () => {
    const query: TransactionGroupQuery = {
      timeframe: 'monthly',
      groupBy: 'category',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    };

    const result = buildTransactionQuery(query);
    expect(result).toContain('timeframe=monthly');
    expect(result).toContain('groupBy=category');
    expect(result).toContain('startDate=2025-01-01');
    expect(result).toContain('endDate=2025-01-31');
  });

  it('should apply defaults and optional fields', () => {
    const query: TransactionGroupQuery = {
      timeframe: 'weekly',
      groupBy: undefined, // should fallback to 'date'
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      categoryId: 'cat123',
      accountId: 'acc456',
      transactionType: 'expense',
      cursor: 'cursor789',
      limit: 50,
      note: '  test note  ',
      includeBalance: true,
    };

    const result = buildTransactionQuery(query);

    expect(result).toContain('groupBy=date');
    expect(result).toContain('endDate=2025-01-31');
    expect(result).toContain('categoryId=cat123');
    expect(result).toContain('accountId=acc456');
    expect(result).toContain('transactionType=expense');
    expect(result).toContain('cursor=cursor789');
    expect(result).toContain('limit=50');
    expect(result).toContain('note=test+note'); // URL-encoded
    expect(result).toContain('includeBalance=true');
  });

  it('should trim and limit note to 300 characters', () => {
    const longNote = 'x'.repeat(350);
    const query: TransactionGroupQuery = {
      timeframe: 'monthly',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      groupBy: 'date',
      note: `   ${longNote}   `,
    };

    const result = buildTransactionQuery(query);
    expect(result).toContain(`note=${'x'.repeat(300)}`);
    expect(result).not.toContain(`note=${'x'.repeat(301)}`);
  });

  it('should not include note if it is empty or whitespace', () => {
    const query: TransactionGroupQuery = {
      timeframe: 'monthly',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      groupBy: 'date',
      note: '   ',
    };

    const result = buildTransactionQuery(query);
    expect(result).not.toContain('note=');
  });
});
