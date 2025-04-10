'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Selector from '@/components/ui/Selector';
import { useCategoryFormStore } from '@/stores/useCategoryFormStore';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';

interface CategoryFormProps {
  onSubmit: () => void;
  isEdit?: boolean;
}

const typeOptions = [
  { label: '지출', value: 'expense' },
  { label: '수입', value: 'income' },
];

export const CategoryForm = ({
  onSubmit,
  isEdit = false,
}: CategoryFormProps) => {
  const {
    state: { name, type },
    actions: { setField },
  } = useCategoryFormStore();

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('카테고리 이름을 입력해주세요.');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className='space-y-4 px-4 pt-4 text-foreground'>
      <Input
        label='카테고리 이름'
        placeholder='예: 식비, 월급'
        value={name}
        onChange={(e) => setField('name', e.target.value)}
      />

      <Selector
        label='카테고리 타입'
        value={type}
        onChange={(val) => setField('type', val as 'income' | 'expense')}
        options={typeOptions}
        getOptionLabel={(o) => o.label}
        getOptionValue={(o) => o.value}
      />

      {error && <p className='text-error text-sm'>{error}</p>}

      <div className='pt-4'>
        <Button className='w-full' onClick={handleSubmit}>
          {isEdit ? <Pencil /> : <Plus />}
        </Button>
      </div>
    </div>
  );
};
