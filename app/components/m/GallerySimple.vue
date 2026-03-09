<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

interface ImageGalleryProps {
  images?: string[]
  interval?: number
}

const props = withDefaults(defineProps<ImageGalleryProps>(), {
  images: () => [
    '/catbirchdark.webp',
    '/catbirch.webp',
    '/nsbg-dark.webp'
  ],
  interval: 5000
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

onMounted(() => {
  timer = setInterval(next, props.interval)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative p-4 w-full aspect-video overflow-hidden rounded-2xl border border-muted">
    <AnimatePresence>
      <Motion
        :key="currentIndex"
        as="img"
        :src="props.images[currentIndex]"
        class="absolute inset-0 size-full object-cover"
        :initial="{ opacity: 0, scale: 1.1, x: 20 }"
        :animate="{ opacity: 1, scale: 1, x: 0 }"
        :exit="{ opacity: 0, scale: 0.9, x: -20 }"
        :transition="{ duration: 0.8, ease: 'easeInOut' }"
      />
    </AnimatePresence>
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 px-4 py-2 bg-default/20 backdrop-blur-md rounded-full border border-muted">
      <UButton
        v-for="(_, index) in props.images"
        :key="index"
        class="h-1.5 transition-all duration-300 rounded-full"
        :class="index === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-muted/40 hover:bg-muted/60'"
        @click="currentIndex = index"
      />
    </div>
    <div class="absolute top-4 right-4 px-3 py-1 bg-default/40 backdrop-blur-sm rounded-lg text-xs font-medium text-muted/90 tabular-nums border border-muted/10">
      {{ currentIndex + 1 }} / {{ props.images.length }}
    </div>
  </div>
</template>
