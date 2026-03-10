<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const items = ref([
  {
    label: 'Site',
    description: 'Make changes to your site here. Click save when you are done.',
    icon: 'i-lucide-user',
    slot: 'site' as const,
    children: [{
      title: 'ContainerScroll',
      description: 'Scroll to move image',
      icon: 'lucide-cat',
      to: '#containerscroll'
    }]
  },
  {
    label: 'Products',
    description: 'Change your products here. After saving, you are ll be logged out.',
    icon: 'i-lucide-lock',
    slot: 'products' as const,
    children: [{
      title: 'Fisu',
      description: 'kuiva',
      icon: 'lucide-fish',
      to: '/'
    }]
  },
  {
    label: 'Labs',
    description: 'Make changes to your labs here. Click save when you are done.',
    icon: 'i-lucide-user',
    slot: 'labs' as const,
    children: [{
      title: 'Kisu',
      description: 'kuva',
      icon: 'lucide-cat',
      to: '/'
    }]
  },
  {
    label: 'Growth',
    description: 'Make changes to your growth here. Click save when you are done.',
    icon: 'i-lucide-user',
    slot: 'growth' as const,
    children: [{
      title: 'Kisu',
      description: 'kuva',
      icon: 'lucide-cat',
      to: '/'
    }]
  },
  {
    label: 'English',
    description: 'Make changes to your english here. Click save when you are done.',
    icon: 'i-lucide-user',
    slot: 'english' as const,
    children: [{
      title: 'Kisu',
      description: 'kuva',
      icon: 'lucide-cat',
      to: '/'
    }]
  }
] satisfies TabsItem[])

const active = ref('0')

const eimages = [
  '/hero/random-1.avif',
  '/hero/random-2.avif',
  '/hero/random-3.avif',
  '/hero/random-4.avif',
  '/hero/random-5.avif'
]

const eventItems = ref({
  title: $t('events.activity.title'),
  description: $t('events.activity.description'),
  date: '06.03.2026',
  category: $t('events.activity.category'),
  location: $t('events.activity.location'),
  organizer: $t('events.activity.organizer'),
  capacity: 20,
  joined: 10,
  price: $t('events.activity.price'),
  image: '/catbirchdark.webp',
  status: 'open'
})
</script>

<template>
  <UTabs
    v-model="active"
    :items="items"
    variant="link"
    :ui="{ trigger: 'grow' }"
    class="p-4 gap-4 size-full"
  >
    <template #site="{ item }">
      <UPageColumns>
        <UPageCard
          icon="lucide-info"
          :title="item.description"
        />
        <UPageCard
          v-for="(itemi, index) in item.children"
          :key="index"
          :title="itemi.title"
          :description="itemi.description"
          :icon="itemi.icon"
          :to="itemi.to"
          orientation="vertical"
          spotlight
          class="group"
        >
          <!-- <div class="flex size-85 opacity-80 duration-300 group-hover:scale-110 group-hover:opacity-100">
            <NuxtImg
              src="/catbirchdark.webp"
              :height="340"
              alt="Cat"
              class="size-full rounded-xl"
            />
          </div> -->
        </UPageCard>
      </UPageColumns>
      <ClientOnly>
        <UPageHeader title="Sections">
          <EContScroll id="containerscroll" class="container" />
          <AExpGallery id="expgallery" :images="eimages" />
          <ELogOrb id="orblogos" />
          <AProjectLine />
          <ECareer />
          <EJobList />
          <EMarqLogo />
          <ESocPro />
          <MContactBlock />
          <MFaqShort />
          <MGallerySimple />
        </UPageHeader>
        <UPageHeader title="Templates">
          <EFeedBack />
          <EForgotPass />
          <EStatsLinks />
          <EVoteCards />
          <MProjCard />
        </UPageHeader>
      </ClientOnly>
    </template>
    <template #products="{ item }">
      <UPageColumns>
        <UPageCard
          v-for="(itemi, index) in item.children"
          :key="index"
          :title="itemi.title"
          :description="itemi.description"
          :icon="itemi.icon"
          :to="itemi.to"
          orientation="vertical"
          spotlight
          class="group"
        >
          <!-- <div class="flex size-85 opacity-80 duration-300 group-hover:scale-110 group-hover:opacity-100">
            <NuxtImg
              src="/catbirchdark.webp"
              :height="340"
              alt="Cat"
              class="size-full rounded-xl"
            />
          </div> -->
        </UPageCard>
      </UPageColumns>
      <ClientOnly>
        <EProdList />
      </ClientOnly>
    </template>
    <template #labs="{ item }">
      <UPageColumns>
        <UPageCard
          v-for="(itemi, index) in item.children"
          :key="index"
          :title="itemi.title"
          :description="itemi.description"
          :icon="itemi.icon"
          :to="itemi.to"
          orientation="horizontal"
          spotlight
          class="group"
        >
          <!-- <div class="flex size-85 opacity-80 duration-300 group-hover:scale-110 group-hover:opacity-100">
            <NuxtImg
              src="/catbirchdark.webp"
              :height="340"
              alt="Cat"
              class="size-full rounded-xl"
            />
          </div> -->
        </UPageCard>
      </UPageColumns>
    </template>
    <template #growth="{ item }">
      <UPageColumns>
        <UPageCard
          v-for="(itemi, index) in item.children"
          :key="index"
          :title="itemi.title"
          :description="itemi.description"
          :icon="itemi.icon"
          :to="itemi.to"
          orientation="vertical"
          spotlight
          class="group"
        >
          <!-- <div class="flex size-85 opacity-80 duration-300 group-hover:scale-110 group-hover:opacity-100">
            <NuxtImg
              src="/catbirchdark.webp"
              :height="340"
              alt="Cat"
              class="size-full rounded-xl"
            />
          </div> -->
        </UPageCard>
      </UPageColumns>
    </template>
    <template #english="{ item }">
      <UPageColumns>
        <UPageCard
          v-for="(itemi, index) in item.children"
          :key="index"
          :title="itemi.title"
          :description="itemi.description"
          :icon="itemi.icon"
          :to="itemi.to"
          orientation="horizontal"
          spotlight
          class="group"
        >
          <!-- <div class="flex size-85 opacity-80 duration-300 group-hover:scale-110 group-hover:opacity-100">
            <NuxtImg
              src="/catbirchdark.webp"
              :height="340"
              alt="Cat"
              class="size-full rounded-xl"
            />
          </div> -->
        </UPageCard>
      </UPageColumns>
      <ClientOnly>
        <UPageHeader title="Sections">
          <ESliderTest />
          <EActivityEvent :items="eventItems" />
          <ECaseStudies />
          <EEventCards />
          <EFutureEdit />
          <EFutureDash />
          <EPortals />
          <EPortSecs />
        </UPageHeader>
        <UPageHeader title="Templates">
          <EHeroVideo />
          <ENewPass />
          <EPopTour />
          <EProdCard :price="10" title="Oil" />
          <EProdProps :price="20" title="Shirt" />
          <ESpringCal />
          <ETableFull />
          <ETablePay />
          <ETableUsers />
          <ETimelineDev />
          <MPortGet />
          <MPortTrack />
          <MWCloud />
        </UPageHeader>
      </ClientOnly>
    </template>
  </UTabs>
</template>
