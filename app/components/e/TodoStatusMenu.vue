<script setup lang="ts">
import type { InputMenuItem } from '@nuxt/ui'

const items = ref([
  {
    label: $t('tasks.backlog'),
    value: 'backlog',
    icon: 'i-lucide-circle-help',
    class: '**:text-warning'
  },
  {
    label: $t('tasks.todo'),
    value: 'todo',
    icon: 'i-lucide-circle-plus',
    class: '**:text-neutral'
  },
  {
    label: $t('tasks.pending'),
    value: 'pending',
    icon: 'i-lucide-circle-arrow-up',
    class: '**:text-info'
  },
  {
    label: $t('tasks.done'),
    value: 'done',
    icon: 'i-lucide-circle-check',
    class: '**:text-success'
  },
  {
    label: $t('tasks.canceled'),
    value: 'canceled',
    icon: 'i-lucide-circle-x',
    class: '**:text-error'
  }
] satisfies InputMenuItem[])

const pitems = ref([
  {
    label: $t('tasks.high'),
    value: 'high',
    icon: 'i-lucide-arrow-up',
    class: '**:text-warning'
  },
  {
    label: $t('tasks.medium'),
    value: 'medium',
    icon: 'i-lucide-minus'
  },
  {
    label: $t('tasks.low'),
    value: 'low',
    icon: 'i-lucide-arrow-down',
    class: '**:text-info'
  }
] satisfies InputMenuItem[])

const value = ref(items.value[0])
const pvalue = ref(pitems.value[0])
</script>

<template>
  <div class="flex flex-row">
    <UInputMenu
      v-model="value"
      :icon="value?.icon"
      :class="value?.class"
      :items="items"
    />
    <UInputMenu
      v-model="pvalue"
      :icon="pvalue?.icon"
      :class="pvalue?.class"
      :items="pitems"
    />
  </div>
</template>
