import { createContext, useContext, useEffect, useState } from "react"
import { getUserByEmail, users } from "../data/users"

const AuthContext = createContext()

const USER_STORAGE_KEY = "vvc_demoUser"

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error("Failed to load user from localStorage", e)
  }
  return null
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      } catch (e) {
        console.error("Failed to save user to localStorage", e)
      }
    }
  }, [user])

  const login = (email, password) => {
    setIsLoading(true)
    const foundUser = getUserByEmail(email)
    return new Promise((resolve) => {
      setTimeout(() => {
        if (foundUser && foundUser.password === password) {
          const { password: _pwd, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          setIsLoading(false)
          resolve({ success: true, user: userWithoutPassword })
        } else {
          setIsLoading(false)
          resolve({ success: false, error: "Invalid email or password" })
        }
      }, 500)
    })
  }

  const register = (formData) => {
    setIsLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const existing = getUserByEmail(formData.email)
        if (existing) {
          setIsLoading(false)
          resolve({ success: false, error: "Email already registered" })
        } else {
          const newUser = {
            id: Date.now(),
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.accountType,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
            address: {
              province: "",
              district: "",
              sector: "",
              cell: "",
              street: "",
            },
            createdAt: new Date().toISOString(),
          }
          const { password: _pwd, ...userWithoutPassword } = newUser
          setUser(userWithoutPassword)
          setIsLoading(false)
          resolve({ success: true, user: userWithoutPassword })
        }
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  const isAuthenticated = !!user
  const isSeller = user?.role === "seller"
  const isCustomer = user?.role === "customer"

  const value = {
    user,
    isAuthenticated,
    isSeller,
    isCustomer,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
