// src/app/transaction/layout.tsx

import TransactionShell from "@/modules/transaction/components/view/TransactionShell";


export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransactionShell>{children}</TransactionShell>;
}
