import { Star, StarHalf } from "lucide-react"

export const Rating = ({ rating, reviews = 0, size = "sm", showReviews = true, interactive = false, onRate = null }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const starClass = sizeClasses[size] || sizeClasses.sm

  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  const renderStar = (type) => {
    if (type === "full") {
      return <Star key={`full-${Math.random()}`} className={`${starClass} fill-yellow-400 text-yellow-400`} />
    }
    if (type === "half") {
      return <StarHalf key={`half-${Math.random()}`} className={`${starClass} fill-yellow-400 text-yellow-400`} />
    }
    return <Star key={`empty-${Math.random()}`} className={`${starClass} text-gray-300`} />
  }

  const stars = [
    ...Array(fullStars).fill("full"),
    ...(hasHalf ? ["half"] : []),
    ...Array(emptyStars).fill("empty"),
  ]

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {stars.map((star, i) => (
          <span
            key={`${star}-${i}`}
            onClick={() => handleClick(i)}
            className={interactive ? "cursor-pointer" : ""}
          >
            {star === "full" && <Star className={`${starClass} fill-yellow-400 text-yellow-400`} />}
            {star === "half" && <StarHalf className={`${starClass} fill-yellow-400 text-yellow-400`} />}
            {star === "empty" && <Star className={`${starClass} text-gray-300`} />}
          </span>
        ))}
      </div>
      {showReviews && reviews > 0 && (
        <span className={`text-${size === "lg" ? "sm" : "xs"} text-text-secondary`}>
          ({reviews})
        </span>
      )}
    </div>
  )
}

export default Rating
