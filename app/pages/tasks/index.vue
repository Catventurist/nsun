<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { PageCollections, TasksEnCollectionItem, TasksFiCollectionItem, TodosEnCollectionItem, TodosFiCollectionItem } from '@nuxt/content'

const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: page } = await useAsyncData('tasks-' + slug.value, async () => {
  const content = await queryCollection(('tasks_' + locale.value) as keyof PageCollections).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('tasks_en').first()
  }
  return content as TasksEnCollectionItem | TasksFiCollectionItem
}, {
  watch: [locale]
})

const { data: todos } = await useAsyncData('todos-page-' + slug.value, async () => {
  const content = await queryCollection(('todos_' + locale.value) as keyof PageCollections).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('todos_en').all()
  }
  return content as TodosEnCollectionItem[] | TodosFiCollectionItem[]
}, {
  watch: [locale]
})
const getStatusConfig = (status: any) => {
  switch (status) {
    case 'backlog':
      return { icon: 'lucide-list', color: 'text-gray-500', label: t('tasks.backlog') }
    case 'todo':
      return { icon: 'lucide-circle', color: 'text-slate-400', label: t('tasks.todo') }
    case 'pending':
      return { icon: 'lucide-clock', color: 'text-blue-500', label: t('tasks.pending') }
    case 'done':
      return { icon: 'lucide-check-circle', color: 'text-green-500', label: t('tasks.done') }
    case 'canceled':
      return { icon: 'lucide-x-circle', color: 'text-red-400', label: t('tasks.canceled') }
    default:
      return { icon: 'lucide-circle', color: 'text-gray-300', label: t('tasks.todo') }
  }
}

const getPriorityConfig = (status: any) => {
  switch (status) {
    case 'high':
      return { icon: 'lucide-chevrons-up', color: 'text-red-600', bg: 'bg-red-50', label: t('tasks.high') }
    case 'medium':
      return { icon: 'lucide-chevrons-up', color: 'text-amber-500', bg: 'bg-amber-50', label: t('tasks.medium') }
    case 'low':
      return { icon: 'lucide-chevrons-down', color: 'text-blue-500', bg: 'bg-blue-50', label: t('tasks.low') }
    default:
      return { icon: 'lucide-minus', color: 'text-gray-400', bg: 'bg-gray-50', label: t('tasks.medium') }
  }
}
/*
const optionConfig = computed(() => {
  switch (todos.value?.status) {
    case 'completed':
      return {
        icon: 'lucide-check-circle',
        color: 'text-success',
        label: t('todo.status.completed')
      }
    case 'in-progress':
      return {
        icon: 'lucide-clock',
        color: 'text-info',
        label: t('todo.status.inProgress')
      }
    default:
      return {
        icon: 'lucide-circle',
        color: 'text-muted',
        label: t('todo.status.pending')
      }
  }
}) */
useSeoMeta({
  titleTemplate: '%s -' + $t('site.title'),
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: `${page.value?.title} -` + $t('site.title'),
  ogDescription: page.value?.description
})

defineOgImageComponent('SaaS')

/* const { data: module } = await useFetch('/api/module.json')

const contributors = computed(() => module.value?.contributors?.filter(contributor => !module.value?.team?.find(user => task.login === contributor.username)))

const icons = {
  website: 'i-lucide-link',
  twitter: 'i-simple-icons-x',
  twitch: 'i-simple-icons-twitch',
  youtube: 'i-simple-icons-youtube',
  instagram: 'i-simple-icons-instagram',
  linkedin: 'i-simple-icons-linkedin',
  mastodon: 'i-simple-icons-mastodon',
  bluesky: 'i-simple-icons-bluesky',
  github: 'i-simple-icons-github'
} */
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      class="relative"
      :ui="{
        title: 'text-balance',
        container: 'relative lg:py-32'
      }"
    >
      <template #top>
        <div class="absolute z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80" />
      </template>

      <LazyStarsBg />
    </UPageHero>
    <ClientOnly>
      <EComponentCards />
    </ClientOnly>
    <UPageSection :ui="{ container: '!pt-0' }">
      <UPageGrid class="xl:grid-cols-3">
        <UPageCard
          v-for="(task, index) in (todos as TodosEnCollectionItem[] | TodosFiCollectionItem[])"
          :key="index"
          :title="task.title"
          :description="task.description"
          :ui="{
            wrapper: 'items-center',
            container: 'size-full gap-y-4 lg:py-8',
            leading: 'flex justify-center',
            title: 'text-center',
            description: 'text-center text-muted'
          }"
          variant="subtle"
          spotlight
          :class="getStatusConfig(task.status).color"
        >
          <template #leading>
            <div class="flex gap-4 items-center justify-around">
              <UBadge
                :label="getStatusConfig(task.status).label"
                :icon="getStatusConfig(task.status).icon"
                variant="outline"
                :class="getStatusConfig(task.status).color"
              />
              <UButton
                :label="getPriorityConfig(task.status).label"
                :icon="getPriorityConfig(task.status).icon"
                variant="outline"
                :class="getPriorityConfig(task.status).color"
              />
            </div>
            <!-- <UAvatar
              :src="`https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/${task.login}`"
              :srcset="`https://ipx.nuxt.com/f_auto,s_160x160/gh_avatar/${task.login} 2x`"
              :alt="`${task.name} avatar`"
              size="3xl"
              class="mx-auto"
            /> -->
          </template>

          <div class="flex items-center justify-center gap-1">
            <UButton
              :label="task.start"
              color="neutral"
              variant="outline"
              size="sm"
            />-
            <UButton
              :label="task.start"
              color="neutral"
              variant="soft"
              target="_blank"
            />
            <UButton
              :color="task.completed ? 'success': 'warning'"
              :to="task.path"
              variant="link"
              icon="lucide-link"
            />
          </div>
          <!-- <div
            v-if="task.sponsorsListing"
            class="flex items-center justify-center"
          >
            <UButton
              :to="task.sponsorsListing"
              target="_blank"
              color="neutral"
              variant="subtle"
              icon="i-lucide-heart"
              label="Sponsor"
              :ui="{ leadingIcon: 'text-pink-500 dark:text-pink-400' }"
            />
          </div> -->
        </UPageCard>
      </UPageGrid>

      <!-- <ProseHr />

      <UPageGrid class="xl:grid-cols-6">
        <UPageCard
          v-for="contributor in contributors"
          :key="contributor.username"
          :title="contributor.username"
          :ui="{
            wrapper: 'items-center',
            container: 'gap-y-2',
            leading: 'flex justify-center',
            title: 'text-center',
            description: 'text-center text-muted'
          }"
        >
          <template #leading>
            <UAvatar
              :src="`https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/${contributor.username}`"
              :srcset="`https://ipx.nuxt.com/f_auto,s_160x160/gh_avatar/${contributor.username} 2x`"
              :alt="`${contributor.username} avatar`"
              size="3xl"
              class="mx-auto"
              loading="lazy"
            />
          </template>

          <div class="flex items-center justify-center gap-1">
            <UButton
              :to="`https://github.com/${contributor.username}`"
              color="neutral"
              variant="link"
              :aria-label="`Link to ${contributor.username}'s GitHub profile`"
              :icon="icons.github"
              target="_blank"
            />
          </div>
        </UPageCard>
      </UPageGrid> -->
    </UPageSection>
  </div>
</template>
