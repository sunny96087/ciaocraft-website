export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
