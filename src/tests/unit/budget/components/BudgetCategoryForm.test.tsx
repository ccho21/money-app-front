import { render, screen, fireEvent } from '@testing-library/react';
import { BudgetCategoryForm } from '@/modules/budget/components/BudgetCategoryForm';
import { BudgetCategoryCreateRequest } from '@/modules/budget/types/types';

const mockSetField = jest.fn();
const mockResetForm = jest.fn();

type BudgetFormStore = {
  form: BudgetCategoryCreateRequest;
  setField: typeof mockSetField;
  resetForm: typeof mockResetForm;
};

jest.mock('@/modules/budget/stores/formStore', () => ({
  useBudgetFormStore: (selector: (store: BudgetFormStore) => unknown) =>
    selector({
      form: {
        categoryId: 'cat-001',
        amount: 1234,
        startDate: '2025-06-01',
        endDate: '2025-06-30',
      },
      setField: mockSetField,
      resetForm: mockResetForm,
    }),
}));

describe('BudgetCategoryForm', () => {
  const mockSubmit = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input with initial amount and Save button', () => {
    render(<BudgetCategoryForm onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText('Amount');
    expect(input).toHaveValue(1234);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it('updates amount on input change', () => {
    render(<BudgetCategoryForm onSubmit={mockSubmit} />);
    const input = screen.getByPlaceholderText('Amount');

    fireEvent.change(input, { target: { value: '5678' } });

    expect(mockSetField).toHaveBeenCalledWith('amount', '5678'); // ← 혹시 내부에서 number로 파싱한다면 여기 string → number 바꾸기
  });

  it('calls onSubmit when Save button is clicked', () => {
    render(<BudgetCategoryForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('renders Delete button and calls onDelete when clicked (edit mode)', () => {
    render(
      <BudgetCategoryForm onSubmit={mockSubmit} onDelete={mockDelete} isEdit />
    );

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalled();
  });
});