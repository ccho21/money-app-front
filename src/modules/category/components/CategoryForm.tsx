'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/custom/ColorPicker';
import { getAutoIconFromName } from '@/modules/shared/lib/iconSuggest';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Separator } from '@/components/ui/separator';
import { useCategoryFormStore } from '@/modules/category/stores/formStore';

interface CategoryFormProps {
  onSubmit: () => void;
  onDelete?: () => void;
  isEdit?: boolean;
}

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
  onDelete,
  isEdit = false,
}: CategoryFormProps) => {
  const { name, type, color, icon, setField } = useCategoryFormStore();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    if (!color) {
      const guessedColor = getChartColorFromName(name);
      setField('color', guessedColor);
    }

    if (!icon) {
      const guessedIcon = getAutoIconFromName(name);
      setField('icon', guessedIcon);
    }

    setError('');
    onSubmit();
  };

  return (
    <div className='space-y-component px-component pt-component pb-section text-foreground'>
      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='name' className='text-label'>
          Category Name
        </Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder='e.g. Salary, Food'
        />
      </div>

      <div className='grid w-full items-center gap-element'>
        <Label className='text-label'>Category Type</Label>
        <ToggleGroup.Root
          type='single'
          value={type}
          onValueChange={(val) => {
            if (val) setField('type', val as 'income' | 'expense');
          }}
          className='flex gap-element'
        >
          <ToggleGroup.Item
            value='expense'
            className='px-component py-compact rounded-md border text-label data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-colors'
          >
            Expense
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value='income'
            className='px-component py-compact rounded-md border text-label data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-colors'
          >
            Income
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>

      <div className='grid w-full items-center gap-element'>
        <Label htmlFor='color' className='text-label'>
          Color
        </Label>
        <ColorPicker
          value={color ?? ''}
          onChange={(val) => setField('color', val)}
        />
      </div>

      {error && (
        <p className='text-caption text-destructive pt-tight'>{error}</p>
      )}

      <Separator className='my-4'></Separator>

      <div className='pt-component space-y-element text-center'>
        <Button onClick={handleSubmit} className='w-full'>
          {isEdit ? 'Update' : 'Create'}
        </Button>

        {isEdit && (
          <Button
            variant='ghost'
            className='w-full text-destructive'
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        )}
      </div>

      {isEdit && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side='bottom'>
            <SheetHeader>
              <SheetTitle className='text-title'>
                Delete this category?
              </SheetTitle>
              <SheetDescription className='text-body'>
                This will permanently remove the category. This action cannot be
                undone.
              </SheetDescription>
            </SheetHeader>

            <div className='px-component pt-component pb-component space-y-element'>
              <Button
                variant='destructive'
                className='w-full'
                onClick={() => {
                  onDelete?.();
                  setOpen(false);
                }}
              >
                <Trash2 className='icon-sm mr-tight' />
                Confirm Delete
              </Button>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};
