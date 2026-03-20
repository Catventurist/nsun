<script setup lang="ts">
import type { Activity } from '~/composables/useMember'
import { useRewards } from '~/composables/useMember'

const props = withDefaults(defineProps<{
  activities?: Activity[]
  tokenName?: string
  tokenIcon?: string
  enableRewards?: boolean
  rewardRate?: number
  loading?: boolean
}>(), {
  activities: () => [],
  tokenName: 'Sun Credits',
  tokenIcon: 'i-lucide-coins',
  enableRewards: true,
  rewardRate: 10,
  loading: false
})

const emit = defineEmits<{
  (e: 'update', activities: Activity[]): void
  (e: 'reward', amount: number, reason: string): void
}>()

const rewards = useRewards()
/* const error = ref<string | boolean | undefined>() */

const onIncrement = (act: Activity) => {
  act.value += 1
  if (props.enableRewards) {
    const amount = props.rewardRate
    rewards.value.balance += amount
    rewards.value.totalEarned += amount
    rewards.value.history.unshift({
      id: crypto.randomUUID(),
      amount,
      reason: `Progress on ${act.title}`,
      timestamp: new Date()
    })
    emit('reward', amount, act.title)
  }
  emit('update', props.activities)
}

const formatTokens = (val: number) => val.toLocaleString()
</script>

<template>
  <div class="space-y-4">
    <UCard
      v-if="enableRewards"
      class="border-warning/40"
    >
      <div class="flex items-center justify-between">
        <div class="flex text-center items-center gap-3">
          <div class="px-2 py-1 rounded-full bg-warning/30 in-hover:animate-pulse">
            <UIcon
              :name="tokenIcon"
              class="size-6 mt-1"
            />
          </div>
          <div>
            <h4 class="text-xs font-bold text-warning/60 uppercase tracking-widest">
              Available Balance
            </h4>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl">{{ formatTokens(rewards.balance) }}</span>
              <span class="text-[10px] text-warning/40 font-bold uppercase">{{ tokenName }}</span>
            </div>
          </div>
        </div>
        <div class="text-right hidden sm:block">
          <span class="text-[10px] text-muted block">Lifetime Earnings</span>
          <span class="text-sm font-bold text-muted">{{ formatTokens(rewards.totalEarned) }}</span>
        </div>
      </div>
    </UCard>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-medal"
              class="size-5 text-primary"
            />
            <span class="font-bold">Tokens</span>
          </div>
          <UBadge
            v-if="enableRewards"
            color="warning"
            variant="soft"
            size="xs"
          >
            +{{ rewardRate }} {{ tokenName }} / progress
          </UBadge>
        </div>
      </template>
      <div class="divide-y divide-muted">
        <div
          v-for="act in activities"
          :key="act.id"
          class="p-4 group flex items-center justify-between duration-300 hover:bg-muted/50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <UIcon
              :name="act.type === 'habit' ? 'i-lucide-check-circle' : 'i-lucide-zap'"
              :class="act.type === 'habit' ? 'text-success' : 'text-info'"
            />
            <div class="flex flex-col">
              <span class="text-sm font-bold">{{ act.title }}</span>
              <div class="flex items-center gap-2 text-[10px] text-muted">
                <span>Value: {{ act.value }}</span>
                <span
                  v-if="enableRewards"
                  class="text-warning font-medium"
                >
                  Earned: {{ formatTokens(act.value * rewardRate) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <UButton
              icon="i-lucide-plus"
              size="md"
              color="primary"
              variant="soft"
              class="rounded-full"
              @click="onIncrement(act)"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between text-sm px-2">
          <div class="flex items-center gap-1.5 text-muted">
            <UIcon name="i-lucide-info" />
            <span>Tokens are calculated based on activity milestones.</span>
          </div>
          <div
            v-if="loading"
            class="flex items-center gap-1 text-warning font-bold animate-pulse"
          >
            <UIcon
              name="i-lucide-refresh-cw"
              class="animate-spin"
            />
            Syncing Vault...
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
