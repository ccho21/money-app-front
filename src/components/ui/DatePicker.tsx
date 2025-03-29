'use client';

import { useState, useEffect, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/Input';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, onChange }: Props) {
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
      className='cursor-pointer'
    />
  ));
  CustomInput.displayName = 'CustomDatePickerInput';

  return (
    <ReactDatePicker
      selected={localDate}
      onChange={handleChange}
      dateFormat='yyyy-MM-dd (eee)'
      customInput={<CustomInput />}
      popperPlacement='bottom-start'
      showPopperArrow={false}
      calendarClassName='rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-800 text-sm'
    />
  );
}
