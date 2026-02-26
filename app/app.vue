<script setup lang="ts">
import colors from 'tailwindcss/colors'
import * as nuxtUiLocales from '@nuxt/ui/locale'
import { withLeadingSlash } from 'ufo'
import type { Collections, PageCollections } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => withLeadingSlash(String(route.params.slug)))
const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as never)[appConfig.ui.colors?.neutral as string][900] : 'white')
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`)
const blackAsPrimary = computed(() => appConfig.theme.blackAsPrimary ? `:root { --ui-primary: black; } .dark { --ui-primary: white; }` : ':root {}')
const font = computed(() => `:root { --font-sans: '${appConfig.theme.font}', sans-serif; }`)

/* const { data: navigation } = await useAsyncData('navigation-docs-' + locale.value, () => queryCollectionNavigation('docs_' + locale.value as keyof PageCollections, ['description']))
 */
const { data: navigation } = await useAsyncData(`navigation-${locale.value}`, async () => {
  const docsCollection = `docs_${locale.value}` as keyof PageCollections
  const blogCollection = `posts_${locale.value}` as keyof PageCollections
  const [docs, blog] = await Promise.all([
    queryCollectionNavigation(docsCollection),
    queryCollectionNavigation(blogCollection)
  ])

  return { docs, blog }
}, { watch: [locale] })

const { data: files } = useLazyAsyncData('search-' + slug.value, () => queryCollectionSearchSections('docs_' + locale.value as keyof Collections, {
  ignoredTags: ['style']
}), {
  server: false,
  watch: [locale]
})

/* const { rootNavigation } = useNavigation(navigation)

const docsi = computed(() => navigation.value?.docs)
const blogi = computed(() => navigation.value?.blog) */
const localePath = useLocalePath()
const docNav = findPageChildren(navigation.value?.docs, localePath('/docs'))
const blogNav = findPageChildren(navigation.value?.blog, localePath('/blog'))

provide('navigation-' + locale.value, docNav)

const nuxtUiLocale = computed(() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales] || nuxtUiLocales.en)
const lang = computed(() => nuxtUiLocale.value.code)
const dir = computed(() => nuxtUiLocale.value.dir)
/* const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale! as never */
const { finalizePendingLocaleChange } = useI18n()
const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }
  ],
  style: [
    { innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimary, id: 'nuxt-ui-black-as-primary', tagPriority: -2 },
    { innerHTML: font, id: 'nuxt-ui-font', tagPriority: -2 }
  ],
  htmlAttrs: {
    lang: lang,
    dir: dir
  }
})

useSeoMeta({
  titleTemplate: `%s - ` + appConfig.header.title,
  ogSiteName: appConfig.header.title,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <div :class="[route.path.startsWith(localePath('/docs/')) && 'root']">
      <AppHeader />
      <NuxtLayout>
        <NuxtPage
          :transition="{
            name: 'my',
            mode: 'out-in',
            onBeforeEnter
          }"
        />
      </NuxtLayout>
    </div>
    <AppFooter />
    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="docNav"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
