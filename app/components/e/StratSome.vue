<script setup lang="ts">
interface SocialStats {
  followers: number
  engagement: string
  growth: number
}

interface Feature {
  name: string
  icon: string
  isAvailable: boolean
}

interface Props {
  name?: string
  handle?: string
  description?: string
  icon?: string
  color?: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined
  coverImage?: string
  isVerified?: boolean
  stats?: SocialStats
  tags?: string[]
  primaryAudience?: string
  features?: Feature[]
  onboardingProgress?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
  status?: 'active' | 'beta' | 'deprecated'
  officialLink?: string
  memberSince?: string
  isFeatured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-lucide-share-2',
  color: 'primary',
  isVerified: false,
  stats: () => ({ followers: 0, engagement: '0%', growth: 0 }),
  tags: () => [],
  features: () => [],
  onboardingProgress: 47,
  difficulty: 'easy',
  status: 'active',
  isFeatured: false
})

const formatNumber = (num: number) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
}
</script>

<template>
  <UCard
    :ui="{ body: 'p-0' }"
    class="overflow-hidden group"
  >
    <div class="h-24 relative">
      <img
        v-if="props.coverImage"
        :src="coverImage"
        class="size-full object-cover"
      >
      <div
        v-else
        class="size-full bg-radial from-primary/20"
      />

      <div class="absolute -bottom-6 left-4">
        <UAvatar
          :icon="icon"
          size="xl"
          :class="`bg-${color}/40`"
        />
      </div>
      <div
        v-if="isFeatured"
        class="absolute top-2 right-2"
      >
        <UBadge
          label="Featured Platform"
          color="warning"
          variant="solid"
          size="xs"
        />
      </div>
    </div>
    <div class="p-4 pt-8 space-y-4">
      <div class="flex justify-between items-start">
        <div>
          <div class="flex items-center gap-1">
            <h3 class="text-xl font-bold">
              {{ name }}
            </h3>
            <UIcon
              v-if="isVerified"
              name="i-lucide-badge-check"
              class="text-info size-5"
            />
          </div>
          <p class="text-sm text-muted font-mono">
            {{ handle }}
          </p>
        </div>
        <UButton
          v-if="officialLink"
          icon="i-lucide-external-link"
          variant="ghost"
          color="neutral"
          square
          :to="officialLink"
          target="_blank"
        />
      </div>
      <p class="text-sm text-muted line-clamp-2">
        {{ description }}
      </p>
      <div class="grid grid-cols-3 gap-2 py-3 border-y border-muted">
        <div class="text-center">
          <p class="text-xs text-muted uppercase">
            Followers
          </p>
          <p class="font-bold">
            {{ formatNumber(stats.followers) }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-xs text-muted uppercase">
            Engagement
          </p>
          <p class="font-bold">
            {{ stats.engagement }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-xs text-muted uppercase">
            Growth
          </p>
          <p class="font-bold text-success">
            +{{ stats.growth }}%
          </p>
        </div>
      </div>
      <div
        v-if="features.length"
        class="space-y-2"
      >
        <p class="text-xs font-bold text-muted uppercase">
          Key Features
        </p>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="flex items-center gap-2 text-xs"
            :class="feature.isAvailable ? 'text-success' : 'text-muted opacity-50'"
          >
            <UIcon
              :name="feature.icon"
              class="size-4"
            />
            <span>{{ feature.name }}</span>
          </div>
        </div>
      </div>
      <div class="space-y-1">
        <div class="flex justify-between text-lg font-bold uppercase text-muted">
          <span>Platform Mastery</span>
          <span>{{ onboardingProgress }}%</span>
        </div>
        <!-- <UProgress
          :v-model="prog"
          :color="color"
          size="sm"
        /> -->
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex gap-1">
          <UBadge
            v-for="tag in tags"
            :key="tag"
            size="xs"
            variant="soft"
            color="info"
          >
            #{{ tag }}
          </UBadge>
        </div>
        <UButton
          size="sm"
          :color="color"
          label="Explore Platform"
          variant="soft"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </template>
  </UCard>
</template>
