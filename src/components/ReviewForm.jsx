import { useState } from "react"
import { Star } from "lucide-react"
import Rating from "./Rating"

export const ReviewForm = ({ productId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }
    if (!comment.trim()) {
      alert("Please write a review")
      return
    }
    onSubmit({
      productId,
      rating,
      title: title.trim(),
      comment: comment.trim(),
      date: new Date().toISOString(),
    })
    setRating(0)
    setTitle("")
    setComment("")
  }

  const StarButton = ({ starValue }) => {
    const isActive = starValue <= (hoveredRating || rating)
    return (
      <button
        type="button"
        onClick={() => setRating(starValue)}
        onMouseEnter={() => setHoveredRating(starValue)}
        onMouseLeave={() => setHoveredRating(0)}
        className={`p-0.5 transition-colors ${
          isActive ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-label={`Rate ${starValue} stars`}
      >
        <Star className="h-6 w-6 fill-current" />
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <StarButton key={star} starValue={star} />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Review Title (optional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g. Amazing fresh chicken!"
          className="input"
          maxLength={100}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          className="input min-h-[100px] resize-y"
          maxLength={500}
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ReviewForm
