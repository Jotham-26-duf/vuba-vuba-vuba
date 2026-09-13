import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Edit, Trash2, Plus, Save, X } from "lucide-react"
import { products } from "../data/products"
import { useAuth } from "../context/AuthContext"
import { formatCurrency } from "../utils/currency"

export const SellerProducts = () => {
  const navigate = useNavigate()
  const { user, isSeller, isAuthenticated } = useAuth()
  const [sellerProducts, setSellerProducts] = useState([])

  useEffect(() => {
    if (!isAuthenticated || !isSeller) {
      navigate("/login")
      return
    }
    const sellerId = user.sellerId || user.id
    const filtered = products.filter((p) => p.sellerId === sellerId)
    setSellerProducts(filtered)
  }, [user, isSeller, isAuthenticated, navigate])

  const toggleAvailability = (productId) => {
    setSellerProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, available: !p.available } : p
      )
    )
  }

  const updateStock = (productId, newStock) => {
    setSellerProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    )
  }

  if (!isAuthenticated || !isSeller) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">My Products</h1>
        <Link
          to="/seller/add-chicken"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4 inline mr-1" />
          Add Chicken
        </Link>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-secondary mb-4">No products yet.</p>
          <Link
            to="/seller/add-chicken"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Add Your First Chicken
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-alt">
                <th className="text-left py-3 px-4 font-medium text-text">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Price
                </th>
                <th className="left py-3 px-4 font-medium text-text">
                  Stock
                </th>
                <th className="py-3 px-4 font-medium text-text">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium text-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-border"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border border-border">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-text">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) =>
                        updateStock(
                          product.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 rounded-md border border-border px-2 py-1 text-center text-sm"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleAvailability(product.id)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Link
                        to={`/seller/edit-chicken/${product.id}`}
                        className="rounded-md p-1 text-text-secondary hover:bg-surface-alt hover:text-text"
                        aria-label="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            setSellerProducts((prev) =>
                              prev.filter((p) => p.id !== product.id)
                            )
                          }
                        }}
                        className="rounded-md p-1 text-text-tertiary hover:bg-surface-alt hover:text-error"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => {
            alert("Changes saved! (Demo - localStorage only)")
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default SellerProducts
