import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Check,
  X,
  Clock,
} from "lucide-react"
import StatusBadge from "../components/StatusBadge"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "../components/FormatDate"

export const SellerOrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isSeller, isAuthenticated } = useAuth()
  const { getOrderById, updateOrderStatus } = useOrders()
  const order = getOrderById(id)

  if (!isAuthenticated || !isSeller) {
    navigate("/login")
    return null
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Order Not Found</h2>
        </div>
      </div>
    )
  }

  const statusSteps = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready for Delivery" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
  ]

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus, `Status updated to ${newStatus}`)
  }

  const canCancel = ["pending", "confirmed"].includes(order.status)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2x font-bold text-text">
          Order {order.id}
        </h1>
        <Link
          to="/seller/orders"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">
                Order Status
              </h2>
              <StatusBadge status={order.status} />
            </div>

            <div className="mb-4 space-y-1">
              {statusSteps.map((step) => {
                const isCompleted =
                  statusSteps.findIndex((s) => s.value === order.status) >=
                  statusSteps.findIndex((s) => s.value === step.value)
                const isCurrent = order.status === step.value
                const canUpdate =
                  ["pending", "confirmed", "preparing", "ready"].includes(
                    order.status
                  )

                return (
                  <button
                    key={step.value}
                    onClick={() => canUpdate && handleStatusChange(step.value)}
                    disabled={!canUpdate || isCompleted}
                    className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors ${
                      isCurrent
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    } ${
                      !canUpdate || (isCompleted && !isCurrent)
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isCurrent
                            ? "bg-primary text-white"
                            : isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-surface-alt text-text-tertiary"
                        }`}
                      >
                        {isCurrent && <Clock className="h-3 w-3 animate-pulse" />}
                        {isCompleted && !isCurrent && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isCurrent ? "text-primary" : "text-text"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <StatusBadge status={step.value} />
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handleStatusChange("cancelled")}
              hidden={!canCancel}
              className="w-full rounded-md bg-error px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Cancel Order
            </button>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text">{item.name}</p>
                    <p className="text-sm text-text-secondary">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                  <span className="font-medium text-text">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery Fee</span>
                <span className="text-text">
                  {formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                <span className="text-text">TOTAL</span>
                <span className="text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-tertiary" />
                <p className="text-text">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-tertiary" />
                <p className="text-text">{order.customerPhone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-text-tertiary" />
                <p className="text-text">{order.customerEmail}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Delivery Address
            </h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-text-tertiary mt-0.5" />
                <div className="text-text-secondary">
                  <p>{order.deliveryAddress.province}</p>
                  <p>{order.deliveryAddress.district}</p>
                  <p>{order.deliveryAddress.sector}</p>
                  <p>{order.deliveryAddress.cell}</p>
                  <p>{order.deliveryAddress.street}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Timeline
            </h2>
            <div className="space-y-3">
              {order.tracking &&
                order.tracking.map((track, idx) => (
                  <div key={idx} className="relative pb-3 last:pb-0">
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                      <div>
                        <p className="text-sm font-medium text-text">
                          {track.status.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {track.note}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {formatDate(track.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerOrderDetails
