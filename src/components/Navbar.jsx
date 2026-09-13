import { NavLink, Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useFavorites } from "../context/FavoritesContext"
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  BarChart3,
  Package,
  Truck,
  LogOut,
  Store,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react"
import { useState, useEffect } from "react"

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { itemCount } = useCart()
  const { user, isAuthenticated, isSeller, logout } = useAuth()
  const { count: favCount } = useFavorites()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const customerLinks = [
    { name: "Home", path: "/", icon: null },
    { name: "Shop Chicken", path: "/shop", icon: ShoppingCart },
    { name: "Categories", path: "/categories", icon: Package },
    { name: "Sellers", path: "/sellers", icon: Store },
    { name: "How It Works", path: "/how-it-works", icon: Truck },
    { name: "About", path: "/about", icon: null },
    { name: "Contact", path: "/contact", icon: null },
  ]

  const sellerLinks = [
    { name: "Dashboard", path: "/seller/dashboard", icon: LayoutDashboard },
    { name: "My Products", path: "/seller/products", icon: Package },
    { name: "Orders", path: "/seller/orders", icon: ClipboardList },
    { name: "Sales", path: "/seller/sales", icon: BarChart3 },
  ]

  const authenticatedLinks = [
    { name: "My Orders", path: "/orders", icon: ClipboardList },
    { name: "Favorites", path: "/favorites", icon: Heart },
    { name: "Profile", path: "/profile", icon: User },
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <nav
      className={`sticky top-0 z-40 border-b bg-surface transition-all ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <span className="text-3xl">🐔</span>
            <span>Vuba Vuba Chicken</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {customerLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-surface-alt hover:text-text"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/search")}
              className="rounded-md p-2 text-text-secondary hover:bg-surface-alt hover:text-text"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/cart"
              className="relative rounded-md p-2 text-text-secondary hover:bg-surface-alt hover:text-text"
              aria-label="View cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  className="relative rounded-md p-2 text-text-secondary hover:bg-surface-alt hover:text-text"
                  aria-label="View favorites"
                >
                  <Heart className="h-5 w-5" />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {favCount}
                    </span>
                  )}
                </Link>

                {isSeller && (
                  <Link
                    to="/seller/dashboard"
                    className="rounded-md p-2 text-text-secondary hover:bg-surface-alt hover:text-text"
                    aria-label="Seller dashboard"
                  >
                    <Store className="h-5 w-5" />
                  </Link>
                )}
              </>
            )}

            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <img
                    src={user?.avatar || "https://via.placeholder.com/40"}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <button
                    onClick={handleLogout}
                    className="rounded-md p-2 text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text"
                  >
                    <LogOut className="h-4 w-4 inline mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden rounded-md p-2 text-text-secondary hover:bg-surface-alt hover:text-text"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {(isSeller ? [...sellerLinks, ...customerLinks] : [...authenticatedLinks, ...customerLinks])
              .map((link) => {
                const Icon = link.icon
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-text-secondary hover:bg-surface-alt hover:text-text"
                      }`
                    }
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {link.name}
                  </NavLink>
                )
              })}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
            {!isAuthenticated && (
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
