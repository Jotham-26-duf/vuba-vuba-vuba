export const messages = [
  {
    id: 1,
    orderId: "VVC-1001",
    sellerId: 1,
    customerId: 1,
    sellerName: "Fresh Farm Rwanda",
    customerName: "Jean Bosco",
    productImage: "https://images.unsplash.com/photo-1508921340878-ba53e1f0bc49?w=200&h=200&fit=crop&auto=format",
    productName: "Fresh Broiler Chicken",
    messages: [
      {
        id: "m1",
        text: "Hello! I'd like to order 2 broiler chickens. Are they available today?",
        from: 1,
        fromName: "Jean Bosco",
        timestamp: "2024-07-10T09:25:00Z",
        read: true,
      },
      {
        id: "m2",
        text: "Yes, we have plenty available! Fresh broiler chickens, just prepared this morning. Would you like delivery to Gasabo?",
        from: 1,
        fromName: "Fresh Farm Rwanda",
        timestamp: "2024-07-10T09:27:00Z",
        read: true,
      },
      {
        id: "m3",
        text: "Yes please, delivery to Remera. Can you deliver by 11am?",
        from: 1,
        fromName: "Jean Bosco",
        timestamp: "2024-07-10T09:28:00Z",
        read: true,
      },
      {
        id: "m4",
        text: "Yes, we can deliver by 11am. We'll call you 10 minutes before arrival.",
        from: 1,
        fromName: "Fresh Farm Rwanda",
        timestamp: "2024-07-10T09:29:00Z",
        read: true,
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
    messages: [
      {
        id: "m1",
        text: "Is the chicken breast still fresh? I need it for tonight.",
        from: 1,
        fromName: "Jean Bosco",
        timestamp: "2024-06-28T14:00:00Z",
        read: true,
      },
      {
        id: "m2",
        text: "Yes! Just processed this morning. Fresh and ready to go.",
        from: 3,
        fromName: "Nyamuhanga Butchery",
        timestamp: "2024-06-28T14:05:00Z",
        read: true,
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
    messages: [
      {
        id: "m1",
        text: "Hi, I'm interested in the local chicken. Can it be slaughtered and cleaned before delivery?",
        from: 2,
        fromName: "Marie Uwamahoro",
        timestamp: "2024-07-22T07:50:00Z",
        read: true,
      },
      {
        id: "m2",
        text: "Yes, of course! We can dress and clean the chicken before delivery. Just let us know when you'd like to pick it up or if you want delivery.",
        from: 4,
        fromName: "Musanze Free-Range Farms",
        timestamp: "2024-07-22T07:55:00Z",
        read: true,
      },
      {
        id: "m3",
        text: "Delivery to Musanze town, sector Musanze. How long will it take?",
        from: 2,
        fromName: "Marie Uwamahoro",
        timestamp: "2024-07-22T07:58:00Z",
        read: true,
      },
      {
        id: "m4",
        text: "We can deliver to Musanze town in about 45-60 minutes. The chicken will be ready in about 20 minutes.",
        from: 4,
        fromName: "Musanze Free-Range Farms",
        timestamp: "2024-07-22T08:00:00Z",
        read: true,
      },
    ],
  },
]

export const getMessagesByUser = (userId) =>
  messages.filter((m) => m.customerId === userId)

export const getMessagesBySeller = (sellerId) =>
  messages.filter((m) => m.sellerId === sellerId)
