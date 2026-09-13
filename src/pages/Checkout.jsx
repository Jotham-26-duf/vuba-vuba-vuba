import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartItem from "../components/CartItem"
import DeliveryAddress from "../components/DeliveryAddress"
import PaymentMethod, { PAYMENT_METHODS } from "../components/PaymentMethod"
import { useCart } from "../context/CartContext"
import { useOrders } from "../context/OrderContext"
import { useAuth } from "../context/AuthContext"
import { calculateDeliveryFee } from "../utils/delivery"
import { validateCheckoutForm, hasErrors } from "../utils/validation"
import { formatCurrency } from "../utils/currency"

export const Checkout = () => {
  const navigate = useNavigate()
  const { items, subtotal, clearCart, itemCount } = useCart()
  const { createOrder } = useOrders()
  const { user, isAuthenticated } = useAuth()
  const [activeStep, setActiveStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState({
    province: user?.address?.province || "Kigali",
    district: user?.address?.district || "Gasabo",
    sector: user?.address?.sector || "Remera",
    cell: user?.address?.cell || "Kimironko",
    street: user?.address?.street || "",
    notes: "",
  })
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    userId: user?.id || 1,
  })
  const [errors, setErrors] = useState({})
  const [selectedPayment, setSelectedPayment] = useState("mobile_money")

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart")
    }
  }, [items, navigate])

  const delivery = calculateDeliveryFee(deliveryAddress)
  const total = subtotal + delivery.amount

  const steps = [
    { number: 1, title: "Delivery Address" },
    { number: 2, title: "Payment Method" },
    { number: 3, title: "Confirm Order" },
  ]

  const handleAddressChange = (newAddress) => {
    setDeliveryAddress(newAddress)
  }

  const handleNext = () => {
    if (activeStep === 1) {
      const validationErrors = validateCheckoutForm({
        ...customerInfo,
        ...deliveryAddress,
      })
      setErrors(validationErrors)
      if (hasErrors(validationErrors)) {
        return
      }
    }
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleConfirmOrder = () => {
    const order = createOrder(
      items,
      customerInfo,
      deliveryAddress,
      selectedPayment,
      deliveryAddress.notes || ""
    )
    clearCart()
    navigate(`/order-confirmation/${order.id}`)
  }

  if (items.length === 0) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Demo Auth Notice */}
          {!isAuthenticated && (
            <div className="rounded-md bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-800">
                <strong>Demo Authentication:</strong> You are placing this order
                as a guest. In production, authentication would be required.
              </p>
            </div>
          )}

          {/* Steps */}
          <div className="flex items-center gap-4 mb-6">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    activeStep === step.number
                      ? "bg-primary text-white"
                      : activeStep > step.number
                      ? "bg-green-600 text-white"
                      : "bg-surface-alt text-text-secondary"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    activeStep >= step.number
                      ? "font-medium text-text"
                      : "text-text-secondary"
                  }`}
                >
                  {step.title}
                </span>
                {step.number < steps.length && (
                  <div
                    className={`ml-4 h-0.5 w-12 ${
                      activeStep > step.number
                        ? "bg-green-600"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            {activeStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-text mb-4">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                      }
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, phone: e.target.value })
                        }
                        className="input"
                        placeholder="+250 7XX XXX XXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        className="input"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <DeliveryAddress
                  address={deliveryAddress}
                  onChange={handleAddressChange}
                  errors={errors}
                />
              </div>
            )}

            {activeStep === 2 && (
              <PaymentMethod
                selected={selectedPayment}
                onSelect={setSelectedPayment}
              />
            )}

            {activeStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-text mb-4">
                  Confirm Your Order
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-text-secondary mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-sm text-text">
                      {customerInfo.fullName} | {customerInfo.phone}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {deliveryAddress.province}, {deliveryAddress.district},{" "}
                      {deliveryAddress.sector}, {deliveryAddress.cell}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {deliveryAddress.street}
                    </p>
                    {deliveryAddress.notes && (
                      <p className="text-sm text-text-secondary">
                        Note: {deliveryAddress.notes}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-secondary mb-2">
                      Payment Method
                    </h3>
                    <p className="text-sm text-text">
                      {PAYMENT_METHODS.find((m) => m.id === selectedPayment)?.name ||
                        selectedPayment}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-md bg-amber-50 border border-amber-200 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Demo Payment:</strong> This is a simulated
                    transaction. No real money will be charged. A demo order
                    confirmation will be generated.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={activeStep === 1}
              className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
            {activeStep < steps.length ? (
              <button
                onClick={handleNext}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleConfirmOrder}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
              >
                Confirm Demo Order
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Summary
            </h2>
            <div className="space-y-1 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-text">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery Fee</span>
                <span className="font-medium text-text">
                  {formatCurrency(delivery.amount)}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-text">TOTAL</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
