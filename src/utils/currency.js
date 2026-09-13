export const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "RWF 0"
  return `RWF ${amount.toLocaleString("en-US")}`
}

export const formatCurrencyShort = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "RWF 0"
  if (amount >= 1000000) {
    return `RWF ${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `RWF ${(amount / 1000).toFixed(0)}K`
  }
  return `RWF ${amount}`
}

export const parsePrice = (value) => {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}
