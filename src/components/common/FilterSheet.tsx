'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const [transactionType, setTransactionType] = useState('all');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateFilterType, setDateFilterType] = useState<
    'month' | 'range' | 'year'
  >('month');

  const accountList = ['은행 계좌', '현금', '카드'];
  const categoryList = ['식비', '교통비', '쇼핑'];

  const toggleAccount = (account: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(account)
        ? prev.filter((a) => a !== account)
        : [...prev, account]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className='pb-safe h-full overflow-y-auto px-4 pt-6'
      >
        <SheetHeader>
          <SheetTitle className='text-lg'>거래 필터</SheetTitle>
          <SheetDescription className='text-sm text-muted-foreground'>
            조건에 맞는 거래만 확인할 수 있어요.
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6 pb-28'>
          <Input placeholder='메모 검색' className='h-9 text-sm' />

          <div className='space-y-2'>
            <p className='text-sm font-medium'>거래 유형</p>
            <ToggleGroup
              type='single'
              value={transactionType}
              onValueChange={(v) => setTransactionType(v)}
              className='grid grid-cols-3 gap-2'
            >
              <ToggleGroupItem value='all' className='text-sm'>
                전체
              </ToggleGroupItem>
              <ToggleGroupItem value='income' className='text-sm'>
                수입
              </ToggleGroupItem>
              <ToggleGroupItem value='expense' className='text-sm'>
                지출
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>계정 선택</p>
            <div className='space-y-2'>
              {accountList.map((account) => (
                <div key={account} className='flex items-center gap-2'>
                  <Checkbox
                    id={`account-${account}`}
                    checked={selectedAccounts.includes(account)}
                    onCheckedChange={() => toggleAccount(account)}
                  />
                  <label htmlFor={`account-${account}`} className='text-sm'>
                    {account}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>카테고리 선택</p>
            <div className='space-y-2'>
              {categoryList.map((category) => (
                <div key={category} className='flex items-center gap-2'>
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <label htmlFor={`category-${category}`} className='text-sm'>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>날짜 필터 방식</p>
            <Select
              value={dateFilterType}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValueChange={(v) => setDateFilterType(v as any)}
            >
              <SelectTrigger className='h-9 text-sm'>
                <span>
                  {dateFilterType === 'month'
                    ? '월 기준'
                    : dateFilterType === 'range'
                    ? '범위'
                    : '연도 기준'}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='month'>월 기준</SelectItem>
                <SelectItem value='range'>날짜 범위</SelectItem>
                <SelectItem value='year'>연도 기준</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='sticky bottom-0 bg-background border-t px-4 py-3'>
          <SheetFooter className='flex justify-between'>
            <Button
              variant='ghost'
              size='sm'
              className='text-sm'
              onClick={() => {
                setTransactionType('all');
                setSelectedAccounts([]);
                setSelectedCategories([]);
                setDateFilterType('month');
              }}
            >
              초기화
            </Button>
            <Button
              size='sm'
              className='text-sm'
              onClick={() => onOpenChange(false)}
            >
              적용하기
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
