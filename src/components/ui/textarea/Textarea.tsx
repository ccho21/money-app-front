interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, ...props }: TextareaProps) {
  return (
    <div className='space-y-1'>
      {label && (
        <label className='text-sm font-medium text-gray-700'>{label}</label>
      )}
      <textarea
        {...props}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
