// ✅ 파일 경로: src/app/dashboard/summary/_components/AccountsBox.tsx

import { Card } from "@/components/ui/Card";
import { AccountSummary } from "@/features/accounts/types";
import React from "react";

interface AccountsBoxProps {
  accounts: AccountSummary[];
}

export default function AccountsBox({ accounts }: AccountsBoxProps) {
  return (
    <Card title={'Accounts'}>
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {accounts.map((acc) => (
          <div key={acc.accountId} className="flex justify-between">
            <span>Exp. ({acc.name})</span>
            <span className="font-medium">{acc.balance.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
