import { ShoppingCart } from "lucide-react"

export const EmptyState = ({
  title = "Nothing here yet",
  description = "There's nothing to display at the moment.",
  icon: Icon = ShoppingCart,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-surface p-8 text-center">
      <div className="rounded-full bg-surface-alt p-4">
        <Icon className="h-8 w-8 text-text-tertiary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
