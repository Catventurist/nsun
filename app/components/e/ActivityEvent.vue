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
  status?: 'Open' | 'Full' | 'Cancelled'
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
  status: 'Open'
})
const value = ref(props.joined)
const max = ref(props.capacity)
</script>

<template>
  <UCard class="my-6 overflow-hidden duration-300 transition-colors hover:bg-linear-to-b from-primary/20">
    <template
      v-if="props.image"
      #header
    >
      <NuxtImg
        :src="props.image"
        :alt="props.title"
        :height="192"
        class="w-full h-48 object-cover -m-4 mb-0"
      />
    </template>
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold">
          {{ props.title }}
        </h3>
        <p class="text-sm text-muted flex items-center gap-1">
          <UIcon
            name="i-lucide-users"
            class="text-primary"
          />
          Organized by {{ props.organizer }}
        </p>
      </div>
      <UBadge
        :color="props.status === 'Open' ? 'success' : (props.status === 'Full' ? 'warning' : 'error')"
        variant="subtle"
      >
        {{ props.status }}
      </UBadge>
    </div>

    <p class="text-muted mb-4">
      {{ props.description }}
    </p>
    <div class="grid grid-cols-2 gap-4 text-sm mb-6">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-calendar"
          class="text-primary"
        />
        {{ props.date }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-map-pin"
          class="text-primary"
        />
        {{ props.location }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-receipt-euro"
          class="text-primary"
        />
        {{ props.price }}
      </div>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-users"
          class="text-primary"
        />
        {{ props.joined }} / {{ props.capacity }} Spots
      </div>
    </div>
    <UProgress
      v-model="value"
      :max="max"
      color="primary"
      class="mb-4"
    />
    <template #footer>
      <UFieldGroup class="w-full">
        <UButton
          block
          :label="props.status === 'Open' ? 'Register Now' : (props.status === 'Full' ? 'Join Waitlist' : 'Closed')"
          :disabled="props.status === 'Cancelled'"
          :color="props.status === 'Open' ? 'primary' : 'neutral'"
          variant="outline"
          icon="lucide-send"
        />
        <UButton
          label="Create New"
          icon="lucide-circle-plus"
          color="warning"
          variant="subtle"
        />
        <UButton
          label="Add notification"
          trailing-icon="lucide-message-square"
          color="info"
          variant="soft"
        />
      </UFieldGroup>
    </template>
  </UCard>
</template>
