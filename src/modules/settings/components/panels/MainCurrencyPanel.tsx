'use client';

export default function MainCurrencyPanel() {
  return (
    <div className='p-component bg-card text-foreground rounded-md'>
      <p className='text-caption text-muted-foreground'>
        기본 통화 (Main Currency) 설정 패널입니다. // unit position - $ 사인
        앞에다 붙일건지 뒤에 붙일건지, // decimal point - 0.00 몇까지 할건지
        이런거
      </p>
    </div>
  );
}
