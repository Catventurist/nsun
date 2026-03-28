<script setup lang="ts">
interface Achievement {
  id: string
  label: string
  icon: string
  unlockedAt?: string
  isLocked: boolean
}

interface ReferralStats {
  code: string
  totalReferrals: number
  successfulConversions: number
  pendingRewards: string
}

interface SeasonalPerk {
  title: string
  description: string
  endDate: string
  multiplier: number
}

interface Props {
  title?: string
  accentColor?: 'primary' | 'info' | 'error' | 'success' | 'warning'
  viewMode?: 'grid' | 'list'
  lifetimeSavings?: string
  memberSince?: string
  showReferrals?: boolean
  showAchievements?: boolean
  showFlashPerks?: boolean
  achievements?: Achievement[]
  referralData?: ReferralStats
  flashPerks?: SeasonalPerk[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Perk Center',
  accentColor: 'primary',
  viewMode: 'grid',
  lifetimeSavings: '420',
  memberSince: '2026',
  showReferrals: true,
  showAchievements: true,
  showFlashPerks: true,
  achievements: () => [
    { id: '1', label: 'Early Adopter', icon: 'i-lucide-rocket', isLocked: false, unlockedAt: '2026-01-15' },
    { id: '2', label: 'Strategy Pro', icon: 'i-lucide-award', isLocked: false, unlockedAt: '2026-02-10' },
    { id: '3', label: 'Top Contributor', icon: 'i-lucide-star', isLocked: true }
  ],
  referralData: () => ({
    code: 'STRAT-USER-2024',
    totalReferrals: 12,
    successfulConversions: 8,
    pendingRewards: '42.00'
  }),
  flashPerks: () => [
    {
      title: 'Double Credit Weekend',
      description: 'Earn 2x rewards on all activity.',
      endDate: '2026-04-01',
      multiplier: 2
    }
  ]
})

const copyReferral = () => {
  navigator.clipboard.writeText(props.referralData.code)
}
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto p-4 lg:p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard
        v-for="stat in [
          { label: 'Lifetime Savings', value: lifetimeSavings, icon: 'i-lucide-piggy-bank' },
          { label: 'Member Since', value: memberSince, icon: 'i-lucide-calendar-days' },
          { label: 'Referral Credits', value: referralData.pendingRewards, icon: 'i-lucide-wallet' }
        ]"
        :key="stat.label"
      >
        <div class="flex items-center gap-4 duration-300 hover:scale-110">
          <div class="p-3 rounded-xl">
            <UIcon
              :name="stat.icon"
              class="size-6 text-primary"
            />
          </div>
          <div>
            <p class="font-semibold text-sm uppercase">
              {{ stat.label }}
            </p>
            <p class="text-xl font-bold text-primary">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </UCard>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div
        v-if="showReferrals"
        class="xl:col-span-2 space-y-6"
      >
        <div class="bg-primary/10 border border-primary/40 rounded-3xl p-8 relative overflow-hidden">
          <div class="relative z-10">
            <h3 class="text-2xl mb-2">
              Share the Strategy
            </h3>
            <p class="text-muted mb-6 max-w-md">
              Your friends get 20% off, and you get {{ referralData.pendingRewards }} per successful sign-up.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1 border border-muted px-4 py-3 rounded-xl font-mono font-bold flex items-center justify-between">
                {{ referralData.code }}
                <UButton
                  variant="ghost"
                  icon="i-lucide-copy"
                  @click="copyReferral"
                />
              </div>
              <UButton
                label="Share Link"
                variant="subtle"
                size="md"
                color="primary"
                icon="i-lucide-share-2"
              />
            </div>
            <div class="mt-8 flex gap-8">
              <div class="flex flex-row items-center gap-2">
                <p class="text-2xl font-bold text-primary">
                  {{ referralData.totalReferrals }}
                </p>
                <p class="text-sm uppercase font-bold">
                  Total Referrals
                </p>
              </div>
              <div class="flex flex-row items-center gap-2 border-l border-muted pl-8">
                <p class="text-2xl font-bold text-primary">
                  {{ referralData.successfulConversions }}
                </p>
                <p class="text-sm uppercase font-bold">
                  Conversions
                </p>
              </div>
            </div>
          </div>
          <UIcon
            name="i-lucide-megaphone"
            class="absolute right-10 bottom-10 size-64 text-primary/10 rotate-12"
          />
        </div>
        <div v-if="showFlashPerks && flashPerks.length > 0">
          <h4 class="font-bold mb-4 flex items-center gap-2">
            <UIcon
              name="i-lucide-zap"
              class="text-warning"
            />
            Active Flash Perks
          </h4>
          <div class="grid gap-4">
            <div
              v-for="perk in flashPerks"
              :key="perk.title"
              class="bg-warning/20 border border-warning p-4 rounded-2xl flex items-center justify-between duration-300 hover:bg-radial from-primary/20"
            >
              <div>
                <span class="text-sm bg-warning/20 px-2 py-0.5 rounded-full mb-2 inline-block uppercase">
                  Limited Time
                </span>
                <p class="font-bold">
                  {{ perk.title }}
                </p>
                <p class="text-sm">
                  {{ perk.description }}
                </p>
                <div class="flex items-center gap-1 text-xs text-muted">
                  <Icon name="lucide-arrow-right" />
                  {{ perk.endDate }}
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl text-warning">
                  x{{ perk.multiplier }}
                </p>
                <p class="text-sm text-warning/80 font-bold uppercase tracking-tighter">
                  Multiplier
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showAchievements"
        class="space-y-6"
      >
        <UCard class="h-full">
          <template #header>
            <h3 class="font-bold flex items-center gap-2">
              <UIcon
                name="i-lucide-trophy"
                class="text-yellow-500"
              />
              Badges & Achievements
            </h3>
          </template>
          <div class="space-y-4">
            <div
              v-for="badge in achievements"
              :key="badge.id"
              class="flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 hover:bg-radial from-primary/20"
              :class="[badge.isLocked ? 'opacity-40 grayscale' : 'bg-default']"
            >
              <div
                class="p-2 rounded-lg"
                :class="[badge.isLocked ? 'bg-muted' : 'bg-yellow-100 dark:bg-yellow-900/30']"
              >
                <UIcon
                  :name="badge.icon"
                  class="size-5"
                  :class="[badge.isLocked ? 'text-muted' : 'text-yellow-600']"
                />
              </div>
              <div>
                <p class="text-sm font-bold">
                  {{ badge.label }}
                </p>
                <p
                  v-if="!badge.isLocked"
                  class="text-sm"
                >
                  Unlocked {{ badge.unlockedAt }}
                </p>
                <p
                  v-else
                  class="text-sm text-muted italic"
                >
                  Keep participating to unlock
                </p>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex h-10">
              <UButton
                label="View Hall of Fame"
                variant="soft"
                color="primary"
                size="md"
                class="w-full flex justify-center"
              />
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
