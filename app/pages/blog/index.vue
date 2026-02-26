<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/*
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData('blog-' + slug.value, async () => {
  const collection = 'blog_' + locale.value as keyof Collections
  const content = await queryCollection(collection).path(slug.value).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('blog_en').path(slug.value).first()
  }
  return content
}, {
  watch: [locale]
})

const { data: posts } = await useAsyncData('posts-' + slug.value, async () => {
  const collection = ('posts_' + locale.value) as keyof Collections
  const content = await queryCollection(collection).path(slug.value).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('posts_en').path(slug.value).all()
  }
  return content
}, {
  watch: [locale]
})
*/
const { data: page } = await useAsyncData('blog-' + slug.value, () => queryCollection('blog_' + locale.value as keyof PageCollections).path(route.path).first(), { watch: [locale] })
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts_' + locale.value as keyof Collections).order('title', 'DESC').all(), { watch: [locale] })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer v-if="page">
    <UPageHero
      v-bind="page"
      class="md:border-b border-default"
      :ui="{ container: 'relative py-10 sm:py-16 lg:py-24' }"
    >
      <template #title>
        <MDC
          :value="page.title"
          unwrap="p"
          cache-key="blog-hero-title"
        />
      </template>
      <template #description>
        <MDC
          :value="page.description"
          unwrap="p"
          cache-key="blog-hero-description"
        />
      </template>
    </UPageHero>

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in (posts as any)"
          :key="post.title"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
        >
          <template #badge>
            <div class="flex flex-row items-center gap-2">
              <UButton
                v-bind="post.badge"
                :title="$t('time.tag')"
                icon="lucide-tag"
                variant="subtle"
                size="sm"
              />
              <UButton
                :label="new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })"
                :title="$t('time.created')"
                icon="lucide-calendar"
                variant="subtle"
                size="sm"
                color="info"
              />
              <UButton
                :label="post.readingTime + ' ' + $t('time.min')"
                :title="$t('time.reading')"
                icon="lucide-clock"
                variant="subtle"
                size="sm"
                color="warning"
              />
            </div>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
