<script setup lang="ts">
interface StudyLink {
  title: string
  url: string
  source?: string
  year?: number | string
  tags?: string[]
}

interface Category {
  label: string
  icon?: string
  description?: string
  links: StudyLink[]
}

interface Props {
  title?: string
  categories?: Category[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  categories: () => []
})
</script>

<template>
  <div class="my-12 space-y-8">
    <div
      v-if="title"
      class="flex items-center gap-3 mb-6"
    >
      <div class="h-8 w-1.5 bg-primary/60 rounded-full" />
      <h2 class="text-2xl text-default tracking-tighter bold">
        {{ props.title }}
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="category in categories"
        :key="category.label"
        class="flex flex-col p-6 rounded-3xl border border-muted bg-default/80 shadow-sm shadow-primary duration-300 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start gap-4 mb-6">
          <div
            v-if="category.icon"
            class="p-3 rounded-2xl bg-primary/20 text-primary"
          >
            <Icon
              :name="category.icon"
              class="sizeh-6"
            />
          </div>
          <div>
            <h3 class="text-lg uppercase tracking-tight leading-none mb-1">
              {{ category.label }}
            </h3>
            <p
              v-if="category.description"
              class="text-xsm text-muted leading-relaxed"
            >
              {{ category.description }}
            </p>
          </div>
        </div>
        <div class="space-y-3 mt-auto">
          <NuxtLink
            v-for="link in category.links"
            :key="link.url"
            :to="link.url"
            class="group flex flex-col p-3 rounded-xl border border-transparent hover:border-gmuted hover:bg-muted transition-all"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-sm font-bold text-muted group-hover:text-primary transition-colors">
                {{ link.title }}
              </span>
              <Icon
                name="lucide:external-link"
                class="size-3.5 text-muted group-hover:text-info"
              />
            </div>
            <div class="flex flex-wrap items-center justify-around gap-2">
              <span
                v-if="link.source"
                class="text-[10px] uppercase text-muted0"
              >
                {{ link.source }}
              </span>
              <span
                v-if="link.year"
                class="text-[10px] font-bold text-muted0"
              >
                {{ link.year }}
              </span>
              <div class="flex gap-1 ml-auto">
                <UBadge
                  v-for="tag in link.tags"
                  :key="tag"
                  :label="tag"
                  variant="outline"
                  size="sm"
                  class="font-bold uppercase"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="p-4 rounded-2xl bg-muted/50 border border-dashed border-muted text-sm text-muted italic"
    >
      <slot />
    </div>
  </div>
</template>
