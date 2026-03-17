<script setup lang="ts">
interface SpecItem {
  label: string
  icon: string
  current: string | number
  target: string
  unit?: string
  status?: 'optimal' | 'warning' | 'alert'
}

interface Props {
  title?: string
  specs?: SpecItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  specs: () => []
})

const getStatusColor = (status?: string) => {
  const colors = {
    optimal: 'text-success bg-success/20 border-success/60',
    warning: 'text-warning bg-warning/20 border-warning/60',
    alert: 'text-error bg-error/20 border-error-/60'
  }
  return colors[status as keyof typeof colors] || 'text-muted bg-default/80 border-muted'
}
</script>

<template>
  <div class="my-8 border border-muted rounded-2xl overflow-hidden">
    <div class="px-6 py-4 border-b border-muted bg-muted/50 flex items-center gap-2">
      <Icon
        name="lucide:clipboard-list"
        class="size-5 text-primary"
      />
      <h3 class="uppercase tracking-wide text-sm text-default">
        {{ props.title }}
      </h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <UCard
        v-for="spec in specs"
        :key="spec.label"
        class="p-6 transition-colors duration hover:bg-radial from-primary/20"
      >
        <div class="flex items-start justify-between mb-4">
          <div :class="['p-2 rounded-lg border', getStatusColor(spec.status)]">
            <Icon
              :name="spec.icon"
              class="size-5"
            />
          </div>
          <span
            v-if="spec.status"
            :class="['text-[10px] uppercase px-2 py-0.5 rounded-full border border-muted', getStatusColor(spec.status)]"
          >
            {{ $t(`strain.status.${spec.status}`) }}
          </span>
        </div>
        <h4 class="text-xs font-bold text-muted uppercase tracking-tighter mb-1">
          {{ spec.label }}
        </h4>
        <div class="flex items-baseline gap-1 mb-2">
          <span class="text-2xl text-default">
            {{ spec.current }}
          </span>
          <span
            v-if="spec.unit"
            class="text-sm font-bold text-muted"
          >
            {{ spec.unit }}
          </span>
        </div>
        <div class="pt-3 border-t border-dashed border-muted flex flex-col items-center justify-between">
          <span class="text-[10px] font-bold text-primary uppercase">
            {{ $t('strain.goalv') }}
          </span>
          <span class="text-md font-mono font-bold text-dimmed">
            {{ spec.target }}
          </span>
        </div>
      </UCard>
    </div>
    <div
      v-if="$slots.default"
      class="p-6 border-t border-muted prose prose-sm dark:prose-invert"
    >
      <slot />
    </div>
  </div>
</template>
