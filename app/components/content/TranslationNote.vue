<script setup>
defineProps({
  status: {
    type: String,
    default: 'missing' // 'complete', 'in-progress', 'missing'
  },
  targetLocale: {
    type: String,
    required: true
  }
})

const statusConfig = {
  'missing': {
    container: 'bg-error/20 border-red-200',
    link: 'font-bold underline decoration-red-400 hover:decoration-red-600'
  },
  'in-progress': {
    container: 'bg-info/20 border-amber-200',
    link: 'font-bold underline decoration-amber-400 hover:decoration-amber-600'
  },
  'complete': {
    container: 'bg-success/20 border-emerald-200',
    link: 'font-bold underline decoration-emerald-400 hover:decoration-emerald-600'
  }
}
</script>

<template>
  <div :class="['flex items-center gap-3 p-4 border rounded-lg mb-6 transition-colors', statusConfig[status].container]">
    <div class="shrink-0 text-xl">
      <span v-if="status === 'missing'">🌐</span>
      <span v-else-if="status === 'in-progress'">✍️</span>
      <span v-else>✅</span>
    </div>

    <div class="text-sm sm:text-base">
      <p v-if="status === 'missing'">
        This page is not yet available in **{{ targetLocale }}**.
        <NuxtLinkLocale
          to="/"
          :class="statusConfig[status].link"
        >
          Start translating?
        </NuxtLinkLocale>
      </p>
      <p v-else-if="status === 'in-progress'">
        Translation for **{{ targetLocale }}** is currently underway.
        <NuxtLinkLocale
          to="/"
          target="_blank"
          :class="statusConfig[status].link"
        >
          Join the effort
        </NuxtLinkLocale>
      </p>
      <p v-else>
        This document is fully translated into **{{ targetLocale }}**.
      </p>
    </div>
  </div>
</template>
