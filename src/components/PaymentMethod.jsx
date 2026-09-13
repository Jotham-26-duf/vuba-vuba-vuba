import { CreditCard, Banknote, Smartphone, QrCode } from "lucide-react"

export const PAYMENT_METHODS = [
  {
    id: "mobile_money",
    name: "Mobile Money",
    label: "Mobile Money",
    description: "Pay with M-Pesa, Airtel Money, or MTN Mobile Money",
    icon: Smartphone,
  },
  {
    id: "card",
    name: "Card",
    label: "Card",
    description: "Pay with credit or debit card",
    icon: CreditCard,
  },
  {
    id: "bank_transfer",
    name: "Bank",
    label: "Bank",
    description: "Bank transfer",
    icon: Banknote,
  },
  {
    id: "cash_on_delivery",
    name: "Cash on Delivery",
    label: "Cash on Delivery",
    description: "Pay with cash upon delivery",
    icon: QrCode,
  },
]

export const PaymentMethod = ({ selected, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text">Payment Method</h3>

      <div className="space-y-2">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon
          const isSelected = selected === method.id
          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => onSelect(method.id)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-surface-alt">
                <Icon className="h-5 w-5 text-text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text">{method.name}</p>
                <p className="text-sm text-text-secondary">
                  {method.description}
                </p>
              </div>
              {isSelected && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </label>
          )
        })}
      </div>

      <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-3">
        <p className="text-sm text-amber-800">
          <strong>Demo Payment:</strong> This is a test transaction. No real
          money will be charged.
        </p>
      </div>
    </div>
  )
}

export default PaymentMethod
