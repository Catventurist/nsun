<script setup lang="ts">
type DecisionMethod = 'weighted-average' | 'consensus' | 'critical-path' | 'simple-majority'

type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface ValidationCriteria {
  id: string
  label: string
  icon: string
  score: number
  importance: number
  isCritical?: boolean
}

interface Props {
  title?: string
  description?: string
  criteria?: ValidationCriteria[]
  decisionMethod?: DecisionMethod
  threshold?: number
  consensusMin?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Conclusion Strategy',
  decisionMethod: 'weighted-average',
  threshold: 3.5,
  consensusMin: 3,
  criteria: () => [
    { id: 'compliance', label: 'Legal Compliance', icon: 'i-lucide-shield-check', score: 5, importance: 3, isCritical: true },
    { id: 'budget', label: 'Budget Alignment', icon: 'i-lucide-wallet', score: 2, importance: 2 },
    { id: 'timing', label: 'Market Timing', icon: 'i-lucide-clock', score: 4, importance: 1 }
  ]
})

const localCriteria = ref([...props.criteria])
const calculatedScore = computed(() => {
  const items = localCriteria.value

  if (props.decisionMethod === 'weighted-average') {
    const totalWeightedScore = items.reduce((acc, c) => acc + (c.score * c.importance), 0)
    const totalWeights = items.reduce((acc, c) => acc + c.importance, 0)
    return (totalWeightedScore / totalWeights).toFixed(1)
  }

  if (props.decisionMethod === 'consensus') {
    const min = Math.min(...items.map(c => c.score))
    return min.toFixed(1)
  }

  const sum = items.reduce((acc, curr) => acc + curr.score, 0)
  return (sum / items.length).toFixed(1)
})

const decisionResult = computed(() => {
  const score = parseFloat(calculatedScore.value)
  if (props.decisionMethod === 'critical-path') {
    const criticalFail = localCriteria.value.some(c => c.isCritical && c.score < 3)
    if (criticalFail) return { status: 'rejected', label: 'Critical Failure', color: 'error' }
  }

  if (props.decisionMethod === 'consensus' && score < props.consensusMin) {
    return { status: 'rejected', label: 'No Consensus', color: 'error' }
  }

  if (score >= 4) return { status: 'validated', label: 'Approved', color: 'success' }
  if (score >= props.threshold) return { status: 'review', label: 'Needs Pivot', color: 'warning' }
  return { status: 'rejected', label: 'Rejected', color: 'error' }
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 p-8 rounded-sm border border-muted">
    <div class="flex items-center justify-between border-b border-muted pb-6">
      <div class="space-y-1">
        <h2 class="text-3xl italic tracking-tighter uppercase">
          {{ title }}
        </h2>
        <div class="flex items-center gap-2">
          <UBadge
            variant="soft"
            color="neutral"
            size="xs"
            class="font-bold uppercase tracking-widest"
          >
            Method: {{ decisionMethod.replace('-', ' ') }}
          </UBadge>
        </div>
      </div>
      <div class="text-right">
        <UBadge
          :color="(decisionResult.color as ColOr)"
          variant="solid"
          class="rounded-full px-4 uppercase italic"
        >
          {{ decisionResult.label }}
        </UBadge>
        <p
          class="text-4xl tracking-tighter mt-1"
          :class="`text-${decisionResult.color}`"
        >
          {{ calculatedScore }}
        </p>
      </div>
    </div>
    <div class="grid gap-6">
      <div
        v-for="item in localCriteria"
        :key="item.id"
        class="group bg-muted/60 p-6 rounded-3xl border border-transparent hover:border-primary/20 transition-all"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg text-primary">
              <UIcon
                :name="item.icon"
                class="size-5"
              />
            </div>
            <div>
              <span class="uppercase tracking-widest text-sm flex items-center gap-2">
                {{ item.label }}
                <UIcon
                  v-if="item.isCritical"
                  name="i-lucide-alert-octagon"
                  class="text-error-500 w-4 h-4"
                />
              </span>
              <div class="flex gap-1 mt-1">
                <span
                  v-for="i in item.importance"
                  :key="i"
                  class="w-2 h-1 rounded-full bg-primary/20"
                />
              </div>
            </div>
          </div>
          <span class="text-xl italic">
            {{ item.score }}/5
          </span>
        </div>
        <USlider
          v-model="item.score"
          :min="1"
          :max="5"
          :step="1"
          color="primary"
        />
        <div class="flex justify-between mt-3">
          <span class="text-sm font-bold text-muted uppercase tracking-widest">
            Low Impact
          </span>
          <span class="text-sm font-bold text-muted uppercase tracking-widest">
            Critical Factor
          </span>
        </div>
      </div>
    </div>
    <div class="bg-primary/10 p-6 rounded-3xl border border-primary/40">
      <h4 class="text-sm uppercase tracking-[0.3em] text-primary mb-3">
        Decision Logic Insight
      </h4>
      <p
        v-if="decisionMethod === 'weighted-average'"
        class="text-sm font-medium text-primary"
      >
        Results are skewed toward high-importance factors. Compliance and Budget currently hold the most weight in this calculation.
      </p>
      <p
        v-else-if="decisionMethod === 'critical-path'"
        class="text-sm font-medium text-primary"
      >
        If any item marked with an octagon drops below a score of 3, the entire proposal will be automatically rejected regardless of other scores.
      </p>
    </div>
  </div>
</template>
