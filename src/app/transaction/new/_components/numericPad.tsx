interface Props {
  value: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
}

export default function NumericPad({ value, onChange, onConfirm }: Props) {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '⌫'];

  const handlePress = (k: string) => {
    if (k === '⌫') {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + k);
    }
  };

  return (
    <div className='mt-auto border-t pt-2 bg-white'>
      <div className='grid grid-cols-3 gap-2 px-4 pb-4'>
        {keys.map((k) => (
          <button
            key={k}
            className='bg-gray-100 py-3 text-xl rounded'
            onClick={() => handlePress(k)}
          >
            {k}
          </button>
        ))}
        <button
          className='col-span-3 bg-red-500 text-white py-3 rounded font-semibold'
          onClick={onConfirm}
        >
          OK
        </button>
      </div>
    </div>
  );
}
