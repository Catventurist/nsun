<script setup lang="ts">
interface Quality {
  label: string
  value: string
  icon: string
}

interface Props {
  name?: string
  price?: number
  image?: string
  badgeLabel?: string
  badgeColor?: 'primary' | 'warning' | 'success' | 'error' | 'info'
  rating?: number
  inStock?: boolean
  ctaLink?: string
  ctaLabel?: string
  qualities?: Quality[]
}

const props = withDefaults(defineProps<Props>(), {
  name: 'New Product',
  price: 0,
  badgeColor: 'success',
  rating: 0,
  inStock: true,
  ctaLabel: 'Add to Cart',
  qualities: () => []
})

const accordionItems = computed(() => {
  if (!props.qualities.length) return []
  return [{
    label: $t('product.details'),
    icon: 'i-lucide-list-checks',
    slot: 'details'
  }]
})
</script>

<template>
  <div>
    <UCard class="flex flex-col h-full overflow-hidden mb-12 transition-all hover:ring-2 hover:ring-primary/40">
      <template #header>
        <div class="relative -m-4 mb-4 min-h-[200px] flex items-center justify-center">
          <NuxtImg
            v-if="image"
            :src="image"
            :alt="name"
            :height="256"
            class="h-64 w-full object-cover"
          />
          <UIcon
            v-else
            name="i-lucide-image"
            class="size-12 text-muted"
          />

          <UBadge
            v-if="badgeLabel"
            :color="badgeColor"
            variant="subtle"
            class="absolute top-4 right-4 bg-muted/40 shadow-sm shadow-primary"
          >
            {{ badgeLabel }}
          </UBadge>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-leaf"
              class="text-success size-5 shrink-0"
            />
            <h3 class="font-bold text-2xl tracking-tight">
              {{ name }}
            </h3>
          </div>
          <div
            v-if="rating > 0"
            class="flex items-center gap-0.5"
          >
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-lucide-star"
              class="size-4"
              :class="i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'"
            />
          </div>
        </div>
      </template>
      <div class="prose prose-sm max-w-none text-muted mb-6">
        <slot />
      </div>
      <UAccordion
        v-if="qualities.length"
        :items="accordionItems"
        :ui="{ content: 'border border-muted rounded-lg overflow-hidden mb-4' }"
      >
        <template #details>
          <ul class="p-4 space-y-3 bg-muted/30">
            <li
              v-for="q in qualities"
              :key="q.label"
              class="flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2.5 text-muted font-medium">
                <UIcon
                  :name="q.icon"
                  class="size-4 text-success"
                />
                <span>{{ q.label }}</span>
              </div>
              <span class="font-bold px-2 py-0.5 rounded border border-muted">
                {{ q.value }}
              </span>
            </li>
          </ul>
        </template>
      </UAccordion>
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-2xl">
              {{ price }}€
            </span>
            <div class="flex items-center gap-1.5">
              <span
                class="size-2 rounded-full"
                :class="inStock ? 'bg-success' : 'bg-error'"
              />
              <span class="text-[10px] uppercase tracking-widest font-bold text-muted">
                {{ inStock ? $t('product.stockin') : $t('product.stockout') }}
              </span>
            </div>
          </div>
          <slot name="footer">
            <UButton
              :to="ctaLink"
              :label="inStock ? ctaLabel : $t('product.notify')"
              :disabled="!inStock"
              :color="inStock ? 'success' : 'neutral'"
              variant="soft"
              size="xl"
              :trailing-icon="inStock ? 'i-lucide-shopping-bag' : 'i-lucide-bell'"
            />
          </slot>
        </div>
      </template>
    </UCard>
  </div>
</template>
