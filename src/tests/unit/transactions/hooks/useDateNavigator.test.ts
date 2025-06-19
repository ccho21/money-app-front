// src/modules/transaction/hooks/useDateNavigator.test.ts
import { useDateNavigator } from '@/modules/transaction/hooks/useDateNavigator';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { renderHook, act } from '@testing-library/react';

jest.mock('@/modules/transaction/stores/filterStore', () => ({
  useTransactionFilterStore: jest.fn(),
}));

describe('useDateNavigator', () => {
  const setQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTransactionFilterStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          query: {
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            timeframe: 'monthly',
          },
          setQuery,
        })
    );
  });

  it('returns correct label for monthly', () => {
    const { result } = renderHook(() => useDateNavigator());
    expect(result.current.label).toBe('January 2025');
  });

  it('handleChange updates date forward by 1 month', () => {
    const { result } = renderHook(() => useDateNavigator());

    act(() => {
      result.current.handleChange(1); // ➜ 2025-02-01 ~ 2025-02-29 expected
    });

    expect(setQuery).toHaveBeenCalled();

    // ✅ patch 확인
    const patch = setQuery.mock.calls[0][0]({
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });
    expect(patch).toEqual({
      startDate: '2025-02-01',
      endDate: '2025-02-28',
    });
  });

  //   it('handleSelect uses overrideUnit when provided', () => {
  //     const { result } = renderHook(() => useDateNavigator());

  //     act(() => {
  //       result.current.handleSelect(new Date('2023-12-25'), 'weekly');
  //     });

  //     const patch = setQuery.mock.calls[0][0]({
  //       startDate: '2025-01-01',
  //       endDate: '2025-01-31',
  //     });
  //     expect(patch).toEqual({
  //       startDate: '2023-12-25',
  //       endDate: '2023-12-31',
  //     });
  //   });

  //   it('does not call setQuery if range has not changed', () => {
  //     const { result } = renderHook(() => useDateNavigator());

  //     act(() => {
  //       result.current.handleSelect(new Date('2025-01-01'));
  //     });

  //     // 패치 객체가 empty임 = 변경 없음
  //     const patch = setQuery.mock.calls[0][0]({
  //       startDate: '2025-01-01',
  //       endDate: '2025-01-31',
  //     });
  //     expect(patch).toEqual({});
  //   });
});
