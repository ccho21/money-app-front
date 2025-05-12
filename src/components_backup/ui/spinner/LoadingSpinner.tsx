export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
    </div>
  )
}