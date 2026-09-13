import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validatePassword,
  hasErrors,
} from "../utils/validation"

export const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, isLoading } = useAuth()

  const searchParams = new URLSearchParams(location.search)
  const isSellerMode = searchParams.get("seller") === "1"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: isSellerMode ? "seller" : "customer",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = {
      fullName: validateRequired(formData.fullName, "Full name"),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      accountType: formData.accountType,
    })

    if (result.success) {
      navigate("/")
    } else {
      setErrors({ submit: result.error })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <span className="text-4xl mb-2 block">🐔</span>
          <h1 className="text-2xl font-bold text-text">Create Account</h1>
          <p className="mt-1 text-text-secondary">
            Join Vuba Vuba Chicken and start ordering fresh chicken
          </p>
        </div>

        <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-800">
            <strong>Demo Authentication:</strong> Account details are stored in
            localStorage only. Not secure for production.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Account Type
            </label>
            <div className="flex gap-3">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="customer"
                  checked={formData.accountType === "customer"}
                  onChange={() =>
                    handleChange("accountType", "customer")
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-text">Customer</span>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="seller"
                  checked={formData.accountType === "seller"}
                  onChange={() =>
                    handleChange("accountType", "seller")
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-text">Seller</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`input ${errors.fullName ? "border-error" : ""}`}
              placeholder="Jean Bosco"
              required
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-error">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`input ${errors.email ? "border-error" : ""}`}
              placeholder="you@example.com"
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Phone Number *
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

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`input ${errors.password ? "border-error" : ""}`}
              placeholder="At least 6 characters"
              required
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className={`input ${
                errors.confirmPassword ? "border-error" : ""
              }`}
              placeholder="Confirm password"
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="rounded-md bg-error/10 border border-error/20 p-3">
              <p className="text-sm text-error">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
