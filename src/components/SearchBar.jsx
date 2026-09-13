import { Search as SearchIcon, X } from "lucide-react"
import { useState } from "react"

export const SearchBar = ({
  placeholder = "Search chicken, type, category, seller...",
  initialValue = "",
  onSearch,
  showFilterButton = false,
  onFilterClick,
}) => {
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch?.("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label="Search products"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-tertiary hover:text-text"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Search
      </button>
      {showFilterButton && onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt"
        >
          Filters
        </button>
      )}
    </form>
  )
}

export default SearchBar
