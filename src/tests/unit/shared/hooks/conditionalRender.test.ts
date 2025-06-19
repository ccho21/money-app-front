import { useConditionalRender } from '@/modules/shared/hooks/conditionalRender';
import { renderHook, act } from '@testing-library/react';

jest.useFakeTimers();

describe('useConditionalRender', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return true immediately when open=true', () => {
    const { result } = renderHook(() => useConditionalRender(true));
    expect(result.current).toBe(true);
  });

  it('should return false immediately when open=false and delay=0', () => {
    const { result, rerender } = renderHook(
      ({ open, delay }) => useConditionalRender(open, delay),
      { initialProps: { open: true, delay: 0 } }
    );

    expect(result.current).toBe(true);

    rerender({ open: false, delay: 0 });
    expect(result.current).toBe(false);
  });

  it('should delay unmount when open=false and delay > 0', () => {
    const { result, rerender } = renderHook(
      ({ open, delay }) => useConditionalRender(open, delay),
      { initialProps: { open: true, delay: 500 } }
    );

    expect(result.current).toBe(true);

    rerender({ open: false, delay: 500 });
    expect(result.current).toBe(true); // still true during delay

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(false);
  });

  it('should cancel timeout if unmounted before delay completes', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { rerender, unmount } = renderHook(
      ({ open, delay }) => useConditionalRender(open, delay),
      { initialProps: { open: true, delay: 300 } }
    );

    rerender({ open: false, delay: 300 });
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
