import { createContext, useContext, useEffect, useState } from "react"
import { orders, getNextOrderNumber } from "../data/orders"
import { calculateDeliveryFee, getDeliveryEstimate } from "../utils/delivery"

const OrderContext = createContext()

const ORDERS_STORAGE_KEY = "vvc_orders"

const getStoredOrders = () => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.orders || []
    }
  } catch (e) {
    console.error("Failed to load orders from localStorage", e)
  }
  return []
}

const saveOrders = (ordersList) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify({ orders: ordersList }))
  } catch (e) {
    console.error("Failed to save orders to localStorage", e)
  }
}

const ORDER_STATUS_DEMO_DELAYS = {
  pending: 5000,
  confirmed: 8000,
  preparing: 12000,
  ready: 5000,
  out_for_delivery: 8000,
  delivered: 0,
  cancelled: 0,
}

export const OrderProvider = ({ children }) => {
  const [ordersList, setOrdersList] = useState(() => {
    const stored = getStoredOrders()
    if (stored.length > 0) return stored
    return orders
  })

  useEffect(() => {
    saveOrders(ordersList)
  }, [ordersList])

  const createOrder = (cartItems, customerInfo, deliveryAddress, paymentMethod, orderNotes = "") => {
    const orderNumber = getNextOrderNumber()
    const delivery = calculateDeliveryFee(deliveryAddress)
    const estimatedDelivery = getDeliveryEstimate(deliveryAddress)
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const total = subtotal + delivery.amount

    const newOrder = {
      id: orderNumber,
      userId: customerInfo.userId || 1,
      customerName: customerInfo.fullName,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      sellerId: cartItems[0]?.sellerId || 1,
      sellerName: cartItems[0]?.sellerName || "Unknown Seller",
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight,
        total: item.price * item.quantity,
      })),
      subtotal,
      deliveryFee: delivery.amount,
      total,
      tax: 0,
      status: "pending",
      paymentMethod,
      paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "paid",
      paymentLabel: {
        mobile_money: "Mobile Money",
        card: "Card",
        bank_transfer: "Bank Transfer",
        cash_on_delivery: "Cash on Delivery",
      }[paymentMethod],
      deliveryAddress,
      estimatedDelivery,
      deliveryInfo: delivery,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveredAt: null,
      notes: orderNotes,
      tracking: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          note: "Order placed successfully",
        },
      ],
      isDemo: true,
    }

    setOrdersList((prev) => [newOrder, ...prev])
    return newOrder
  }

  const getOrderById = (id) =>
    ordersList.find((order) => order.id === id)

  const getOrdersByUser = (userId) =>
    ordersList.filter((order) => order.userId === userId)

  const getOrdersBySeller = (sellerId) =>
    ordersList.filter((order) => order.sellerId === sellerId)

  const updateOrderStatus = (orderId, newStatus, note = "") => {
    setOrdersList((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order

        const updatedTracking = [...order.tracking]
        if (note) {
          updatedTracking.push({
            status: newStatus,
            timestamp: new Date().toISOString(),
            note,
          })
        }

        return {
          ...order,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          deliveredAt:
            newStatus === "delivered" ? new Date().toISOString() : order.deliveredAt,
          tracking: updatedTracking,
        }
      })
    )
  }

  const cancelOrder = (orderId, reason = "") => {
    updateOrderStatus(orderId, "cancelled", reason || "Order cancelled by customer")
  }

  const getOrderStatusInfo = (status) => {
    const statusMap = {
      pending: { label: "Pending", color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-800" },
      confirmed: { label: "Confirmed", color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      preparing: { label: "Preparing", color: "amber", bgColor: "bg-amber-100", textColor: "text-amber-800" },
      ready: { label: "Ready for Delivery", color: "indigo", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
      out_for_delivery: { label: "Out for Delivery", color: "purple", bgColor: "bg-purple-100", textColor: "text-purple-800" },
      delivered: { label: "Delivered", color: "green", bgColor: "bg-green-100", textColor: "text-green-800" },
      cancelled: { label: "Cancelled", color: "red", bgColor: "bg-red-100", textColor: "text-red-800" },
    }
    return statusMap[status] || statusMap.pending
  }

  const getTrackingSteps = (currentStatus) => {
    const steps = [
      { key: "pending", label: "Order Placed" },
      { key: "confirmed", label: "Order Confirmed" },
      { key: "preparing", label: "Preparing Chicken" },
      { key: "ready", label: "Ready for Delivery" },
      { key: "out_for_delivery", label: "Out for Delivery" },
      { key: "delivered", label: "Delivered" },
    ]

    if (currentStatus === "cancelled") {
      return steps.map((step) => ({
        ...step,
        completed: step.key === "pending",
        current: false,
        cancelled: step.key === "pending",
      }))
    }

    const statusOrder = [
      "pending", "confirmed", "preparing", "ready",
      "out_for_delivery", "delivered",
    ]
    const currentIndex = statusOrder.indexOf(currentStatus)

    return steps.map((step, index) => ({
      ...step,
      completed: index < currentIndex,
      current: index === currentIndex,
      cancelled: currentStatus === "cancelled" && index > 0,
    }))
  }

  const value = {
    orders: ordersList,
    createOrder,
    getOrderById,
    getOrdersByUser,
    getOrdersBySeller,
    updateOrderStatus,
    cancelOrder,
    getOrderStatusInfo,
    getTrackingSteps,
    ORDER_STATUS_DEMO_DELAYS,
  }

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
