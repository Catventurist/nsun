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
  <!-- <div class="relative w-full h-[500px] overflow-hiddenrounded-2xl border border-primary/10">
    <div
      v-for="(word, index) in wordMetadata"
      :key="index"
      class="absolute transition-transform duration-300"
      :style="{ top: word.top, left: word.left }"
    >
      <Motion
        tag="div"
        :animate="{ y: [0, word.yOffset, 0] }"
        :transition="{ duration: word.duration, repeat: Infinity, ease: 'easeInOut' }"
      >
        <NuxtLink
          :to="word.to"
          class="block no-underline hover:scale-110 hover:opacity-100 opacity-70"
          :style="{ fontSize: word.size, color: word.color }"
          @mouseenter="activeWord = word"
          @mouseleave="activeWord = null"
        >
          {{ word.text }}
        </NuxtLink>
      </Motion>
    </div>
    <Presence>
      <Motion
        v-if="activeWord"
        key="tooltip"
        class="fixed z-100 pointer-events-none px-4 py-2 bg-default/90 backdrop-blur-md border border-primary/20 rounded-lg shadow-xl shadow.primary"
        :initial="{
          opacity: 0,
          scale: 0.9,
          x: mousePos.x + 15,
          y: mousePos.y + 15
        }"
        :animate="{
          opacity: 1,
          scale: 1,
          x: mousePos.x + 15,
          y: mousePos.y + 15
        }"
        :exit="{ opacity: 0, scale: 0.9 }"
        :transition="{
          x: { duration: 0 },
          y: { duration: 0 },
          opacity: { duration: 0.2 }
        }"
      >
        <div class="text-primary text-sm font-medium">
          {{ activeWord.description }}
        </div>
      </Motion>
    </Presence>
  </div>

   <div class="relative w-full h-[600px] overflow-hidden rounded-3xl border border-muted/10">
    <Motion
      v-for="(word, index) in wordMetadata"
      :key="index"
      tag="div"
      class="absolute z-10"
      :style="{ top: word.top, left: word.left }"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 0.8, scale: 1, y: [0, word.yOffset, 0] }"
      :transition="{ y: { duration: word.duration, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: word.delay } }"
    >
      <NuxtLink
        :to="word.to"
        class="block transition-all duration-300 hover:scale-125 hover:z-50 hover:opacity-100 no-underline"
        :style="{ fontSize: word.size, color: word.color, textShadow: `0 0 30px ${word.color}66` }"
        @mouseenter="activeWord = word"
        @mouseleave="activeWord = null"
      >
        {{ word.text }}
      </NuxtLink>
    </Motion>
    <AnimatePresence>
      <Motion
        v-if="activeWord?.description"
        as="div"
        class="fixed z-20 px-4 py-3 bg-muted/10 backdrop-blur-xl border border-muted/20 rounded-2xl shadow-2xl pointer-events-none max-w-xs"
        :animate="{ x: mousePos.x + 20, y: mousePos.y + 20, opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.8 }"
        :transition="{ type: 'spring', damping: 20, stiffness: 300 }"
      >
        <p class="text-xs font-bold uppercase tracking-widest text-muted/50 mb-1">
          Definition
        </p>
        <p class="text-muted text-sm leading-relaxed font-medium">
          {{ activeWord.description }}
        </p>
        <div class="mt-2 text-[10px] text-muted/30 italic flex items-center gap-1">
          <span class="w-1 h-1 rounded-full bg-muted/30" />
          Click to visit {{ activeWord.text }}
        </div>
      </Motion>
    </AnimatePresence>
    <div
      v-if="items.length === 0"
      class="flex items-center justify-center h-full text-muted"
    >
      Configure your links and descriptions in the sidebar
    </div>
  </div>
  <div
    class="relative w-full overflow-hidden rounded-3xl border border-muted"
    :style="{ height: height }"
  >
    <div class="absolute inset-0 bg-linear-to-br from-info/5 via-transparent to-primary/5 pointer-events-none" />
    <Motion
      v-for="(word, index) in wordMetadata"
      :key="index"
      as="span"
      class="absolute cursor-default font-bold mutedspace-nowrap select-none hover:z-50 hover:scale-110 transition-transform duration-300"
      :style="{
        top: word.top,
        left: word.left,
        fontSize: word.size,
        color: word.color,
        textShadow: `0 0 20px ${word.color}44`
      }"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{
        opacity: 0.8,
        scale: 1,
        y: [0, word.yOffset, 0]
      }"
      :transition="{
        opacity: { duration: 1, delay: word.delay },
        scale: { duration: 1, delay: word.delay },
        y: {
          duration: word.duration,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }"
    >
      {{ word.text }}
    </Motion>
    <div
      v-if="words.length === 0"
      class="flex items-center justify-center h-full text-muted"
    >
      Add words in the sidebar to populate the cloud
    </div>
  </div> -->
</template>

<style scoped>
.fixed {
  will-change: left, top;
}
</style>
