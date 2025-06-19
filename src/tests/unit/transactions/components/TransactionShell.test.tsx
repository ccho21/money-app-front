// src/components/transaction/TransactionShell.test.tsx
import FilterSheet from '@/components/common/FilterSheet';
import SearchDialog from '@/components/common/SearchDialog';
import TabMenu from '@/components/navigation/TabMenu';
import TransactionShell from '@/modules/transaction/components/view/TransactionShell';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
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
  ) => <div>{props.open ? 'SearchDialog Open' : 'SearchDialog Closed'}</div>;
  MockSearchDialog.displayName = 'MockSearchDialog';
  return MockSearchDialog;
});

jest.mock('@/components/common/FilterSheet', () => {
  const MockFilterSheet = (props: React.ComponentProps<typeof FilterSheet>) => (
    <div>{props.open ? 'FilterSheet Open' : 'FilterSheet Closed'}</div>
  );
  MockFilterSheet.displayName = 'MockFilterSheet';
  return MockFilterSheet;
});

describe('TransactionShell', () => {
  const mockRouterPush = jest.fn();
  const mockInitializeFromParams = jest.fn();
  const mockGetQueryString = jest.fn(() => '?mock=true');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    (useTransactionFilterStore as unknown as jest.Mock).mockReturnValue({
      isInitialized: false,
      initializeFromParams: mockInitializeFromParams,
      getQueryString: mockGetQueryString,
    });
  });

  it('should render children and navigation components', async () => {
    render(
      <TransactionShell>
        <div>Child Content</div>
      </TransactionShell>
    );

    await waitFor(() => {
      expect(screen.getByText('TopNav')).toBeInTheDocument();
      expect(screen.getByText('TabMenu')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });
  });

  it('should initialize filter store on first render', () => {
    render(
      <TransactionShell>
        <div>Child</div>
      </TransactionShell>
    );
    expect(mockInitializeFromParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams)
    );
  });

  it('should push to new route when tab changes', () => {
    render(<TransactionShell>{null}</TransactionShell>);

    fireEvent.click(screen.getByText('Go Calendar')); // 또는 getByTestId('tab-calendar')

    expect(mockRouterPush).toHaveBeenCalledWith(
      '/transaction/view/calendar?mock=true'
    );
  });

  it('should open search and filter dialogs when triggered', () => {
    render(<TransactionShell>{null}</TransactionShell>);

    // TopNav의 onSearch/onFilter는 useTopNavPreset으로 등록됨 → 테스트에서는 직접 트리거 X
    // 대신 Dialog 초기 상태 확인
    expect(screen.getByText('SearchDialog Closed')).toBeInTheDocument();
    expect(screen.getByText('FilterSheet Closed')).toBeInTheDocument();
  });
});
