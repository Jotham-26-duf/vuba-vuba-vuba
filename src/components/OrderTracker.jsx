import { formatDate } from "./FormatDate"
import StatusBadge from "./StatusBadge"

export const OrderTracker = ({ order }) => {
  if (!order) {
    return (
      <div className="py-8 text-center text-text-secondary">
        Loading tracking information...
      </div>
    )
  }

  const statusOrder = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "out_for_delivery",
    "delivered",
  ]

  const currentIndex = statusOrder.indexOf(order.status)

  const steps = [
    { key: "pending", label: "Order Placed" },
    { key: "confirmed", label: "Order Confirmed" },
    { key: "preparing", label: "Preparing Chicken" },
    { key: "ready", label: "Ready for Delivery" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ]

  return (
    <div className="w-full">
      {order.status === "cancelled" ? (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-center">
          <StatusBadge status="cancelled" />
          <p className="mt-2 text-sm text-red-800">
            This order has been cancelled.
          </p>
          {order.tracking && order.tracking.length > 0 && (
            <p className="mt-1 text-xs text-red-600">
              Reason: {order.tracking[0].note || "No reason provided"}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 text-center">
            <StatusBadge status={order.status} />
            <p className="mt-1 text-sm text-text-secondary">
              Estimated delivery: {order.estimatedDelivery}
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = index < currentIndex
              const isCurrent = index === currentIndex
              const isCancelled =
                order.status === "cancelled" && index > currentIndex

              return (
                <div
                  key={step.key}
                  className={`flex items-start gap-3 ${
                    isCancelled ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? "border-green-600 bg-green-600 text-white"
                          : isCurrent
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-surface"
                      }`}
                    >
                      {isCompleted && (
                        <svg
                          className="h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isCurrent && !isCancelled && (
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 ${
                          isCompleted ? "h-6 bg-green-600" : "h-6 bg-border"
                        } ${isCurrent ? "bg-primary" : ""}`}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <p
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-green-800"
                          : isCurrent
                          ? "text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {step.label}
                    </p>
                    {order.tracking
                      ?.filter((t) => t.status === step.key)
                      .map((track) => (
                        <p
                          key={track.timestamp}
                          className="text-xs text-text-tertiary"
                        >
                          {formatDate(track.timestamp)} — {track.note}
                        </p>
                      ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="mt-6 rounded-md bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Real-time GPS delivery tracking requires backend
          infrastructure. This tracker shows simulated status updates.
        </p>
      </div>
    </div>
  )
}

export default OrderTracker
