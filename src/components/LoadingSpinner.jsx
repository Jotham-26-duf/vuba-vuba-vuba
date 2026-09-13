export const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-3 border-primary border-t-transparent`}
      />
      {text && <p className="text-sm text-text-secondary">{text}</p>}
    </div>
  )
}
