import { Link, useNavigate } from "react-router-dom"
import { CheckCircle, Package, MapPin, Calendar } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "../components/FormatDate"

export const OrderConfirmation = ({ orderId }) => {
  const navigate = useNavigate()
  const { getOrderById } = useOrders()
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Order Not Found</h2>
          <p className="mt-2 text-text-secondary">
            The order you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-text">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-text-secondary">
            {order.isDemo && "Demo Order — No real payment processed."}
            Thank you for your order.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-text-secondary">Order Number</p>
              <p className="font-mono text-lg font-bold text-text">
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Payment</p>
              <p className="font-medium text-text">{order.paymentLabel}</p>
              <span className="text-xs text-green-600">
                {order.paymentStatus === "paid"
                  ? "✓ Demo Confirmed"
                  : "Pending (Demo)"}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-text-tertiary" />
              <span className="text-text-secondary">
                Placed on {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {order.deliveryAddress.district},{" "}
                {order.deliveryAddress.sector}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-t border-border pt-4">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 py-3 first:pt-0"
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
                    {item.quantity}x • {item.weight}
                  </p>
                </div>
                <span className="font-medium text-text">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Delivery Fee</span>
              <span className="text-text">
                {formatCurrency(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-text">TOTAL</span>
              <span className="text-primary">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/order/${order.id}`}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-dark"
          >
            Track Order
          </Link>
          <Link
            to="/shop"
            className="flex-1 rounded-md border border-border bg-surface px-4 py-2 text-center text-sm font-medium text-text-secondary hover:bg-surface-alt"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
