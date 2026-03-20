<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  description?: string
  snippet?: string
  category?: 'logic' | 'ui' | 'api' | 'utils' | 'hooks'
  framework?: 'vanilla' | 'vue' | 'nuxt' | 'react' | 'svelte'
  language?: 'typescript' | 'javascript' | 'css' | 'html' | 'bash'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  status?: 'stable' | 'experimental' | 'deprecated'
  license?: 'mit' | 'apache' | 'gpl'
  visibility?: 'public' | 'private' | 'internal'
  author?: string
  version?: string
  ispro?: boolean
  icon?: string
  color?: 'primary' | 'blue' | 'success' | 'warning' | 'rose' | 'indigo'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Title',
  description: 'Briefly describe the purpose of this code.',
  snippet: 'Paste your code here',
  category: 'utils',
  framework: 'nuxt',
  language: 'typescript',
  difficulty: 'intermediate',
  status: 'stable',
  license: 'mit',
  visibility: 'public',
  author: 'Cat',
  version: '4.2.0',
  ispro: false,
  icon: 'i-lucide-code-2',
  color: 'primary'
})

const isCopied = ref<boolean>(false)

const copyToClipboard = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(props.snippet)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('clipboard error:', err)
  }
}

const statusConfig = {
  stable: { color: 'success', icon: 'i-lucide-check-circle' },
  experimental: { color: 'warning', icon: 'i-lucide-flask-conical' },
  deprecated: { color: 'error', icon: 'i-lucide-alert-triangle' }
} as const

const frameworkIcons = {
  vanilla: 'i-lucide-box',
  vue: 'i-lucide-layers',
  nuxt: 'i-lucide-zap',
  react: 'i-lucide-atom',
  svelte: 'i-lucide-flame'
} as const

const snip = ref(props.snippet)
</script>

<template>
  <UCard class="max-w-3xl border border-muted shadow-sm shadow-primary hover:shadow-md transition-all">
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-4">
        <UAvatar
          :icon="icon"
          :class="`bg-${color}/20 text-${color}`"
        />
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-bold capitalize leading-none">
              {{ title }}
            </h3>
            <UBadge
              v-if="ispro"
              label="Pro"
              size="sm"
              color="warning"
              variant="soft"
              class="text-sm uppercase px-1 py-0"
            />
          </div>
          <p class="text-sm text-muted mt-1">
            {{ description }}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <UBadge
          :label="category"
          icon="lucide-list"
          color="info"
          variant="outline"
          size="sm"
          class="font-bold uppercase tracking-tighter"
        />
        <UBadge
          :label="status"
          :icon="statusConfig[status].icon"
          :color="statusConfig[status].color"
          variant="subtle"
          size="sm"
          class="font-bold uppercase tracking-tighter"
        />
        <UButton
          :label="isCopied ? 'Copied' : 'Copy'"
          :trailing-icon="isCopied ? 'i-lucide-check' : 'i-lucide-copy'"
          :color="isCopied ? 'success' : 'neutral'"
          variant="ghost"
          size="sm"
          class="min-w-24 justify-between"
          @click="copyToClipboard"
        />
      </div>
    </div>
    <div class="relative group mb-6 overflow-hidden rounded-lg border border-muted">
      <div class="absolute top-1 right-1 bg-muted/80 px-2 py-1 text-sm font-mono text-primary uppercase z-10">
        {{ language }}
      </div>
      <!-- <UButton icon="lucide-send" variant="ghost" class="absolute bottom-2 right-2 z-10" /> -->
      <UTextarea
        v-model="snip"
        class="size-full"
      />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-muted">
      <UFormField
        label="framework"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            :name="frameworkIcons[framework]"
            class="size-4 text-primary"
          />
          <span class="text-xs text-muted font-medium capitalize">{{ framework }}</span>
        </div>
      </UFormField>

      <UFormField
        label="difficulty"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-gauge"
            class="size-4 text-primary"
          />
          <span class="text-xs text-muted font-medium capitalize">{{ difficulty }}</span>
        </div>
      </UFormField>

      <UFormField
        label="license"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-scale"
            class="size-4 text-primary"
          />
          <span class="text-xs text-muted font-medium uppercase">{{ license }}</span>
        </div>
      </UFormField>

      <UFormField
        label="visibility"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1 text-muted">
          <UIcon
            :name="visibility === 'public' ? 'i-lucide-eye' : 'i-lucide-eye-off'"
            class="size-4 text-primary"
          />
          <span class="text-xs text-muted font-medium capitalize">{{ visibility }}</span>
        </div>
      </UFormField>

      <UFormField
        label="author"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1 text-muted">
          <UIcon
            name="i-lucide-user"
            class="size-4 text-primary"
          />
          <span class="text-xs text-muted font-medium truncate">{{ author }}</span>
        </div>
      </UFormField>

      <UFormField
        label="version"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1 text-muted">
          <UIcon
            name="i-lucide-tag"
            class="size-4 text-primary"
          />
          <span class="text-xs font-medium">v{{ version }}</span>
        </div>
      </UFormField>
    </div>
  </UCard>
</template>
