<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const navigation = inject<Ref<ContentNavigationItem[]>>(('navigation-' + locale.value))
</script>

<template>
  <div>
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <UContentNavigation
                :key="route.path"
                :collapsible="false"
                :navigation="navigation"
                highlight
                :ui="{
                  linkTrailingBadge: 'font-semibold uppercase'
                }"
              />
            </UPageAside>
          </template>

          <slot />
        </UPage>
      </UContainer>
    </UMain>
  </div>
</template>
