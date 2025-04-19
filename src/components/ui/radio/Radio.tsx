interface RadioProps {
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
}

export default function Radio({ label, name, value, checked, onChange }: RadioProps) {
  return (
    <label className="flex items-center space-x-2 text-sm">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-radio text-primary"
      />
      <span>{label}</span>
    </label>
  )
}