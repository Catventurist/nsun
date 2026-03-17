<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <MLampCont>
    <motion.h1
      :initial="{ opacity: 0.2, y: 100 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :while-hover="{ y: 20 }"
      :while-press="{ opacity: 0, y: -100 }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut'
      }"
      class="cursor-pointer bg-linear-to-b from-warning to-info py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
      Northern Sun
    </motion.h1>
  </MLampCont>
</template>
