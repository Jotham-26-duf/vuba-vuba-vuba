import Rating from "./Rating"
import { formatDate } from "./FormatDate"
import { Check } from "lucide-react"

export const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
            <img
              src={review.userAvatar || "https://via.placeholder.com/32"}
              alt={review.userName}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32"
              }}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text">{review.userName}</p>
            <div className="flex items-center gap-1">
              <Rating rating={review.rating} reviews={0} size="xs" showReviews={false} />
              <span className="text-xs text-text-tertiary">
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>

        {review.verifiedPurchase && (
          <span
            className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
            title="Verified Purchase"
          >
            <Check className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      {review.title && (
        <p className="mb-1 text-sm font-medium text-text">{review.title}</p>
      )}
      <p className="text-sm text-text-secondary">{review.comment}</p>
    </div>
  )
}

export default ReviewCard
