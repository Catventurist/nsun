<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui'

interface Member {
  id: string
  name: string
  position: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  avatar: AvatarProps
}

const projectMembers = ref<Member[]>([
  {
    id: '1',
    name: 'Cat',
    position: 'Chef',
    email: 'cat@docs.com',
    role: 'owner',
    avatar: {
      src: '/cat.png'
    }
  },
  {
    id: '2',
    name: 'Kitty',
    position: 'Apprentice',
    email: 'kitty@labs.io',
    role: 'admin',
    avatar: {
      src: '/catbirchdark.webp'
    }
  },
  {
    id: '3',
    name: 'Kisu',
    position: 'Master',
    email: 'cat.r@community-dev.org',
    role: 'editor',
    avatar: {
      src: '/catbirch.webp'
    }
  }
])

const isUpdating = ref(false)

const onSavePermissions = async () => {
  isUpdating.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Successfully updated members:', projectMembers.value)
  } catch (err) {
    console.error('Failed to sync permissions:', err)
  } finally {
    isUpdating.value = false
  }
}

const onRemoveMember = (id: string) => {
  projectMembers.value = projectMembers.value.filter(m => m.id !== id)
}
</script>

<template>
  <div class="flex flex-col p-6">
    <div class="flex flex-col mx-auto space-y-6">
      <header>
        <h1 class="text-2xl font-bold flex items-center gap-2">
          <UIcon name="i-lucide-settings-2" />
          Project Administration
        </h1>
        <p class="text-muted mt-1">
          Manage access levels and security tokens.
        </p>
      </header>
      <div class="flex flex-row">
        <EAccessTokens class="h-full" />
        <EAccessRoles
          :members="projectMembers"
          :loading="isUpdating"
          :mask-emails="true"
          @save="onSavePermissions"
          @remove="onRemoveMember"
        />
      </div>
    </div>
  </div>
</template>
