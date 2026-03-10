<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const featLinks = ref<ButtonProps[]>([
  {
    label: $t('features.invest'),
    color: 'success',
    icon: 'lucide-area-chart',
    variant: 'soft',
    to: '#top'
  },
  {
    label: $t('features.future'),
    color: 'info',
    variant: 'subtle',
    trailingIcon: 'lucide-signpost',
    to: '#future'
  }
])

const title = $t('header.features.title')
const description = $t('header.features.description')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div>
    <UPage>
      <UPageHero
        id="top"
        :title="title"
        :description="description"
        :links="featLinks"
      />
      <ClientOnly>
        <EMarqLogo id="affiliates" />
        <ECareer id="career" />
        <EJobList id="jobs" />
        <UPageHero
          id="sponsors"
          :title="$t('header.sponsors.title')"
          :description="$t('header.sponsors.description')"
          class="text-warning"
        >
          <!--   <ESpoSec /> -->
          <ESpoGrid />
        </UPageHero>
      </ClientOnly>
      <UPageHero
        id="future"
        :title="$t('header.future.title')"
        :description="$t('header.future.description')"
      />
      <ClientOnly>
        <EFutureDash id="dash" />
        <EPortals id="portal" />
        <EFutureEdit id="editor" />
      </ClientOnly>
    </UPage>
  </div>
</template>
