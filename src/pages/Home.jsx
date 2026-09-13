import { Link } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"
import ProductCard from "../components/ProductCard"
import { categories } from "../data/categories"
import { featuredProducts, popularProducts, products } from "../data/products"

export const Home = () => {
  const featured = featuredProducts.slice(0, 6)
  const popular = popularProducts.slice(0, 4)
  const bestSellers = products.filter((p) => p.rating >= 4.7).slice(0, 4)

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <FeaturedProductsSection title="Featured Chicken" products={featured} />
      <PopularProductsSection products={popular} />
      <BestSellersSection products={bestSellers} />
      <TrustSection />
    </div>
  )
}

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
              Fresh Chicken.
              <br />
              Delivered Fast.
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Order fresh chicken from trusted local sellers and have it
              delivered to your door.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Order Chicken
              </Link>
              <Link
                to="/register?seller=1"
                className="inline-flex items-center justify-center rounded-md border border-primary bg-transparent px-6 py-3 text-base font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Become a Seller
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-64 w-full rounded-2xl bg-surface-alt md:h-80">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                🍗
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-lg bg-card p-3 shadow border border-border">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1508921340878-ba53e1f0bc49?w=32&h=32&fit=crop&auto=format"
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=32&h=32&fit=crop&auto=format"
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1552539083-8aa5f3a4e5a9?w=32&h=32&fit=crop&auto=format"
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  +120
                </div>
              </div>
              <p className="mt-1 text-xs text-text-secondary">Verified Sellers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Chicken",
      description: "Browse fresh chicken from local sellers. Filter by type, weight, and price.",
    },
    {
      number: "02",
      title: "Add to Cart",
      description: "Select your preferred quantity and weight. Add to cart with one click.",
    },
    {
      number: "03",
      title: "Enter Delivery Location",
      description: "Enter your address in Kigali or anywhere across Rwanda.",
    },
    {
      number: "04",
      title: "Confirm Order",
      description: "Review your order and complete the safe demo payment.",
    },
    {
      number: "05",
      title: "Track Delivery",
      description: "Track your order in real-time and receive fresh chicken at your door.",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text">How It Works</h2>
          <p className="mt-2 text-text-secondary">
            Simple, fast, and reliable chicken delivery in 5 easy steps
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-lg border border-border bg-card p-4 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute -bottom-2 left-5 h-4 w-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CategoriesSection = () => {
  const displayCategories = categories.slice(0, 8)

  return (
    <section className="py-12 bg-surface-alt">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">Chicken Categories</h2>
          <Link
            to="/categories"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturedProductsSection = ({ title, products: productList }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">{title}</h2>
          <Link
            to="/shop"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

const PopularProductsSection = ({ products: productList }) => {
  return <FeaturedProductsSection title="Popular Chicken" products={productList} />
}

const BestSellersSection = ({ products: productList }) => {
  return <FeaturedProductsSection title="Best Sellers" products={productList} />
}

const TrustSection = () => {
  const trustPoints = [
    "Fresh chicken from trusted local sellers",
    "Verified seller profiles (demo)",
    "Safe demo payment system",
    "Fast delivery across Kigali",
    "100% satisfaction guarantee",
  ]

  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Why Choose Vuba Vuba?</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <div className="mb-2 flex justify-center text-2xl">✓</div>
                <p className="text-sm text-text-secondary">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
