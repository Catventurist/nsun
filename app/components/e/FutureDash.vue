<script setup lang="ts">
import type { PageFeatureProps, ButtonProps } from '@nuxt/ui'

const features = ref<PageFeatureProps[]>([
  {
    title: 'Versatile',
    description: 'Suitable with almost any management purpose.',
    icon: 'i-lucide-vector-square',
    to: '/'
  },
  {
    title: 'Data Fetching',
    description: 'Many ways to organize and find information in one place.',
    icon: 'i-lucide-database',
    to: '/'
  },
  {
    title: 'Navigation',
    description: 'Use links on dedicated sections or keyboard shortcuts.',
    icon: 'i-lucide-search',
    to: '/'
  }
])
const links = ref<ButtonProps[]>([
  {
    label: 'Explore the example',
    to: 'https://dashboard-template.nuxt.dev/',
    color: 'info',
    variant: 'subtle',
    icon: 'i-lucide-layout-dashboard'
  }
])
</script>

<template>
  <UPageSection
    title="Beautiful Dashboard"
    description="Collection of components and utilities to manage data and settings."
    orientation="horizontal"
    :features="features"
    :links="links"
  >
    <UColorModeImage
      light="/hero/dashboard-light.png"
      dark="/hero/dashboard-dark.png"
      :width="512"
      :height="288"
      alt="Illustration"
      class="w-full rounded-lg"
      loading="lazy"
    />
  </UPageSection>
</template>
