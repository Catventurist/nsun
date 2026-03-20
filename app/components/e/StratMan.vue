<script setup lang="ts">
interface StrategyDecision {
  id: string
  label: string
  impact: 1 | 2 | 3 | 4 | 5
  complexity: 'low' | 'high'
  resources: string[]
  estimatedDays: number
  description: string
  isAiGenerated?: boolean
}

interface Props {
  title?: string
  strategies?: StrategyDecision[]
  activeStrategyId?: string
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Strategic Planning & Decisions',
  strategies: () => [
    {
      id: 'viral-loop',
      label: 'Referral Viral Loop',
      impact: 5,
      complexity: 'high',
      resources: ['Dev', 'Product'],
      estimatedDays: 14,
      description: 'Implement a double-sided referral program to lower CAC.',
      isAiGenerated: true
    },
    {
      id: 'email-nurture',
      label: 'Drip Campaign',
      impact: 3,
      complexity: 'low',
      resources: ['Copy'],
      estimatedDays: 3,
      description: 'Automate a 5-day welcome sequence for new signups.'
    }
  ],
  currency: 'EUR'
})

const selectedId = ref(props.activeStrategyId || props.strategies[0]?.id)
</script>

<template>
  <div class="space-y-4 mx-2">
    <UCard
      v-for="strat in strategies"
      :key="strat.id"
      :class="[selectedId === strat.id ? 'ring-2 ring-primary/40' : 'opacity-80 duration-300 hover:opacity-100']"
      @click="selectedId = strat.id"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-bold text-lg">
              {{ strat.label }}
            </h4>
            <UBadge
              v-if="strat.isAiGenerated"
              label="Suggested"
              size="xs"
              variant="soft"
              color="error"
              icon="i-lucide-sparkles"
            />
          </div>
          <p class="text-sm text-muted mb-4">
            {{ strat.description }}
          </p>
          <div class="flex flex-wrap gap-4 text-xs">
            <div class="flex items-center gap-1">
              <span class="text-muted0 uppercase font-semibold">
                Impact:
              </span>
              <div class="flex gap-0.5">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-lucide-zap"
                  :class="[i <= strat.impact ? 'text-yellow-500' : 'text-muted']"
                />
              </div>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-muted0 uppercase font-semibold">
                Effort:
              </span>
              <UBadge
                :color="strat.complexity === 'low' ? 'success' : 'warning'"
                size="sm"
                variant="outline"
              >
                {{ strat.complexity }} ({{ strat.estimatedDays }} days)
              </UBadge>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-muted uppercase font-semibold">
                Needs:
              </span>
              <div class="flex -space-x-1">
                <UTooltip
                  v-for="res in strat.resources"
                  :key="res"
                  :text="res"
                >
                  <UAvatar
                    :alt="res"
                    size="xs"
                    class="ring-2 ring-muted"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
        <URadioGroup
          v-model="selectedId"
          :value="strat.id"
          class="mt-1"
        />
      </div>
    </UCard>
    <div class="flex justify-end pt-4">
      <UButton
        block
        icon="lucide-database"
        color="primary"
        variant="soft"
        size="lg"
        :disabled="!selectedId"
      >
        Deploy Strategy: {{ strategies.find(s => s.id === selectedId)?.label }}
      </UButton>
    </div>
  </div>
</template>
