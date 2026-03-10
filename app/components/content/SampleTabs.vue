<script setup lang="ts">
const categoryConfig = {
  All: { icon: 'i-lucide-layers', label: 'All' },
  Layout: { icon: 'i-lucide-layout-template', label: 'Layout' },
  Elements: { icon: 'i-lucide-component', label: 'Elements' },
  Forms: { icon: 'i-lucide-list-todo', label: 'Forms' },
  Navigation: { icon: 'i-lucide-menu', label: 'Navigation' }
}

type CategoryKey = keyof typeof categoryConfig

interface ComponentItem {
  name: string
  description: string
  category: Exclude<CategoryKey, 'All'>
  tags: string[]
  path: string
}

const props = withDefaults(defineProps<{
  items?: ComponentItem[]
}>(), {
  items: () => []
})

const tabItems = Object.entries(categoryConfig).map(([key, config]) => ({
  label: config.label,
  icon: config.icon,
  key: key as CategoryKey
}))

const selectedTab = ref(0)
const currentCategory = computed<CategoryKey>(() => {
  const item = tabItems[selectedTab.value]
  return (item?.key as CategoryKey) || 'All'
})

const filteredItems = computed(() => {
  if (currentCategory.value === 'All') return props.items
  return props.items.filter(item => item.category === currentCategory.value)
})
</script>

<template>
  <div class="space-y-6">
    <UTabs
      v-model="selectedTab"
      :items="tabItems"
      class="w-full"
      :ui="{ content: 'space-y-8' }"
    >
      <template #content="{ item }">
        <div class="flex items-center gap-2 relative">
          <UIcon
            :name="item.icon"
            class="size-4"
          />
          <span>{{ item.label }}</span>
        </div>
      </template>
    </UTabs>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard
        v-for="item in filteredItems"
        :key="item.name"
        class="hover:ring-2 hover:ring-primary transition-all cursor-pointer"
        @click="navigateTo(item.path)"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-bold">{{ item.name }}</span>
            <UIcon
              :name="categoryConfig[item.category].icon"
              class="text-muted"
            />
          </div>
        </template>
        <p class="text-sm text-muted line-clamp-2 mb-4">
          {{ item.description }}
        </p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in item.tags"
            :key="tag"
            variant="soft"
            size="xs"
          >
            {{ tag }}
          </UBadge>
        </div>
      </UCard>
    </div>
    <div
      v-if="filteredItems.length === 0"
      class="text-center py-12 border-2 border-dashed border-muted rounded-xl"
    >
      <UIcon
        name="i-lucide-search-x"
        class="size-12 mx-auto text-muted mb-2"
      />
      <p class="text-muted">
        No components found in this category.
      </p>
    </div>
    <slot />
  </div>
</template>
