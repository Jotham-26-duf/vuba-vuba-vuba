import { useState, useMemo } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search as SearchIcon, Filter } from "lucide-react"
import ProductCard from "../components/ProductCard"
import FilterPanel, { SortSelect } from "../components/FilterPanel"
import { products } from "../data/products"

export const Search = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    weight: [],
    location: [],
    availability: [],
    minRating: null,
  })
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const priceRanges = {
    "under-5000": { min: 0, max: 5000 },
    "5000-10000": { min: 5000, max: 10000 },
    "10000-20000": { min: 10000, max: 20000 },
    "above-20000": { min: 20000, max: Infinity },
  }

  const weightRanges = {
    "under-1kg": { max: 1 },
    "1-1.5kg": { min: 1, max: 1.5 },
    "1.5-2kg": { min: 1.5, max: 2 },
    "above-2kg": { min: 2 },
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query) ||
          product.sellerName.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
      )
    }

    if (filters.category && filters.category.length > 0) {
      result = result.filter((product) =>
        filters.category.includes(product.category)
      )
    }

    if (filters.price && filters.price.length > 0) {
      result = result.filter((product) =>
        filters.price.some((p) => {
          const range = priceRanges[p]
          if (!range) return false
          return product.price >= range.min && product.price < range.max
        })
      )
    }

    if (filters.weight && filters.weight.length > 0) {
      result = result.filter((product) =>
        filters.weight.some((w) => {
          const range = weightRanges[w]
          if (!range) return false
          const weight = product.weightValue
          if (range.max !== undefined && range.min !== undefined) {
            return weight >= range.min && weight < range.max
          }
          if (range.min !== undefined) {
            return weight >= range.min
          }
          return weight < range.max
        })
      )
    }

    if (filters.location && filters.location.length > 0) {
      result = result.filter((product) =>
        filters.location.some(
          (loc) =>
            product.location.includes(loc) ||
            product.district === loc
        )
      )
    }

    if (filters.availability && filters.availability.length > 0) {
      result = result.filter((product) => {
        if (filters.availability.includes("in_stock")) {
          if (!product.available || product.stock === 0) return false
        }
        if (filters.availability.includes("out_of_stock")) {
          if (product.available && product.stock > 0) return false
        }
        return true
      })
    }

    if (filters.minRating) {
      result = result.filter(
        (product) => product.rating >= filters.minRating
      )
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        result.sort((a, b) => {
          const aPopular = a.isPopular ? 1 : 0
          const bPopular = b.isPopular ? 1 : 0
          return bPopular - aPopular || b.rating - a.rating
        })
        break
      case "newest":
      default:
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        break
    }

    return result
  }, [searchQuery, filters, sortBy])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      category: [],
      price: [],
      weight: [],
      location: [],
      availability: [],
      minRating: null,
    })
  }

  const activeFilterCount =
    (filters.category?.length || 0) +
    (filters.price?.length || 0) +
    (filters.weight?.length || 0) +
    (filters.location?.length || 0) +
    (filters.availability?.length || 0) +
    (filters.minRating ? 1 : 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Search Chicken</h1>
        <p className="mt-2 text-text-secondary">
          Search by product name, chicken type, category, seller, or location
        </p>
      </div>

      <div className="mb-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search: "Broiler", "Kigali", "Whole Chicken"...'
              className="w-full rounded-md border border-border bg-surface px-3 py-2 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Search products"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt md:hidden"
          >
            <Filter className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
          </button>
        )}
        <span className="text-sm text-text-secondary">
          {filteredAndSortedProducts.length} product
          {filteredAndSortedProducts.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-lg border border-border bg-card p-4 md:hidden">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-12 text-center">
              <SearchIcon className="mx-auto mb-4 h-12 w-12 text-text-tertiary" />
              <h3 className="text-lg font-medium text-text">
                No products found
              </h3>
              <p className="mt-2 text-text-secondary">
                Try adjusting your search terms or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
