<script setup lang="ts">
import type { NuxtError } from '#app'
import * as nuxtUiLocales from '@nuxt/ui/locale'
import { withLeadingSlash } from 'ufo'
import type { Collections, PageCollections } from '@nuxt/content'

const { locale } = useI18n()
const nuxtUiLocale = computed(() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales] || nuxtUiLocales.en)

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const route = useRoute()
const slug = computed(() => withLeadingSlash(String(route.params.slug)))
const { data: navigation } = await useAsyncData('navigation-' + slug.value, () => queryCollectionNavigation('docs_' + locale.value as keyof PageCollections), { watch: [locale] })
const { data: files } = useLazyAsyncData('search-' + slug.value as keyof Collections, () => queryCollectionSearchSections('docs_' + locale.value as keyof Collections), {
  server: false,
  watch: [locale]
})

provide('navigation-' + slug.value, navigation)
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
