<script setup lang="ts">
const localePath = useLocalePath()
const appConfig = useAppConfig()
const { desktopLinks, mobileLinks } = useHeader()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        :to="localePath('/')"
        class="flex flex-row items-center gap-2"
      >
        <UColorModeAvatar
          :light="appConfig.header.logo.light"
          :dark="appConfig.header.logo.light"
          :alt="appConfig.header.logo.alt"
          class="duration-300 hover:scale-110 active:scale-90"
        />
        <span class="text-xl text-primary">
          {{ appConfig.header.title }}
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="desktopLinks"
      :ui="{
        viewport: 'sm:w-(--reka-navigation-menu-viewport-width)',
        content: 'flex items-center justify-center sm:w-auto',
        childList: '',
        childLinkDescription: 'text-balance line-clamp-2'
      }"
      class="w-full justify-center"
      variant="link"
      trailing-icon=""
      highlight
    >
      <template #pages-content="{ item }">
        <ul class="grid gap-2 min-w-110 p-2 lg:grid-cols-2">
          <!-- <li class="row-span-3">
            <NuxtLink
              :to="localePath('/')"
              as-child
            >
              <UColorModeImage
                :light="appConfig.header.logo.light"
                :dark="appConfig.header.logo.dark"
                :alt="appConfig.header.logo.alt"
                :width="140"
                :height="200"
                class="min-w-45 min-h-50 mb-2 bg-muted/80 duration-300 hover:scale-110 active:scale-90 overflow-hidden rounded-xl"
              />
            </NuxtLink>
          </li> -->
          <li
            v-for="child in item.children"
            :key="child.label"
            class="px-2 flex duration-300 hover:bg-radial-[at_25%_25%] hover:from-primary/20"
          >
            <NuxtLink
              :to="child.to"
              class="text-sm text-left size-full rounded-md p-3"
            >
              <Icon
                v-if="child.icon"
                :name="child.icon"
              />
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
              <p class="text-muted line-clamp-2">
                {{ child.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </template>
    </UNavigationMenu>

    <template #right>
      <ClientOnly>
        <UContentSearchButton :collapsed="false" />
        <ColorModeButton />
        <ThemePicker />
        <LangSwitcher />
      </ClientOnly>
      <!-- <UButton
        :name="$t('login.title')"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-log-in"
        :to="localePath('/login')"
      />
      <UButton
        :name="$t('signup.title')"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-signature"
        :to="localePath('/signup')"
      /> -->
    </template>

    <template #body>
      <UNavigationMenu
        :items="mobileLinks"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <!-- <UButton
        :label="$t('login.title')"
        color="neutral"
        variant="subtle"
        :to="localePath('/login')"
        block
        class="mb-3"
      />
      <UButton
        :label="$t('signup.title')"
        color="neutral"
        variant="soft"
        :to="localePath('/signup')"
        block
      /> -->
    </template>
  </UHeader>
</template>
