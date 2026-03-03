<script setup lang="ts">
const cards = ref([
  {
    title: 'Dashboard',
    description: 'Interface for various actions.',
    icon: 'i-lucide-swatch-book',
    to: '/',
    class: 'lg:col-span-2',
    image: {
      path: '/hero/random-1.avif',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const
  },
  {
    title: 'Search',
    description: 'Integrates with content to provide easily available information.',
    icon: 'i-lucide-search',
    to: '/',
    variant: 'soft' as const
  },
  {
    title: 'Shortcuts',
    description: 'Categorized links with localized paths.',
    icon: 'i-lucide-link',
    to: '',
    variant: 'soft' as const
  },
  {
    title: 'Quick Actions',
    description: 'Manage files, view in different ways.',
    icon: 'i-lucide-keyboard',
    to: '/',
    image: {
      path: '/hero/random-2.avif',
      width: 362,
      height: 184
    },
    class: 'lg:col-span-2',
    orientation: 'horizontal' as const,
    reverse: true
  },
  {
    title: 'Settings',
    description: 'Manage profile and site features.',
    icon: 'i-lucide-settings',
    to: '/',
    class: 'lg:col-span-2',
    image: {
      path: '/hero/random-3.avif',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const
  },
  {
    title: 'Statuses',
    description: 'Indicators for actions, notifications and events.',
    icon: 'i-lucide-circle-alert',
    to: '/',
    variant: 'soft' as const
  }
])
</script>

<template>
  <UPageGrid class="mx-2">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    >
      <NuxtImg
        v-if="card.image"
        :src="card.image.path"
        :width="card.image.width"
        :height="card.image.height"
        :alt="card.title"
        loading="lazy"
        class="w-full rounded-xl"
      />
    </UPageCard>
  </UPageGrid>
</template>
