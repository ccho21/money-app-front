'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/custom/ColorPicker';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { ToggleGroup } from '@radix-ui/react-toggle-group';
import { useAccountFormStore } from '@/modules/account/store/formStore';
import { AccountType } from '@/modules/account/types/types';
import { ToggleGroupItem } from '@/components/ui/toggle-group';

interface AccountFormProps {
  onSubmit: () => void;
  onDelete?: () => void;
  isEdit?: boolean;
  submitText?: string;
}

export default function AccountForm({
  onSubmit,
  onDelete,
  isEdit = false,
  submitText = isEdit ? 'Update' : 'Add',
}: AccountFormProps) {
  const { name, type, balance, color, setField } = useAccountFormStore();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // for Delete confirm

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Account name is required.');
      return;
    }

    setError('');
    onSubmit();
  };

  return (
    <div className='text-foreground'>
      <div className='space-y-component px-component pt-component pb-section'>
        {/* 이름 */}
        <div className='grid w-full items-center gap-element'>
          <Label htmlFor='name' className='text-label'>
            Account Name
          </Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setField('name', e.target.value)}
          />
        </div>

        {/* 타입 */}
        <div className='grid w-full items-center gap-element'>
          <Label className='text-label'>Account Type</Label>
          <ToggleGroup
            type='single'
            value={type}
            onValueChange={(val) => {
              if (val) setField('type', val as AccountType);
            }}
            className='flex gap-element'
          >
            {(['BANK', 'CARD', 'CASH'] as AccountType[]).map((t) => (
              <ToggleGroupItem
                key={t}
                value={t}
                className='px-spacing-element py-compact rounded-md border text-label data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
              >
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* 잔액 */}
        <div className='grid w-full items-center gap-element'>
          <Label htmlFor='balance' className='text-label'>
            Balance
          </Label>
          <Input
            id='balance'
            type='number'
            value={balance}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val)) setField('balance', val);
            }}
          />
        </div>

        {/* 색상 */}
        <div className='grid w-full items-center gap-element'>
          <Label htmlFor='color' className='text-label'>
            Color
          </Label>
          <ColorPicker
            value={color ?? ''}
            onChange={(val) => setField('color', val)}
          />
        </div>

        {/* 에러 */}
        {error && (
          <p className='text-caption text-destructive pt-tight'>{error}</p>
        )}

        {/* 저장 / 삭제 버튼 */}
        <div className='pt-component space-y-element text-center'>
          <Button onClick={handleSubmit} className='w-full'>
            {submitText}
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
      </div>

      {/* 삭제 확인 Sheet */}
      {isEdit && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side='bottom'>
            <SheetHeader>
              <SheetTitle className='text-title'>
                Delete this account?
              </SheetTitle>
              <SheetDescription className='text-caption'>
                This will permanently remove the account. This action cannot be
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
                <Trash2 className='icon-sm mr-element' />
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
}
