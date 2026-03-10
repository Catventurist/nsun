<script setup lang="ts">
const stocks = [
  {
    ticker: 'CAN',
    company: 'Cat Inc',
    value: 262.24,
    difference: 4.26,
    isPositive: false
  },
  {
    ticker: 'DO',
    company: 'Kitty Corp.',
    value: 187.24,
    difference: 7.7,
    isPositive: true
  },
  {
    ticker: 'GOOD',
    company: 'Feline Feats Co',
    value: 290.24,
    difference: 2.98,
    isPositive: true
  }
]
const label = ref('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50')
</script>

<template>
  <AWidGet
    design="default"
    variant="shadow"
    title="Watchlist"
    icon="lucide-eye"
  >
    <div class="flex-col items-center justify-center mt-1 -ml-2">
      <div
        v-for="stock in stocks"
        :key="stock.ticker"
        class="flex w-full items-center justify-between space-x-2 border-t border-muted last:border-b-0"
      >
        <div class="flex flex-col items-start gap-0">
          <div
            class="text-sm font-semibold"
            :class="label"
          >
            <UIcon
              name="lucide-triangle"
              class="size-3 stroke-none"
              :class="stock.isPositive ? 'text-success' : 'text-warning rotate-180'"
            />
            {{ stock.ticker }}
          </div>
          <div class="text-muted-foreground text-xs">
            {{ stock.company }}
          </div>
        </div>
        <div class="flex flex-col items-end gap-0">
          <div class="text-sm font-semibold">
            {{ stock.value }}
          </div>
          <div :class="stock.isPositive ? 'text-success' : 'text-warning'">
            {{ stock.isPositive ? '+' : '-' }}
            {{ stock.difference }}
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <!-- <div class="flex-col items-start">
        <h3 class="text-xl font-medium">
          Northern Sun
        </h3>
        <div class="text-muted text-base">
          Well-being
        </div>
      </div> -->
    </template>
  </AWidGet>
</template>
