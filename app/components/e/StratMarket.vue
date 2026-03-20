<script setup lang="ts">
interface StrategyItem {
  title: string
  description: string
  icon: string
  status?: 'active' | 'completed' | 'hold'
  progress?: number
}

interface Metric {
  label: string
  value: string
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: string
}

interface Props {
  badge?: string
  title?: string
  description?: string
  items?: StrategyItem[]
  metrics?: Metric[]
  metricsTitle?: string
  showMetrics?: boolean
  showProgress?: boolean
  ctaText?: string
  ctaLink?: string
  align?: 'left' | 'center'
  showIcons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'Performance & Growth',
  title: 'Strategic Results Overview',
  description: 'A comprehensive look at our current marketing performance and ongoing initiatives.',
  items: () => [
    {
      title: 'SEO Optimization',
      description: 'Improving organic search visibility and ranking.',
      icon: 'i-lucide-search',
      status: 'active',
      progress: 75
    },
    {
      title: 'Social Media Campaign',
      description: 'Engaging with our community through multi-channel content.',
      icon: 'i-lucide-share-2',
      status: 'active',
      progress: 40
    }
  ],
  metrics: () => [
    { label: 'Conversion Rate', value: '4.2', suffix: '%', trend: 'up', trendValue: '12%', color: 'green' },
    { label: 'Customer Acquisition Cost', value: '18.50', suffix: '€', trend: 'down', trendValue: '5%', color: 'red' },
    { label: 'Monthly Active Users', value: '85', suffix: 'k', trend: 'up', trendValue: '8%', color: 'blue' }
  ],
  metricsTitle: 'Key Performance Indicators',
  showMetrics: true,
  showProgress: true,
  ctaText: 'View Detailed Report',
  ctaLink: '/',
  align: 'center'
})
</script>

<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="[align === 'center' ? 'text-center' : 'text-left', 'mb-16']">
        <UBadge
          v-if="badge"
          :label="badge"
          variant="soft"
        />
        <h2 class="text-3xl font-extrabold sm:text-4xl">
          {{ props.title }}
        </h2>
        <p
          class="mt-4 max-w-3xl text-xl text-muted"
          :class="[align === 'center' ? 'mx-auto' : '']"
        >
          {{ description }}
        </p>
      </div>
      <div
        v-if="showMetrics"
        class="mb-16"
      >
        <h3
          v-if="metricsTitle"
          class="text-sm font-bold uppercase tracking-widest text-muted mb-6"
          :class="[align === 'center' ? 'text-center' : '']"
        >
          {{ metricsTitle }}
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="metric in metrics"
            :key="metric.label"
            class="hover:ring-2 hover:ring-primary/40 transition-all"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted truncate">
                  {{ metric.label }}
                </p>
                <div class="flex items-baseline mt-1">
                  <p class="text-2xl text-primary font-bold">
                    {{ metric.value }}{{ metric.suffix }}
                  </p>
                </div>
              </div>
              <div
                v-if="metric.trend"
                :class="[
                  metric.trend === 'up' ? 'text-success bg-success/20' : metric.trend === 'down' ? 'text-error bg-error/20' : 'text-muted',
                  'flex items-center p-2 rounded-full text-md font-medium'
                ]"
              >
                <UIcon
                  :name="metric.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                  class="mr-1 size-6"
                />
                {{ metric.trendValue }}
              </div>
            </div>
          </UCard>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        <div
          v-for="item in items"
          :key="item.title"
          class="flex flex-col p-6 border border-muted rounded-xl duration-300 hover:bg-radial from-primary/20"
        >
          <div class="flex flex-row items-center justify-between mb-6">
            <div class="flex items-center">
              <div
                v-if="showIcons"
                class="p-2 bg-primary/20 rounded-lg mr-4"
              >
                <UIcon
                  :name="item.icon"
                  class="size-6 text-primary"
                />
              </div>
              <h3 class="text-xl font-bold">
                {{ item.title }}
              </h3>
            </div>
            <UBadge
              v-if="item.status"
              :color="item.status === 'active' ? 'success' : 'warning'"
              variant="soft"
              size="sm"
            >
              {{ item.status }}
            </UBadge>
          </div>
          <p class="text-muted mb-6">
            {{ item.description }}
          </p>
          <div v-if="showProgress && item.progress !== undefined">
            <div class="flex justify-between text-sm mb-2">
              <span class="font-medium text-muted">
                Strategy Completion
              </span>
              <span class="text-primary">
                {{ item.progress }}%
              </span>
            </div>
            <UProgress
              v-model="item.progress"
              color="primary"
            />
          </div>
        </div>
      </div>
      <div
        v-if="ctaText"
        class="mt-16 flex justify-center"
      >
        <UButton
          :to="ctaLink"
          :label="ctaText"
          size="xl"
          color="primary"
          variant="soft"
          icon="i-lucide-external-link"
        />
      </div>
    </div>
  </div>
</template>
