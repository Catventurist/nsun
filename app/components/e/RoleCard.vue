<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'

interface RoleOption {
  label: string
  value: 'admin' | 'editor' | 'viewer'
  icon: string
  description: string
}

const roles = ref<SelectMenuItem[] | RoleOption[]>([
  {
    label: 'Admin',
    value: 'admin',
    icon: 'i-lucide-shield-check',
    description: 'Manage settings and team members'
  },
  {
    label: 'Editor',
    value: 'editor',
    icon: 'i-lucide-edit-3',
    description: 'Create and modify project content'
  },
  {
    label: 'Viewer',
    value: 'viewer',
    icon: 'i-lucide-eye',
    description: 'Read-only access to content and previews'
  }
])

const selectedRole = ref<RoleOption['value']>('editor')
</script>

<template>
  <UCard class="space-y-4">
    <UFormField label="Collaborator Role">
      <USelectMenu
        v-model="selectedRole"
        :items="roles"
        value-attribute="value"
        option-attribute="label"
        class="min-w-80"
      >
        <!--  <template #item>
          <UIcon :name="item.icon as any || 'i-lucide-user'" />
          <span>{{ roles.find(r => r.value === selectedRole)?.label }}</span>
        </template> -->
      </USelectMenu>
    </UFormField>
  </UCard>
</template>
