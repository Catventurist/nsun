<script setup lang="ts">
import { motion } from 'motion-v'

interface ProjectCardProps {
  title?: string
  description?: string
  tags?: string[]
  image?: string
  links?: {
    demo?: string
    github?: string
  }
  class?: string
}

const pro: ProjectCardProps = {
  title: 'Growing Platform',
  description: 'Something interesting',
  tags: ['Nuxt', 'Node.js', 'Bun', 'Tailwind'],
  image: '/catbirchdark.webp',
  links: { demo: '/', github: '/' }
}
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4 }"
    class="w-full max-w-[400px]"
  >
    <div class="group relative h-full overflow-hidden rounded-2xl border-muted/50 bg-muted/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
      <div class="relative aspect-video overflow-hidden">
        <motion.img
          :src="pro.image"
          :alt="pro.title"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-linear-to-t from-muted/90 via-muted/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <motion.a
            v-if="pro.links?.demo"
            :href="pro.links.demo"
            :while-hover="{ scale: 1.1 }"
            :while-tap="{ scale: 0.95 }"
            class="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 backdrop-blur-md"
            title="View Demo"
          >
            <Icon
              name="lucide-external-link"
              class="size-5"
            />
          </motion.a>
          <motion.a
            v-if="pro.links?.github"
            :href="pro.links.github"
            :while-hover="{ scale: 1.1 }"
            :while-tap="{ scale: 0.95 }"
            class="flex size-10 items-center justify-center rounded-full bg-muted text-default shadow-lg backdrop-blur-md"
            title="View Code"
          >
            <Icon
              name="simple-icons-github"
              class="size-5"
            />
          </motion.a>
        </div>
      </div>
      <div class="p-5">
        <h3 class="mb-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {{ pro.title }}
        </h3>
        <p class="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {{ pro.description }}
        </p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(tag, index) in pro.tags"
            :key="index"
            :label="tag"
            variant="soft"
          />
        </div>
      </div>
    </div>
  </motion.div>
</template>
