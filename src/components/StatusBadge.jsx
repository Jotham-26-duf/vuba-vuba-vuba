export const StatusBadge = ({ status, variant = "default" }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    preparing: {
      label: "Preparing",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    ready: {
      label: "Ready for Delivery",
      className: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
    },
    paid: {
      label: "Paid",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    failed: {
      label: "Failed",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  }

  const config = statusConfig[status] || {
    label: status?.replace(/_/g, " ") || status,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {status === "out_for_delivery" && (
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
      )}
      {status === "delivered" && (
        <svg
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {config.label}
    </span>
  )
}
