<script setup lang="ts">
import { ref, computed } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

interface StockItem {
  symbol: string
  name: string
  price: number
  color: string
}

interface BuyTerminalProps {
  stocks?: StockItem[]
  balance?: number
}

const props = withDefaults(defineProps<BuyTerminalProps>(), {
  balance: 50000,
  stocks: () => [
    { symbol: 'NXT', name: 'Nuxt Framework', price: 420.69, color: '#00dc82' },
    { symbol: 'VUE', name: 'Vue.js Core', price: 156.32, color: '#42b883' },
    { symbol: 'TAI', name: 'Tailwind CSS', price: 89.15, color: '#38bdf8' },
    { symbol: 'NIT', name: 'Nitro Engine', price: 210.45, color: '#f59e0b' }
  ]
})

const selectedIdx = ref(0)
const quantity = ref(1)
const isProcessing = ref(false)
const showSuccess = ref(false)

const selectedStock = computed(() => {
  if (!props.stocks || props.stocks.length === 0) return null
  return props.stocks[selectedIdx.value] || props.stocks[0]
})
const totalCost = computed(() => {
  if (!selectedStock.value) return 0
  return (selectedStock.value.price || 0) * (quantity.value || 0)
})
const remainingBalance = computed(() => {
  return (props.balance || 0) - totalCost.value
})

const handlePurchase = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 3000)
  }, 1500)
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto rounded-[2.5rem] border border-primary/20 overflow-hidden">
    <div class="p-8 pb-4 flex justify-between items-center border-b border-primary/5">
      <div>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
          Available Funds
        </p>
        <h2 class="text-2xl text-primary tabular-nums">
          {{ props.balance.toLocaleString() }}€
        </h2>
      </div>
      <div class="text-right">
        <span class="px-3 py-1 bg-success/10 text-success text-[10px] rounded-full border border-success/20">
          VERIFIED ACCOUNT
        </span>
      </div>
    </div>

    <div class="p-8 space-y-8">
      <div>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">
          Select Asset
        </p>
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="(stock, i) in stocks"
            :key="stock.symbol"
            class="group relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2"
            :class="selectedIdx === i ? 'bg-primary/5 border-primary/20' : 'bg-transparent border-primary/5 hover:border-primary/10'"
            @click="selectedIdx = i"
          >
            <div
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: stock.color }"
            />
            <span
              class="text-xs font-muted"
              :class="selectedIdx === i ? 'text-primary' : 'text-muted'"
            >{{ stock.symbol }}</span>
            <div
              v-if="selectedIdx === i"
              class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/20"
            />
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between p-6 bg-muted/50 rounded-3xl border border-primary/5">
        <div>
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
            Quantity
          </p>
          <UInputNumber
            v-model="quantity"
            :min="-1000"
          />
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
          <span class="text-muted">
            Total Market Cost
          </span>
          <span class="text-primary">
            {{ totalCost.toLocaleString() }}€
          </span>
        </div>
        <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
          <span class="text-muted">
            Est. Balance After
          </span>
          <span :class="remainingBalance < 0 ? 'text-error' : 'text-muted'">
            {{ remainingBalance.toLocaleString() }}€
          </span>
        </div>
      </div>
      <div class="relative">
        <UButton
          :disabled="isProcessing || remainingBalance < 0"
          class="w-full py-5 rounded-3xl bg-muted text-default text-center text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden"
          :class="remainingBalance < 0 ? 'bg-muted text-default cursor-not-allowed' : 'bg-primary/20 hover:scale-[0.98] active:scale-[0.95]'"
          @click="handlePurchase"
        >
          <span
            v-if="!isProcessing && !showSuccess"
            class="flex items-center text-center justify-center gap-2"
          >
            <Icon name="lucide-shopping-cart" />
            Confirm Purchase
          </span>
          <span
            v-else-if="isProcessing"
            class="flex items-center justify-center gap-2"
          >
            <span class="size-4 border-2 text-default border-muted/20 border-t-muted rounded-full animate-spin" />
            Processing...
          </span>
          <span
            v-else-if="showSuccess"
            class="flex items-center justify-center gap-2"
          >
            <Icon name="lucide-check" />
            Order Executed
          </span>
        </UButton>
        <AnimatePresence>
          <Motion
            v-if="showSuccess"
            class="absolute inset-0 flex items-center justify-center bg-success/20 rounded-3xl pointer-events-none"
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0 }"
          >
            <span class="uppercase mb-0.5 tracking-widest text-shadow-sm text-shadow-primary text-sm">
              Success! Assets Acquired
            </span>
          </Motion>
        </AnimatePresence>
      </div>
    </div>
  </div>
</template>
