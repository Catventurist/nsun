<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AnimatePresence, Motion } from 'motion-v'

interface WordItem {
  text: string
  to: string
  description?: string
  icon?: string
}

interface WordCloudProps {
  items?: WordItem[]
  colors?: string[]
}

const props = withDefaults(defineProps<WordCloudProps>(), {
  items: () => [
    { text: 'Nuxt', to: '/', description: 'The Intuitive Web Framework', icon: 'simple-icons-nuxt' },
    { text: 'Vue', to: 'https://vuejs.org', description: 'The Progressive JavaScript Framework', icon: 'simple-icons-vuedotjs' },
    { text: 'Studio', to: 'https://nuxt.studio', description: 'Collaborative CMS for Nuxt', icon: 'simple-icons-nuxt' },
    { text: 'Tailwind', to: 'https://tailwindcss.com', description: 'A utility-first CSS framework', icon: 'simple-icons-tailwindcss' },
    { text: 'Nitro', to: 'https://nitro.unjs.io', description: 'The next-generation server engine', icon: 'simple-icons-nuxt' }
  ],
  colors: () => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
})

const wordMetadata = ref<any[]>([])
const activeWord = ref<any | null>(null)
const mousePos = ref({ x: 0, y: 0 })

const handleMouseMove = (e: MouseEvent) => {
  mousePos.value = { x: e.clientX, y: e.clientY }
}

const onMouseMove = (e: MouseEvent) => {
  mousePos.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  wordMetadata.value = props.items.map(item => ({
    ...item,
    top: `${Math.random() * 70 + 10}%`,
    left: `${Math.random() * 70 + 10}%`,
    size: `${Math.floor(Math.random() * (3 - 1.5) + 2)}rem`,
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    duration: Math.random() * 3 + 4,
    yOffset: Math.random() * 15 + 5
  }))
})

onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<template>
  <div class="relative w-full h-[500px] rounded-3xl overflow-hidden border border-primary/10 select-none">
    <div
      v-for="(word, i) in wordMetadata"
      :key="i"
      class="absolute transition-all duration-500"
      :style="{ top: word.top, left: word.left, zIndex: activeWord === word ? 50 : 10 }"
    >
      <Motion
        :animate="{ y: [0, word.yOffset, 0] }"
        :transition="{ duration: word.duration, repeat: Infinity, ease: 'linear' }"
      >
        <NuxtLink
          :to="word.to"
          class="block no-underline transition-opacity"
          :class="activeWord && activeWord !== word ? 'opacity-30 scale-95' : 'opacity-100 scale-100'"
          :style="{ fontSize: word.size, color: word.color, textShadow: `0 0 40px ${word.color}44` }"
          @mouseenter="activeWord = word"
          @mouseleave="activeWord = null"
        >
          {{ word.text }}
        </NuxtLink>
      </Motion>
    </div>
    <AnimatePresence>
      <Motion
        v-if="activeWord?.description"
        key="tooltip"
        as="div"
        class="fixed z-20 pointer-events-none backdrop-blur-sm border border-primary/20 rounded-xl shadow-2xl max-w-[200px]"
        :style="{
          left: `${mousePos.x + 20}px`,
          top: `${mousePos.y + 20}px`
        }"
        :initial="{ opacity: 0, scale: 0.5, y: 10 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.5 }"
        :transition="{ duration: 0.2 }"
      >
        <div class="flex flex-row  justify-around gap-2 p-2 text-primary backdrop-blur-sm">
          <Icon
            :name="activeWord.icon"
            class="text-2xl"
          />
          {{ activeWord.description }}
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>

<style scoped>
.fixed {
  will-change: left, top;
}
</style>
