import { X } from "lucide-react"

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-xl bg-white shadow-xl animate-in fade-in-0 zoom-in-95`}
      >
        {title && (
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-text">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-md p-1 text-text-secondary hover:bg-surface-alt hover:text-text"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
