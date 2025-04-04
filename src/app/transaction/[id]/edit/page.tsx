"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useTransactionFormStore } from "@/stores/useTransactionFormStore";
import { useTransactionStore } from "@/stores/useTransactionStore";

import IncomeForm from "../../_components/IncomeForm";
import TransferForm from "../../_components/TransferForm";
import ExpenseForm from "../../_components/ExpenseForm";

import { fetchAccounts } from "@/services/accountService";
import { fetchCategories } from "@/services/categoryService";
import { fetchTransactionById } from "@/services/transactionService";

export default function TransactionEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    state: { type },
    actions: { setAllFields },
  } = useTransactionFormStore();

  useEffect(() => {
    const run = async () => {
      if (!id) return;

      await fetchAccounts();
      await fetchCategories();
      const t = useTransactionStore.getState().state.selectedTransaction;
      const tx =
        t && t.id === id ? t : await fetchTransactionById(id.toString());

      if (tx) {
        // ✅ 폼 필드 초기화
        setAllFields({
          type: tx.type,
          amount: String(tx.amount),
          date: tx.date,
          note: tx.note ?? "",
          description: tx.description ?? "",
          accountId: tx.account.id || "",
          categoryId: tx.category?.id || "",
          from: tx.accountId || "",
          to: tx.toAccountId ?? "",
        });
      } else {
        alert("해당 거래를 불러올 수 없습니다.");
        router.push("/dashboard/daily");
      }
    };

    run();
  }, [id, setAllFields, router]);

  if (!type)
    return (
      <div className="text-center text-gray-400 p-10">
        Loading transaction...
      </div>
    );

  if (type === "income") return <IncomeForm mode="edit" id={id as string} />;
  if (type === "transfer")
    return <TransferForm mode="edit" id={id as string} />;
  return <ExpenseForm mode="edit" id={id as string} />;
}
