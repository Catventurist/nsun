<script setup lang="ts">
type ColOr = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined

interface Props {
  username?: string
  title?: string
  level?: number
  xp?: number
  xpMax?: number
  health?: number
  healthMax?: number
  stamina?: number
  staminaMax?: number
  mana?: number
  manaMax?: number
  gold?: number
  gems?: number
  shards?: number
  strength?: number
  agility?: number
  intelligence?: number
  luck?: number
  reputation?: number
  kills?: number
  deaths?: number
  team?: string
  rank?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster'
  status?: 'online' | 'offline' | 'afk' | 'busy' | 'streaming'
  server?: 'us-east' | 'us-west' | 'eu-west' | 'eu-east' | 'asia-east'
  isPremium?: boolean
  isOnline?: boolean
  avatarUrl?: string
  icon?: string
  color?: ColOr
}

const props = withDefaults(defineProps<Props>(), {
  username: 'Cat',
  title: 'initiate',
  level: 1,
  xp: 0,
  xpMax: 100,
  health: 100,
  healthMax: 100,
  stamina: 100,
  staminaMax: 100,
  mana: 50,
  manaMax: 50,
  gold: 0,
  gems: 0,
  shards: 0,
  strength: 10,
  agility: 10,
  intelligence: 10,
  luck: 5,
  reputation: 0,
  kills: 0,
  deaths: 0,
  team: 'unaffiliated',
  rank: 'gold',
  status: 'online',
  server: 'eu-east',
  isPremium: true,
  isOnline: true,
  avatarUrl: '',
  icon: 'i-lucide-user',
  color: 'primary'
})

const xpPct = computed(() => (props.xp / props.xpMax) * 100)
const healthPct = computed(() => (props.health / props.healthMax) * 100)
const staminaPct = computed(() => (props.stamina / props.staminaMax) * 100)
const manaPct = computed(() => (props.mana / props.manaMax) * 100)

const kdRatio = computed(() => (props.deaths === 0 ? props.kills : props.kills / props.deaths).toFixed(2))
const totalPower = computed(() => props.strength + props.agility + props.intelligence)

const rankConfig = {
  bronze: { color: 'warning', icon: 'i-lucide-shield' },
  silver: { color: 'neutral', icon: 'i-lucide-shield-check' },
  gold: { color: 'primary', icon: 'i-lucide-award' },
  platinum: { color: 'info', icon: 'i-lucide-gem' },
  diamond: { color: 'success', icon: 'i-lucide-sparkles' },
  master: { color: 'error', icon: 'i-lucide-crown' },
  grandmaster: { color: 'error', icon: 'i-lucide-flame' }
}

const statusColors = {
  online: 'success',
  offline: 'neutral',
  afk: 'warning',
  busy: 'error',
  streaming: 'primary'
} as const
</script>

<template>
  <UCard class="max-w-2xl not-prose border-2 shadow-2xl overflow-hidden">
    <div class="flex items-start justify-between mb-8">
      <div class="flex items-center gap-5">
        <div class="relative">
          <UAvatar
            :src="avatarUrl"
            :icon="icon"
            size="2xl"
            :class="`bg-${color}/20 text-${color}`"
          />
          <div :class="[`absolute -bottom-2 -right-2 size-5 rounded-full border-4 border-muted bg-${statusColors[status]}`]" />
        </div>
        <div>
          <div class="flex items-center gap-3">
            <h3 class="text-3xl uppercase italic tracking-tighter leading-none">
              {{ username }}
            </h3>
            <UBadge
              :label="rank"
              :color="(rankConfig[rank].color as ColOr)"
              variant="soft"
              size="sm"
              class="font-bold italic"
            />
          </div>
          <p class="text-sm text-muted uppercase tracking-[0.2em] mt-1">
            {{ title }} — {{ team }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-sm uppercase text-muted">
          Power
        </div>
        <div :class="[`text-4xl text-${color}`]">
          {{ totalPower }}
        </div>
        <div class="text-sm font-bold text-muted uppercase">
          {{ server }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
      <UFormField
        :label="`level ${level} experience`"
        size="sm"
      >
        <UProgress
          v-model="xpPct"
          :color="color"
          size="md"
        />
      </UFormField>
      <UFormField
        :label="`Pool (${health}/${healthMax})`"
        size="sm"
      >
        <UProgress
          v-model="healthPct"
          color="success"
          size="md"
        />
      </UFormField>
      <UFormField
        :label="`stamina (${stamina}/${staminaMax})`"
        size="sm"
      >
        <UProgress
          v-model="staminaPct"
          color="primary"
          size="sm"
        />
      </UFormField>
      <UFormField
        :label="`Reserve (${mana}/${manaMax})`"
        size="sm"
      >
        <UProgress
          v-model="manaPct"
          color="info"
          size="sm"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-muted bg-muted/80 rounded-xl px-4">
      <UFormField
        label="gold"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-coins"
            class="text-yellow-500 size-4"
          />
          <span class="text-sm">
            {{ gold.toLocaleString() }}
          </span>
        </div>
      </UFormField>
      <UFormField
        label="gems"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-diamond"
            class="text-info size-4"
          />
          <span class="text-sm">{{ gems.toLocaleString() }}</span>
        </div>
      </UFormField>
      <UFormField
        label="shards"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-component"
            class="text-violet-500 size-4"
          />
          <span class="text-sm">{{ shards.toLocaleString() }}</span>
        </div>
      </UFormField>
      <UFormField
        label="reputation"
        size="sm"
      >
        <div class="flex items-center gap-2 mt-1">
          <UIcon
            name="i-lucide-shield"
            class="text-success size-4"
          />
          <span class="text-sm">{{ reputation }}</span>
        </div>
      </UFormField>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      <UFormField label="str">
        <span class="font-bold">{{ strength }}</span>
      </UFormField>
      <UFormField label="agi">
        <span class="font-bold">{{ agility }}</span>
      </UFormField>
      <UFormField label="int">
        <span class="font-bold">{{ intelligence }}</span>
      </UFormField>
      <UFormField label="lck">
        <span class="font-bold">{{ luck }}</span>
      </UFormField>
      <UFormField label="k/d">
        <span class="font-bold text-error">{{ kdRatio }}</span>
      </UFormField>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <UIcon
            v-for="n in 5"
            :key="n"
            :name="rankConfig[rank].icon"
            class="size-5"
            :class="n <= (level/10) ? `text-${color}` : 'text-muted'"
          />
        </div>
        <div class="flex gap-3">
          <UButton
            v-if="isPremium"
            label="Premium"
            icon="i-lucide-badge-check"
            color="warning"
            variant="subtle"
          />
          <UButton
            label="Challenge"
            :color="color"
            size="sm"
            variant="soft"
            icon="i-lucide-swords"
          />
          <UButton
            variant="ghost"
            color="info"
            icon="i-lucide-settings"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
