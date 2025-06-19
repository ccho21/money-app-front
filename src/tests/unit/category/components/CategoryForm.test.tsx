import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryForm } from '@/modules/category/components/CategoryForm';
import { useCategoryFormStore } from '@/modules/category/stores/formStore';

jest.mock('@/modules/category/stores/formStore', () => ({
  useCategoryFormStore: jest.fn(),
}));

describe('CategoryForm', () => {
  const mockSetField = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCategoryFormStore as unknown as jest.Mock).mockReturnValue({
      name: '',
      type: 'expense',
      color: null,
      setField: mockSetField,
    });
  });

  it('shows error if name is empty on submit', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);
    const submit = screen.getByRole('button', { name: /create/i });

    fireEvent.click(submit);

    expect(screen.getByText(/category name is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with auto color if no color provided', () => {
    (useCategoryFormStore as unknown as jest.Mock).mockReturnValue({
      name: 'Groceries',
      type: 'expense',
      color: null,
      setField: mockSetField,
    });

    render(<CategoryForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    // color is generated via getResolvedChartColor
    expect(mockSetField).toHaveBeenCalledWith(
      'color',
      expect.stringMatching(/^--chart-\d+$/)
    );

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('renders Delete button when isEdit is true', () => {
    render(
      <CategoryForm onSubmit={mockOnSubmit} onDelete={mockOnDelete} isEdit />
    );
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('does not render Delete button when isEdit is false', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it('calls onDelete when delete is confirmed in modal', () => {
    render(
      <CategoryForm onSubmit={mockOnSubmit} onDelete={mockOnDelete} isEdit />
    );
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    const confirmBtn = screen.getByRole('button', { name: /confirm delete/i });
    fireEvent.click(confirmBtn);

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
