<script setup lang="ts">
import { Motion } from 'motion-v'

const users = ref([
  {
    name: 'Benjamin Canac',
    description: 'benjamincanac',
    to: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: {
      src: '/hero/random-1.avif',
      alt: 'benjamincanac',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Romain Hamel',
    description: 'romhml',
    to: 'https://github.com/romhml',
    target: '_blank',
    avatar: {
      src: '/hero/random-2.avif',
      alt: 'romhml',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Sébastien Chopin',
    description: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: '/hero/random-3.avif',
      alt: 'atinux',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Hugo Richard',
    description: 'HugoRCD',
    to: 'https://github.com/HugoRCD',
    target: '_blank',
    avatar: {
      src: '/hero/random-4.avif',
      alt: 'HugoRCD',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Sandro Circi',
    description: 'sandros94',
    to: 'https://github.com/sandros94',
    target: '_blank',
    avatar: {
      src: '/hero/random-5.avif',
      alt: 'sandros94',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Daniel Roe',
    description: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: '/hero/random-6.avif',
      alt: 'danielroe',
      loading: 'lazy' as const
    }
  }
])
</script>

<template>
  <UPageGrid class="mt-10">
    <UPageCard
      v-for="(user, index) in users"
      :key="index"
      variant="ghost"
      :to="user.to"
      :target="user.target"
    >
      <template #body>
        <Motion
          as="div"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :while-press="{ opacity: 0.8, scale: 0.9 }"
          :while-hover="{ opacity: 1, scale: 1.1 }"
          class="z-10"
        >
          <UUser
            :name="user.name"
            :description="user.description"
            :avatar="user.avatar"
            size="xl"
          />
        </Motion>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
