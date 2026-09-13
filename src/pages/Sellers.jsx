import { Link } from "react-router-dom"
import Rating from "../components/Rating"
import SellerCard from "../components/SellerCard"
import { sellers, getSellerById } from "../data/sellers"

export const Sellers = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">
          Trusted Chicken Sellers
        </h1>
        <p className="mt-1 text-text-secondary">
          All sellers are demo-verified. Real verification requires admin review
          and backend infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  )
}

export default Sellers
