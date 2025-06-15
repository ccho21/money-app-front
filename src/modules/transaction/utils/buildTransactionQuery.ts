import { TransactionGroupQuery } from '../types/types';

export function buildTransactionQuery(query: TransactionGroupQuery): string {
  const params = new URLSearchParams();

  params.append('timeframe', query.timeframe);
  params.append('groupBy', query.groupBy || 'date');
  params.append('startDate', query.startDate);

  if (query.endDate) params.append('endDate', query.endDate);
  if (query.categoryId) params.append('categoryId', query.categoryId);
  if (query.accountId) params.append('accountId', query.accountId);
  if (query.transactionType)
    params.append('transactionType', query.transactionType);
  if (query.cursor) params.append('cursor', query.cursor);
  if (typeof query.limit === 'number')
    params.append('limit', String(query.limit));

  const trimmedNote = query.note?.trim();
  if (trimmedNote && trimmedNote.length > 0) {
    const safeNote = trimmedNote.slice(0, 300);
    params.append('note', safeNote);
  }
  
  if (query.includeBalance)
    params.append('includeBalance', String(query.includeBalance));
  return params.toString(); // → query string for fetch
}
