'use client';

import { useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { useBudgetCategoryFormStore } from './useBudgetCategoryFormStore';
import { createBudgetCategory } from '@/features/budget/hooks';
import { useRouter } from 'next/navigation';

export const BudgetCategoryForm = () => {
  const router = useRouter();

  const {
    state: { amount },
    actions: { syncWithDateFilter, getFormData, reset, setField },
  } = useBudgetCategoryFormStore();

  useEffect(() => {
    syncWithDateFilter();
  }, [syncWithDateFilter]);

  const handleSubmit = async () => {
    try {
      const data = getFormData();
      await createBudgetCategory({
        categoryId: data.categoryId,
        amount: data.amount,
        startDate: data.startDate,
        endDate: data.endDate,
        groupBy: data.groupBy,
      });
      toast.success('예산이 저장되었습니다.');
      router.push('/budget/settings');
      reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '예산 저장 중 오류가 발생했습니다';
      toast.error(message);
    }
  };

  return (
    <div className='space-y-4 bg-surface text-foreground p-4 rounded-md shadow-sm'>
      {/* 금액 입력 */}
      <Input
        type='number'
        inputMode='numeric'
        placeholder='금액 입력'
        value={amount}
        className='text-center'
        onChange={(e) => setField('amount', e.target.value)}
      />

      {/* 저장 버튼 */}
      <Button className='w-full' onClick={handleSubmit}>
        저장
      </Button>
    </div>
  );
};
