<script setup lang="ts">
interface Task {
  id: string | number
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  status: 'done' | 'progress' | 'todo'
}

interface Column {
  id: string
  label: string
  icon?: string
}

interface Props {
  tasks?: Task[]
  columns?: Column[]
  showDescription?: boolean
  boardTitle?: string
  emptyColumnLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  columns: () => [
    { id: 'todo', label: 'To Do', icon: 'i-lucide-circle' },
    { id: 'progress', label: 'In Progress', icon: 'i-lucide-loader-2' },
    { id: 'done', label: 'Done', icon: 'i-lucide-check-circle-2' }
  ],
  showDescription: true,
  boardTitle: 'Project Board',
  emptyColumnLabel: 'No tasks'
})

const getTasksByStatus = (status: string) => {
  return props.tasks.filter(task => task.status === status)
}
</script>

<template>
  <div class="my-8 flex flex-col gap-4">
    <div class="flex items-center justify-between px-2">
      <h3 class="text-lg font-bold flex items-center gap-2">
        <UIcon
          name="i-lucide-kanban"
          class="size-5 text-primary"
        />
        {{ boardTitle }}
      </h3>
      <UBadge
        variant="subtle"
        size="lg"
        color="success"
      >
        {{ tasks.length }} {{ $t('tasks.total') }}
      </UBadge>
    </div>
    <div class="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
      <div
        v-for="column in columns"
        :key="column.id"
        class="shrink-0 lg:w-100 flex flex-col gap-3 snap-start"
      >
        <div class="flex items-center justify-between py-2 px-3 bg-muted/80 rounded-lg">
          <div class="flex items-center gap-2">
            <UIcon
              v-if="column.icon"
              :name="column.icon"
              class="size-4 text-primary"
            />
            <span class="text-xs font-bold uppercase tracking-wider text-muted">
              {{ column.label }}
            </span>
          </div>
          <UBadge
            size="sm"
            variant="outline"
            color="neutral"
            class="rounded-full px-2"
          >
            {{ getTasksByStatus(column.id).length }}
          </UBadge>
        </div>
        <div class="flex flex-col gap-3 min-h-[200px] p-1">
          <div
            v-if="getTasksByStatus(column.id).length === 0"
            class="text-xs text-center py-8 text-muted border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl italic"
          >
            {{ emptyColumnLabel }}
          </div>
          <div
            v-for="task in getTasksByStatus(column.id)"
            :key="task.id"
            class="p-4 border border-muted rounded-xl shadow-sm shadow-primary duration-300 hover:bg-radial from-primary/20 hover:border-primary/60 transition-colors"
          >
            <div class="flex items-start justify-between mb-2">
              <span class="text-sm font-semibold leading-tight">
                {{ task.title }}
              </span>
              <UIcon
                :name="task.priority === 'high' ? 'i-lucide-alert-triangle' : 'i-lucide-minus'"
                :class="task.priority === 'high' ? 'text-error' : 'text-info'"
                class="size-4 shrink-0"
              />
            </div>
            <p
              v-if="showDescription && task.description"
              class="text-xs text-muted mb-4 line-clamp-2"
            >
              {{ task.description }}
            </p>
            <div class="flex items-center justify-between pt-3 border-t border-muted">
              <span class="text-xs text-muted font-mono">
                #{{ task.id }}
              </span>
              <UBadge
                variant="soft"
                :color="task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'info'"
              >
                {{ $t(`tasks.${task.priority}`) ?? task.priority }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
