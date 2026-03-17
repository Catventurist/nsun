<script setup lang='ts'>
interface Stocky {
  icon?: string
  ticker?: string
  text?: string
  price?: number
}

/* const props = withDefaults(defineProps<Stocky>(), {
  icon: 'lucide-cat',
  ticker: '---',
  text: 'Cat Company',
  price: 1
}) */

const things: Stocky[] = [
  {
    icon: 'lucide-cat',
    ticker: 'CAT',
    price: 262.82,
    text: 'Cat Inc.'
  },
  {
    icon: 'lucide-paw-print',
    ticker: 'PAW',
    price: 307.46,
    text: 'Paws Inc.'
  },
  {
    icon: 'lucide-bird',
    ticker: 'BRD',
    price: 86.09,
    text: 'Word Corp.'
  },
  {
    icon: 'lucide-dog',
    ticker: 'DOG',
    price: 433.72,
    text: 'Dog Inc.'
  }
]
</script>

<template>
  <AWidGet>
    <div class="items-center">
      <div class="grid size-full grid-cols-2 items-center gap-4">
        <div
          v-for="stock in things"
          :key="stock.text"
        >
          <UTooltip
            :delay-duration="300"
            :text="stock.text"
          >
            <div class="flex flex-col items-center justify-center gap-1">
              <UIcon
                :name="stock.icon"
                class="text-primary size-8 rounded-full"
              />
              <span class="text-xl">
                {{ stock.price }}
              </span>
            </div>
          </UTooltip>
        </div>
      </div>
    </div>
  </AWidGet>
</template>
