import { clsx } from 'clsx'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  fullWidth?: boolean
}

export default function Button({ children, onClick, variant = 'primary', size = 'md' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-gray-300 text-gray-700',
    ghost: 'bg-transparent text-gray-500'
  }
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3'
  }

  return (
    <button onClick={onClick} className={clsx(base, variants[variant], sizes[size])}>
      {children}
    </button>
  )
}