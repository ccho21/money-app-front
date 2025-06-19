// src/providers/SocketProvider.test.tsx
import { render, screen, cleanup } from '@testing-library/react';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { io } from 'socket.io-client';
import { SocketProvider, useSocket } from '@/providers/SocketProvider';

jest.mock('socket.io-client', () => ({
  io: jest.fn(),
}));

jest.mock('@/modules/auth/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const TestComponent = () => {
  const { socket } = useSocket();
  return <div>{socket ? 'Connected' : 'Not Connected'}</div>;
};

describe('SocketProvider', () => {
  it('should not connect if user is null', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(null);

    render(
      <SocketProvider>
        <TestComponent />
      </SocketProvider>
    );

    expect(io).not.toHaveBeenCalled();
    expect(screen.getByText('Not Connected')).toBeInTheDocument();
  });

  it('should connect if user exists', () => {
    const connectMock = jest.fn();
    const disconnectMock = jest.fn();

    const fakeSocket = {
      connect: connectMock,
      disconnect: disconnectMock,
      on: jest.fn(),
    };

    (io as jest.Mock).mockReturnValue(fakeSocket);
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      id: 'u1',
      email: 'test@test.com',
    });

    const { unmount } = render(
      <SocketProvider>
        <TestComponent />
      </SocketProvider>
    );

    expect(io).toHaveBeenCalledWith(
      'http://localhost:8080',
      expect.any(Object)
    );
    expect(connectMock).toHaveBeenCalled();
    expect(screen.getByText('Connected')).toBeInTheDocument();

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });
});
