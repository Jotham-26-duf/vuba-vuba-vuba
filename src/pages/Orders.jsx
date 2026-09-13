import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Package } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "../components/FormatDate"
import EmptyState from "../components/EmptyState"
import StatusBadge from "../components/StatusBadge"

export const Orders = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { getOrdersByUser } = useOrders()
  const [filterStatus, setFilterStatus] = useState("all")

  let userOrders = []
  if (isAuthenticated && user) {
    userOrders = getOrdersByUser(user.id)
  }

  const filteredOrders = filterStatus === "all"
    ? userOrders
    : userOrders.filter((order) => order.status === filterStatus)

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready for Delivery" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ]

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-text-tertiary" />
          <h2 className="mt-4 text-2xl font-bold text-text">
            Login to View Your Orders
          </h2>
          <p className="mt-2 text-text-secondary">
            You need to be logged in to see your order history.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">My Orders</h1>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                filterStatus === status.value
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-secondary hover:bg-surface"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="You haven't placed any orders yet."
          actionLabel="Start Shopping"
          onAction={() => navigate("/shop")}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm font-semibold text-text">
                    {order.id}
                  </span>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
                <span>{formatDate(order.createdAt)}</span>
                <span>{formatCurrency(order.total)}</span>
              </div>

              <div className="flex items-center gap-3">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.productId}
                    className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <span className="text-xs text-text-tertiary">
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-3 flex justify-between">
                <Link
                  to={`/order/${order.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Order
                </Link>
                {order.status === "delivered" && (
                  <Link
                    to={`/order/${order.id}#rate`}
                    className="text-sm font-medium text-text-secondary hover:text-text"
                  >
                    Rate Order
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
