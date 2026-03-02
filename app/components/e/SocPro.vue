<script setup lang="ts">
type MetricItem = {
  icon: string
  value: number
  label: string
  to?: string
}
const metricsData: MetricItem[] = [
  {
    icon: 'lucide-book-open',
    value: 10,
    label: $t('stats.sections')
  },
  {
    icon: 'lucide-folders',
    value: 29,
    label: $t('stats.templates')
  },
  {
    icon: 'lucide-component',
    value: 84,
    label: $t('stats.components')
  },
  {
    icon: 'lucide-ticket',
    value: 0,
    label: $t('stats.tickets')
  }
]
</script>

<template>
  <div class="py-8 sm:py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="bg-muted rounded-md px-4 py-10 sm:px-6 lg:px-8">
        <div class="mb-12 space-y-4 sm:mb-16 lg:mb-24">
          <h2 class="text-2xl font-semibold md:text-3xl lg:text-4xl">
            {{ $t('stats.title') }}
          </h2>
          <p class="text-muted max-w-4xl text-xl">
            {{ $t('stats.description') }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <UCard
            v-for="metric in metricsData"
            :key="metric.label"
            class="duration-300 hover:bg-radial from-primary/20"
          >
            <div class="[&>svg]:text-muted flex flex-col items-center [&>svg]:size-7">
              <NuxtLinkLocale
                :to="metric.to"
                class="relative size-8 flex items-center justify-center overflow-hidden rounded-full duration-500 hover:bg-muted before:absolute before:inset-0 before:block before:size-full before:rounded-full before:shadow-[inset_0_2px_4.5px_0px_rgba(255,255,255,0.6)] before:duration-300 hover:shadow-[inset_0_-6px_8px_-1px_rgba(25,175,253,0.6)] dark:hover:shadow-[inset_0_-3px_2px_-1px_rgba(25,175,253,0.6)]"
              >
                <Icon :name="metric.icon" />
              </NuxtLinkLocale>
              <h2 class="mt-4 mb-3 text-2xl md:text-3xl lg:text-4xl text-primary">
                <MCountUp
                  :max="metric.value"
                  :min="0"
                />
              </h2>
              <p class="text-xl font-medium">
                {{ metric.label }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
