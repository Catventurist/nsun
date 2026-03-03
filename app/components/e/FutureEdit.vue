<script setup lang="ts">
import type { PageFeatureProps, ButtonProps } from '@nuxt/ui'

const features = ref<PageFeatureProps[]>([
  {
    title: 'Versatile',
    description: 'Suitable with almost any editing purpose.',
    icon: 'i-lucide-pen',
    to: '/'
  },
  {
    title: 'Multiple Editors',
    description: 'Try which works with you the best.',
    icon: 'i-lucide-file-edit',
    to: '/'
  },
  {
    title: 'User management',
    description: 'OAuth logins and permissions.',
    icon: 'i-lucide-users',
    to: '/'
  }
])
const links = ref<ButtonProps[]>([
  {
    label: 'Read Documentation',
    to: 'https://nuxt.studio/introduction',
    color: 'info',
    variant: 'subtle',
    icon: 'i-lucide-book'
  }
])
</script>

<template>
  <UPageSection
    title="Content Editing & Management"
    description="Studio module makes it easier, than expected."
    orientation="horizontal"
    reverse
    :features="features"
    :links="links"
  >
    <UColorModeImage
      light="/hero/editor-light.png"
      dark="/hero/editor-dark.png"
      :width="512"
      :height="288"
      alt="Illustration"
      class="w-full rounded-lg"
      loading="lazy"
    />
  </UPageSection>
</template>
