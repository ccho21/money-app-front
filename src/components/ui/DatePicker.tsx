'use client';

import { useState, useEffect, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/Input';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ label, value, onChange }: Props) {
  const [localDate, setLocalDate] = useState<Date>(value);

  useEffect(() => {
    setLocalDate(value);
  }, [value]);

  const handleChange = (val: Date | null) => {
    if (val) {
      setLocalDate(val);
      onChange(val);
    }
  };

  const CustomInput = forwardRef<
    HTMLInputElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <Input
      readOnly
      value={value}
      onClick={onClick}
      ref={ref}
      className='cursor-pointer w-full' // ✅ full width 보장
    />
  ));
  CustomInput.displayName = 'CustomDatePickerInput';
  console.log('### VALUe date picker', value);
  return (
    <div className='grid grid-cols-12 items-center gap-2'>
      {label && (
        <label className='col-span-2 text-xs text-gray-500 dark:text-gray-400 font-medium'>
          {label}
        </label>
      )}
      <div className='col-span-10'>
        <ReactDatePicker
          selected={localDate}
          onChange={(date: Date | null) => handleChange(date)}
          dateFormat='yyyy-MM-dd (eee)'
          customInput={<CustomInput />}
          popperPlacement='bottom-start'
          showPopperArrow={false}
          calendarClassName='rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-800 text-sm'
        />
      </div>
    </div>
  );
}
