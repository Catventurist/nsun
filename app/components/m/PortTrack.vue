<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

interface StockItem {
  symbol: string
  name: string
  price: number
  change: number
  color?: string
  available: number
  reserved: number
  owned: number
}

interface PortfolioProps {
  companyName?: string
  stocks?: StockItem[]
}

const props = withDefaults(defineProps<PortfolioProps>(), {
  companyName: 'Northern Sun',
  stocks: () => [
    { symbol: 'AA', name: 'A', price: 420.69, change: 5.2, color: '#00dc82', available: 1200, reserved: 300, owned: 8500 },
    { symbol: 'BEE', name: 'B', price: 156.32, change: -1.4, color: '#42b883', available: 450, reserved: 100, owned: 3200 },
    { symbol: 'SEE', name: 'C', price: 89.15, change: 2.8, color: '#38bdf8', available: 8900, reserved: 1200, owned: 15000 },
    { symbol: 'DEE', name: 'D', price: 210.45, change: -0.5, color: '#f59e0b', available: 210, reserved: 45, owned: 980 }
  ]
})

const expandedIndex = ref<number | null>(null)

const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
const getWidth = (stock: StockItem, key: 'available' | 'reserved' | 'owned') => {
  const total = stock.available + stock.reserved + stock.owned
  return `${(stock[key] / total) * 100}%`
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6 rounded-[2.5rem] border border-primary/5 shadow-2xl">
    <div class="flex items-center justify-between mb-10 px-4">
      <h2 class="text-2xl text-primary tracking-tight">
        {{ props.companyName }}
      </h2>
      <div class="px-3 py-1 border border-primary/10 rounded-lg text-[10px] font-bold text-muted uppercase tracking-widest">
        Asset Distribution
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      <div
        v-for="(stock, index) in stocks"
        :key="stock.symbol"
        class="flex flex-col"
      >
        <Motion
          tag="div"
          class="group relative bg-default/40 rounded-3xl border border-primary/5 transition-all duration-500 overflow-hidden"
          :class="expandedIndex === index ? 'border-primary/20 ring-1 ring-primary/10' : 'hover:border-primary/10'"
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: index * 0.1 }"
        >
          <div
            class="p-6 cursor-pointer"
            @click="toggleExpand(index)"
          >
            <div class="flex items-center justify-between mb-6">
              <span class="px-2 py-1 bg-primary/5 rounded text-[10px] text-primary/80 tracking-widest">
                {{ stock.symbol }}
              </span>
              <span
                :class="stock.change >= 0 ? 'text-success' : 'text-error'"
                class="text-[10px] tracking-tighter"
              >
                {{ stock.change >= 0 ? '↑' : '↓' }} {{ Math.abs(stock.change) }}%
              </span>
            </div>

            <h3 class="text-primary font-bold text-sm mb-1 truncate">
              {{ stock.name }}
            </h3>
            <div class="text-xl text-primary tracking-tighter mb-4">
              {{ stock.price.toLocaleString() }}
              <span class="text-primary/60 font-medium text-xs mr-0.5">€</span>
            </div>
            <div class="flex items-center justify-between mt-2 pt-4 border-t border-primary/5">
              <span class="text-[10px] font-bold text-muted uppercase tracking-widest">
                Details
              </span>
              <div
                class="size-5 flex items-center justify-center rounded-full bg-primary/5 text-primary transition-transform duration-300"
                :style="{ transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
          <AnimatePresence>
            <Motion
              v-if="expandedIndex === index"
              key="details"
              class="overflow-hidden bg-muted/20"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.4, ease: 'easeInOut' }"
            >
              <div class="p-6 pt-0 space-y-4">
                <div
                  v-for="(val, label) in { available: stock.available, reserved: stock.reserved, owned: stock.owned }"
                  :key="label"
                  class="flex justify-between items-end"
                >
                  <span class="text-[10px] font-bold text-muted uppercase tracking-widest">{{ label }}</span>
                  <span class="text-xs text-primary tabular-nums">{{ val.toLocaleString() }}</span>
                </div>
              </div>
            </Motion>
          </AnimatePresence>
          <div class="h-1 w-full bg-primary/5 rounded-full overflow-hidden mt-2">
            <div class="absolute bottom-0 left-0 w-full h-2 flex bg-muted/60">
              <Motion
                class="h-full bg-info/60"
                :initial="{ width: '0%' }"
                :animate="{ width: getWidth(stock, 'available') }"
                :transition="{ delay: (index * 0.1) + 0.5, duration: 1.2 }"
              />
              <Motion
                class="h-full bg-warning/60"
                :initial="{ width: '0%' }"
                :animate="{ width: getWidth(stock, 'reserved') }"
                :transition="{ delay: (index * 0.1) + 0.6, duration: 1.2 }"
              />
              <Motion
                class="h-full"
                :style="{ backgroundColor: stock.color }"
                :initial="{ width: '0%' }"
                :animate="{ width: getWidth(stock, 'owned') }"
                :transition="{ delay: (index * 0.1) + 0.7, duration: 1.2 }"
              />
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow-hidden {
  will-change: height, opacity;
}
</style>
