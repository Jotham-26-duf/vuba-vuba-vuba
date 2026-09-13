import { ChevronDown, Filter, X, Star, Package } from "lucide-react"
import { categories } from "../data/categories"
import { locations } from "../data/categories"

export const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen = false,
  onClose,
}) => {
  const priceRanges = [
    { label: "Under RWF 5,000", value: "under-5000", min: 0, max: 5000 },
    { label: "RWF 5,000 – 10,000", value: "5000-10000", min: 5000, max: 10000 },
    { label: "RWF 10,000 – 20,000", value: "10000-20000", min: 10000, max: 20000 },
    { label: "Above RWF 20,000", value: "above-20000", min: 20000, max: Infinity },
  ]

  const weightRanges = [
    { label: "Under 1 kg", value: "under-1kg", max: 1 },
    { label: "1 – 1.5 kg", value: "1-1.5kg", min: 1, max: 1.5 },
    { label: "1.5 – 2 kg", value: "1.5-2kg", min: 1.5, max: 2 },
    { label: "Above 2 kg", value: "above-2kg", min: 2 },
  ]

  const toggleCategory = (catId) => {
    const current = filters.category || []
    const updated = current.includes(catId)
      ? current.filter((c) => c !== catId)
      : [...current, catId]
    onFilterChange({ ...filters, category: updated })
  }

  const togglePrice = (priceValue) => {
    const current = filters.price || []
    const updated = current.includes(priceValue)
      ? current.filter((p) => p !== priceValue)
      : [...current, priceValue]
    onFilterChange({ ...filters, price: updated })
  }

  const toggleWeight = (weightValue) => {
    const current = filters.weight || []
    const updated = current.includes(weightValue)
      ? current.filter((w) => w !== weightValue)
      : [...current, weightValue]
    onFilterChange({ ...filters, weight: updated })
  }

  const toggleLocation = (loc) => {
    const current = filters.location || []
    const updated = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc]
    onFilterChange({ ...filters, location: updated })
  }

  const toggleAvailability = (value) => {
    const current = filters.availability || []
    const updated = current.includes(value)
      ? current.filter((a) => a !== value)
      : [...current, value]
    onFilterChange({ ...filters, availability: updated })
  }

  const ratingOptions = [5, 4, 3, 2, 1]

  const handleRatingClick = (ratingValue) => {
    onFilterChange({ ...filters, minRating: ratingValue })
  }

  const hasActiveFilters =
    filters.category?.length > 0 ||
    filters.price?.length > 0 ||
    filters.weight?.length > 0 ||
    filters.location?.length > 0 ||
    filters.availability?.length > 0 ||
    filters.minRating

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-text">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category?.includes(cat.id) || false}
                onChange={() => toggleCategory(cat.id)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text">{cat.name}</span>
              <span className="text-xs text-text-secondary">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.price?.includes(range.value) || false}
                onChange={() => togglePrice(range.value)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Weight</h4>
        <div className="space-y-2">
          {weightRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.weight?.includes(range.value) || false}
                onChange={() => toggleWeight(range.value)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Location</h4>
        <div className="space-y-2">
          {locations.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.location?.includes(loc) || false}
                onChange={() => toggleLocation(loc)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availability?.includes("in_stock") || false}
              onChange={() => toggleAvailability("in_stock")}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availability?.includes("out_of_stock") || false}
              onChange={() => toggleAvailability("out_of_stock")}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text">Out of Stock</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Minimum Rating</h4>
        <div className="flex items-center gap-1">
          {ratingOptions.map((rate) => (
            <button
              key={rate}
              onClick={() => handleRatingClick(rate)}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors ${
                (filters.minRating || 0) >= rate
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-secondary hover:bg-primary hover:text-white"
              }`}
            >
              <Star className="h-3 w-3" />
              {rate}+
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const SortSelect = ({ sortBy, onSortChange }) => {
  const options = [
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
  ]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterPanel
