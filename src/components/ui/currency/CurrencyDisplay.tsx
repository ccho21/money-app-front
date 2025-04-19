interface CurrencyDisplayProps {
  amount: number
  currency?: string
  className?: string
}

export default function CurrencyDisplay({ amount, currency = '₩', className }: CurrencyDisplayProps) {
  return (
    <span className={`font-medium ${className}`}>
      {currency}{amount.toLocaleString()}
    </span>
  )
}