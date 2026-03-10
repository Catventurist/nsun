<script setup lang="ts">
interface Props {
  title: string
  description?: string
  price: number
  currency?: string
  image?: string
  category?: string
  rating?: number
  reviewsCount?: number
  vendorName?: string
  vendorAvatar?: string
  vendorLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  image: '/catbirchdark.webp',
  rating: 5,
  reviewsCount: 0,
  vendorName: 'Northern Store',
  vendorAvatar: '/cat.png',
  vendorLink: '#'
})
</script>

<template>
  <UCard class="group overflow-hidden">
    <template #header>
      <div class="relative h-56 -m-4 overflow-hidden">
        <NuxtImg
          :src="image"
          :height="224"
          class="size-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <UBadge
          v-if="category"
          variant="subtle"
          class="absolute top-4 left-4 backdrop-blur-md bg-muted/80"
        >
          {{ props.category }}
        </UBadge>
      </div>
    </template>

    <div class="space-y-3">
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg leading-tight">
          {{ title }}
        </h3>
        <div class="flex items-center gap-1 text-warning">
          <UIcon
            name="i-lucide-star"
            class="size-4 fill-current"
          />
          <span class="text-xs font-medium text-primary">
            {{ rating }} ({{ reviewsCount }})
          </span>
        </div>
      </div>
      <p class="text-sm text-muted line-clamp-2">
        {{ description }}
      </p>

      <div class="flex items-center gap-2 pt-2 border-t border-muted">
        <UAvatar
          :src="vendorAvatar"
          :alt="vendorName"
          size="xs"
        />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium truncate">
            {{ vendorName }}
          </p>
          <p class="text-[10px] text-muted">
            Verified Seller
          </p>
        </div>
        <UButton
          :to="vendorLink"
          variant="ghost"
          icon="i-lucide-external-link"
          size="xs"
          square
        />
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-xs text-muted line-through">
            {{ currency }} {{ (price * 1.2).toFixed(0) }}
          </span>
          <span class="text-xl font-bold text-primary">
            {{ currency }} {{ price }}
          </span>
        </div>
        <UButton
          icon="i-lucide-plus"
          label="Add"
          color="info"
          variant="soft"
          class="rounded-full"
        />
      </div>
    </template>
  </UCard>
</template>
