// src/modules/alerts/__tests__/useBudgetAlert.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useSocket } from '@/providers/SocketProvider';
import { toast } from 'sonner';
import { useBudgetAlert } from '@/modules/shared/hooks/budgetAlert';

// 🧪 Mocks
const mockOn = jest.fn();
const mockOff = jest.fn();

jest.mock('@/providers/SocketProvider', () => ({
  useSocket: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

describe('useBudgetAlert', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register and unregister budget_alert socket event', () => {
    const handlerMap: { [event: string]: (data: unknown) => void } = {};
    mockOn.mockImplementation((event, handler) => {
      handlerMap[event] = handler;
    });

    (useSocket as jest.Mock).mockReturnValue({
      socket: {
        on: mockOn,
        off: mockOff,
      },
    });

    const { unmount } = renderHook(() => useBudgetAlert());

    // ✅ socket.on 호출 확인
    expect(mockOn).toHaveBeenCalledWith('budget_alert', expect.any(Function));

    // ✅ handler 직접 호출 후 toast 확인
    const mockPayload = {
      category: 'Food',
      message: 'Food budget exceeded!',
    };

    act(() => {
      handlerMap['budget_alert'](mockPayload);
    });

    expect(toast).toHaveBeenCalledWith(mockPayload.message, {
      description: mockPayload.category,
      position: 'top-center',
    });

    // ✅ cleanup: socket.off 확인
    unmount();
    expect(mockOff).toHaveBeenCalledWith('budget_alert', handlerMap['budget_alert']);
  });

  it('should do nothing if socket is null', () => {
    (useSocket as jest.Mock).mockReturnValue({ socket: null });

    renderHook(() => useBudgetAlert());

    expect(mockOn).not.toHaveBeenCalled();
    expect(mockOff).not.toHaveBeenCalled();
  });
});
