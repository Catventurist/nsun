<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title?: string
  icon?: string
  participants?: number
  baseTime?: number
  timeUnit?: 'hours' | 'days'
  complexity?: 1 | 1.5 | 2 | 2.5 | 3
  rate?: number
  currency?: string
  color?: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Project Estimator',
  icon: 'i-lucide-trending-up',
  participants: 1,
  baseTime: 40,
  timeUnit: 'hours',
  complexity: 1.5,
  rate: 100,
  currency: '€',
  color: 'primary'
})
const { locale } = useI18n()
const localParticipants = ref(props.participants)
const localBaseTime = ref(props.baseTime)
const localComplexity = ref(props.complexity)
const localRate = ref(props.rate)
const totalEffort = computed(() => localBaseTime.value * localComplexity.value)
const duration = computed(() => (totalEffort.value / localParticipants.value).toFixed(1))
const totalCost = computed(() => {
  const amount = totalEffort.value * localRate.value
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'EUR'
  }).format(amount).replace('€', props.currency)
})
</script>

<template>
  <UCard class="max-w-2xl mx-auto border border-primary/40">
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar
          :icon="props.icon"
          :class="`bg-${color}/20 text-${color}`"
        />
        <h3 class="text-xl tracking-tight">
          {{ title }}
        </h3>
      </div>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
      <div class="space-y-4">
        <UFormField
          label="Base Time"
          :description="`Estimated ${timeUnit} for 1 person`"
          size="sm"
        >
          <UInput
            v-model="localBaseTime"
            type="number"
            icon="i-lucide-clock"
          />
        </UFormField>

        <UFormField
          label="Participants"
          description="Number of people assigned"
          size="sm"
        >
          <UInput
            v-model="localParticipants"
            type="number"
            :min="1"
            icon="i-lucide-users"
          />
        </UFormField>
        <UFormField
          label="Hourly Rate"
          :description="`Cost per hour in ${currency}`"
          size="sm"
        >
          <UInput
            v-model="localRate"
            type="number"
            icon="i-lucide-banknote"
          />
        </UFormField>
        <UFormField
          label="Complexity"
          description="Multiplier for technical risk"
          size="sm"
        >
          <USelect
            v-model="localComplexity"
            icon="i-lucide-gauge"
            :items="[
              { label: 'Low (1.0x)', value: 1 },
              { label: 'Medium (1.5x)', value: 1.5 },
              { label: 'High (2.0x)', value: 2 },
              { label: 'Extreme (3.0x)', value: 3 }
            ]"
          />
        </UFormField>
      </div>
      <div :class="[`bg-${color}/20 p-6 rounded-2xl border-2 border-${color}/60 flex flex-col justify-between`]">
        <div class="space-y-6">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-muted">Estimated Duration</span>
            <div class="flex items-baseline gap-2">
              <span :class="[`text-4xl text-${color}`]">{{ duration }}</span>
              <span class="text-sm font-medium text-muted">{{ timeUnit }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-muted">
            <div>
              <span class="text-sm font-bold uppercase text-muted">Total Effort</span>
              <p class="font-bold">
                {{ totalEffort }} {{ timeUnit }}
              </p>
            </div>
            <div>
              <span class="text-sm font-bold uppercase text-muted">Total Cost</span>
              <p class="font-bold">
                {{ totalCost }}
              </p>
            </div>
          </div>
        </div>
        <UAlert
          title="Calculated as: (Base x Complexity) / Participants"
          icon="i-lucide-info"
          variant="soft"
        />
      </div>
    </div>
  </UCard>
</template>
