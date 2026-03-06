<script setup lang="ts">
interface Tool {
  name: string
  description: string
  icon: string
  category: 'communication' | 'collaboration' | 'productivity' | 'social'
  link: string
}

interface Props {
  title?: string
  description?: string
  tools?: Tool[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  tools: () => []
})

const q = ref('')

const filteredTools = computed(() => {
  if (!q.value) return props.tools
  return props.tools.filter(tool =>
    tool.name.toLowerCase().includes(q.value.toLowerCase())
    || tool.description.toLowerCase().includes(q.value.toLowerCase())
  )
})
</script>

<template>
  <div class="my-12">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 class="text-3xl font-bold">
          {{ props.title || $t('lists.stack') }}
        </h2>
        <p class="text-muted">
          {{ props.description || $t('lists.choose') }}
        </p>
      </div>
      <UInput
        v-model="q"
        icon="i-lucide-search"
        size="lg"
        :placeholder="$t('lists.search')"
        class="w-full md:w-64"
      />
    </div>

    <div v-if="filteredTools.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="tool in filteredTools"
        :key="tool.name"
        class="group hover:ring-2 hover:ring-primary/40 transition-all cursor-pointer"
        @click="navigateTo(tool.link, { external: true })"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-muted/80 rounded-lg group-hover:bg-primary/20 transition-colors">
            <UIcon :name="`i-lucide-${tool.icon}`" class="size-6 text-muted group-hover:text-primary" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-bold">
                {{ tool.name }}
              </h3>
              <UBadge size="sm" variant="subtle" color="info">
                {{ $t(`lists.categories.${tool.category}`) }}
              </UBadge>
            </div>
            <p class="text-sm text-muted line-clamp-2 mt-1">
              {{ tool.description }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="text-center py-12 border-2 border-dashed border-muted rounded-xl">
      <UIcon name="i-lucide-folder-open" class="size-12 text-muted mb-4" />
      <p class="text-muted">
        {{ $t('lists.empty') }}
      </p>
    </div>
  </div>
</template>
