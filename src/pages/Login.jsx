import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { validateEmail, validatePassword, hasErrors } from "../utils/validation"

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const from = location.state?.from?.pathname || "/"

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return

    const result = await login(formData.email, formData.password)
    if (result.success) {
      navigate(from)
    } else {
      setErrors({ submit: result.error })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <span className="text-4xl mb-2 block">🐔</span>
          <h1 className="text-2xl font-bold text-text">Welcome Back</h1>
          <p className="mt-1 text-text-secondary">
            Login to your Vuba Vuba Chicken account
          </p>
        </div>

        <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-800">
            <strong>Demo Authentication:</strong> This is simulated frontend-only
            authentication. Passwords are stored in mock data, not securely.
          </p>
          <p className="mt-1 text-xs text-amber-800">
            Demo credentials: customer@example.com / demo123
          </p>
          <p className="text-xs text-amber-800">
            Seller: info@freshfarm.rw / demo123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Email
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
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`input ${errors.password ? "border-error" : ""}`}
              placeholder="Your password"
              required
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">{errors.password}</p>
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
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
