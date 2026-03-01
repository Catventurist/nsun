export const formatCurrency = (value: number, locale: string, currency: string = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

export const formatPercent = (value: number, locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    signDisplay: 'exceptZero',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100)
}

export const useMetrics = () => {
  const { locale, t } = useI18n()

  const generateMetric = (key: string, start: number, end: number, currency: string = 'USD') => {
    const diff = end - start
    const percentChange = (diff / start) * 100
    return {
      name: t(`metrics.${key}`),
      value: formatCurrency(end, locale.value, currency),
      change: formatPercent(percentChange, locale.value),
      changeType: diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral',
      to: '#'
    }
  }
  return { generateMetric }
}
