<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

/* const items: NavigationMenuItem[] = [
  {
    label: 'Examples',
    description: 'Various possibilities',
    icon: 'i-lucide-hammer',
    to: '#examples'
  },
  {
    label: 'Tailwind',
    description: 'CSS-based eyecandy',
    icon: 'i-simple-icons-tailwindcss',
    to: '#tailwind'
  },
  {
    label: 'Motion',
    description: 'Effective and efficient animations',
    icon: 'i-cat-motionvue',
    to: '#motion'
  }
]
*/
const twlinks = ref<ButtonProps[]>([
  {
    label: 'Tailwind',
    color: 'neutral',
    icon: 'simple-icons-tailwindcss',
    variant: 'soft',
    to: 'https://tailwindcss.com/docs/styling-with-utility-classes'
  },
  {
    label: 'Motion',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'cat-motionvue',
    to: 'https://motion.unovue.com/'
  }
])

const eimages = [
  '/hero/random-1.avif',
  '/hero/random-2.avif',
  '/hero/random-3.avif',
  '/hero/random-4.avif',
  '/hero/random-5.avif'
]

const title = $t('header.about.title')
const description = $t('header.about.description')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UPage>
    <!-- <template #left>
      <UPageAside>
        <UNavigationMenu
          collapsed
          orientation="vertical"
          :items="items"
          :ui="{
            link: 'flex-col gap-1',
            linkLabel: 'block text-[10px]/3 text-center'
          }"
        />
      </UPageAside>
    </template> -->
    <UPageCTA
      :title="title"
      :description="description"
      orientation="horizontal"
      :links="twlinks"
    >
      <EHeroVideo />
    </UPageCTA>
    <UPageList>
      <ClientOnly>
        <AProjectLine id="roadmap" />
        <EMarq id="affiliates" />
        <ESpoSec id="sponsors" />
        <AProductList id="products" />
        <MContactBlock id="contact" />
        <AFeatureAround id="values" />
        <EStatsLinks />
        <ELogOrb />
        <AExpGallery :images="eimages" />
        <!--
        <EContScroll />
        <EEventCards />
        <ESliderTest />
        <ESpringCal /> -->
      </ClientOnly>
    </UPageList>
    <UPageHero
      :title="$t('header.examples.title')"
      :description="$t('header.examples.description')"
    />
    <UPageGrid>
      <ClientOnly>
        <div class="flex flex-col justify-around">
          <!--  <ATermsDialog class="text-center self-center w-full" /> -->
          <AUploadToast class="text-center self-center w-full" />
        </div>
        <ECardFlip />
        <EScratchTic />
        <MCircularProgress
          :duration="3"
          :interval="10"
          :max="100"
          :min="0"
          class="self-center w-full"
        />
        <MCountUp
          :max="420"
          :min="50"
          class="text-center self-center text-5xl w-full"
        />
        <MProjCard />
      </ClientOnly>
    </UPageGrid>
  </UPage>
</template>
