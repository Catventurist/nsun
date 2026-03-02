<script setup lang="ts">
import { AnimatePresence, motion, useInView, type Variants } from 'motion-v'

interface BlurFadeProps {
  class?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: string
  blur?: string
}
/*
const BlurFade = ({
  children,
  class,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) */
const props = withDefaults(defineProps<BlurFadeProps>(), {
  duration: 0.4,
  delay: 0,
  yOffset: 6,
  inView: false,
  inViewMargin: '-50px',
  blur: '6px'
})
const aref = ref(null)
const inViewResult = useInView(aref, {
  once: true,
  ...(props.inViewMargin ? { margin: props.inViewMargin } : {})
})
const isInView = !props.inView || inViewResult
const defaultVariants: Variants = {
  hidden: { y: -props.yOffset, opacity: 0, filter: `blur(${props.blur})` },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)' }
}
const combinedVariants = props.variant || defaultVariants
</script>

<template>
  <AnimatePresence>
    <motion.div
      ref="aref"
      initial="hidden"
      :animate="isInView ? 'visible' : 'hidden'"
      exit="hidden"
      :variants="(combinedVariants as any)"
      :transition="{ delay: 0.04 + delay, duration, ease: 'easeOut' }"
      :class="props.class"
    >
      <slot />
    </motion.div>
  </AnimatePresence>
</template>
