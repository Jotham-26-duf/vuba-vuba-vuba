import { createContext, useContext, useEffect, useState } from "react"
import { products } from "../data/products"

const FavoritesContext = createContext()

const FAVORITES_STORAGE_KEY = "vvc_favorites"

const getStoredFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return new Set(parsed.favorites || [])
    }
  } catch (e) {
    console.error("Failed to load favorites from localStorage", e)
  }
  return new Set()
}

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify({ favorites: Array.from(favorites) })
    )
  } catch (e) {
    console.error("Failed to save favorites to localStorage", e)
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getStoredFavorites)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const addFavorite = (productId) => {
    setFavorites((prev) => new Set([...prev, productId]))
  }

  const removeFavorite = (productId) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.delete(productId)
      return next
    })
  }

  const toggleFavorite = (productId) => {
    if (favorites.has(productId)) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  const isFavorite = (productId) => favorites.has(productId)

  const favoriteProducts = products.filter((product) =>
    favorites.has(product.id)
  )

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoriteProducts,
    count: favorites.size,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
