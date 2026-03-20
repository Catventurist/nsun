<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'

type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface Props {
  name?: string
  sku?: string
  description?: string
  price?: number
  discount?: number
  currency?: string
  stock?: number
  width?: number
  height?: number
  depth?: number
  unit?: 'cm' | 'mm' | 'm' | 'in'
  category?: string
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'
  condition?: 'mint' | 'excellent' | 'good' | 'fair' | 'poor'
  weight?: number
  delivery?: 'manual' | 'automatic' | 'courier'
  warranty?: 'none' | '90-days' | '1-year' | 'lifetime'
  origin?: string
  seller?: string
  digital?: boolean
  featured?: boolean
  icon?: string
  color?: ColOr
  size?: string
  material?: 'metal' | 'wood' | 'polymer' | 'glass' | 'stone' | 'cloth'
  estimate?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Relic of the past',
  sku: 'itm-001',
  description: 'A mysterious object.',
  price: 250,
  discount: 0,
  currency: 'cr',
  stock: 5,
  width: 10,
  height: 10,
  depth: 10,
  unit: 'cm',
  category: 'tool',
  rarity: 'uncommon',
  condition: 'excellent',
  weight: 0.5,
  delivery: 'automatic',
  warranty: '90-days',
  origin: 'brain',
  seller: 'Cat',
  digital: true,
  featured: false,
  icon: 'i-lucide-box',
  color: 'primary',
  material: 'metal',
  estimate: '2-3 days'
})

const {
  name, sku, description, price, discount, currency, stock, width, height, depth, unit,
  category, rarity, condition, weight, delivery, warranty, origin, seller, digital, featured, icon, color
} = toRefs(props)

const dimensions = computed((): string => {
  return `${width.value} * ${height.value} * ${depth.value} ${unit.value}`
})

const local_stock = ref<number>(stock.value)
const buying = ref<boolean>(false)

const handlePurchase = async (): Promise<void> => {
  if (local_stock.value <= 0 || buying.value) return
  buying.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  local_stock.value -= 1
  buying.value = false
}

const finalPrice = computed(() => price.value - discount.value)

const rarity_map = {
  common: { color: 'neutral', icon: 'i-lucide-circle' },
  uncommon: { color: 'success', icon: 'i-lucide-shield' },
  rare: { color: 'info', icon: 'i-lucide-gem' },
  epic: { color: 'purple-400', icon: 'i-lucide-sparkles' },
  legendary: { color: 'warning', icon: 'i-lucide-flame' },
  artifact: { color: 'error', icon: 'i-lucide-crown' }
} as const
/*
const category_icons = {
  weapon: 'i-lucide-sword',
  armor: 'i-lucide-shield-half',
  potion: 'i-lucide-beaker',
  tool: 'i-lucide-wrench',
  material: 'i-lucide-component',
  scroll: 'i-lucide-scroll'
} as const */
</script>

<template>
  <UCard :class="['max-w-xl border-2 shadow shadow-primary transition-all', featured ? 'ring-2 ring-primary/40' : '']">
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-4">
        <UAvatar
          :icon="icon"
          :class="`bg-${color}/20 text-${color}`"
          size="lg"
        />
        <div>
          <div class="flex items-center gap-2">
            <h3 class="uppercase tracking-tight leading-none">
              {{ name }}
            </h3>
            <UBadge
              :color="(rarity_map[rarity].color as ColOr)"
              variant="soft"
              size="sm"
              class="font-bold uppercase"
            >
              <UIcon
                :name="rarity_map[rarity].icon"
                class="mr-1 size-3"
              />
              {{ rarity }}
            </UBadge>
          </div>
          <p class="text-sm text-muted mt-1 italic">
            {{ description }}
          </p>
        </div>
      </div>
      <UBadge
        v-if="digital"
        :label="category"
        variant="outline"
        color="info"
      />
      <UBadge
        v-if="digital"
        label="Digital"
        variant="soft"
      />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 py-4 border-y border-muted">
      <UFormField
        label="sku id"
        size="sm"
      >
        <span class="text-sm font-mono text-muted mt-1 block">{{ sku }}</span>
      </UFormField>

      <UFormField
        label="availability"
        size="sm"
      >
        <span :class="['text-sm font-bold mt-1 block', local_stock <= 0 ? 'text-error' : 'text-success']">
          {{ local_stock > 0 ? `${local_stock} In Stock` : 'Sold Out' }}
        </span>
      </UFormField>
      <UFormField
        label="warranty"
        size="sm"
      >
        <span class="text-sm font-bold capitalize mt-1 block">{{ warranty }}</span>
      </UFormField>
      <UFormField
        label="condition"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-award"
            class="size-4 text-muted"
          />
          <span class="text-sm font-bold capitalize">{{ condition }}</span>
        </div>
      </UFormField>
      <UFormField
        label="logistics"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-truck"
            class="size-4 text-muted"
          />
          <span class="text-sm font-bold capitalize">{{ delivery }}</span>
        </div>
      </UFormField>
      <UFormField
        label="estimate"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-clock"
            class="size-4 text-muted"
          />
          <span class="text-sm font-bold capitalize">{{ estimate }}</span>
        </div>
      </UFormField>
      <UFormField
        label="material"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-component"
            class="size-4 text-muted"
          />
          <span class="text-sm font-bold capitalize">{{ material }}</span>
        </div>
      </UFormField>
      <UFormField
        label="size"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-maximize"
            class="size-4 text-muted"
          />
          <span class="text-xs font-mono font-bold">
            {{ dimensions }}
          </span>
        </div>
      </UFormField>
      <UFormField
        label="weight"
        size="sm"
      >
        <span class="text-sm font-bold mt-1 block">{{ weight }} kg</span>
      </UFormField>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span
            v-if="discount > 0"
            class="text-sm text-warning line-through font-bold"
          >
            {{ price }}{{ currency }}
          </span>
          <div class="text-2xl text-primary leading-none">
            {{ finalPrice }}
            <span class="text-sm font-normal text-muted ml-1">
              {{ currency }}
            </span>
          </div>
        </div>
        <UUser
          :name="seller"
          :description="origin"
          :avatar="{ src: '/cat.png' }"
        />
        <UButton
          size="lg"
          :label="local_stock > 0 ? 'Acquire' : 'Unavailable'"
          :color="local_stock > 0 ? color : 'neutral'"
          :disabled="local_stock <= 0 || buying"
          :loading="buying"
          :icon="buying ? 'lucide-spinner' : 'lucide-check'"
          variant="subtle"
          class="px-8"
          @click="handlePurchase"
        />
      </div>
    </template>
  </UCard>
</template>
