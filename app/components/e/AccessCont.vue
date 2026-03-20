<script setup lang="ts">
import { ContractSchema } from '~/composables/useMember'
import type { Contract } from '~/composables/useMember'

const props = withDefaults(defineProps<{
  initialContracts?: Contract[]
  loading?: boolean
  readonly?: boolean
  currencySymbol?: string
}>(), {
  initialContracts: () => [],
  loading: false,
  readonly: false,
  currencySymbol: '€'
})
/*
const emit = defineEmits<{
  (e: 'update', contracts: Contract[]): void
  (e: 'sign', id: string): void
}>()

 const localContracts = ref<Contract[]>([...props.initialContracts]) */
const contracts = ref<Contract[]>([...props.initialContracts])
const error = ref<string | boolean | undefined>()
const isCreating = ref(false)

const newContract = ref<Partial<Contract>>({
  title: '',
  counterparty: '',
  amount: 0,
  status: 'draft',
  terms: ''
})

/* const addContract = (data: Partial<Contract>) => {
  const result = ContractSchema.safeParse({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  })

  if (result.success) {
    contracts.value.push(result.data)
    error.value = false
    emit('update', contracts.value)
  } else {
    error.value = result.error.issues[0]?.message
  }
} */

const onCreateContract = () => {
  const contractData = {
    ...newContract.value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  }

  const result = ContractSchema.safeParse(contractData)
  if (result.success) {
    contracts.value.push(result.data)
    error.value = false
    isCreating.value = false
    newContract.value = { title: '', counterparty: '', amount: 0, status: 'draft', terms: '' }
  } else {
    error.value = result.error.issues[0]?.message
  }
}

const getStatusColor = (status: string) => {
  const colors: Record<string, 'error' | 'neutral' | 'warning' | 'info' | 'success' | 'primary' | 'secondary' | undefined> = {
    draft: 'neutral',
    pending: 'warning',
    signed: 'info',
    active: 'success'
  }
  return colors[status] || 'neutral'
}
/*
const columns: TableColumn<Contract>[] = [
  { accessorKey: 'title', header: 'Contract Title' },
  { accessorKey: 'counterparty', header: 'Counterparty' },
  { accessorKey: 'amount', header: 'Value' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions', header: 'Actions' }
]
const colu: TableColumn<Contract>[] = [
  {
    accessorKey: 'title',
    header: 'Contract Title',
    cell: ({ row }) => row.original.title
  },
  {
    accessorKey: 'counterparty',
    header: 'Counterparty',
    cell: ({ row }) => row.original.counterparty
  },
  {
    accessorKey: 'amount',
    header: 'Value',
    cell: ({ row }) => row.original.amount
  },
  {
    accessorKey: 'status',
    header: 'Current Status',
    cell: ({ row }) => row.original.status
  },
  {
    accessorKey: 'actions',
    header: 'Actions'
  }
] */
</script>

<template>
  <div class="flex flex-col space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-file-signature"
          class="size-6 text-primary"
        />
        <h2 class="text-xl font-bold">
          Virtual Contracts
        </h2>
      </div>
      <UButton
        label="Draft New Contract"
        icon="i-lucide-plus"
        variant="soft"
        @click="isCreating = !isCreating"
      />
    </div>
    <UCard v-if="isCreating">
      <template #header>
        <div class="flex items-center gap-2 font-bold">
          <UIcon name="i-lucide-pencil-line" />
          Contract Details
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField
          label="Title"
          :error="error && !newContract.title ? error : undefined"
        >
          <UInput
            v-model="newContract.title"
            placeholder="Service Agreement..."
          />
        </UFormField>
        <UFormField label="Counterparty">
          <UInput
            v-model="newContract.counterparty"
            placeholder="Client Name or Org"
          />
        </UFormField>
        <UFormField label="Contract Value">
          <UInput
            v-model.number="newContract.amount"
            type="number"
            icon="i-lucide-banknote"
          />
        </UFormField>
        <UFormField label="Initial Status">
          <USelect
            v-model="newContract.status"
            :options="['draft', 'pending']"
          />
        </UFormField>
        <UFormField
          label="Contract Terms"
          class="md:col-span-2"
        >
          <UTextarea
            v-model="newContract.terms"
            placeholder="Define terms, obligations, and dates..."
          />
        </UFormField>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="ghost"
            @click="isCreating = false"
          />
          <UButton
            label="Generate Contract"
            icon="i-lucide-file-check"
            @click="onCreateContract"
          />
        </div>
      </template>
    </UCard>
    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="contracts"
        :loading="props.loading"
      >
        <template #title-cell="{ row }">
          <div class="flex flex-col py-2 px-4">
            <span class="font-bold">
              {{ row.original.title }}
            </span>
            <span class="text-xs text-muted italic">
              Created
              <NuxtTime :datetime="new Date(row.original.createdAt)" />
            </span>
          </div>
        </template>
        <template #amount-cell="{ row }">
          <span class="font-mono text-sm">
            {{ row.original.amount }}
          </span>
        </template>
        <template #status-cell="{ row }">
          <UBadge
            :color="getStatusColor(row.original.status)"
            variant="subtle"
            class="capitalize"
          >
            {{ row.original.status }}
          </UBadge>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-2 px-4">
            <UButton
              icon="i-lucide-eye"
              color="neutral"
              variant="ghost"
              size="xs"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="xs"
              @click="contracts = contracts.filter(c => c.id !== row.id)"
            />
          </div>
        </template>
      </UTable>
      <div
        v-if="contracts.length === 0"
        class="p-8 text-center text-muted"
      >
        <UIcon
          name="i-lucide-folder-open"
          class="size-12 mx-auto mb-2 opacity-20"
        />
        <p>No virtual contracts found. Start by drafting a new agreement.</p>
      </div>
    </UCard>
  </div>
</template>
