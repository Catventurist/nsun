<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const witems = ref<NavigationMenuItem[]>([
  {
    label: 'Getting Started',
    icon: 'i-lucide-play',
    children: [
      {
        label: 'Requirements',
        icon: 'i-lucide-circle-check',
        to: '#requirements'
      },
      {
        label: 'Installation',
        icon: 'lucide-arrow-down-to-line',
        to: '#installation'
      },
      {
        label: 'Configuration',
        icon: 'i-lucide-settings',
        to: '#configuration'
      },
      {
        label: 'Upgrade',
        icon: 'lucide-arrow-up-to-line',
        to: '#upgrade'
      },
      {
        label: 'Release Notes',
        icon: 'i-lucide-notebook-tabs',
        to: '#changelog'
      }
    ]
  },
  {
    label: 'User Guide',
    icon: 'i-lucide-book-text',
    children: [
      {
        label: 'Basics',
        icon: 'i-lucide-brick-wall',
        to: '#basics'
      },
      {
        label: 'Structure',
        icon: 'i-lucide-folder-dot',
        to: '#structure'
      },
      {
        label: 'Manage Pages',
        icon: 'i-lucide-file-text',
        to: '#managepages'
      },
      {
        label: 'Editors',
        icon: 'i-lucide-pen',
        to: '#editors'
      },
      {
        label: 'Media Assets',
        icon: 'i-lucide-image',
        to: '#media'
      }
    ]
  },
  {
    label: 'Administration',
    icon: 'i-lucide-shield',
    children: [
      {
        label: 'Authentication',
        icon: 'i-lucide-lock',
        to: '#auth'
      },
      {
        label: 'Comments',
        icon: 'i-lucide-message-circle',
        to: '#comments'
      },
      {
        label: 'Locales',
        icon: 'i-lucide-globe',
        to: '#locales'
      },
      {
        label: 'Navigation',
        icon: 'i-lucide-navigation',
        to: '#navigation'
      },
      {
        label: 'Rendering Pipeline',
        icon: 'i-lucide-cog',
        to: '#rendering'
      },
      {
        label: 'Search Engines',
        icon: 'i-lucide-search',
        to: '#search'
      },
      {
        label: 'Storage',
        icon: 'i-lucide-hard-drive',
        to: '#storage'
      },
      {
        label: 'Troubleshooting',
        icon: 'i-lucide-life-buoy',
        to: '#troubleshooting'
      },
      {
        label: 'Users, Groups & Permissions',
        icon: 'i-lucide-users',
        to: '#authors'
      }
    ]
  },
  {
    label: 'Developers',
    icon: 'i-lucide-code',
    children: [
      {
        label: 'Getting Started',
        icon: 'i-lucide-chevron-right',
        to: '#getting-started'
      },
      {
        label: 'Modules',
        icon: 'i-lucide-diamond',
        to: '#modules'
      },
      {
        label: 'Themes',
        icon: 'i-lucide-palette',
        to: '#themes'
      },
      {
        label: 'Translations',
        icon: 'i-lucide-file-pen',
        to: '#translations'
      },
      {
        label: 'API',
        icon: 'i-lucide-app-window-mac',
        to: '#api'
      }
    ]
  },
  {
    label: 'Contributions',
    icon: 'i-lucide-heart',
    children: [
      {
        label: 'Donations',
        icon: 'i-lucide-circle-check',
        to: '#donations'
      },
      {
        label: 'Report a Bug',
        icon: 'lucide-bug-play',
        to: '#reportbug'
      },
      {
        label: 'Suggest a New Feature',
        icon: 'i-lucide-message-circle-code',
        to: '#newfeature'
      }
    ]
  }
])
</script>

<template>
  <div class="fixed flex flex-row top-16 left-2 h-full">
    <UNavigationMenu
      :items="witems"
      highlight
      orientation="vertical"
      tooltip
      collapsed
      popover
      :ui="{
        link: 'flex-col gap-1',
        linkLabel: 'block text-[10px]/3 text-center'
      }"
    />
  </div>
</template>
