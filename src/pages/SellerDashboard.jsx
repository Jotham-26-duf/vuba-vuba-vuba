import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import { products } from "../data/products"
import { sellers } from "../data/sellers"
import { TrendingUp, Package, ClipboardList, DollarSign, Users, AlertCircle } from "lucide-react"
import { formatCurrency } from "../utils/currency"
import StatusBadge from "../components/StatusBadge"

export const SellerDashboard = () => {
  const { user, isAuthenticated, isSeller } = useAuth()
  const { getOrdersBySeller } = useOrders()

  if (!isAuthenticated || !isSeller) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-error" />
          <h2 className="mt-4 text-2xl font-bold text-text">
            Seller Access Required
          </h2>
          <p className="mt-2 text-text-secondary">
            You need to be logged in as a seller to access the dashboard.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Login as Seller
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const sellerId = user.sellerId || user.id
  const sellerOrders = getOrdersBySeller(sellerId)
  const sellerProducts = products.filter((p) => p.sellerId === sellerId)

  const stats = {
    totalSales: sellerOrders.reduce((sum, o) => sum + o.total, 0),
    totalOrders: sellerOrders.length,
    activeProducts: sellerProducts.filter((p) => p.available).length,
    pendingOrders: sellerOrders.filter((o) => o.status === "pending").length,
    inStock: sellerProducts.reduce((sum, p) => sum + p.stock, 0),
  }

  const pendingOrders = sellerOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  )

  const recentOrders = sellerOrders.slice(0, 5)
  const lowStockProducts = sellerProducts.filter((p) => p.stock <= 5)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2x font-bold text-text">Seller Dashboard</h1>
          <p className="text-text-secondary">
            {(user && (user.name || user.sellerName || sellers.find(s => s.id === sellerId)?.name)) || "Seller"}
          </p>
        </div>
        <Link
          to="/seller/add-chicken"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          + Add Chicken
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <DollarSign className="mx-auto h-5 w-5 text-green-600 mb-1" />
          <div className="text-2xl font-bold text-text">
            {formatCurrency(stats.totalSales)}
          </div>
          <p className="text-xs text-text-secondary">Total Sales</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <ClipboardList className="mx-auto h-5 w-5 text-blue-600 mb-1" />
          <div className="text-2xl font-bold text-text">{stats.totalOrders}</div>
          <p className="text-xs text-text-secondary">Total Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Package className="mx-auto h-5 w-5 text-primary mb-1" />
          <div className="text-2xl font-bold text-text">
            {stats.activeProducts}
          </div>
          <p className="text-xs text-text-secondary">Active Products</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <AlertCircle className="mx-auto h-5 w-5 text-amber-600 mb-1" />
          <div className="text-2xl font-bold text-text">
            {stats.pendingOrders}
          </div>
          <p className="text-xs text-text-secondary">Pending Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Package className="mx-auto h-5 w-5 text-purple-600 mb-1" />
          <div className="text-2xl font-bold text-text">
            {stats.inStock}
          </div>
          <p className="text-xs text-text-secondary">Stock Qty</p>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>Low Stock Alert:</strong>{" "}
            {lowStockProducts.map((p) => p.name).join(", ")}
          </p>
        </div>
      )}

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Recent Orders</h2>
          <Link
            to="/seller/orders"
            className="text-sm text-primary hover:underline"
          >
            View all orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-text-secondary">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div>
                  <p className="font-mono text-sm font-medium text-text">
                    {order.id}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {order.customerName} • {formatCurrency(order.total)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <Link
                    to={`/seller/order/${order.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">
              Low Stock Products
            </h2>
            <Link
              to="/seller/products"
              className="text-sm text-primary hover:underline"
            >
              Manage Products →
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-text-secondary">All products in stock!</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                >
                  <div>
                    <p className="font-medium text-text">{product.name}</p>
                    <p className="text-sm text-text-secondary">
                      Stock: {product.stock}
                    </p>
                  </div>
                  <Link
                    to={`/seller/edit-chicken/${product.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Update
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">
              Quick Actions
            </h2>
          </div>
          <div className="space-y-2">
            <Link
              to="/seller/add-chicken"
              className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm font-medium text-text hover:bg-surface-alt"
            >
              Add New Product
            </Link>
            <Link
              to="/seller/orders"
              className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm font-medium text-text hover:bg-surface-alt"
            >
              Manage Orders
            </Link>
            <Link
              to="/seller/sales"
              className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm font-medium text-text hover:bg-surface-alt"
            >
              View Sales Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard
