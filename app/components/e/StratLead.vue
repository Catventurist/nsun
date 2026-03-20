<script setup lang="ts">
interface MarketingStrategy {
  id: string
  name: string
  description: string
  icon: string
  effectivenessScore: number
  roi: string
  conversionRate: string
  audience: string
  channels: string[]
  status: 'champion' | 'high-performing' | 'stable'
  trend: 'rising' | 'steady'
}

interface Props {
  title?: string
  subtitle?: string
  strategies?: MarketingStrategy[]
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Top Performing Strategies',
  subtitle: 'Real-time analysis of our most effective marketing engines based on conversion and ROI.',
  limit: 3,
  strategies: () => [
    {
      id: '1',
      name: 'Intent-Based Retargeting',
      description: 'Dynamic ads served to users who abandoned high-value carts.',
      icon: 'i-lucide-refresh-cw',
      effectivenessScore: 94,
      roi: '12.4x',
      conversionRate: '8.2%',
      audience: 'High-intent Shoppers',
      channels: ['GAds', 'Meta'],
      status: 'champion',
      trend: 'rising'
    },
    {
      id: '2',
      name: 'Educational Video Series',
      description: 'Long-form YouTube content focusing on solving industry pain points.',
      icon: 'i-lucide-play-circle',
      effectivenessScore: 82,
      roi: '5.1x',
      conversionRate: '3.4%',
      audience: 'B2B Decision Makers',
      channels: ['YouTube', 'LinkedIn'],
      status: 'high-performing',
      trend: 'steady'
    },
    {
      id: '3',
      name: 'Affiliate Partner Network',
      description: 'Strategic partnerships with niche industry influencers.',
      icon: 'i-lucide-users-2',
      effectivenessScore: 78,
      roi: '4.8x',
      conversionRate: '2.9%',
      audience: 'Niche Communities',
      channels: ['Direct', 'Social'],
      status: 'stable',
      trend: 'rising'
    }
  ]
})

const sortedStrategies = computed(() => {
  return [...props.strategies]
    .sort((a, b) => b.effectivenessScore - a.effectivenessScore)
    .slice(0, props.limit)
})
</script>

<template>
  <div class="space-y-8 px-2">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="max-w-2xl">
        <h2 class="text-2xl font-bold flex items-center gap-2">
          <UIcon
            name="i-lucide-trophy"
            class="text-yellow-500"
          />
          {{ title }}
        </h2>
        <p class="mt-1 text-muted">
          {{ subtitle }}
        </p>
      </div>
      <UButton
        label="Export Report"
        variant="ghost"
        icon="i-lucide-download"
        color="neutral"
      />
    </div>
    <div class="grid gap-6">
      <UCard
        v-for="(strat, index) in sortedStrategies"
        :key="strat.id"
        :class="[strat.status === 'champion' ? 'ring ring-primary/40 shadow-sm shadow-primary duration-300 hover:bg-radial from-success/20' : 'duration-300 hover:bg-radial from-primary/20']"
      >
        <div class="flex flex-col lg:flex-row lg:items-center gap-6">
          <div class="flex items-center gap-4 min-w-[240px]">
            <div class="flex items-center justify-center size-10 rounded-full font-bold text-lg">
              {{ index + 1 }}
            </div>
            <div class="p-3 flex items-center bg-primary/20 rounded-xl">
              <UIcon
                :name="strat.icon"
                class="size-6 text-primary"
              />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold">
                  {{ strat.name }}
                </h3>
                <UBadge
                  v-if="strat.status === 'champion'"
                  variant="outline"
                  label="Champion"
                  size="sm"
                  color="primary"
                />
              </div>
              <p class="text-sm text-muted truncate w-48">
                {{ strat.audience }}
              </p>
            </div>
          </div>
          <div class="flex-1 min-w-[200px]">
            <div class="flex justify-between items-end mb-2">
              <span class="text-sm font-semibold text-muted uppercase tracking-wider">Effectiveness</span>
              <span class="text-sm font-bold text-primary-600">{{ strat.effectivenessScore }}%</span>
            </div>
            <UProgress
              v-model="strat.effectivenessScore"
              color="primary"
              size="sm"
            />
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:border-l lg:border-muted lg:pl-8">
            <div>
              <p class="text-sm text-muted mb-1 font-medium">
                ROI
              </p>
              <p class="text-lg font-bold">
                {{ strat.roi }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted mb-1 font-medium">
                Conv. Rate
              </p>
              <p class="text-lg font-bold">
                {{ strat.conversionRate }}
              </p>
            </div>
            <div class="hidden sm:block">
              <p class="text-sm text-muted mb-1 font-medium">
                Trend
              </p>
              <div
                class="flex items-center gap-1"
                :class="strat.trend === 'rising' ? 'text-success' : 'text-info'"
              >
                <UIcon :name="strat.trend === 'rising' ? 'i-lucide-trending-up' : 'i-lucide-minus'" />
                <span class="text-sm font-bold capitalize">
                  {{ strat.trend }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex -space-x-2">
            <UTooltip
              v-for="channel in strat.channels"
              :key="channel"
              :text="channel"
            >
              <UAvatar
                size="sm"
                :alt="channel"
                class="ring-2 ring-muted text-sm"
              />
            </UTooltip>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
