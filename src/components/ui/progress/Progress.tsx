interface ProgressProps {
  percent: number
}

export default function Progress({ percent }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-blue-500 transition-all" style={{ width: `${percent}%` }} />
    </div>
  )
}