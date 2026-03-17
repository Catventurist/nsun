<script setup lang="ts">
interface Task {
  id: string | number
  status: 'done' | 'pending' | 'progress'
  priority: 'high' | 'medium' | 'low'
}

interface Props {
  tasks?: Task[]
  title?: string
  totalLabel?: string
  doneLabel?: string
  progressLabel?: string
  pendingLabel?: string
  priorityLabel?: string
  primaryColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | undefined
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  title: 'Project Progress',
  totalLabel: 'Total Tasks',
  doneLabel: 'Completed',
  progressLabel: 'In Progress',
  pendingLabel: 'Pending',
  priorityLabel: 'Priority Breakdown',
  primaryColor: 'primary'
})

const total = computed(() => props.tasks.length)
const doneCount = computed(() => props.tasks.filter(t => t.status === 'done').length)
const progressCount = computed(() => props.tasks.filter(t => t.status === 'progress').length)
const pendingCount = computed(() => props.tasks.filter(t => t.status === 'pending').length)
const completionRate = computed(() => total.value > 0 ? Math.round((doneCount.value / total.value) * 100) : 0)
const priorityDistribution = computed(() => {
  const high = props.tasks.filter(t => t.priority === 'high').length
  const med = props.tasks.filter(t => t.priority === 'medium').length
  const low = props.tasks.filter(t => t.priority === 'low').length
  return [
    { label: 'high', value: high, color: 'error' },
    { label: 'medium', value: med, color: 'warning' },
    { label: 'low', value: low, color: 'info' }
  ]
})
</script>

<template>
  <div class="my-8 p-6 border border-muted rounded-2xl shadow-sm shadow-primary">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-xl font-bold">
          {{ title }}
        </h3>
        <p class="text-sm text-muted">
          {{ completionRate }}% {{ doneLabel.toLowerCase() }}
        </p>
      </div>
      <UIcon
        name="i-lucide-activity"
        class="size-8 text-primary"
      />
    </div>
    <div class="mb-10">
      <UProgress
        v-model="completionRate"
        size="lg"
        :color="primaryColor"
        class="h-3"
      />
      <div class="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div class="p-4 rounded-xl bg-muted/60 border border-muted flex items-center gap-4 duration-300 hover:bg-radial from-primary/20">
        <div class="p-2 rounded-lg shadow-sm shadow-primary">
          <UIcon
            name="i-lucide-layers"
            class="size-5 text-muted"
          />
        </div>
        <div>
          <span class="text-xs text-muted font-medium block">
            {{ totalLabel }}
          </span>
          <span class="text-lg font-bold tabular-nums">
            <MCountUp
              :max="total"
              :min="0"
            />
          </span>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-muted/60 border border-muted flex items-center gap-4 duration-300 hover:bg-radial from-primary/20">
        <div class="p-2 rounded-lg shadow-sm shadow-warning">
          <UIcon
            name="i-lucide-loader-2"
            class="size-5 text-warning animate-spin-slow"
          />
        </div>
        <div>
          <span class="text-xs text-muted font-medium block">
            {{ progressLabel }}
          </span>
          <span class="text-lg font-bold tabular-nums">
            <MCountUp
              :max="progressCount"
              :min="0"
            />
          </span>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-muted/60 border border-muted flex items-center gap-4 duration-300 hover:bg-radial from-primary/20">
        <div class="p-2 rounded-lg shadow-sm shadow-info">
          <UIcon
            name="i-lucide-ellipse"
            class="size-5 text-info"
          />
        </div>
        <div>
          <span class="text-xs text-muted font-medium block">
            {{ pendingLabel }}
          </span>
          <span class="text-lg font-bold tabular-nums">
            <MCountUp
              :max="pendingCount"
              :min="0"
            />
          </span>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-muted/60 border border-muted flex items-center gap-4 duration-300 hover:bg-radial from-primary/20">
        <div class="p-2 rounded-lg shadow-sm shadow-primary">
          <UIcon
            name="i-lucide-check-circle"
            class="size-5 text-success"
          />
        </div>
        <div>
          <span class="text-xs text-muted font-medium block">
            {{ doneLabel }}
          </span>
          <span class="text-lg font-bold tabular-nums">
            <MCountUp
              :max="doneCount"
              :min="0"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="pt-6 border-t border-muted">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-bold uppercase tracking-wider text-muted">
          {{ priorityLabel }}
        </span>
      </div>
      <div class="flex gap-2">
        <UTooltip
          v-for="item in priorityDistribution"
          :key="item.label"
          :text="$t(`tasks.${item.label}`)"
        >
          <UProgress
            v-model="item.value"
            :max="total"
            :color="(item.color as typeof primaryColor)"
            :label="$t(`tasks.${item.label}`)"
            variant="outline"
            size="lg"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
