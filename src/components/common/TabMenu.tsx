'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabMenuProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}

export default function TabMenu({ tabs, active, onChange }: TabMenuProps) {
  return (
    <div className='flex border-b border-gray-200'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2 text-sm font-medium ${
            active === tab.key
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
