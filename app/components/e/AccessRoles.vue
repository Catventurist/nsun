<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, DropdownMenuItem, AvatarProps } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'
import { z } from 'zod/v4'
import type { RowPinningState } from '@tanstack/table-core'

interface Member {
  id: string
  name: string
  position: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  avatar: AvatarProps
}

const MemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email format'),
  role: z.enum(['owner', 'admin', 'editor', 'viewer'])
})

const props = withDefaults(defineProps<{
  members?: Member[]
  loading?: boolean
  readonly?: boolean
  maskEmails?: boolean
}>(), {
  members: () => [],
  loading: false,
  readonly: false,
  maskEmails: true
})

const emit = defineEmits<{
  (e: 'update', members: Member[]): void
  (e: 'remove', id: string): void
}>()

const error = ref<string | boolean | undefined>()
const accessToken = useState<string>('access-token')

const toast = useToast()
const { copy } = useClipboard()

/* const roles = [
  { label: 'Owner', value: 'owner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' }
] */

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const rowPinning = ref<RowPinningState>({ top: ['4599', '4597'], bottom: [] })

const columns: TableColumn<Member>[] = [
  {
    id: 'pin',
    cell: ({ row }) =>
      h(UButton, {
        'icon': 'i-lucide-star',
        'color': row.getIsPinned() ? 'primary' : 'neutral',
        'variant': 'ghost',
        'aria-label': row.getIsPinned() ? 'Unpin row' : 'Pin row to top',
        'onClick': () => {
          if (row.getIsPinned()) {
            row.pin(false)
          } else {
            row.pin('top')
          }
        }
      })
  },
  {
    accessorKey: 'user',
    header: 'Team Member',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.avatar,
          loading: 'lazy',
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
          h('p', { class: '' }, `@${row.original.position}`)
        ])
      ])
    }
  },
  { accessorKey: 'email', header: 'Mail' },
  { accessorKey: 'role', header: 'Access Level' },
  { id: 'action' }
]

function getDropdownActions(user: Member): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          copy(user.id.toString())

          toast.add({
            title: 'User ID copied to clipboard!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit'
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error'
      }
    ]
  ]
}
const formatEmail = (email: string) => {
  if (!props.maskEmails || !email.includes('@')) return email
  const [username, domain] = email.split('@')
  const prefix = username ? username.charAt(0) : ''
  return `${prefix}***@${domain || 'hidden'}`
}

const handleSave = () => {
  if (!accessToken.value) {
    error.value = 'Security token required'
    return
  }

  const result = MemberSchema.safeParse(projectMembers.value)
  if (result.success) {
    error.value = false
    emit('update', projectMembers.value)
  } else {
    error.value = result.error.issues[0]?.message
  }
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
</script>

<template>
  <UCard :ui="{ body: 'p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-users"
            class="size-5 text-primary"
          />
          <span class="font-bold">
            Role Management
          </span>
        </div>
        <UButton
          v-if="!props.readonly"
          label="Save Changes"
          icon="i-lucide-shield"
          variant="soft"
          :loading="loading"
          @click="handleSave"
        />
      </div>
    </template>
    <UFormField :error="error">
      <UTable
        v-model:row-pinning="rowPinning"
        :data="projectMembers"
        :columns="columns"
        :loading="loading"
        :get-row-id="(row: Member) => row.id"
        :ui="{
          tr: 'transition-colors duration-300 hover:bg-radial from-muted/80'
        }"
      >
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="`/hero/random-${row.original.id}.avif`"
              size="lg"
              loading="lazy"
              :alt="`${row.original.name} avatar`"
            />
            <div>
              <p class="font-medium text-highlighted">
                {{ row.original.name }}
              </p>
              <p>
                {{ row.original.position }}
              </p>
            </div>
          </div>
        </template>
        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton
              icon="i-lucide-ellipsis-vertical"
              color="neutral"
              variant="ghost"
              aria-label="Actions"
            />
          </UDropdownMenu>
        </template>
        <template #email-cell="{ row }">
          <div class="flex flex-col py-2 px-4">
            <span class="text-xs text-muted font-mono">
              {{ formatEmail(row.original.email) }}
            </span>
          </div>
        </template>
        <!--  <template #role-cell="{ row }">
          <USelect
            v-model="row.role"
            :options="roles"
            :disabled="readonly"
            size="sm"
            variant="none"
            class="w-36"
            @update:model-value="error = undefined"
          />
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end px-4">
            <UButton
              v-if="!readonly"
              color="neutral"
              variant="ghost"
              icon="i-lucide-trash-2"
              size="xs"
              @click="emit('remove', row.id)"
            />
          </div>
        </template> -->
      </UTable>
    </UFormField>
    <template #footer>
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-1">
          <UIcon
            :name="maskEmails ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            class="size-3.5 text-muted"
          />
          <span class="text-muted">
            {{ maskEmails ? 'Email privacy enabled' : 'Emails visible' }}
          </span>
        </div>
        <div
          v-if="error === false"
          class="text-success flex items-center gap-1"
        >
          <UIcon name="i-lucide-check-circle" />
          Settings Synchronized
        </div>
      </div>
    </template>
  </UCard>
</template>
