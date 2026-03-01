<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { PageCollections, ProEnCollectionItem, ProFiCollectionItem, ProjectsEnCollectionItem, ProjectsFiCollectionItem } from '@nuxt/content'
import { Motion } from 'motion-v'

const { header } = useAppConfig()
const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: page } = await useAsyncData('pro-' + slug.value, async () => {
  const content = await queryCollection(('pro_' + locale.value) as keyof PageCollections).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('pro_en').first()
  }
  return content as ProEnCollectionItem | ProFiCollectionItem
}, {
  watch: [locale]
})

const { data: projects } = await useAsyncData('projects-page-' + slug.value, async () => {
  const content = await queryCollection(('projects_' + locale.value) as keyof PageCollections).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('projects_en').all()
  }
  return content
}, {
  watch: [locale]
})
/*
const { data: page } = await useAsyncData('pro-' + slug.value, () => queryCollection('pro_' + locale.value as keyof PageCollections).first(), { watch: [locale] })
const { data: projects } = await useAsyncData('projects-' + slug.value, () => queryCollection('projects_' + locale.value as keyof PageCollections).all(), { watch: [locale] })

if (!page.value) {
  throw createError({
    status: 404,
    statusText: 'Page not found',
    fatal: true
  })
}

const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
}) */

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="header.meetingLink"
            v-bind="page.links[0]"
            variant="soft"
          />
          <UButton
            :to="`mailto:${header.mail}`"
            v-bind="page.links[1]"
            variant="subtle"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(project, index) in (projects as ProjectsEnCollectionItem[] | ProjectsFiCollectionItem[])"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(5px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.05 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group duration-300 hover:bg-radial from-primary/20"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="flex items-center gap-1 text-sm text-muted">
              <UIcon name="lucide-calendar" class="group-hover:text-info" />
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <div class="flex flex-row justify-around gap-2">
              <UButton
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                variant="outline"
              />
              <ULink
                :to="project.url"
                class="text-sm text-muted flex items-center group-hover:text-primary"
              >
                {{ $t('header.projects.view') }}
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </ULink>
            </div>
          </template>
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            :height="200"
            :width="200"
            class="object-cover w-full h-48 rounded-lg"
          />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
