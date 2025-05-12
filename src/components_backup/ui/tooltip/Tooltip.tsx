interface TooltipProps {
  content: string
  children: React.ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black px-2 py-1 rounded z-10">
        {content}
      </div>
    </div>
  )
}