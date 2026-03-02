<script setup lang='ts'>
import { motion, type Variants } from 'motion-v'

interface BlurFadeTextProps {
  text: string
  class?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  characterDelay?: number
  delay?: number
  yOffset?: number
  animateByCharacter?: boolean
}
const props = withDefaults(defineProps<BlurFadeTextProps>(), {
  duration: 0.4,
  characterDelay: 0.03,
  delay: 0,
  yOffset: 8,
  animateByCharacter: false
})
/* const BlurFadeText = ({
  text,
  class,
  variant,
  duration = 0.4,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) */

const defaultVariants: Variants = {
  hidden: { y: -props.yOffset, opacity: 0, filter: 'blur(8px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)' }
}
const combinedVariants = props.variant || defaultVariants
const characters = computed(() => Array.from(props.text))

const charVariants: Variants = {
  hidden: { y: -props.yOffset, opacity: 0, filter: 'blur(8px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)' }
}
</script>

<template>
  <div
    v-if="animateByCharacter"
    class="flex"
  >
    <motion.span
      v-for="(char, ind) in characters"
      :key="char"
      initial="hidden"
      animate="visible"
      :variants="(charVariants as any)"
      :transition="{ duration, delay: delay + ind * characterDelay, ease: 'easeOut' }"
      class="inline-block"
      :class="props.class"
      :style="{ width: char.trim()==='' ? '0.2em' : 'auto' }"
    >
      {{ char }}
    </motion.span>
  </div>
  <div
    v-else
    class="flex"
  >
    <motion.span
      initial="hidden"
      animate="visible"
      :variants="(combinedVariants as any)"
      :transition="{ duration, delay, ease: 'easeOut' }"
      class="inline-block"
      :class="props.class"
    >
      {{ text }}
    </motion.span>
  </div>
</template>
