<script setup lang="ts">
interface Tier {
  id: string
  name: string
  price?: string
  description: string
  features: string[]
  isHighlighted?: boolean
  buttonLabel: string
  buttonLink: string
}

interface Props {
  title?: string
  subtitle?: string
  tiers?: Tier[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Choose Your Level',
  subtitle: 'Find the membership that fits your goals.',
  tiers: () => []
})
</script>

<template>
  <div class="my-16 max-w-7xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight mb-4">
        {{ props.title }}
      </h2>
      <p
        v-if="subtitle"
        class="text-xl text-muted"
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="tier in tiers"
        :key="tier.id"
        :class="[
          'relative p-8 rounded-3xl flex flex-col transition-all duration-300',
          tier.isHighlighted
            ? 'bg-primary/20 border-2 border-warning/40 scale-105 z-10'
            : 'border border-muted/40 hover:bg-radial from-info/40'
        ]"
      >
        <div
          v-if="tier.isHighlighted"
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <UBadge
            color="primary"
            size="lg"
            variant="solid"
            class="rounded-xl px-6"
          >
            {{ $t('tier.popular') }}
          </UBadge>
        </div>

        <div class="mb-8">
          <h3 class="text-2xl font-bold mb-2">
            {{ tier.name }}
          </h3>
          <p class="text-muted text-sm mb-6">
            {{ tier.description }}
          </p>
          <div
            v-if="tier.price"
            class="flex items-baseline gap-1"
          >
            <span class="text-4xl font-extrabold">
              {{ tier.price }}
            </span>
            <span class="text-mutedtext-sm">
              / {{ $t('tier.season') }}
            </span>
          </div>
        </div>

        <ul class="space-y-4 mb-10 grow">
          <li
            v-for="feature in tier.features"
            :key="feature"
            class="flex items-start gap-3 text-sm"
          >
            <UIcon
              name="i-lucide-check-circle"
              class="size-5 text-success mt-0.5 shrink-0"
            />
            <span class="text-muted">
              {{ feature }}
            </span>
          </li>
        </ul>

        <UButton
          :to="tier.buttonLink"
          :label="tier.buttonLabel"
          :color="tier.isHighlighted ? 'primary' : 'neutral'"
          block
          size="xl"
          class="rounded-xl font-bold uppercase tracking-wide"
        />
      </div>
    </div>
  </div>
</template>
