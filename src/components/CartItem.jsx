import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "../context/CartContext"
import { formatCurrency } from "../utils/currency"

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    const maxStock = item.stock || 99
    if (newQuantity > maxStock) return
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border last:border-0">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/64"
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text line-clamp-1">{item.name}</h4>
        <p className="text-sm text-text-secondary">{item.weight}</p>
        <p className="text-sm text-text-secondary">{item.sellerName}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium text-text">
            {formatCurrency(item.price)}
          </span>
          <span className="text-xs text-text-tertiary">
            / {item.unit || "each"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="rounded-md border border-border p-1 text-text-secondary hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3 w-3" />
        </button>

        <span className="w-6 text-center text-sm font-medium text-text">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= (item.stock || 99)}
          className="rounded-md border border-border p-1 text-text-secondary hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="rounded-md p-1 text-text-tertiary hover:bg-surface-alt hover:text-error"
        aria-label="Remove from cart"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default CartItem
