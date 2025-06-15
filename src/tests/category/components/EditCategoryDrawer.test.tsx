import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditCategoryDrawer } from '@/modules/category/components/EditCategoryDrawer';
import {
  useCategoryById,
  useUpdateCategory,
  useDeleteCategory,
} from '@/modules/category/hooks/queries';
import { useCategoryFormStore } from '@/modules/category/stores/formStore';

// Mocks
jest.mock('@/modules/category/hooks/queries', () => ({
  useCategoryById: jest.fn(),
  useUpdateCategory: jest.fn(),
  useDeleteCategory: jest.fn(),
}));

jest.mock('@/modules/category/stores/formStore', () => ({
  useCategoryFormStore: jest.fn(),
}));

jest.mock('@/modules/category/components/CategoryForm', () => ({
  CategoryForm: ({
    onSubmit,
    onDelete,
  }: {
    onSubmit: () => void;
    onDelete?: () => void;
  }) => (
    <div>
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

describe('EditCategoryDrawer', () => {
  const mockSetAllFields = jest.fn();
  const mockReset = jest.fn();
  const mockGetUpdateFormData = jest.fn();
  const mockOnClose = jest.fn();
  const mockUpdateMutate = jest.fn();
  const mockDeleteMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCategoryFormStore as unknown as jest.Mock).mockReturnValue({
      setAllFields: mockSetAllFields,
      reset: mockReset,
      getUpdateFormData: mockGetUpdateFormData,
    });

    (useUpdateCategory as jest.Mock).mockReturnValue({
      mutateAsync: mockUpdateMutate,
    });

    (useDeleteCategory as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteMutate,
    });
  });

  it('sets form fields when category data is loaded', () => {
    (useCategoryById as jest.Mock).mockReturnValue({
      data: {
        name: 'Utilities',
        type: 'expense',
        icon: '',
        color: '',
      },
    });

    render(<EditCategoryDrawer categoryId='123' onClose={mockOnClose} />);
    expect(mockSetAllFields).toHaveBeenCalledWith({
      name: 'Utilities',
      type: 'expense',
      icon: '',
      color: '',
    });
  });

  it('submits updated data correctly', async () => {
    (useCategoryById as jest.Mock).mockReturnValue({ data: null });
    mockGetUpdateFormData.mockReturnValue({ name: 'Updated', type: 'income' });

    render(<EditCategoryDrawer categoryId='456' onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateMutate).toHaveBeenCalledWith({
        id: '456',
        data: { name: 'Updated', type: 'income' },
      });
      expect(mockReset).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('deletes category correctly', async () => {
    (useCategoryById as jest.Mock).mockReturnValue({ data: null });

    render(<EditCategoryDrawer categoryId='789' onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockDeleteMutate).toHaveBeenCalledWith('789');
      expect(mockReset).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('does not render content if categoryId is falsy', () => {
    render(<EditCategoryDrawer categoryId={''} onClose={mockOnClose} />);
    expect(
      screen.queryByRole('heading', { name: /edit category/i })
    ).not.toBeInTheDocument();
  });
});
