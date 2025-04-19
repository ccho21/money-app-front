interface AvatarProps {
  name?: string
  size?: number
}

export default function Avatar({ name = '?', size = 40 }: AvatarProps) {
  const initials = name.charAt(0).toUpperCase()
  return (
    <div
      className="bg-gray-300 text-white flex items-center justify-center rounded-full"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {initials}
    </div>
  )
}