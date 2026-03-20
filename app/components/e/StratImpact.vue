<script setup lang="ts">
type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface User {
  name: string
  avatar?: string
}

interface Comment {
  author: string
  text: string
  timestamp: string
}

interface Props {
  title?: string
  impact?: number
  effort?: number
  averageImpact?: number
  averageEffort?: number
  assignees?: User[]
  comments?: Comment[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Task',
  impact: 1,
  effort: 1,
  averageImpact: 3,
  averageEffort: 3,
  assignees: () => [],
  comments: () => []
})

const options = [
  { label: 'Low', value: 'low', icon: 'i-lucide-arrow-down', color: 'info', minScore: 0 },
  { label: 'Medium', value: 'medium', icon: 'i-lucide-minus', color: 'neutral', minScore: 4 },
  { label: 'High', value: 'high', icon: 'i-lucide-arrow-up', color: 'warning', minScore: 7 },
  { label: 'Urgent', value: 'urgent', icon: 'i-lucide-zap', color: 'error', minScore: 9 }
]

const importanceScore = computed(() => (props.impact * 2) - props.effort)
const priority = computed(() => {
  const score = importanceScore.value
  return [...options].reverse().find(opt => score >= opt.minScore) || options[0]
})

const valueDensity = computed(() => (props.impact / (props.effort || 1)).toFixed(1))
const relativePerformance = computed(() => {
  const currentRatio = props.impact / props.effort
  const averageRatio = props.averageImpact / props.averageEffort
  return Math.round((currentRatio / averageRatio) * 100)
})
const efficiencyScore = computed(() => {
  const score = (props.impact * 20) / (props.effort / 2)
  return Math.min(Math.max(score, 0), 100)
})
</script>

<template>
  <UCard class="max-w-md overflow-hidden">
    <template #header>
      <div class="flex justify-between items-start gap-4">
        <h3 class="font-bold leading-tight">
          {{ title }}
        </h3>
        <UBadge
          v-if="priority"
          :color="(priority.color as ColOr)"
          variant="subtle"
          class="shrink-0 gap-1 capitalize"
        >
          <UIcon
            :name="priority.icon"
            class="size-3.5"
          />
          {{ priority.label }}
        </UBadge>
      </div>
    </template>
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 bg-muted/60 rounded-lg">
          <div class="text-sm uppercase font-bold text-muted mb-1">
            Density
          </div>
          <div class="text-lg font-mono font-bold">
            {{ valueDensity }}x
          </div>
        </div>
        <div class="p-3 bg-muted/60 rounded-lg">
          <div class="text-sm uppercase font-bold text-muted mb-1">
            Vs. Average
          </div>
          <div class="text-lg font-mono font-bold text-primary">
            {{ relativePerformance }}%
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-between mb-1.5">
          <span class="text-xs font-medium text-muted">Efficiency Score</span>
          <span class="text-xs font-bold">{{ efficiencyScore.toFixed(0) }}%</span>
        </div>
        <UProgress
          v-model="efficiencyScore"
          color="primary"
          size="xs"
        />
      </div>
      <div class="flex items-center justify-between border-t border-muted pt-4">
        <div>
          <span class="text-sm uppercase font-bold text-muted block mb-2">Assignees</span>
          <UAvatarGroup
            size="xs"
            :max="3"
          >
            <UAvatar
              v-for="u in assignees"
              :key="u.name"
              :src="u.avatar"
              :alt="u.name"
            />
          </UAvatarGroup>
        </div>
        <div class="text-right">
          <span class="text-sm uppercase font-bold text-muted block mb-2">Activity</span>
          <div class="flex items-center gap-1 text-xs text-muted">
            <UIcon
              name="i-lucide-message-square"
              class="size-3"
            />
            {{ comments.length }} Comments
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center gap-2 text-sm text-muted">
        <UIcon name="i-lucide-activity" />
        Priority Index: {{ importanceScore }}
      </div>
    </template>
  </UCard>
</template>
