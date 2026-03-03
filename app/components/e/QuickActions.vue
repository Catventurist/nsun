<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const items = computed(() => [{
  label: $t('menu.interface'),
  icon: 'i-lucide-app-window',
  type: 'label' as const
}, {
  type: 'separator' as const
}, {
  label: $t('menu.show'),
  icon: 'i-lucide-eye',
  children: [
    [
      {
        label: $t('menu.bookmarks'),
        icon: 'i-lucide-bookmark',
        type: 'checkbox' as const,
        checked: showBookmarks.value,
        onUpdateChecked(checked: boolean) {
          showBookmarks.value = checked
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      }, {
        label: $t('menu.history'),
        icon: 'i-lucide-clock',
        type: 'checkbox' as const,
        checked: showHistory.value,
        onUpdateChecked(checked: boolean) {
          showHistory.value = checked
        }
      }, {
        label: $t('menu.downloads'),
        icon: 'i-lucide-download',
        type: 'checkbox' as const,
        checked: showDownloads.value,
        onUpdateChecked(checked: boolean) {
          showDownloads.value = checked
        }
      }
    ]
  ]
}, {
  label: $t('menu.shortcuts'),
  icon: 'i-lucide-monitor'
}, {
  label: $t('menu.actions'),
  icon: 'i-lucide-hammer',
  type: 'label' as const
}, {
  type: 'separator' as const
}, {
  label: $t('menu.file'),
  icon: 'i-lucide-file',
  children: [
    [
      {
        label: $t('menu.view'),
        icon: 'i-lucide-eye'
      }, {
        label: $t('menu.copy'),
        icon: 'i-lucide-copy'
      }, {
        label: $t('menu.edit'),
        icon: 'i-lucide-pencil'
      }, {
        label: $t('menu.delete'),
        color: 'error',
        icon: 'i-lucide-trash'
      }
    ]
  ]
}, {
  label: $t('menu.team'),
  icon: 'i-lucide-users'
}, {
  label: $t('menu.logout'),
  icon: 'i-lucide-log-out',
  kbds: ['shift', 'meta', 'q']
}] satisfies DropdownMenuItem[])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center' }"
    :ui="{ content: 'w-48' }"
  >
    <UButton
      :label="$t('menu.actions')"
      color="primary"
      variant="outline"
      icon="i-lucide-menu"
      class="text-center justify-center w-full"
    />
  </UDropdownMenu>
</template>
