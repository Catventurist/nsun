<script setup lang="ts">
interface ProcessItem {
  label: string
  value: string
  description: string
  icon: string
  efficiency: string // 95%
  timeframe: string // 24h
}

interface Props {
  title?: string
  description?: string
  icon?: string
  items?: ProcessItem[]
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Processing Method',
  description: 'Select how you want to transform the raw flower.',
  icon: 'i-lucide-settings',
  items: () => []
})

const emit = defineEmits(['update:modelValue'])
const selected = ref(props.modelValue || props.items[0]?.value)

watch(selected, val => emit('update:modelValue', val))
</script>

<template>
  <div class="space-y-6 p-6 rounded-2xl border border-muted">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-primary-100 rounded-lg">
        <UIcon
          :name="icon"
          class="size-6 text-primary"
        />
      </div>
      <div>
        <h3 class="font-bold text-xl">
          {{ title }}
        </h3>
        <p class="text-sm text-muted">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="item in items"
        :key="item.value"
        class="relative cursor-pointer group"
        @click="selected = item.value"
      >
        <div
          class="h-full p-4 rounded-xl border-2 transition-all flex flex-col gap-3"
          :class="selected === item.value
            ? 'border-primary/40'
            : 'border-transparent hover:border-muted'"
        >
          <div class="flex items-center justify-between">
            <UIcon
              :name="item.icon"
              class="size-8 text-muted group-hover:text-primary transition-colors"
            />
            <div
              class="size-5 rounded-full border-2 flex items-center justify-center"
              :class="selected === item.value ? 'border-primary/40 bg-primary/20' : 'border-muted'"
            >
              <UIcon
                v-if="selected === item.value"
                name="i-lucide-check"
                class="size-3"
              />
            </div>
          </div>
          <div>
            <span class="font-bold">{{ item.label }}</span>
            <p class="text-xs text-muted mt-1 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
          <div class="mt-auto pt-3 border-t border-muted flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
            <div class="flex items-center gap-1 text-warning">
              <UIcon
                name="i-lucide-zap"
                class="size-3"
              />
              <span>Yield: {{ item.efficiency }}</span>
            </div>
            <div class="flex items-center gap-1 text-info">
              <UIcon
                name="i-lucide-clock"
                class="size-3"
              />
              <span>{{ item.timeframe }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-muted/80 p-4 rounded-xl border border-muted prose prose-sm max-w-none">
      <slot />
    </div>
    <UButton
      block
      size="xl"
      color="primary"
      icon="i-lucide-flask-round"
      variant="soft"
    >
      Start {{ items.find(i => i.value === selected)?.label }} Run
    </UButton>
  </div>
</template>
