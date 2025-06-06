'use client';

import { useState } from 'react';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

interface MainCurrencyPanelProps {
  onClose: () => void;
}

export default function MainCurrencyPanel({ onClose }: MainCurrencyPanelProps) {
  const {
    currencyUnitPosition,
    setCurrencyUnitPosition,
    currencyDecimalPlaces,
    setCurrencyDecimalPlaces,
  } = useUserSettingStore();

  const [unitPosition, setUnitPosition] = useState<'front' | 'back'>(
    currencyUnitPosition
  );
  const [decimalPlaces, setDecimalPlaces] = useState<number>(
    currencyDecimalPlaces
  );

  const handleSave = () => {
    setCurrencyUnitPosition(unitPosition);
    setCurrencyDecimalPlaces(decimalPlaces);
    onClose(); // 패널 닫기
  };

  return (
    <div className='text-foreground rounded-md'>
      {/* Unit Position */}
      <div className='mb-spacious'>
        <p className='text-label text-muted-foreground mb-tight'>
          Unit Position
        </p>
        <div className='grid grid-cols-2 gap-tight'>
          {['front', 'back'].map((pos) => (
            <button
              key={pos}
              onClick={() => setUnitPosition(pos as 'front' | 'back')}
              className={`py-component rounded-md border text-label transition ${
                unitPosition === pos
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface text-foreground border-border hover:bg-muted/10'
              }`}
            >
              {pos === 'front' ? '$100' : '100$'}
            </button>
          ))}
        </div>
      </div>

      {/* Decimal Places */}
      <div className='mb-spacious'>
        <p className='text-label text-muted-foreground mb-tight'>
          Decimal Places
        </p>
        <div className='grid grid-cols-4 gap-tight'>
          {[0, 1, 2, 3].map((dp) => (
            <button
              key={dp}
              onClick={() => setDecimalPlaces(dp)}
              className={`py-component rounded-md border text-label transition ${
                decimalPlaces === dp
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface text-foreground border-border hover:bg-muted/10'
              }`}
            >
              {`0${dp > 0 ? '.' + '0'.repeat(dp) : ''}`}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className='w-full py-component rounded-md bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 transition'
      >
        Save
      </button>
    </div>
  );
}
