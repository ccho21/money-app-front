import { Wallet } from 'lucide-react';
import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import { AccountTransactionItemDTO } from '@/modules/account/types';

interface AccountBoxProps {
  accounts: AccountTransactionItemDTO[];
}

export default function AccountBox({ accounts }: AccountBoxProps) {
  return (
    <div className="space-y-component">
      <h2 className="text-label font-semibold flex items-center gap-tight text-foreground">
        <Wallet className="w-4 h-4 text-muted-foreground" />
        Accounts
      </h2>

      <div className="flex flex-col divide-y divide-border">
        {accounts.map((acc) => (
          <div
            key={acc.accountId}
            className="flex justify-between items-center py-element text-body"
          >
            <span className="text-muted-foreground">
              Exp. ({acc.accountName})
            </span>
            <CurrencyDisplay
              amount={acc.totalExpense ?? 0}
              type="total"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
