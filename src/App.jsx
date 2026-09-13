import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { OrderProvider } from "./context/OrderContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Categories from "./pages/Categories"
import ProductDetails from "./pages/ProductDetails"
import SellerProfile from "./pages/SellerProfile"
import Sellers from "./pages/Sellers"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import OrderTracking from "./pages/OrderTracking"
import Orders from "./pages/Orders"
import Favorites from "./pages/Favorites"
import BuyerDashboard from "./pages/BuyerDashboard"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import HowItWorks from "./pages/HowItWorks"
import Contact from "./pages/Contact"
import Search from "./pages/Search"

import SellerDashboard from "./pages/SellerDashboard"
import SellerProducts from "./pages/SellerProducts"
import AddChicken from "./pages/AddChicken"
import SellerOrders from "./pages/SellerOrders"
import SellerOrderDetails from "./pages/SellerOrderDetails"
import Sales from "./pages/Sales"
import Messages from "./pages/Messages"

const OrderConfirmationWrapper = () => {
  const { id } = useParams()
  return <OrderConfirmation orderId={id} />
}

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const RequireSeller = ({ children }) => {
  const { isAuthenticated, isSeller } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !isSeller) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <FavoritesProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pb-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/seller/:slug" element={<SellerProfile />} />
                    <Route path="/sellers" element={<Sellers />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                      path="/order-confirmation/:id"
                      element={<OrderConfirmationWrapper />}
                    />
                    <Route path="/order/:id" element={<OrderTracking />} />
                    <Route
                      path="/orders"
                      element={
                        <RequireAuth>
                          <Orders />
                        </RequireAuth>
                      }
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/dashboard" element={<BuyerDashboard />} />
                    <Route
                      path="/profile"
                      element={
                        <RequireAuth>
                          <Profile />
                        </RequireAuth>
                      }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route
                      path="/seller/dashboard"
                      element={
                        <RequireSeller>
                          <SellerDashboard />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/products"
                      element={
                        <RequireSeller>
                          <SellerProducts />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/add-chicken"
                      element={
                        <RequireSeller>
                          <AddChicken />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/edit-chicken/:id"
                      element={
                        <RequireSeller>
                          <AddChicken />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/orders"
                      element={
                        <RequireSeller>
                          <SellerOrders />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/order/:id"
                      element={
                        <RequireSeller>
                          <SellerOrderDetails />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/seller/sales"
                      element={
                        <RequireSeller>
                          <Sales />
                        </RequireSeller>
                      }
                    />
                    <Route
                      path="/messages"
                      element={
                        <RequireAuth>
                          <Messages />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/messages/:id"
                      element={
                        <RequireAuth>
                          <Messages />
                        </RequireAuth>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </FavoritesProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
