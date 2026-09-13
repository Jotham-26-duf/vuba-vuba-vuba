import CategoryCard from "../components/CategoryCard"
import { categories } from "../data/categories"

export const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text">Chicken Categories</h1>
        <p className="mt-2 text-text-secondary">
          Browse chicken by type and cut
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-text">
          Product Types
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <span className="text-2xl mb-2 block">🐔</span>
            <h3 className="font-semibold text-text">Live Chicken</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Broiler, local, layer, and improved local chickens raised on
              local farms.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-2xl mb-2 block">🔪</span>
            <h3 className="font-semibold text-text">Whole Chicken</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Whole chickens, cleaned and gutted, ready for cooking.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-2xl mb-2 block">✂️</span>
            <h3 className="font-semibold text-text">Chicken Cuts</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Breast, wings, thighs, legs, drumsticks, and more.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-2xl mb-2 block">🔥</span>
            <h3 className="font-semibold text-text">Prepared Chicken</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Fried, grilled, roasted chicken and ready-to-eat meals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
