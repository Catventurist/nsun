<script setup lang="ts">
interface PortalItem {
  title: string
  description: string
  icon?: string
  to?: string
}

defineProps<{
  title?: string
  description?: string
  items?: PortalItem[]
}>()
</script>

<template>
  <div class="py-12 px-6 border-muted/60 rounded-xl my-8">
    <div class="max-w-4xl mx-auto">
      <div
        v-if="title || description"
        class="mb-10 text-center"
      >
        <h2
          v-if="title"
          class="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-4 text-lg text-muted"
        >
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.title"
          class="p-6 flex flex-col justify-between border border-muted rounded-lg hover:shadow-md hover:shadow-primary transition-shadow"
        >
          <div
            v-if="item.icon"
            class="mb-4 text-primary text-2xl"
          >
            <Icon :name="item.icon" />
          </div>
          <h3 class="font-semibold">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-sm text-muted">
            {{ item.description }}
          </p>
          <UButton
            v-if="item.to"
            :to="item.to"
            :label="$t('contact.developer.link')"
            trailing-icon="lucide-arrow-right"
            variant="link"
            class="self-end"
          />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
