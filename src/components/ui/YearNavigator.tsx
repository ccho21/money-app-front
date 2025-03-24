'use client';

import { useState } from 'react';

interface Props {
  initialYear?: number;
  onChange?: (year: number) => void;
}

export default function YearNavigator({ initialYear = new Date().getFullYear(), onChange }: Props) {
  const [year, setYear] = useState(initialYear);

  const changeYear = (delta: number) => {
    const newYear = year + delta;
    setYear(newYear);
    onChange?.(newYear);
  };

  return (
    <div className="flex justify-center items-center py-2 gap-4 text-lg font-semibold">
      <button onClick={() => changeYear(-1)}>&larr;</button>
      <span>{year}</span>
      <button onClick={() => changeYear(1)}>&rarr;</button>
    </div>
  );
}