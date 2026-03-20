<script setup lang="ts">
type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface Props {
  title?: string
  description?: string
  category?: 'frontend' | 'backend' | 'design' | 'devops' | 'mobile'
  status?: 'backlog' | 'planned' | 'progress' | 'shipped'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  difficulty?: 'easy' | 'medium' | 'hard'
  impact?: 'low' | 'medium' | 'high'
  team?: string
  icon?: string
  votes?: number
  color?: ColOr
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Feature title',
  description: 'Detailed feature description.',
  category: 'frontend',
  status: 'backlog',
  priority: 'medium',
  difficulty: 'medium',
  impact: 'medium',
  team: 'Sun team',
  icon: 'i-lucide-box',
  votes: 0,
  color: 'primary'
})

const localVotes = ref(props.votes)
const isSelected = ref(false)

const toggleSelection = (): void => {
  isSelected.value = !isSelected.value
  if (isSelected.value) {
    localVotes.value += 1
  } else {
    localVotes.value = Math.max(props.votes, localVotes.value - 1)
  }
}

const statusConfig = {
  backlog: { label: 'backlog', color: 'neutral', icon: 'i-lucide-list' },
  planned: { label: 'planned', color: 'warning', icon: 'i-lucide-calendar' },
  progress: { label: 'in progress', color: 'info', icon: 'i-lucide-loader-2' },
  shipped: { label: 'shipped', color: 'success', icon: 'i-lucide-check-circle' }
}
</script>

<template>
  <UCard class="max-w-md border-2 shadow-sm shadow-primary transition-all hover:shadow-md">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <UAvatar
          :icon="props.icon"
          :class="`bg-${props.color}/20 text-${props.color}`"
        />
        <div class="flex flex-col">
          <h3 class="font-bold  capitalize leading-tight">
            {{ props.title }}
          </h3>
          <span class="text-[10px] uppercase text-muted tracking-widest">{{ props.category }}</span>
        </div>
      </div>
      <UBadge
        :color="(statusConfig[props.status].color as ColOr)"
        variant="subtle"
        size="sm"
        class="font-bold"
      >
        <UIcon
          :name="statusConfig[props.status].icon"
          class="mr-1 size-3"
        />
        {{ statusConfig[props.status].label }}
      </UBadge>
    </div>

    <p class="text-sm text-muted mb-6 leading-relaxed italic">
      "{{ props.description }}"
    </p>

    <div class="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
      <UFormField
        label="priority"
        size="sm"
      >
        <div class="flex items-center gap-1.5 mt-1">
          <UIcon
            name="i-lucide-chevrons-up"
            :class="props.priority === 'critical' ? 'text-error' : 'text-primary'"
            class="size-4"
          />
          <span class="text-xs font-medium capitalize">{{ props.priority }}</span>
        </div>
      </UFormField>

      <UFormField
        label="difficulty"
        size="sm"
      >
        <div class="flex items-center gap-1.5 mt-1">
          <UIcon
            name="i-lucide-wrench"
            class="size-4 text-primary"
          />
          <span class="text-xs font-medium capitalize">{{ props.difficulty }}</span>
        </div>
      </UFormField>
      <UFormField
        label="impact"
        size="sm"
      >
        <div class="flex items-center gap-1.5 mt-1">
          <UIcon
            name="i-lucide-trending-up"
            class="size-4 text-primary"
          />
          <span class="text-xs font-medium capitalize">{{ props.impact }}</span>
        </div>
      </UFormField>
      <UFormField
        label="assigned team"
        size="sm"
      >
        <div class="flex items-center gap-1.5 mt-1 text-muted">
          <UIcon
            name="i-lucide-users"
            class="size-4 text-primary"
          />
          <span class="text-xs font-medium">{{ props.team }}</span>
        </div>
      </UFormField>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-thumbs-up"
            class="size-4 text-primary"
          />
          <span class="text-sm font-bold text-muted">{{ localVotes }}</span>
        </div>
        <UButton
          :color="isSelected ? 'primary' : 'neutral'"
          :variant="isSelected ? 'soft' : 'outline'"
          size="sm"
          :icon="isSelected ? 'i-lucide-check' : 'i-lucide-plus'"
          @click="toggleSelection"
        >
          {{ isSelected ? 'Selected' : 'Choose feature' }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
