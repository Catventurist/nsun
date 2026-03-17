<script setup lang="ts">
import colors from 'tailwindcss/colors'
import * as nuxtUiLocales from '@nuxt/ui/locale'
import type { PageCollections } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'
/*
import { withLeadingSlash } from 'ufo'
const slug = computed(() => withLeadingSlash(String(route.params.slug)))
const { desktoplinks } = useHeader()
*/
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as never)[appConfig.ui.colors?.neutral as string][900] : 'white')
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`)
const blackAsPrimary = computed(() => appConfig.theme.blackAsPrimary ? `:root { --ui-primary: black; } .dark { --ui-primary: white; }` : ':root {}')
const font = computed(() => `:root { --font-sans: '${appConfig.theme.font}', sans-serif; }`)

const { data: navigation } = await useAsyncData(`navigation-${locale.value}`, async () => {
  const docsCollection = `docs_${locale.value}` as keyof PageCollections
  const blogCollection = `posts_${locale.value}` as keyof PageCollections
  const [docs, blog] = await Promise.all([
    queryCollectionNavigation(docsCollection),
    queryCollectionNavigation(blogCollection)
  ])

  return { docs, blog }
}, { watch: [locale] })

const { data: files } = useLazyAsyncData('search-' + locale.value, async () => {
  const docName = `docs_${locale.value}` as keyof PageCollections
  const postsName = `posts_${locale.value}` as keyof PageCollections

  const [doc, posts] = await Promise.all([
    queryCollectionSearchSections(docName, { ignoredTags: ['style'] }),
    queryCollectionSearchSections(postsName, { ignoredTags: ['style'] })
  ])

  return [...doc, ...posts]
}, {
  server: false,
  watch: [locale]
})

/* const { data: files } = useLazyAsyncData('search-' + locale.value, () => queryCollectionSearchSections('docs_' + locale.value as keyof Collections, {
  ignoredTags: ['style']
}), {
  server: false,
  watch: [locale]
})
const { rootNavigation } = useNavigation(navigation)

const docsi = computed(() => files.value?.doc)
const blogi = computed(() => files.value?.posts)

const blogNav = findPageChildren(navigation.value?.blog, localePath('/blog'))
const docSea = findPageChildren(files.value, localePath('/docs'))
const postsSea = findPageChildren(files.value?.posts) */
const bothi = computed(() => files.value)
const docNav = findPageChildren(navigation.value?.docs, localePath('/docs'))
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
  titleTemplate: `%s - ` + $t('site.title'),
  ogSiteName: $t('site.title'),
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
            name: 'page',
            mode: 'out-in',
            onBeforeEnter
          }"
        />
      </NuxtLayout>
    </div>
    <AppFooter />
    <ClientOnly>
      <LazyUContentSearch
        :files="bothi"
        :navigation="docNav"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
