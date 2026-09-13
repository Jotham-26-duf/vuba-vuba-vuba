import { Link } from "react-router-dom"

export const HowItWorks = () => {
  const customerSteps = [
    {
      step: 1,
      title: "Choose Your Chicken",
      description:
        "Browse our selection of fresh chicken from trusted local sellers. Filter by type, cut, weight, and price.",
      icon: "🐔",
    },
    {
      step: 2,
      title: "Add to Cart",
      description:
        "Select your preferred quantity and weight. Add items to your cart with one click.",
      icon: "🛒",
    },
    {
      step: 3,
      title: "Enter Delivery Address",
      description:
        "Provide your delivery address using Rwanda's administrative structure (Province → District → Sector → Cell).",
      icon: "📍",
    },
    {
      step: 4,
      title: "Complete Demo Payment",
      description:
        "Choose from Mobile Money, Card, Bank Transfer, or Cash on Delivery. This is a safe demo payment — no real money is charged.",
      icon: "💳",
    },
    {
      step: 5,
      title: "Track Your Order",
      description:
        "Watch your order progress from confirmed → preparing → out for delivery → delivered. Real-time GPS tracking requires backend infrastructure.",
      icon: "📱",
    },
    {
      step: 6,
      title: "Receive & Rate",
      description:
        "Get your fresh chicken delivered. Rate the product and seller to help other customers.",
      icon: "⭐",
    },
  ]

  const sellerSteps = [
    {
      step: 1,
      title: "Create Seller Account",
      description:
        "Register as a seller and set up your profile with your farm or butchery details.",
      icon: "📝",
    },
    {
      step: 2,
      title: "Add Your Chicken",
      description:
        "List your chicken products with photos, prices, weights, and stock availability.",
      icon: "🐔",
    },
    {
      step: 3,
      title: "Receive Orders",
      description:
        "Orders appear in your seller dashboard immediately after customers place them.",
      icon: "🔔",
    },
    {
      step: 4,
      title: "Accept & Prepare",
      description:
        "Accept or reject orders. Update order status as you prepare the chicken.",
      icon: "👨‍🍳",
    },
    {
      step: 5,
      title: "Hand to Driver",
      description:
        "Mark orders as ready for delivery. Our delivery team will pick up and deliver.",
      icon: "🚚",
    },
    {
      step: 6,
      title: "Get Paid",
      description:
        "Payments are processed (in production) and you receive your earnings.",
      icon: "💰",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-text">How It Works</h1>
        <p className="mt-2 text-text-secondary">
          Simple, fast, and reliable chicken delivery across Rwanda
        </p>
      </div>

      <div className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold text-text">
          For Customers
        </h2>
        <p className="mb-8 text-center text-text-secondary">
          Order fresh chicken in 6 simple steps
        </p>

        <div className="space-y-6">
          {customerSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold text-text">
          For Sellers
        </h2>
        <p className="mb-8 text-center text-text-secondary">
          Start selling your chicken to customers across Rwanda
        </p>

        <div className="space-y-6">
          {sellerSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-accent">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface-alt p-6 text-center">
        <h2 className="text-xl font-semibold text-text mb-2">
          Ready to get started?
        </h2>
        <p className="mb-4 text-text-secondary">
          Join hundreds of sellers already on Vuba Vuba Chicken.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Start Shopping
          </Link>
          <Link
            to="/register?seller=1"
            className="rounded-md border border-primary bg-transparent px-6 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
          >
            Become a Seller
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-md bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Order status progression, delivery tracking,
          and payment processing are simulated in this prototype. Real-time
          tracking and secure payments require backend infrastructure.
        </p>
      </div>
    </div>
  )
}

export default HowItWorks
