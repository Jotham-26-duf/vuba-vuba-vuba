import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import StatusBadge from "../components/StatusBadge"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "../components/FormatDate"

export const SellerOrders = () => {
  const { user, isSeller, isAuthenticated } = useAuth()
  const { getOrdersBySeller, updateOrderStatus } = useOrders()

  if (!isAuthenticated || !isSeller) {
    return null
  }

  const sellerId = user.sellerId || user.id
  const sellerOrders = getOrdersBySeller(sellerId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2x font-bold text-text">Seller Orders</h1>
        <Link
          to="/seller/dashboard"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {sellerOrders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary">No orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-alt">
                <th className="text-left py-3 px-4 font-medium text-text">
                  Order
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Total
                </th>
                <th className="py-3 px-4 font-medium text-text">
                  Status
                </th>
                <th className="py-3 px-4 font-medium text-text">
                  Date
                </th>
                <th className="text-right py-3 px-4 font-medium text-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs font-semibold text-text">
                      {order.id}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/seller/order/${order.id}`}
                      className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-surface-alt"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SellerOrders
