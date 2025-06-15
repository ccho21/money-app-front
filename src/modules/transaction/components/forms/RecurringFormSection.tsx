'use client';

import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/ui/datePicker';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
} from 'date-fns';
import { useState } from 'react';
import { Section } from '@/components/ui/layout/section';

function getNextExecutionDate(
  start: Date,
  frequency: string,
  interval: number
): Date {
  switch (frequency) {
    case 'daily':
      return addDays(start, interval);
    case 'weekly':
      return addWeeks(start, interval);
    case 'monthly':
      return addMonths(start, interval);
    case 'yearly':
      return addYears(start, interval);
    default:
      return start;
  }
}

export default function RecurringFormSection() {
  const recurring = useTransactionFormStore((s) => s.state.recurring);
  const setField = useTransactionFormStore((s) => s.setField);

  const [endMode, setEndMode] = useState<'never' | 'on'>(
    recurring.endDate ? 'on' : 'never'
  );

  const updateRecurring = (changes: Partial<typeof recurring>) => {
    setField('recurring', { ...recurring, ...changes });
  };

  const handleToggle = () => {
    if (!recurring.enabled) {
      updateRecurring({
        enabled: true,
        frequency: 'monthly',
        interval: 1,
        endDate: null,
      });
      setEndMode('never');
    } else {
      updateRecurring({ enabled: false });
    }
  };

  const now = new Date();
  const nextExecution = getNextExecutionDate(
    now,
    recurring.frequency,
    recurring.interval
  );
  const ended = recurring.endDate && isAfter(now, recurring.endDate);

  return (
    <Section>
      <div className='grid w-full gap-4 rounded-lg border bg-muted/30 p-4'>
        {/* Switch */}
        <div className='flex items-center justify-between'>
          <Label htmlFor='repeat-toggle' className='text-label font-medium'>
            Enable Recurring
          </Label>
          <Switch
            id='repeat-toggle'
            checked={recurring.enabled}
            onCheckedChange={handleToggle}
          />
        </div>

        {recurring.enabled && (
          <div className='space-y-4'>
            {/* Frequency */}
            <div className='grid gap-2'>
              <Label className='text-label'>Repeat every</Label>
              <Select
                value={recurring.frequency}
                onValueChange={(value) =>
                  updateRecurring({
                    frequency: value as typeof recurring.frequency,
                    interval: 1,
                    endDate: null,
                  })
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select frequency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Day</SelectItem>
                  <SelectItem value='weekly'>Week</SelectItem>
                  <SelectItem value='monthly'>Month</SelectItem>
                  <SelectItem value='yearly'>Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* End Mode Selector */}
            <div className='grid gap-2'>
              <Label className='text-label'>End condition</Label>
              <Select
                value={endMode}
                onValueChange={(value) => {
                  const val = value as 'never' | 'on';
                  setEndMode(val);
                  updateRecurring({
                    endDate: val === 'never' ? null : new Date(),
                  });
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select end mode' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='never'>Never</SelectItem>
                  {/* <SelectItem value='on'>On specific date</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* End Date Picker */}
            {endMode === 'on' && (
              <div className='grid gap-2'>
                <Label className='text-label'>End date</Label>
                <DatePicker
                  isoValue={recurring.endDate ?? new Date().toISOString()}
                  onChange={(date) => updateRecurring({ endDate: date })}
                />
              </div>
            )}

            {/* Preview */}
            <div className='pt-2 text-sm text-muted-foreground leading-snug break-words max-w-md'>
              {ended ? (
                <span>
                  ⏹️ Ended on
                  <strong>{format(recurring.endDate!, 'PP')}</strong>
                </span>
              ) : (
                <span>
                  📅 Next scheduled on
                  <strong>{format(nextExecution, 'PP')}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
