<script setup lang="ts">
interface Props {
  title?: string
  season?: string
  depth?: string
  spacing?: string
  temperature?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hemp Planting Specification',
  season: 'Spring / Early Summer',
  depth: '0.5 - 1.0 inches',
  spacing: '4 - 6 inches',
  temperature: '50°F (10°C)'
})
</script>

<template>
  <div class="my-6 border border-muted rounded-xl overflow-hidden">
    <div class="p-6 border-b border-muted bg-muted/50">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-bold mt-0 mb-1">
            {{ props.title }}
          </h2>
          <div class="flex items-center gap-2 text-sm text-muted">
            <UIcon
              name="i-lucide-calendar"
              class="size-4"
            />
            Optimal Window: {{ season }}
          </div>
        </div>
        <UBadge
          color="success"
          variant="subtle"
          size="lg"
          class="font-semibold uppercase"
        >
          Industrial Grade
        </UBadge>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-b border-muted dark:divide-gray-800">
      <div class="p-4 flex flex-col items-center text-center gap-1">
        <UIcon
          name="i-lucide-ruler"
          class="size-6 text-primary"
        />
        <span class="text-xs uppercase font-bold text-muted">Sowing Depth</span>
        <span class="font-medium text-primary">{{ depth }}</span>
      </div>
      <div class="p-4 flex flex-col items-center text-center gap-1">
        <UIcon
          name="i-lucide-thermometer-sun"
          class="size-6 text-warning"
        />
        <span class="text-xs uppercase font-bold text-muted">Min Soil Temp</span>
        <span class="font-medium text-primary">{{ temperature }}</span>
      </div>
      <div class="p-4 flex flex-col items-center text-center gap-1">
        <UIcon
          name="i-lucide-arrow-left-right"
          class="size-6 text-info"
        />
        <span class="text-xs uppercase font-bold text-muted">Row Spacing</span>
        <span class="font-medium text-primary">{{ spacing }}</span>
      </div>
    </div>
    <div class="p-6 grid gap-6 md:grid-cols-2">
      <section>
        <div class="flex items-center gap-2 mb-3 font-semibold">
          <UIcon
            name="i-lucide-beaker"
            class="text-primary"
          />
          Soil & Nutrients
        </div>
        <div class="text-sm prose dark:prose-invert max-w-none">
          <slot name="soil" />
        </div>
      </section>
      <section>
        <div class="flex items-center gap-2 mb-3 font-semibold">
          <UIcon
            name="i-lucide-droplets"
            class="text-info"
          />
          Irrigation Strategy
        </div>
        <div class="text-sm prose dark:prose-invert max-w-none">
          <slot name="water" />
        </div>
      </section>
    </div>
    <div class="px-6 pb-6">
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-2 mb-4 font-semibold">
          <UIcon name="i-lucide-clipboard-list" />
          Planting Protocol
        </div>
        <div class="text-sm prose dark:prose-invert max-w-none prose-li:my-1">
          <slot />
        </div>
      </div>
    </div>
    <div
      v-if="$slots.alert"
      class="px-6 pb-6"
    >
      <UAlert
        color="warning"
        variant="soft"
        icon="i-lucide-alert-triangle"
      >
        <template #description>
          <slot name="alert" />
        </template>
      </UAlert>
    </div>
  </div>
</template>
