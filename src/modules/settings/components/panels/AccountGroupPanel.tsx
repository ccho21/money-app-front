'use client';
interface AccountGroupPanelProps {
  onClose: () => void;
}

export default function AccountGroupPanel({ onClose }: AccountGroupPanelProps) {
  const handleSave = () => {
    onClose(); // 패널 닫기
  };
  return (
    <div className='p-component bg-card text-foreground rounded-md'>
      <p className='text-label text-muted-foreground'>
        계좌 그룹 설정 (Account Group Panel)
      </p>

      <button
        onClick={handleSave}
        className='w-full py-component rounded-md bg-primary text-primary-foreground text-label font-semibold hover:opacity-90 transition'
      >
        Save
      </button>
    </div>
  );
}
