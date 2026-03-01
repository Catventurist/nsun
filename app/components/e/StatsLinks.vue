<script setup lang='ts'>
const data = [
  {
    name: $t('stats.revenuem'),
    start: 2000,
    value: 2400,
    interval: 50,
    title: '€',
    change: '+6.1%',
    changeType: 'positive',
    to: '#',
    icon: 'lucide-receipt-euro'
  },
  {
    name: $t('stats.users'),
    start: 1,
    value: 2,
    change: '+19.2%',
    changeType: 'positive',
    to: '#',
    icon: 'lucide-users'
  },
  {
    name: $t('stats.productsnew'),
    start: 12,
    value: 14,
    change: -1.2,
    changeType: 'positive',
    to: '#',
    icon: 'lucide-shopping-basket'
  }
]
const { locale } = useI18n()
/* const formatTwoDecimals = (value: number) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
} */
const formatPercentTwoDecimals = (value: number) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<template>
  <div class="flex items-center justify-center p-10 w-full">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <UCard
        v-for="item in data"
        :key="item.name"
        class="p-0 gap-0 duration-300 bg-radial to-muted/80 hover:shadow-md hover:shadow-primary active:from-info/20"
      >
        <div class="flex items-start justify-between space-x-2">
          <span class="truncate text-sm">
            {{ item.name }}
          </span>
          <span
            class="text-sm font-medium mb-2"
            :class="item.changeType === 'positive' ? 'text-success' : 'text-error'"
          >
            {{ formatPercentTwoDecimals((item.value - item.start) / item.start) }}
          </span>
        </div>
        <div class="flex justify-center items-center text-5xl font-semibold text-primary">
          <MCountUp
            :max="item.value"
            :min="item.start"
            class="me-1"
          />
          {{ item.title }}
        </div>
        <template #footer>
          <div class="flex justify-end border-t border-muted p-0 m-0">
            <UButton
              :to="item.to"
              :label="$t('stats.more')"
              :icon="item.icon"
              variant="ghost"
              class="text-muted duration-300 hover:text-primary"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
