<script setup lang="ts">
interface KeyResult {
  label: string
  value: string
  icon: string
}

interface Props {
  title?: string
  summary?: string
  category?: string
  heroImage?: string
  icon?: string
  masterName?: string
  apprenticeName?: string
  masterAvatar?: string
  apprenticeAvatar?: string
  objectives?: string[]
  methodology?: string
  keyResults?: KeyResult[]
  lessonsLearned?: string[]
  impactScore?: number
  duration?: string
  difficultyRating?: 1 | 2 | 3 | 4 | 5
  status?: 'internal' | 'published' | 'draft'
  tags?: string[]
  isConfidential?: boolean
  showMetrics?: boolean
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  category: 'Research & Development',
  icon: 'i-lucide-file-text',
  objectives: () => [],
  keyResults: () => [],
  lessonsLearned: () => [],
  impactScore: 0,
  duration: '4 weeks',
  difficultyRating: 3,
  status: 'published',
  tags: () => [],
  isConfidential: false,
  showMetrics: true
})

const statusColor = computed(() => {
  if (props.isConfidential) return 'error'
  switch (props.status) {
    case 'published': return 'success'
    case 'draft': return 'warning'
    default: return 'neutral'
  }
})
</script>

<template>
  <UCard
    :ui="{ body: 'p-0' }"
    class="overflow-hidden"
  >
    <div class="relative h-48">
      <NuxtImg
        v-if="props.heroImage"
        :src="props.heroImage"
        :height="200"
        class="size-full object-cover opacity-60"
      />
      <div
        v-else
        class="size-full bg-linear-to-br from-info/20 opacity-40"
      />
      <div class="absolute inset-0 p-6 flex flex-col justify-end">
        <div class="flex items-center gap-2 mb-2">
          <UBadge
            :color="statusColor"
            variant="solid"
            size="sm"
            class="uppercase"
          >
            {{ props.isConfidential ? 'Confidential' : props.status }}
          </UBadge>
          <span class="text-sm font-medium">{{ props.category }}</span>
        </div>
        <h2 class="text-2xl font-bold">
          {{ props.title }}
        </h2>
      </div>
    </div>
    <div class="p-6 space-y-8">
      <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <p class="text-muted leading-relaxed">
            {{ props.summary }}
          </p>
          <div
            v-if="props.objectives.length"
            class="space-y-2"
          >
            <h4 class="text-sm font-bold uppercase text-muted">
              Core Objectives
            </h4>
            <ul class="grid grid-cols-1 gap-1">
              <li
                v-for="obj in props.objectives"
                :key="obj"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon
                  name="i-lucide-target"
                  class="size-4 mt-0.5 text-primary"
                />
                {{ obj }}
              </li>
            </ul>
          </div>
        </div>
        <div class="p-4 rounded-xl space-y-4 border border-muted duration-300 hover:bg-radial from-primary/20">
          <div class="space-y-3">
            <p class="text-sm font-bold uppercase text-muted">
              The Team
            </p>
            <div class="flex items-center gap-3">
              <UAvatar
                :src="props.masterAvatar"
                :alt="props.masterName"
                size="sm"
              />
              <div class="text-sm">
                <p class="font-bold text-muted">
                  {{ props.masterName }}
                </p>
                <p class="text-muted">
                  Master Mentor
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UAvatar
                :src="props.apprenticeAvatar"
                :alt="props.apprenticeName"
                size="sm"
              />
              <div class="text-sm">
                <p class="font-bold text-muted">
                  {{ props.apprenticeName }}
                </p>
                <p class="text-muted">
                  Apprentice Lead
                </p>
              </div>
            </div>
          </div>
          <USeparator />
          <div class="flex justify-between text-sm">
            <span class="text-muted">Duration:</span>
            <span class="font-medium">{{ props.duration }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="props.showMetrics && props.keyResults.length"
        class="space-y-4"
      >
        <h4 class="text-sm font-bold uppercase text-muted">
          Impact Metrics
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="result in props.keyResults"
            :key="result.label"
            class="p-3 bg-primary/20 rounded-lg border border-primary/40"
          >
            <UIcon
              :name="result.icon"
              class="size-5 text-primary mb-1"
            />
            <p class="text-xl text-primary">
              {{ result.value }}
            </p>
            <p class="text-[10px] uppercase text-muted font-bold leading-tight">
              {{ result.label }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="props.lessonsLearned.length"
        class="space-y-4"
      >
        <h4 class="text-sm font-bold uppercase text-muted">
          Lessons Learned
        </h4>
        <div class="grid md:grid-cols-2 gap-3">
          <div
            v-for="lesson in props.lessonsLearned"
            :key="lesson"
            class="flex gap-3 p-3 rounded-lg border border-muted"
          >
            <UIcon
              name="i-lucide-lightbulb"
              class="size-5 text-warning shrink-0"
            />
            <p class="text-sm text-muted">
              {{ lesson }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex gap-1 overflow-hidden">
          <UKbd
            v-for="tag in props.tags"
            :key="tag"
          >
            {{ tag }}
          </UKbd>
        </div>
        <div class="flex items-center gap-3">
          <div
            v-if="props.impactScore > 0"
            class="text-right"
          >
            <p class="text-sm uppercase text-muted font-bold">
              Impact Score
            </p>
            <p class="text-sm font-bold text-primary">
              {{ props.impactScore }}/100
            </p>
          </div>
          <UButton
            v-if="props.link"
            :to="props.link"
            label="Full Case Study"
            variant="soft"
            color="info"
            trailing-icon="i-lucide-chevron-right"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
