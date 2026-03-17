<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  date?: string
  category?: string
  location?: string
  organizer?: string
  capacity?: number
  joined?: number
  price?: string
  image?: string
  status?: 'open' | 'full' | 'cancelled'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Activity day',
  description: 'Some normal activity.',
  date: '06.03.2026',
  category: 'General',
  location: 'Main Hall',
  organizer: 'CBD Committee',
  capacity: 20,
  joined: 10,
  price: 'Free',
  image: '/catbirchdark.webp',
  status: 'open'
})
const value = ref(props.joined)
const max = ref(props.capacity)
</script>

<template>
  <UCard
    v-bind="props"
    class="my-6 overflow-hidden duration-300 transition-colors hover:bg-linear-to-b from-primary/20"
  >
    <template
      v-if="props.image"
      #header
    >
      <NuxtImg
        :src="image"
        :alt="title"
        :height="192"
        class="w-full h-48 object-cover -m-4 mb-0"
      />
    </template>
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold">
          {{ title }}
        </h3>
        <p class="text-sm text-muted flex items-center gap-1">
          <UIcon
            name="i-lucide-users"
            class="text-primary"
          />
          {{ $t('events.activity.organized') }}: {{ organizer }}
        </p>
      </div>
      <UBadge
        :label="$t(`events.activity.${status}`)"
        variant="subtle"
      />
    </div>
    <p class="text-muted mb-4">
      {{ description }}
    </p>
    <div class="grid grid-cols-2 gap-4 text-sm mb-6">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-calendar"
          class="text-primary"
        />
        {{ date }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-map-pin"
          class="text-primary"
        />
        {{ location }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-receipt-euro"
          class="text-primary"
        />
        {{ price }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-users"
          class="text-primary"
        />
        {{ joined }} / {{ capacity }} {{ $t('events.activity.spots') }}
      </div>
    </div>
    <UProgress
      v-model="value"
      :max="max"
      color="primary"
      class="mb-2"
    />
    <template #footer>
      <UFieldGroup class="w-full">
        <UButton
          block
          :label="status === 'open' ? $t('events.activity.register') : (status === 'full' ? $t('events.activity.join') : $t('events.activity.closed'))"
          :disabled="status === 'cancelled'"
          :color="status === 'open' ? 'primary' : 'neutral'"
          variant="outline"
          icon="lucide-send"
        />
        <UButton
          :label="$t('events.activity.new')"
          icon="lucide-circle-plus"
          color="warning"
          variant="subtle"
        />
        <UButton
          :label="$t('events.activity.notif')"
          trailing-icon="lucide-message-square"
          color="info"
          variant="soft"
        />
      </UFieldGroup>
    </template>
  </UCard>
</template>
