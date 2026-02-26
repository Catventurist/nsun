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
      variant="link"
    />

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

      <UButton
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
      />
    </template>
  </UHeader>
</template>
