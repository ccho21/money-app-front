import TransactionShell from '@/modules/transaction/components/view/TransactionShell';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import { useRouter } from 'next/navigation';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { useTopNavPreset } from '@/modules/shared/hooks/topNavPreset';
import TabMenu from '@/components/navigation/TabMenu';
import SearchDialog from '@/components/common/SearchDialog';
import FilterSheet from '@/components/common/FilterSheet';
import { act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: () => '/transaction/view/list',
  useSearchParams: () => new URLSearchParams('startDate=2024-01-01'),
}));

jest.mock('@/modules/shared/hooks/topNavPreset', () => ({
  useTopNavPreset: jest.fn(),
}));

jest.mock('@/modules/transaction/stores/filterStore', () => ({
  useTransactionFilterStore: jest.fn(),
}));

jest.mock('@/components/navigation/TopNav', () => {
  const MockTopNav = () => <div>TopNav</div>;
  MockTopNav.displayName = 'MockTopNav';
  return MockTopNav;
});

jest.mock('@/components/navigation/TabMenu', () => {
  const MockTabMenu = (props: React.ComponentProps<typeof TabMenu>) => (
    <div>
      TabMenu
      <button onClick={() => props.onChange('calendar')}>Go Calendar</button>
    </div>
  );
  MockTabMenu.displayName = 'MockTabMenu';
  return MockTabMenu;
});

jest.mock('@/components/common/SearchDialog', () => {
  const MockSearchDialog = (
    props: React.ComponentProps<typeof SearchDialog>
  ) => <div>{props.open ? 'Search Open' : 'Search Closed'}</div>;
  MockSearchDialog.displayName = 'MockSearchDialog';
  return MockSearchDialog;
});

jest.mock('@/components/common/FilterSheet', () => {
  const MockFilterSheet = (props: React.ComponentProps<typeof FilterSheet>) => (
    <div>{props.open ? 'Filter Open' : 'Filter Closed'}</div>
  );
  MockFilterSheet.displayName = 'MockFilterSheet';
  return MockFilterSheet;
});

describe('TransactionShell integration', () => {
  const push = jest.fn();
  const initializeFromParams = jest.fn();
  const getQueryString = jest.fn(() => '?mock=true');
  let searchHandler: () => void = () => {};
  let filterHandler: () => void = () => {};

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useTransactionFilterStore as unknown as jest.Mock).mockReturnValue({
      isInitialized: false,
      initializeFromParams,
      getQueryString,
    });
    (useTopNavPreset as jest.Mock).mockImplementation((opts) => {
      searchHandler = opts.onSearch as () => void;
      filterHandler = opts.onFilter as () => void;
    });
  });

  it('handles tab changes and dialog state', async () => {
    await waitFor(() => {
      render(<TransactionShell>Child</TransactionShell>, {
        wrapper: wrapper(),
      });
    });

    const calendarButton = await screen.findByText('Go Calendar');
    fireEvent.click(calendarButton);
    expect(push).toHaveBeenCalledWith('/transaction/view/calendar?mock=true');

    expect(screen.getByText('Search Closed')).toBeInTheDocument();
    expect(screen.getByText('Filter Closed')).toBeInTheDocument();

    await act(async () => {
      searchHandler();
      filterHandler();
    });

    await waitFor(() => {
      expect(screen.getByText('Search Open')).toBeInTheDocument();
      expect(screen.getByText('Filter Open')).toBeInTheDocument();
    });

    expect(initializeFromParams).toHaveBeenCalled();
  });
});
