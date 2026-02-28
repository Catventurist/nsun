<script setup lang="ts">
import { useElementBounding, useScroll, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref(null)
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const { height } = useWindowSize()
const { y: scrollY } = useScroll(window)
const { bottom } = useElementBounding(containerRef)

const scrollYProgress = computed(() => {
  if (!bottom.value) return 0
  return 1 - Math.max(0, bottom.value - scrollY.value) / height.value
})

const scaleDimensions = computed(() => (isMobile.value ? [0.7, 0.9] : [1.05, 1]))

const rotate = computed(() => 20 * (1 - scrollYProgress.value))
const scale = computed(() => {
  const [start, end] = scaleDimensions.value
  return Number(start) + (Number(end) - Number(start)) * scrollYProgress.value
})
const translateY = computed(() => -100 * scrollYProgress.value)
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex h-240 items-center justify-center p-2 md:h-320 md:p-20"
  >
    <div
      class="relative w-full py-10 md:py-40"
      style="perspective: 1000px"
    >
      <div
        :style="{ transform: `translateY(${translateY}px)` }"
        class="mx-auto max-w-5xl text-center"
      >
        <slot name="title" />
      </div>
      <div
        :style="{ transform: `rotateX(${rotate}deg) scale(${scale})` }"
        class="mx-auto mt-6 h-120 w-full shadow-xl shadow-primary max-w-5xl rounded-xl border-4 border-muted/60 bg-muted/60 p-2 md:h-160 md:p-6"
      >
        <div class="size-full overflow-hidden rounded-2xl bg-muted/70 md:rounded-2xl md:p-4">
          <slot name="card" />
        </div>
      </div>
    </div>
  </div>
</template>
