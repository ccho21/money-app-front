'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Selector from '@/components/ui/custom/Selector';
import { useCategoryFormStore } from '@/modules/category/formStore';
import { ColorPicker } from '@/components/ui/custom/ColorPicker';
import { getAutoIconFromName } from '@/lib/iconSuggest';

interface CategoryFormProps {
  onSubmit: () => void;
  isEdit?: boolean;
}

const typeOptions = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
];

const getChartColorFromName = (name: string, chartCount = 30) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % chartCount;
  return `--chart-${index + 1}`;
};

export const CategoryForm = ({
  onSubmit,
  isEdit = false,
}: CategoryFormProps) => {
  const { name, type, color, icon, setField } = useCategoryFormStore();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    // name 으로 근거한 컬러 찾아서. 구현하고 저장하고 하는 로직 여기에?
    if (!color) {
      const guessedColor = getChartColorFromName(name);
      setField('color', guessedColor);
    }

    if (!icon) {
      const guessedIcon = getAutoIconFromName(name); // 'cart'
      setField('icon', guessedIcon);
    }

    setError('');
    onSubmit();
  };

  return (
    <div className='space-y-component px-component pt-component pb-section text-foreground'>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Category Name</Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder='e.g. Salary, Food'
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='type'>Category Type</Label>
        <Selector
          label='Category Type'
          value={type}
          onChange={(val) => setField('type', val as 'income' | 'expense')}
          options={typeOptions}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
        />
      </div>

      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='color'>Color</Label>
        <ColorPicker
          value={color ?? ''}
          onChange={(val) => setField('color', val)}
        />
      </div>

      {error && <p className='text-sm text-destructive pt-tight'>{error}</p>}

      <div className='pt-component'>
        <Button onClick={handleSubmit}>
          {isEdit ? (
            <>
              <Pencil className='w-4 h-4 mr-2' /> Update Category
            </>
          ) : (
            <>
              <Plus className='w-4 h-4 mr-2' /> Create Category
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
