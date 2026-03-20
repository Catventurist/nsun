<script setup lang="ts">
type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface Milestone {
  label: string
  isReached: boolean
}

interface Props {
  title?: string
  apprenticeName?: string
  masterName?: string
  category?: string
  progress?: number
  targetProgress?: number
  isEvaluated?: boolean
  evaluationGrade?: string
  evaluationFeedback?: string
  startDate?: string
  endDate?: string
  nextReviewDate?: string
  streakDays?: number
  skills?: string[]
  milestones?: Milestone[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'mastery'
  status?: 'active' | 'completed' | 'hold' | 'archived'
  priority?: 'low' | 'medium' | 'high'
  isLocked?: boolean
  isLoading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  targetProgress: 100,
  progress: 42,
  isEvaluated: false,
  evaluationGrade: 'Pending',
  startDate: 'Not started',
  streakDays: 0,
  skills: () => [],
  milestones: () => [],
  difficulty: 'beginner',
  status: 'active',
  priority: 'medium',
  isLocked: false,
  isLoading: false,
  icon: 'i-lucide-award'
})

const difficultyColor = computed(() => {
  const map = { beginner: 'success', intermediate: 'info', advanced: 'warning', mastery: 'red' }
  return map[props.difficulty]
})

const prog = ref(props.progress | 50)
</script>

<template>
  <UCard :class="{ 'opacity-75 grayscale-[0.5]': isLocked }">
    <template #header>
      <div class="flex items-start justify-between">
        <div class="flex gap-3">
          <div class="mt-1">
            <UIcon
              :name="icon"
              class="size-8 text-primary"
            />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-bold">
                {{ title }}
              </h3>
              <UBadge
                :label="difficulty"
                :color="(difficultyColor as ColOr)"
                variant="soft"
                size="sm"
              />
            </div>
            <p class="text-sm text-muted">
              {{ category }} • Led by {{ masterName }}
            </p>
          </div>
        </div>
        <UBadge
          v-if="priority === 'high'"
          label="High Priority"
          color="error"
          variant="solid"
          size="sm"
        />
      </div>
    </template>
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-4 bg-muted/60 p-3 rounded-md text-xs">
        <div class="flex flex-col gap-1">
          <span class="text-muted uppercase font-bold">
            Start Date
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-calendar" />
            {{ startDate }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-muted uppercase font-bold">
            Learning Streak
          </span>
          <span class="flex items-center gap-1 text-warning font-bold">
            <UIcon name="i-lucide-flame" />
            {{ streakDays }} Days
          </span>
        </div>
      </div>
      <div
        v-if="skills.length"
        class="flex flex-wrap gap-1"
      >
        <UKbd
          v-for="skill in skills"
          :key="skill"
        >
          {{ skill }}
        </UKbd>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between text-sm font-medium">
          <span>Mastery Progress</span>
          <span>{{ progress }}%</span>
        </div>
        <UProgress
          v-model="prog"
          :max="targetProgress"
          color="primary"
          indicator
        />
      </div>
      <div
        v-if="milestones.length"
        class="space-y-2"
      >
        <p class="text-xs font-bold text-muted uppercase">
          Key Milestones
        </p>
        <div
          v-for="m in milestones"
          :key="m.label"
          class="flex items-center gap-2 text-sm"
        >
          <UIcon
            :name="m.isReached ? 'i-lucide-check-circle-2' : 'i-lucide-circle'"
            :class="m.isReached ? 'text-success' : 'text-muted'"
          />
          <span :class="{ 'line-through text-muted': m.isReached }">{{ m.label }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-sm uppercase text-muted">
            Next Review
          </span>
          <span class="text-xs font-semibold">
            {{ nextReviewDate || 'TBD' }}
          </span>
        </div>
        <div class="flex gap-2">
          <UButton
            v-if="isLocked"
            icon="i-lucide-lock"
            color="neutral"
            variant="ghost"
            disabled
          />
          <UButton
            label="Open Module"
            color="primary"
            variant="soft"
            :loading="isLoading"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
