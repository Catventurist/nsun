<script setup lang="ts">
interface Product {
  id: string | number
  title: string
  price: number
  image: string
  category: string
  isNew: boolean
}

interface Props {
  title?: string
  description?: string
  buttonLabel?: string
  buttonLink?: string
  items?: Product[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Arrivals',
  description: 'Explore our latest additions and trending products.',
  buttonLabel: 'View All',
  buttonLink: '/',
  items: () => []
})
</script>

<template>
  <section class="py-12 space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          {{ props.title }}
        </h2>
        <p
          v-if="description"
          class="text-muted max-w-2xl"
        >
          {{ description }}
        </p>
      </div>
      <UButton
        :to="buttonLink"
        variant="link"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
        class="p-0 font-semibold"
      >
        {{ buttonLabel }}
      </UButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard
        v-for="item in items"
        :key="item.id"
        class="group relative"
      >
        <div class="aspect-4/5 overflow-hidden rounded-t-lg bg-muted">
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            :height="100"
            class="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            v-if="item.isNew"
            class="absolute top-3 left-3"
          >
            <UBadge
              label="New"
              color="primary"
              variant="solid"
              size="xs"
              class="uppercase tracking-wider font-bold"
            />
          </div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
            <UButton
              icon="i-lucide-eye"
              color="primary"
              variant="soft"
              square
              class="shadow-xl shadow-primary"
            />
          </div>
        </div>
        <div class="p-4 space-y-1">
          <span class="text-xs font-medium text-primary uppercase">
            {{ item.category }}
          </span>
          <h3 class="font-semibold truncate">
            {{ item.title }}
          </h3>
          <p class="font-bold text-lg">
            {{ item.price }}€
          </p>
        </div>
        <template #footer>
          <UButton
            label="Add to Bag"
            block
            icon="i-lucide-shopping-bag"
            variant="soft"
            color="primary"
          />
        </template>
      </UCard>
    </div>
  </section>
</template>
