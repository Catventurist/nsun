<script setup lang="ts">
import type { Rewards } from '~/composables/useMember'

const props = withDefaults(defineProps<{
  rewards: Rewards
  title?: string
  tokenName?: string
  tokenIcon?: string
  showHistory?: boolean
  loading?: boolean
}>(), {
  title: 'Rewards',
  tokenName: 'Credits',
  tokenIcon: 'i-lucide-coins',
  showHistory: true,
  loading: false
})

const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const formatTokens = (val: number) => val.toLocaleString()
const getHistoryItemColor = (amount: number) => amount > 0 ? 'success' : 'error'
</script>

<template>
  <div class="space-y-4">
    <UCard class="overflow-hidden relative">
      <div class="absolute -right-4 -bottom-4 opacity-10">
        <UIcon
          :name="tokenIcon"
          class="size-24 rotate-12"
        />
      </div>
      <div class="relative z-10 flex items-center justify-between">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <UIcon
              :name="tokenIcon"
              class="size-5 text-warning"
            />
            <span class="text-xs font-bold uppercase tracking-widest text-warning">{{ props.title }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <h2 class="text-4xl">
              {{ formatTokens(rewards.balance) }}
            </h2>
            <span class="text-xs font-bold uppercase text-warning">{{ tokenName }}</span>
          </div>
        </div>

        <div class="text-right flex flex-col items-end">
          <div class="uppercase font-bold text-warning opacity-80">
            Lifetime Earnings
          </div>
          <div class="text-lg">
            {{ formatTokens(rewards.totalEarned) }}
          </div>
          <UButton
            v-if="!loading"
            variant="link"
            size="xs"
            color="neutral"
            label="Refresh Vault"
            icon="i-lucide-refresh-cw"
            @click="emit('refresh')"
          />
        </div>
      </div>
    </UCard>
    <UCard
      v-if="showHistory"
      :ui="{ body: 'p-0' }"
    >
      <template #header>
        <div class="flex items-center gap-2 font-bold px-2">
          <UIcon
            name="i-lucide-history"
            class="size-4 text-primary"
          />
          <span class="text-sm">Recent Activity</span>
        </div>
      </template>
      <div class="divide-y divide-muted">
        <div
          v-if="rewards.history.length === 0"
          class="p-8 text-center text-muted"
        >
          <p class="text-sm">
            No reward history recorded yet. Complete activities to earn tokens!
          </p>
        </div>
        <div
          v-for="item in rewards.history.slice(0, 5)"
          :key="item.id"
          class="p-3 flex items-center justify-between duration-300 hover:bg-muted/60 transition-colors"
        >
          <div class="flex flex-col gap-0.5">
            <span class="text-xs font-bold">{{ item.reason }}</span>
            <span class="text-[10px] text-muted">{{ new Date(item.timestamp) }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span :class="`text-sm text-${getHistoryItemColor(item.amount)}`">
              {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
            </span>
            <UIcon
              :name="tokenIcon"
              class="size-3.5 text-warning"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between text-sm px-2 text-muted">
          <span>{{ rewards.history.length }} Total Rewards</span>
          <UButton
            label="View Full Ledger"
            variant="soft"
            size="xs"
            color="primary"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
