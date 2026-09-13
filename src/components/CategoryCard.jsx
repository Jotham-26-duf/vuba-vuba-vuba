import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.id)}`}
      className="group block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-surface-alt text-3xl">
          {category.image}
        </div>
        <h3 className="mb-1 text-lg font-semibold text-text group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-text-secondary">{category.count} products</p>
        <ChevronRight className="mt-2 h-4 w-4 text-text-tertiary group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

export default CategoryCard
