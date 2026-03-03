<script setup lang='ts'>
import { motion, useScroll, useTransform } from 'motion-v'

const aref = ref(null)
const { scrollYProgress } = useScroll({
  target: aref,
  offset: ['start start', 'end start']
})

const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
const stars = ref(6)
</script>

<template>
  <div
    ref="aref"
    class="relative mt-20 min-h-[400px] w-full flex flex-col items-center justify-center overflow-hidden"
  >
    <motion.div
      :style="{ y, opacity }"
      class="absolute top-0 inset-0 z-0"
    >
      <div class="absolute inset-0 bg-linear-to-b from-default via-default/90 to-default z-10" />
      <div class="absolute inset-0 bg-[linear(#d1d5db_1.5px,transparent_1.5px)] [default-size:20px_20px] opacity-[0.15] dark:bg-[radial-linear(#374151_1.5px,transparent_1.5px)] dark:opacity-[0.25]" />
      <div class="absolute inset-0 bg-[linear(ellipse_at_center,var(--tw-linear-stops))] from-sidebar-primary/20 via-default to-default blur-3xl" />
      <motion.div
        :animate="{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -30, 0] }"
        :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
        class="absolute top-1/4 left-1/4 size-64 bg-primary/30 rounded-full blur-[100px]"
      />
      <motion.div
        :animate="{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0], y: [0, 30, 0] }"
        :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/20 rounded-full blur-[120px]"
      />
    </motion.div>
    <div class="relative z-20 text-center px-4">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <h1 class="text-5xl sm:text-7xl md:text-[10rem] font-bold tracking-tighter mb-6">
          <span class="inline-block bg-clip-text text-transparent bg-linear-to-r from-primary via-primary/80 to-primary/50 letter-spacing-[2px]">
            {{ $t('sponsors.title') }}
          </span>
        </h1>
      </motion.div>
      <motion.p
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
        class="text-xl sm:text-2xl text-muted max-w-2xl mx-auto font-light"
      >
        {{ $t('sponsors.description') }}
        <MCountUp
          :max="stars"
          :min="0"
          class="text-warning text-4xl"
        />
        <span class="text-default font-medium">
          {{ $t('sponsors.starg') }}
        </span>,
        <br>
        {{ $t('sponsors.believe') }}
      </motion.p>
      <motion.div
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
        class="mt-8"
      >
        <div class="h-1 w-24 mx-auto bg-linear-to-r from-transparent via-primary to-transparent rounded-full opacity-50" />
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
        class="mt-8"
      >
        <NuxtLink
          to="https://github.com/catventurist"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-default text-default rounded-full font-medium duration-300 hover:scale-105 hover:bg-primary/20 active:scale-90 group"
        >
          <Icon name="simple-icons-github" />
          <span>
            {{ $t('sponsors.star') }}
          </span>
        </NuxtLink>
      </motion.div>
    </div>
  </div>
</template>
