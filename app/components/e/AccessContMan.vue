<script setup lang="ts">
import type { Member, Contract } from '~/composables/useMember.ts'

const initialMembers: Member[] = [
  {
    id: '1', name: 'Sarah Chen', email: 'sarah.chen@studio.io', role: 'owner',
    position: 'Online',
    avatar: { src: '/cat.png' }
  },
  {
    id: '2', name: 'Marcus Thorne', email: 'm.thorne@nuxt.com', role: 'admin', avatar: { src: '/cat.png' },
    position: ''
  },
  {
    id: '3', name: 'Elena Rodriguez', email: 'elena.r@dev.org', role: 'editor', avatar: { src: '/cat.png' },
    position: ''
  }
]

const initialContracts: Contract[] = [
  {
    id: 'c-101', title: 'Content License', counterparty: 'Nuxt Labs', amount: 5000, status: 'signed', createdAt: new Date('2026-03-01'),
    terms: ''
  },
  {
    id: 'c-102', title: 'Service Agreement', counterparty: 'Vercel', amount: 12000, status: 'pending', createdAt: new Date('2026-03-15'),
    terms: ''
  },
  {
    id: 'c-103', title: 'Asset Purchase', counterparty: 'GitHub', amount: 800, status: 'draft', createdAt: new Date('2026-03-20'),
    terms: ''
  }
]
const members = ref<Member[]>([...initialMembers])
const contracts = ref<Contract[]>([...initialContracts])
const isSyncing = ref(false)
const globalError = ref<string | boolean | undefined>()

const onSyncAll = async () => {
  isSyncing.value = true
  globalError.value = undefined
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    globalError.value = false
    console.log('Successfully synced workspace state')
  } catch (err) {
    globalError.value = 'Failed to synchronize with the Studio backend' + err
  } finally {
    isSyncing.value = false
  }
}
/*
const onRemoveMember = (id: string) => {
  members.value = members.value.filter(m => m.id !== id)
} */

const onSignContract = (id: string) => {
  const contract = contracts.value.find(c => c.id === id)
  if (contract) contract.status = 'signed'
}
</script>

<template>
  <div class="flex gap-2  p-6">
    <div class="mx-auto space-y-8">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h1 class="text-3xl font-extrabold flex items-center gap-3">
            <UIcon
              name="i-lucide-layout-dashboard"
              class="text-primary"
            />
            Workspace
          </h1>
          <p class="text-muted text-sm">
            Manage your project team, virtual agreements, and workspace permissions.
          </p>
        </div>
        <UButton
          label="Sync Workspace"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="soft"
          :loading="isSyncing"
          @click="onSyncAll"
        />
      </div>
      <UAlert
        v-if="globalError === false"
        color="success"
        variant="subtle"
        title="Workspace Synchronized"
        icon="i-lucide-check-circle-2"
        description="All member roles and contract statuses have been saved to your self-hosted instance."
      />
      <div class="flex flex-col space-y-6">
        <div class="flex flex-col justify-around space-y-6">
          <EAccessMembers
            :members="members"
            :loading="isSyncing"
            remove="onRemoveMember"
          />
          <UAlert
            title="Owner permission is required to invite new members."
            icon="i-lucide-info"
            variant="subtle"
          />
        </div>
        <EAccessCont
          :initial-contracts="contracts"
          :loading="isSyncing"
          currency-symbol="EUR"
          @sign="onSignContract"
          @update="(val: { id: string; title: string; counterparty: string; amount: number; status: 'draft' | 'pending' | 'signed' | 'active'; terms: string; createdAt: Date }[]) => contracts = val"
        />
      </div>
      <div class="flex items-center justify-between py-4">
        <div class="flex items-center gap-4 text-muted">
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-users"
              class="text-primary"
            />
            {{ members.length }} Members
          </span>
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-file-text"
              class="text-primary"
            />
            {{ contracts.length }} Agreements
          </span>
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-shield"
              class="text-primary"
            />
            Role-Based Access Control Active
          </span>
        </div>
        <span class="flex items-center gap-1 text-muted font-mono">
          <UIcon
            name="i-lucide-refresh-ccw-dot"
            class="text-primary"
          />
          {{ globalError === false ? 'Just now' : 'Not synced' }}
        </span>
      </div>
    </div>
  </div>
</template>
