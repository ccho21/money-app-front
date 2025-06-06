'use client';

interface BackupResetPanelProps {
  onClose: () => void;
}

export default function BackupResetPanel({ onClose }: BackupResetPanelProps) {
  const handleSave = () => {
    // 실제 백업/초기화 로직은 추후 추가 가능
    onClose(); // 패널 닫기
  };

  return (
    <div className='p-component bg-card text-foreground rounded-md shadow-sm'>
      <p className='text-label text-muted-foreground mb-spacious'>
        백업 / 복원 / 초기화 설정 패널입니다.
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
