import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import { formatCurrency } from "../utils/currency"
import { TrendingUp, BarChart3, Package, DollarSign } from "lucide-react"

export const Sales = () => {
  const { user, isSeller, isAuthenticated } = useAuth()
  const { getOrdersBySeller } = useOrders()

  if (!isAuthenticated || !isSeller) {
    return null
  }

  const sellerId = user.sellerId || user.id
  const sellerOrders = getOrdersBySeller(sellerId)

  const totalRevenue = sellerOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0)

  const totalOrders = sellerOrders.length
  const deliveredOrders = sellerOrders.filter(
    (o) => o.status === "delivered"
  ).length
  const pendingOrders = sellerOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length

  const monthlyData = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 180000 },
    { month: "Mar", revenue: 220000 },
    { month: "Apr", revenue: 250000 },
    { month: "May", revenue: 320000 },
    { month: "Jun", revenue: 280000 },
    { month: "Jul", revenue: totalRevenue || 350000 },
  ]

  const topProducts = [
    { name: "Fresh Broiler Chicken", revenue: 85000, quantity: 10 },
    { name: "Fried Chicken Meal", revenue: 75000, quantity: 6 },
    { name: "Chicken Breast Fillets", revenue: 47500, quantity: 5 },
    { name: "Grilled Chicken Platter", revenue: 37000, quantity: 2 },
    { name: "Roasted Chicken", revenue: 22000, quantity: 1 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2x font-bold text-text">Sales Analytics</h1>
        <p className="text-sm text-text-secondary">
          Demo analytics — real data requires backend integration.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <DollarSign className="mx-auto h-5 w-5 text-green-600 mb-1" />
          <div className="text-2xl font-bold text-text">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-text-secondary">Total Revenue</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Package className="mx-auto h-5 w-5 text-primary mb-1" />
          <div className="text-2xl font-bold text-text">{totalOrders}</div>
          <p className="text-xs text-text-secondary">Total Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <TrendingUp className="mx-auto h-5 w-5 text-blue-600 mb-1" />
          <div className="text-2xl font-bold text-text">{deliveredOrders}</div>
          <p className="text-xs text-text-secondary">Completed</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <BarChart3 className="mx-auto h-5 w-5 text-amber-600 mb-1" />
          <div className="text-2xl font-bold text-text">{pendingOrders}</div>
          <p className="text-xs text-text-secondary">Pending</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-text mb-4">
          Monthly Revenue
        </h2>
        <div className="h-64">
          <div className="flex h-full items-end justify-between gap-2 border-b border-border pl-2">
            {monthlyData.map((data, idx) => {
              const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))
              const height = (data.revenue / maxRevenue) * 100
              return (
                <div
                  key={data.month}
                  className="flex flex-1 flex-col items-center"
                >
                  <div className="w-full">
                    <div
                      className="mx-auto rounded-t bg-primary transition-all"
                      style={{ height: `${height}%`, minHeight: "20px" }}
                      title={`${data.month}: ${formatCurrency(data.revenue)}`}
                    />
                  </div>
                  <span className="mt-2 text-xs text-text-secondary">
                    {data.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-text mb-4">
          Best-Selling Products
        </h2>
        <div className="space-y-3">
          {topProducts.map((product, idx) => (
            <div
              key={product.name}
              className="flex items-center gap-4 rounded-md border border-border p-3"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-text">{product.name}</p>
                <p className="text-sm text-text-secondary">
                  {product.quantity} sold
                </p>
              </div>
              <span className="font-medium text-text">
                {formatCurrency(product.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sales
