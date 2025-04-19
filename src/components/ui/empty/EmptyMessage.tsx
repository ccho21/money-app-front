interface EmptyMessageProps {
  message?: string
}

export default function EmptyMessage({ message = "No data available." }: EmptyMessageProps) {
  return (
    <div className="text-center text-sm text-gray-400 py-8">
      {message}
    </div>
  )
}