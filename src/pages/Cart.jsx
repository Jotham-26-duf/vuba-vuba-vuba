import { Link, useNavigate } from "react-router-dom"
import { ShoppingBag, Trash2 } from "lucide-react"
import CartItem from "../components/CartItem"
import { useCart } from "../context/CartContext"
import { calculateDeliveryFee } from "../utils/delivery"
import { formatCurrency } from "../utils/currency"
import EmptyState from "../components/EmptyState"

export const Cart = () => {
  const navigate = useNavigate()
  const { items, subtotal, itemCount, clearCart } = useCart()

  const delivery = calculateDeliveryFee({
    district: "Gasabo",
  })

  const total = subtotal + delivery.amount

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          title="Your cart is empty"
          description="Find some fresh chicken to get started."
          actionLabel="Browse Chicken"
          onAction={() => navigate("/shop")}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text">Your Cart</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-1 rounded-lg border border-border bg-card">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
              className="text-sm text-error hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery Fee</span>
                <span className="font-medium text-text">
                  {formatCurrency(delivery.amount)}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax</span>
                  <span className="font-medium text-text">
                    {formatCurrency(0)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-text">TOTAL</span>
                  <span className="font-bold text-primary text-xl">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
