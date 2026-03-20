<script setup lang="ts">
import type { Resource, ResourceType, Member } from '~/composables/useMember'

const props = withDefaults(defineProps<{
  member: Member
  initialResources?: Resource[]
  loading?: boolean
  allowCreate?: boolean
  compactMode?: boolean
  maxResources?: number
}>(), {
  initialResources: () => [],
  loading: false,
  allowCreate: true,
  compactMode: false,
  maxResources: 50
})

const emit = defineEmits<{
  (e: 'update', resources: Resource[]): void
  (e: 'select', resource: Resource): void
}>()

const localResources = ref<Resource[]>([...props.initialResources])
const activeTab = ref<ResourceType | 'all'>('all')
const error = ref<string | boolean | undefined>()

const filteredResources = computed(() => {
  let list = localResources.value
  if (activeTab.value !== 'all') {
    list = list.filter(r => r.type === activeTab.value)
  }
  return list.slice(0, props.maxResources)
})

const tabs = [
  { label: 'All Resources', value: 'all', icon: 'i-lucide-layers' },
  { label: 'Gallery', value: 'image', icon: 'i-lucide-image' },
  { label: 'Writing', value: 'post', icon: 'i-lucide-file-text' },
  { label: 'Bookmarks', value: 'link', icon: 'i-lucide-bookmark' }
]

const addResource = (type: ResourceType) => {
  if (localResources.value.length >= props.maxResources) {
    error.value = `Maximum of ${props.maxResources} resources allowed.`
    return
  }
  const newRes: Resource = {
    id: crypto.randomUUID(),
    type,
    title: `Untitled ${type}`,
    content: '',
    memberId: props.member.id,
    createdAt: new Date(),
    tags: []
  }
  localResources.value.unshift(newRes)
  error.value = undefined
  emit('update', localResources.value)
}

const getRoleColor = (role: string) => {
  const colors: Record<string, 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success' | 'info' | undefined> = {
    owner: 'warning',
    admin: 'info',
    editor: 'success',
    viewer: 'neutral'
  }
  return colors[role] || 'neutral'
}
</script>

<template>
  <UCard :ui="{ body: 'p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UAvatar
            :alt="member.name"
            :src="member.avatar.src"
          />
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-bold">
                {{ member.name }}
              </span>
              <UBadge
                :color="getRoleColor(member.role)"
                variant="subtle"
                size="xs"
                class="capitalize"
              >
                {{ member.role }}
              </UBadge>
            </div>
            <span class="text-[10px] text-muted font-mono">
              {{ member.position }}
            </span>
          </div>
        </div>
        <UDropdownMenu
          v-if="allowCreate"
          :items="[[{ label: 'Image', icon: 'i-lucide-image', click: () => addResource('image') }, { label: 'Post', icon: 'i-lucide-file-text', click: () => addResource('post') }, { label: 'Link', icon: 'i-lucide-bookmark', click: () => addResource('link') }]]"
        >
          <UButton
            label="Add"
            icon="i-lucide-plus"
            color="primary"
            variant="soft"
          />
        </UDropdownMenu>
      </div>
    </template>
    <div class="border-b border-muted p-2">
      <UTabs
        v-model="activeTab"
        :items="tabs"
        class="w-full"
      />
    </div>
    <div class="p-4">
      <div
        v-if="filteredResources.length === 0"
        class="py-12 text-center text-muted"
      >
        <UIcon
          name="i-lucide-folder-search"
          class="size-12 mx-auto mb-2 opacity-10"
        />
        <p class="text-xs">
          No assets found for {{ member.name }} in this category.
        </p>
      </div>
      <div
        v-else
        class="grid gap-3"
        :class="compactMode ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'"
      >
        <div
          v-for="res in filteredResources"
          :key="res.id"
          class="group relative border border-muted rounded-lg duration-300 hover:border-primary/40 transition-all p-3 bg-muted/20"
          @click="emit('select', res)"
        >
          <div class="flex items-start justify-between mb-2">
            <UIcon
              :name="tabs.find(t => t.value === res.type)?.icon"
              class="text-primary size-4"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="xs"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
              @click.stop="localResources = localResources.filter(r => r.id !== res.id)"
            />
          </div>
          <h3 class="text-xs font-bold line-clamp-1 mb-1">
            {{ res.title }}
          </h3>
          <div
            v-if="!compactMode"
            class="mt-2"
          >
            <p
              v-if="res.type === 'post'"
              class="text-[10px] text-muted line-clamp-2"
            >
              {{ res.content || 'No content drafted...' }}
            </p>
            <div
              v-else-if="res.type === 'link'"
              class="text-[10px] text-info truncate italic"
            >
              {{ res.content || 'https://...' }}
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between text-[9px] text-muted font-mono">
            <span>{{ new Date(res.createdAt) }}</span>
            <span v-if="res.tags.length > 0">
              #{{ res.tags[0] }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between text-sm px-2">
        <div class="flex items-center gap-1.5 text-muted">
          <UIcon
            :name="loading ? 'i-lucide-loader-2' : 'i-lucide-database'"
            class="text-primary"
            :class="{ 'animate-spin': loading }"
          />
          <span>
            {{ localResources.length }} / {{ maxResources }} resources used
          </span>
        </div>
        <div
          v-if="error"
          class="text-error flex items-center gap-1 font-medium"
        >
          <UIcon name="i-lucide-alert-circle" />
          {{ error }}
        </div>
      </div>
    </template>
  </UCard>
</template>
