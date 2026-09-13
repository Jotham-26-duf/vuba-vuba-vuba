import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { messages } from "../data/messages"
import { formatDate } from "../components/FormatDate"

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    orderId: "VVC-1001",
    sellerId: 1,
    customerId: 1,
    sellerName: "Fresh Farm Rwanda",
    customerName: "Jean Bosco",
    productImage: "https://images.unsplash.com/photo-1508921340878-ba53e1f0bc49?w=200&h=200&fit=crop&auto=format",
    productName: "Fresh Broiler Chicken",
    unread: false,
    lastMessage: "Yes, we can deliver by 11am. We'll call you 10 minutes before arrival.",
    lastMessageTime: "2024-07-10T09:29:00Z",
    messages: [
      {
        id: "m1",
        text: "Hello! I'd like to order 2 broiler chickens. Are they available today?",
        from: 1,
        fromName: "Jean Bosco",
        isOwn: true,
        timestamp: "2024-07-10T09:25:00Z",
      },
      {
        id: "m2",
        text: "Yes, we have plenty available! Fresh broiler chickens, just prepared this morning. Would you like delivery to Gasabo?",
        from: "seller",
        fromName: "Fresh Farm Rwanda",
        isOwn: false,
        timestamp: "2024-07-10T09:27:00Z",
      },
      {
        id: "m3",
        text: "Yes please, delivery to Remera. Can you deliver by 11am?",
        from: 1,
        fromName: "Jean Bosco",
        isOwn: true,
        timestamp: "2024-07-10T09:28:00Z",
      },
      {
        id: "m4",
        text: "Yes, we can deliver by 11am. We'll call you 10 minutes before arrival.",
        from: "seller",
        fromName: "Fresh Farm Rwanda",
        isOwn: false,
        timestamp: "2024-07-10T09:29:00Z",
      },
    ],
  },
  {
    id: 2,
    orderId: "VVC-1002",
    sellerId: 3,
    customerId: 1,
    sellerName: "Nyamuhanga Butchery",
    customerName: "Jean Bosco",
    productImage: "https://images.unsplash.com/photo-1553621042-f6e14e2ea646?w=200&h=200&fit=crop&auto=format",
    productName: "Chicken Breast Fillets",
    unread: false,
    lastMessage: "Yes! Just processed this morning. Fresh and ready to go.",
    lastMessageTime: "2024-06-28T14:05:00Z",
    messages: [
      {
        id: "m1",
        text: "Is the chicken breast still fresh? I need it for tonight.",
        from: 1,
        fromName: "Jean Bosco",
        isOwn: true,
        timestamp: "2024-06-28T14:00:00Z",
      },
      {
        id: "m2",
        text: "Yes! Just processed this morning. Fresh and ready to go.",
        from: "seller",
        fromName: "Nyamuhanga Butchery",
        isOwn: false,
        timestamp: "2024-06-28T14:05:00Z",
      },
    ],
  },
  {
    id: 3,
    orderId: "VVC-1004",
    sellerId: 4,
    customerId: 2,
    sellerName: "Musanze Free-Range Farms",
    customerName: "Marie Uwamahoro",
    productImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop&auto=format",
    productName: "Local Free-Range Chicken",
    unread: true,
    lastMessage: "We can deliver to Musanze town in about 45-60 minutes.",
    lastMessageTime: "2024-07-22T08:00:00Z",
    messages: [
      {
        id: "m1",
        text: "Hi, I'm interested in the local chicken. Can it be slaughtered and cleaned before delivery?",
        from: 2,
        fromName: "Marie Uwamahoro",
        isOwn: true,
        timestamp: "2024-07-22T07:50:00Z",
      },
      {
        id: "m2",
        text: "Yes, of course! We can dress and clean the chicken before delivery. Just let us know when you'd like to pick it up or if you want delivery.",
        from: "seller",
        fromName: "Musanze Free-Range Farms",
        isOwn: false,
        timestamp: "2024-07-22T07:55:00Z",
      },
      {
        id: "m3",
        text: "Delivery to Musanze town, sector Musanze. How long will it take?",
        from: 2,
        fromName: "Marie Uwamahoro",
        isOwn: true,
        timestamp: "2024-07-22T07:58:00Z",
      },
      {
        id: "m4",
        text: "We can deliver to Musanze town in about 45-60 minutes. The chicken will be ready in about 20 minutes.",
        from: "seller",
        fromName: "Musanze Free-Range Farms",
        isOwn: false,
        timestamp: "2024-07-22T08:00:00Z",
      },
    ],
  },
]

export const Messages = () => {
  const { id: conversationId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")

  const conversation = MOCK_CONVERSATIONS.find(
    (c) => c.id === Number(conversationId)
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setNewMessage("")
  }

  if (!conversationId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2x font-bold text-text mb-6">Messages</h1>
        <p className="mb-6 text-sm text-text-secondary">
          Real-time messaging requires backend infrastructure. This is a
          simulated demo.
        </p>
        <div className="space-y-3">
          {MOCK_CONVERSATIONS.map((conv) => (
            <Link
              key={conv.id}
              to={`/messages/${conv.id}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-surface-alt"
            >
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border">
                <img
                  src={conv.productImage}
                  alt={conv.productName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-text">
                    {user?.role === "seller"
                      ? conv.customerName
                      : conv.sellerName}
                  </p>
                  <span className="text-xs text-text-tertiary">
                    {formatDate(conv.lastMessageTime)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-1">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  1
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-text-secondary">Conversation not found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center gap-2">
        <Link
          to="/messages"
          className="text-sm text-text-secondary hover:text-text"
        >
          ← Messages
        </Link>
        <span className="text-text-tertiary">/</span>
        <span className="font-medium text-text">
          {user?.role === "seller"
            ? conversation.customerName
            : conversation.sellerName}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border">
          <img
            src={conversation.productImage}
            alt={conversation.productName}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-text">{conversation.productName}</p>
          <p className="text-sm text-text-secondary">
            Order #{conversation.orderId}
          </p>
        </div>
      </div>

      <div className="h-[400px] space-y-3 overflow-y-auto rounded-lg border border-border bg-surface-alt p-4">
        {conversation.messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.isOwn
                ? "ml-auto bg-primary text-white"
                : "bg-surface border border-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">
                {msg.fromName}
              </span>
              <span className="text-xs opacity-70">
                {formatDate(msg.timestamp)}
              </span>
            </div>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>

      <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-3">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Real-time messaging requires WebSocket
          backend infrastructure. This is a simulated demo.
        </p>
      </div>
    </div>
  )
}

export default Messages
