import { TransactionGroupQuery } from '../types/types';

export function buildTransactionQuery(query: TransactionGroupQuery): string {
  const params = new URLSearchParams();

  params.append('timeframe', query.timeframe);
  params.append('groupBy', query.groupBy ?? 'date');
  params.append('startDate', query.startDate);

  if (query.endDate) params.append('endDate', query.endDate);
  if (query.categoryId) params.append('categoryId', query.categoryId);
  if (query.accountId) params.append('accountId', query.accountId);
  if (query.transactionType)
    params.append('transactionType', query.transactionType);
  if (query.cursor) params.append('cursor', query.cursor);
  if (typeof query.limit === 'number')
    params.append('limit', String(query.limit));
  if (query.note?.trim()) {
    const safeNote = query.note.trim().slice(0, 300); // 300자 제한
    params.append('note', safeNote);
  }
  if (query.includeBalance)
    params.append('includeBalance', String(query.includeBalance));
  return params.toString(); // → query string for fetch
}
