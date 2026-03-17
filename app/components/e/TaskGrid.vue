<script setup lang="ts">
interface Task {
  id: number | string
  title: string
  status: 'done' | 'pending' | 'progress'
  priority: 'high' | 'medium' | 'low'
}

interface Props {
  tasks?: Task[]
  idLabel?: string
  titleLabel?: string
  statusLabel?: string
  priorityLabel?: string
  emptyLabel?: string
  bordered?: boolean
  zebra?: boolean
  showIcons?: boolean
  primaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  idLabel: 'ID',
  titleLabel: 'Task Name',
  statusLabel: 'Status',
  priorityLabel: 'Priority',
  emptyLabel: 'No tasks found',
  bordered: true,
  zebra: true,
  showIcons: true,
  primaryColor: 'primary'
})
</script>

<template>
  <div
    class="my-8 flex flex-col overflow-hidden text-sm"
    :class="[
      bordered ? 'border border-muted rounded-lg shadow-sm shadow-primary' : ''
    ]"
  >
    <div class="flex bg-default/60 border-b border-muted">
      <div class="w-16 px-4 py-3 border-r border-muted font-bold text-muted uppercase text-[10px] tracking-widest">
        {{ props.idLabel }}
      </div>
      <div class="flex-1 px-4 py-3 border-r border-muted font-bold text-muted uppercase text-[10px] tracking-widest">
        {{ titleLabel }}
      </div>
      <div class="w-40 px-4 py-3 border-r border-muted font-bold text-muted uppercase text-[10px] tracking-widest">
        {{ statusLabel }}
      </div>
      <div class="w-32 px-4 py-3 font-bold text-muted uppercase text-[10px] tracking-widest">
        {{ priorityLabel }}
      </div>
    </div>
    <div
      v-if="tasks.length === 0"
      class="p-8 text-center text-muted italic bg-default/80"
    >
      {{ emptyLabel }}
    </div>
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="group flex border-b border-muted last:border-0 transition-colors duration-300 hover:bg-radial from-primary/20"
      :class="[
        zebra && index % 2 !== 0 ? 'bg-muted/20' : 'bg-default/80',
        `hover:bg-${primaryColor}/20`
      ]"
    >
      <div class="w-16 px-4 py-3 border-r border-muted text-muted tabular-nums flex items-center justify-center">
        {{ task.id }}
      </div>
      <div class="flex-1 px-4 py-3 border-r border-muted flex items-center gap-3">
        <UIcon
          v-if="showIcons"
          name="i-lucide-file-text"
          class="size-4 text-muted shrink-0"
        />
        <span class="font-medium text-muted truncate">
          {{ task.title }}
        </span>
      </div>
      <div class="w-40 px-4 py-3 border-r border-muted flex items-center gap-2">
        <UIcon
          v-if="showIcons"
          :name="task.status === 'done' ? 'i-lucide-check-circle-2' : 'i-lucide-circle-dashed'"
          :class="task.status === 'done' ? 'text-success' : 'text-info'"
          class="size-4"
        />
        <span class="capitalize text-xs font-semibold">
          {{ $t(`tasks.${task.status}`) ?? task.status }}
        </span>
      </div>
      <div class="w-32 px-4 py-3 flex items-center gap-2">
        <div
          v-if="!showIcons"
          class="size-1.5 rounded-full"
          :class="task.priority === 'high' ? 'bg-error' : 'bg-info'"
        />
        <UIcon
          v-else
          :name="task.priority === 'high' ? 'i-lucide-arrow-up-circle' : 'i-lucide-arrow-right-circle'"
          :class="task.priority === 'high' ? 'text-error' : 'text-info'"
          class="size-4"
        />
        <span class="text-xs">
          {{ $t(`tasks.${task.priority}`) ?? task.priority }}
        </span>
      </div>
    </div>
  </div>
</template>
