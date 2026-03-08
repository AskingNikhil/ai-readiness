export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-gray-500 text-sm">Claude is analyzing your resume...</p>
      <p className="text-gray-400 text-xs mt-1">This usually takes 10–20 seconds</p>
    </div>
  )
}
