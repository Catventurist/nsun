<script setup lang="ts">
interface Task { label: string, done?: boolean }
interface Link { label: string, url: string }
interface Assignee { name: string, avatar?: string }

interface Props {
  title?: string
  category?: string
  priority?: 'Low' | 'Medium' | 'High'
  status?: 'To Do' | 'In Progress' | 'Completed' | 'Blocked'
  effort?: 'Small' | 'Medium' | 'Large' | 'XL'
  progress?: number
  impact?: string
  metric?: string
  dueDate?: string
  assignee?: Assignee
  tasks?: Task[]
  links?: Link[]
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Improvement',
  category: 'General',
  priority: 'Medium',
  status: 'To Do',
  effort: 'Medium',
  progress: 0,
  tasks: () => [],
  links: () => [],
  tags: () => []
})

const priorityColor = computed(() => {
  const colors = { High: 'error', Medium: 'warning', Low: 'info' }
  return colors[props.priority] || 'neutral'
})

const statusConfig = computed(() => {
  const configs = {
    'Completed': { icon: 'i-lucide-check-circle', color: 'success' },
    'In Progress': { icon: 'i-lucide-loader', color: 'info' },
    'Blocked': { icon: 'i-lucide-ban', color: 'error' },
    'To Do': { icon: 'i-lucide-circle', color: 'neutral' }
  }
  return configs[props.status] || configs['To Do']
})
</script>

<template>
  <UCard class="my-6 overflow-hidden">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <UBadge
              :label="category"
              size="sm"
              variant="soft"
              color="info"
            />
            <UBadge
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              size="sm"
              variant="outline"
            />
          </div>
          <h3 class="text-xl font-bold">
            {{ title }}
          </h3>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-xs text-muted uppercase font-bold">
              Effort
            </p>
            <p class="text-sm font-medium">
              {{ effort }}
            </p>
          </div>
          <UBadge
            :label="priority"
            :color="(priorityColor as any)"
            variant="outline"
          />
        </div>
      </div>
    </template>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="flex items-center gap-2 font-medium">
              <UIcon
                :name="statusConfig.icon"
                :class="status === 'In Progress' ? 'animate-spin' : ''"
              />
              {{ status }}
            </span>
            <span class="font-mono">
              {{ progress }}%
            </span>
          </div>
          <UProgress
            v-model="(progress as number)"
            :color="(statusConfig.color as any)"
          />
        </div>
        <div class="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
          <UAvatar
            v-if="assignee"
            :src="assignee.avatar"
            :alt="assignee.name"
            size="sm"
          />
          <div class="text-sm">
            <p class="text-muted text-xs">
              Owner & Deadline
            </p>
            <p class="font-medium">
              {{ assignee?.name || 'Unassigned' }} • {{ dueDate || 'No date' }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-muted">
        <div class="space-y-4">
          <div v-if="impact">
            <p class="text-xs font-bold text-muted uppercase mb-1">
              Strategic Impact
            </p>
            <p class="text-sm">
              {{ impact }}
            </p>
          </div>
          <div v-if="metric">
            <p class="text-xs font-bold text-muted uppercase mb-1">
              Success Metric
            </p>
            <p class="text-sm font-mono text-primary">
              {{ metric }}
            </p>
          </div>
        </div>
        <div
          v-if="tasks.length"
          class="space-y-2"
        >
          <p class="text-xs font-bold text-muted uppercase mb-1">
            Sub-tasks
          </p>
          <div
            v-for="task in tasks"
            :key="task.label"
            class="flex items-center gap-2 text-sm"
          >
            <UIcon
              :name="task.done ? 'i-lucide-check-square' : 'i-lucide-square'"
              class="size-4"
            />
            <span :class="{ 'line-through text-muted': task.done }">
              {{ task.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <template
      v-if="links.length"
      #footer
    >
      <div class="flex gap-4">
        <UButton
          v-for="link in links"
          :key="link.url"
          :label="link.label"
          :to="link.url"
          variant="ghost"
          size="xs"
          icon="i-lucide-external-link"
        />
      </div>
    </template>
  </UCard>
</template>
