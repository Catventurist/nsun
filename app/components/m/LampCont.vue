<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'

interface LampContainerProps {
  class?: string
  fromColor?: string
  toColor?: string
  centerColor?: string
  glowColor?: string
  lineColor?: string
}

const props = withDefaults(defineProps<LampContainerProps>(), {
  fromColor: 'var(--color-primary-500, #0ea5e9)',
  toColor: 'var(--color-primary-500, #0ea5e9)',
  centerColor: 'var(--color-primary-500, #0ea5e9)',
  glowColor: 'var(--color-primary-400, #38bdf8)',
  lineColor: 'var(--color-primary-400, #38bdf8)'
})

const getColorValue = (colorProp: string): string => {
  if (colorProp.startsWith('#') || colorProp.startsWith('rgb') || colorProp.startsWith('hsl') || colorProp.startsWith('var(')) {
    return colorProp
  }
  const cleanClass = colorProp.replace(/^bg-/, '')
  return `var(--color-${cleanClass})`
}

const leftGradientStyle = computed(() => ({
  backgroundImage: `conic-gradient(var(--conic-position), ${getColorValue(props.fromColor)}, transparent, transparent)`
}))

const rightGradientStyle = computed(() => ({
  backgroundImage: `conic-gradient(var(--conic-position), transparent, transparent, ${getColorValue(props.toColor)})`
}))

const centerColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.centerColor)
}))

const glowColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.glowColor)
}))

const lineColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.lineColor)
}))
</script>

<template>
  <div
    :class="[
      'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-default/80 w-full rounded-md z-0',
      props.class
    ]"
  >
    <div class="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
      <Motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :while-in-view="{ opacity: 1, width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }"
        :style="leftGradientStyle"
        class="absolute inset-auto right-1/2 h-56 overflow-visible w-120 text-default [--conic-position:from_70deg_at_center_top]"
      >
        <div class="absolute w-full left-0 bg-default h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
        <div class="absolute w-40 h-full left-0 bg-default bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" />
      </Motion>
      <Motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :while-in-view="{ opacity: 1, width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }"
        :style="rightGradientStyle"
        class="absolute inset-auto left-1/2 h-56 w-120 text-default [--conic-position:from_290deg_at_center_top]"
      >
        <div class="absolute w-40 h-full right-0 bg-default bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
        <div class="absolute w-full right-0 bg-default h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
      </Motion>
      <div class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-default blur-2xl" />
      <div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
      <div
        class="absolute inset-auto z-50 h-36 w-md -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        :style="centerColorStyle"
      />
      <Motion
        :initial="{ width: '8rem' }"
        :while-in-view="{ width: '16rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }"
        class="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full blur-2xl"
        :style="glowColorStyle"
      />

      <Motion
        :initial="{ width: '15rem' }"
        :while-in-view="{ width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }"
        class="absolute inset-auto z-50 h-0.5 w-120 -translate-y-28"
        :style="lineColorStyle"
      />

      <div class="absolute inset-auto z-40 h-44 w-full -translate-y-50 bg-default" />
    </div>

    <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">
      <slot />
    </div>
  </div>
</template>
