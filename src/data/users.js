export const users = [
  {
    id: 1,
    name: "Jean Bosco",
    email: "customer@example.com",
    phone: "+250 788 000 111",
    password: "demo123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    address: {
      province: "Kigali",
      district: "Gasabo",
      sector: "Remera",
      cell: "Kimironko",
      street: "Near Remera Catholic Church",
    },
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Marie Uwamahoro",
    email: "marie@example.com",
    phone: "+250 785 222 333",
    password: "demo123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1580489943928-9c0bf3b3e7e4?w=100&h=100&fit=crop&auto=format",
    address: {
      province: "Kigali",
      district: "Kicukiro",
      sector: "Nyamata",
      cell: "Nyamata Center",
      street: "Near Nyamata Bus Terminal",
    },
    createdAt: "2024-03-20",
  },
  {
    id: 3,
    name: "Fresh Farm Rwanda",
    email: "info@freshfarm.rw",
    phone: "+250 788 123 456",
    password: "demo123",
    role: "seller",
    sellerId: 1,
    avatar: "https://images.unsplash.com/photo-1508921340878-ba53e1f0bc49?w=100&h=100&fit=crop&auto=format",
    address: {
      province: "Kigali",
      district: "Gasabo",
      sector: "Kimironko",
      cell: "Kimironko",
      street: "Near Kimironko Market",
    },
    createdAt: "2024-03-15",
  },
]

export const getUserByEmail = (email) => users.find((u) => u.email === email)
export const getUserById = (id) => users.find((u) => u.id === id)
