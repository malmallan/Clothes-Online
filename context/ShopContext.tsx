import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import type { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface ShopState {
  cart: CartItem[]
  wishlist: Product[]
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number; selectedSize: string; selectedColor: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; selectedSize: string; selectedColor: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: Product }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: ShopState }

interface ShopContextType {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: number, selectedSize: string, selectedColor: string) => void
  updateQuantity: (productId: number, selectedSize: string, selectedColor: string, quantity: number) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: number) => boolean
  clearCart: () => void
  cartCount: number
  wishlistCount: number
  cartTotal: number
  notification: string | null
  clearNotification: () => void
}

const ShopContext = createContext<ShopContextType | null>(null)

function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const idx = state.cart.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor,
      )
      if (idx >= 0) {
        const updated = [...state.cart]
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + action.payload.quantity }
        return { ...state, cart: updated }
      }
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.selectedSize === action.payload.selectedSize &&
              item.selectedColor === action.payload.selectedColor
            ),
        ),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload.productId &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'TOGGLE_WISHLIST': {
      const inList = state.wishlist.some((p) => p.id === action.payload.id)
      if (inList) {
        return { ...state, wishlist: state.wishlist.filter((p) => p.id !== action.payload.id) }
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] }
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'HYDRATE':
      return action.payload
    default:
      return state
  }
}

const STORAGE_KEY = 'trendwear_shop'

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, { cart: [], wishlist: [] })
  const [notification, setNotification] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: ShopState = JSON.parse(raw)
        dispatch({ type: 'HYDRATE', payload: { cart: parsed.cart ?? [], wishlist: parsed.wishlist ?? [] } })
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state, hydrated])

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
    setNotification(`${item.product.name} added to cart!`)
  }

  const removeFromCart = (productId: number, selectedSize: string, selectedColor: string) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, selectedSize, selectedColor } })

  const updateQuantity = (productId: number, selectedSize: string, selectedColor: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, selectedSize, selectedColor, quantity } })

  const toggleWishlist = (product: Product) => {
    const inList = state.wishlist.some((p) => p.id === product.id)
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product })
    setNotification(inList ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`)
  }

  const isInWishlist = (productId: number) => state.wishlist.some((p) => p.id === productId)

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const clearNotification = () => setNotification(null)

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = state.wishlist.length
  const cartTotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <ShopContext.Provider
      value={{
        cart: state.cart,
        wishlist: state.wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        cartCount,
        wishlistCount,
        cartTotal,
        notification,
        clearNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop(): ShopContextType {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
