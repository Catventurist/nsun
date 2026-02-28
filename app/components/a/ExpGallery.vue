<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface Props {
  images: string[]
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="flex h-96 w-full gap-2"
    :class="props.class"
  >
    <div
      v-for="image in images"
      :key="image"
      class="relative flex h-full flex-1 cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ease-in-out delay-100 hover:flex-3 active:scale-120"
    >
      <NuxtImg
        class="relative h-full object-cover"
        :src="image"
        :alt="image"
        :height="200"
        :width="540"
      />
    </div>
  </div>
</template>
