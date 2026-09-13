import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { validateContactForm, hasErrors } from "../utils/validation"

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateContactForm(formData)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 text-5xl">✓</div>
          <h1 className="text-2xl font-bold text-text">
            Message Sent!
          </h1>
          <p className="mt-3 text-text-secondary">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Send Another Message
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-text">Contact Us</h1>
        <p className="mt-2 text-text-secondary">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-text mb-4">
            Get In Touch
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-text">Phone</p>
                <p className="text-text-secondary">+250 788 000 111</p>
                <p className="text-sm text-text-tertiary">Mon-Fri, 8am - 6pm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-text">Email</p>
                <p className="text-text-secondary">info@vubavubachicken.rw</p>
                <p className="text-sm text-text-tertiary">
                  We respond within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-text">Location</p>
                <p className="text-text-secondary">
                  KG 5 Avenue, Kigali, Rwanda
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-text mb-3">FAQ</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-text">
                  Is this a real payment system?
                </p>
                <p className="text-text-secondary">
                  No. This is a demo prototype. No real money is processed.
                </p>
              </div>
              <div>
                <p className="font-medium text-text">
                  Do you deliver outside Kigali?
                </p>
                <p className="text-text-secondary">
                  Currently demo delivery covers Kigali and nearby districts.
                </p>
              </div>
              <div>
                <p className="font-medium text-text">
                  How do I become a seller?
                </p>
                <p className="text-text-secondary">
                  Register and select "Seller" as your account type.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text mb-4">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`input ${errors.name ? "border-error" : ""}`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`input ${errors.email ? "border-error" : ""}`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`input ${errors.phone ? "border-error" : ""}`}
                  placeholder="+250 7XX XXX XXX"
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-error">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className={`input ${errors.subject ? "border-error" : ""}`}
                required
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-error">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`input min-h-[120px] resize-y ${
                  errors.message ? "border-error" : ""
                }`}
                placeholder="How can we help you?"
                required
              />
              {errors.message && (
                <p className="mt-1 text-xs text-error">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              <Send className="h-4 w-4 inline mr-1" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
