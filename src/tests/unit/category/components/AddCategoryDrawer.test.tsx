import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useCreateCategory } from '@/modules/category/hooks/queries';
import { AddCategoryDrawer } from '@/modules/category/components/AddCategoryDrawer';
import { useCategoryFormStore } from '@/modules/category/stores/formStore';

jest.mock('@/modules/category/hooks/queries', () => ({
  useCreateCategory: jest.fn(),
}));

jest.mock('@/modules/category/stores/formStore', () => {
  const actual = jest.requireActual('@/modules/category/stores/formStore');
  return {
    ...actual,
    useCategoryFormStore: jest.fn(),
  };
});

jest.mock('@/modules/category/components/CategoryForm', () => ({
  CategoryForm: ({ onSubmit }: { onSubmit: () => void }) => (
    <button onClick={onSubmit}>Save</button>
  ),
}));

describe('AddCategoryDrawer', () => {
  const mockOnClose = jest.fn();
  const mockMutateAsync = jest.fn();
  const mockReset = jest.fn();
  const mockGetCreateFormData = jest.fn();

  beforeEach(() => {
    (useCategoryFormStore as unknown as jest.Mock).mockReturnValue({
      getCreateFormData: mockGetCreateFormData,
      reset: mockReset,
    });

    (useCreateCategory as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    mockOnClose.mockClear();
    mockMutateAsync.mockClear();
    mockReset.mockClear();
  });

  it('renders drawer with title and form', () => {
    render(<AddCategoryDrawer onClose={mockOnClose} />);
    expect(
      screen.getByRole('heading', { name: /add category/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Hidden input autoFocus
  });

  it('calls mutateAsync, reset and onClose on successful submit', async () => {
    mockGetCreateFormData.mockReturnValue({ name: 'Test', type: 'expense' });

    render(<AddCategoryDrawer onClose={mockOnClose} />);
    const submitButton = screen.getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: 'Test',
        type: 'expense',
      });
      expect(mockReset).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('alerts on error when mutateAsync fails', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    mockGetCreateFormData.mockReturnValue({ name: 'ErrorCat', type: 'income' });
    mockMutateAsync.mockRejectedValue(new Error('API error'));

    render(<AddCategoryDrawer onClose={mockOnClose} />);
    const submitButton = screen.getByRole('button', { name: /save/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Failed to create category');
    });

    alertSpy.mockRestore();
  });

  it('calls reset and onClose on drawer close', () => {
    render(<AddCategoryDrawer onClose={mockOnClose} />);

    // simulate drawer close
    fireEvent.click(document); // mimics outside click to close drawer

    waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
