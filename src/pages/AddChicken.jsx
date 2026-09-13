import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { categories, chickenTypes, locations } from "../data/categories"
import { validateProductForm, hasErrors } from "../utils/validation"
import { Save, X, Upload } from "lucide-react"

export const AddChicken = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user, isSeller, isAuthenticated } = useAuth()

  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    description: "",
    price: "",
    unit: "per chicken",
    weight: "",
    weightValue: "",
    stock: "",
    location: "",
    image: "",
    availability: true,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isAuthenticated || !isSeller) {
      navigate("/login")
    }

    if (isEdit) {
      const { products } = require("../data/products")
      const product = products.find((p) => p.id === Number(id))
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          type: product.type,
          description: product.description,
          price: product.price,
          unit: product.unit,
          weight: product.weight,
          weightValue: product.weightValue,
          stock: product.stock,
          location: product.location,
          image: product.image,
          availability: product.available,
        })
      }
    }
  }, [isAuthenticated, isSeller, navigate, id])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateProductForm(formData)
    setErrors(validationErrors)

    if (hasErrors(validationErrors)) return

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      weightValue: Number(formData.weightValue || 0),
      available: formData.availability,
      sellerId: user.sellerId || user.id,
      sellerName: user.name || "Unknown Seller",
    }

    if (isEdit) {
      alert(`Product "${formData.name}" updated! (Demo)`)
    } else {
      alert(
        `Product "${formData.name}" added successfully! (Demo)\nNote: Changes are saved to localStorage only.`
      )
    }
    navigate("/seller/products")
  }

  if (!isAuthenticated || !isSeller) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {isEdit ? "Edit Chicken" : "Add Chicken"}
        </h1>
        <button
          onClick={() => navigate("/seller/products")}
          className="rounded-md border border-border bg-surface-alt px-3 py-1.5 text-sm text-text-secondary hover:bg-surface"
        >
          <X className="h-4 w-4 inline mr-1" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Product Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`input ${errors.name ? "border-error" : ""}`}
                placeholder="E.g. Fresh Broiler Chicken"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={`input ${errors.category ? "border-error" : ""}`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-error">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Chicken Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="input"
              >
                <option value="">Select Type</option>
                {chickenTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Price (RWF) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={`input ${errors.price ? "border-error" : ""}`}
                placeholder="8500"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-error">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Selling Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className="input"
              >
                <option value="per chicken">Per Chicken</option>
                <option value="per kg">Per Kg</option>
                <option value="per pack">Per Pack</option>
                <option value="per meal">Per Meal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Weight
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className={`input ${errors.weight ? "border-error" : ""}`}
                placeholder="E.g. 1.5 kg"
              />
              {errors.weight && (
                <p className="mt-1 text-xs text-error">{errors.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Weight Value (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.weightValue}
                onChange={(e) =>
                  handleChange("weightValue", e.target.value)
                }
                className="input"
                placeholder="1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                className={`input ${errors.stock ? "border-error" : ""}`}
                placeholder="25"
              />
              {errors.stock && (
                <p className="mt-1 text-xs text-error">{errors.stock}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Location *
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={`input ${errors.location ? "border-error" : ""}`}
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-xs text-error">{errors.location}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">
                Product Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className={`input ${errors.image ? "border-error" : ""}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-error">{errors.image}</p>
              )}
              <p className="mt-1 text-xs text-text-tertiary">
                In production, this would be an image upload component.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                className={`input min-h-[100px] resize-y ${
                  errors.description ? "border-error" : ""
                }`}
                placeholder="Describe your chicken product..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-error">{errors.description}</p>
              )}
            </div>

            <div className="flex items-end gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="availability"
                  checked={formData.availability}
                  onChange={(e) =>
                    handleChange("availability", e.target.checked)
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="availability"
                  className="text-sm font-medium text-text"
                >
                  Available for sale
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/seller/products")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-accent"
          >
            {isEdit ? "Update Chicken" : "Publish Chicken"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddChicken
