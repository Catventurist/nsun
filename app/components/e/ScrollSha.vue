<script setup lang="ts">
const el = useTemplateRef('el')

const { style } = useScrollShadow(el, { size: 48 })
</script>

<template>
  <div
    ref="el"
    class="max-h-[300px] overflow-y-auto"
    :style="style"
  >
    <UCard class="size-full">
      <NuxtImg
        src="/catbirchdark.webp"
        alt="cat"
        :height="600"
      />
    </UCard>
  </div>
</template>
