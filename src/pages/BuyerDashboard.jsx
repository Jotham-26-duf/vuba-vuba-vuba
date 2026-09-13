import { useState } from "react"
import { Link } from "react-router-dom"
import { TrendingUp, Package, ClipboardList, Heart, User, Edit } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"
import OrderCard from "../components/OrderCard"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"
import { formatDate } from "../components/FormatDate"

export const BuyerDashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const { getOrdersByUser } = useOrders()
  const { favoriteProducts } = useFavorites()

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-text-tertiary" />
          <h2 className="mt-4 text-2xl font-bold text-text">
            Please Login
          </h2>
          <p className="mt-2 text-text-secondary">
            You need to login to view your dashboard.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userOrders = user ? getOrdersByUser(user.id) : []

  const stats = {
    total: userOrders.length,
    pending: userOrders.filter((o) => o.status === "pending").length,
    delivered: userOrders.filter(
      (o) => o.status === "delivered" || o.status === "completed"
    ).length,
    favorites: favoriteProducts.length,
  }

  const recentOrders = userOrders.slice(0, 3)

  const recentFavorites = favoriteProducts.slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Welcome back, {user?.name}
          </h1>
          <p className="text-text-secondary">
            This is a demo dashboard. Real data requires backend integration.
          </p>
        </div>
        <Link
          to="/profile"
          className="rounded-md border border-border bg-surface-alt px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface"
        >
          <User className="h-4 w-4 inline mr-1" />
          Edit Profile
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-text">{stats.total}</span>
          </div>
          <p className="text-sm text-text-secondary">Total Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-600" />
            <span className="text-2xl font-bold text-text">{stats.pending}</span>
          </div>
          <p className="text-sm text-text-secondary">Pending Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-text">{stats.delivered}</span>
          </div>
          <p className="text-sm text-text-secondary">Delivered Orders</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-text">{stats.favorites}</span>
          </div>
          <p className="text-sm text-text-secondary">Favorites</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Recent Orders</h2>
          <Link
            to="/orders"
            className="text-sm text-primary hover:underline"
          >
            View all orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center text-text-secondary">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-text">
                    {order.id}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-2"
                    >
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded border border-border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-text-secondary line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-text-tertiary">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm font-medium text-text">
                    {formatCurrency(order.total)}
                  </span>
                  <Link
                    to={`/order/${order.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Your Favorites</h2>
          <Link
            to="/favorites"
            className="text-sm text-primary hover:underline"
          >
            View all favorites →
          </Link>
        </div>

        {recentFavorites.length === 0 ? (
          <div className="py-8 text-center text-text-secondary">
            You haven't saved any favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {recentFavorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compact={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyerDashboard
