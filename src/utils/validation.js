export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`
  }
  return ""
}

export const validateEmail = (email) => {
  if (!email || email.trim() === "") return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Please enter a valid email address"
  return ""
}

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === "") return "Phone number is required"
  const phoneRegex = /^\+?[0-9\s\-\(\)]{7,}$/
  if (!phoneRegex.test(phone)) return "Please enter a valid phone number"
  return ""
}

export const validatePassword = (password) => {
  if (!password || password.length === 0) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters"
  return ""
}

export const validateNumber = (value, fieldName, min = 0) => {
  if (!value || isNaN(value)) return `${fieldName} must be a valid number`
  if (Number(value) < min) return `${fieldName} must be at least ${min}`
  return ""
}

export const validateProductForm = (formData) => {
  const errors = {}
  errors.name = validateRequired(formData.name, "Product name")
  errors.category = validateRequired(formData.category, "Category")
  errors.price = validateNumber(formData.price, "Price", 1)
  errors.weight = validateRequired(formData.weight, "Weight")
  errors.stock = validateNumber(formData.stock, "Stock quantity", 0)
  errors.location = validateRequired(formData.location, "Location")
  errors.description = validateRequired(formData.description, "Description")
  errors.image = validateRequired(formData.image, "Product image")
  return errors
}

export const validateCheckoutForm = (formData) => {
  const errors = {}
  errors.fullName = validateRequired(formData.fullName, "Full name")
  errors.phone = validatePhone(formData.phone)
  errors.email = validateEmail(formData.email)
  errors.province = validateRequired(formData.province, "Province")
  errors.district = validateRequired(formData.district, "District")
  errors.sector = validateRequired(formData.sector, "Sector")
  errors.cell = validateRequired(formData.cell, "Cell")
  errors.street = validateRequired(formData.street, "Street/Area")
  return errors
}

export const validateContactForm = (formData) => {
  const errors = {}
  errors.name = validateRequired(formData.name, "Name")
  errors.email = validateEmail(formData.email)
  errors.phone = validatePhone(formData.phone)
  errors.subject = validateRequired(formData.subject, "Subject")
  errors.message = validateRequired(formData.message, "Message")
  return errors
}

export const hasErrors = (errors) =>
  Object.values(errors).some((error) => error !== "")
