<script setup lang="ts">
interface FlipCardProps {
  rotate?: 'x' | 'y'
  class?: string
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: 'y'
})
const rotationClass = {
  x: ['group-hover:[transform:rotateX(180deg)]', '[transform:rotateX(180deg)]'],
  y: ['group-hover:[transform:rotateY(180deg)]', '[transform:rotateY(180deg)]']
}

const rotation = computed(() => rotationClass[props.rotate])
</script>

<template>
  <div
    class="group h-72 w-56 perspective-1000"
    :class="[props.class]"
  >
    <div
      class="relative h-full rounded-2xl transition-all duration-500 transform-3d"
      :class="[rotation[0]]"
    >
      <div class="absolute size-full overflow-hidden rounded-2xl shadow-sm shadow-primary backface-hidden">
        <slot />
      </div>
      <div
        class="absolute size-full overflow-hidden rounded-2xl border bg-muted/80 p-4 text-muted backface-hidden"
        :class="[rotation[1]]"
      >
        <slot name="back" />
      </div>
    </div>
  </div>
</template>
