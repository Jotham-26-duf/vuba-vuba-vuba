const DELIVERY_RATES = {
  kigali: { min: 1500, max: 3000, label: "Kigali City" },
  nearby: { min: 3000, max: 5000, label: "Nearby Districts" },
  other: { min: 5000, max: 8000, label: "Other Locations" },
}

const KIGALI_DISTRICTS = ["Gasabo", "Kicukiro", "Nyarugenge", "Kigali City"]
const NEARBY_DISTRICTS = [
  "Musanze", "Rwamagana", "Huye", "Rubavu", "Muhanga",
  "Gakenke", "Burera", "Gicumbi", "Rulindo",
  "Nyamagabe", "Ruhango", "Karongi", "Nyamasheke",
  "Kayonza", "Ngoma", "Kirehe", "Gatsibo",
]

export const calculateDeliveryFee = (deliveryAddress) => {
  if (!deliveryAddress || !deliveryAddress.district) {
    return { amount: 3000, label: DELIVERY_RATES.nearby.label }
  }

  if (KIGALI_DISTRICTS.includes(deliveryAddress.district)) {
    return { amount: DELIVERY_RATES.kigali.min, label: DELIVERY_RATES.kigali.label }
  }

  if (NEARBY_DISTRICTS.includes(deliveryAddress.district)) {
    return { amount: DELIVERY_RATES.nearby.min, label: DELIVERY_RATES.nearby.label }
  }

  return { amount: DELIVERY_RATES.other.min, label: DELIVERY_RATES.other.label }
}

export const getDeliveryEstimate = (deliveryAddress) => {
  if (!deliveryAddress || !deliveryAddress.district) {
    return "45-60 min"
  }

  if (KIGALI_DISTRICTS.includes(deliveryAddress.district)) {
    return "30-45 min"
  }

  return "60-90 min"
}

export { DELIVERY_RATES, KIGALI_DISTRICTS, NEARBY_DISTRICTS }
