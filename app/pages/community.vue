<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const featLinks = ref<ButtonProps[]>([
  {
    label: $t('community.feedback.title'),
    color: 'info',
    icon: 'lucide-message-circle',
    variant: 'soft',
    to: '#feedback'
  },
  {
    label: $t('community.voting.title'),
    color: 'success',
    variant: 'subtle',
    trailingIcon: 'lucide-list-check',
    to: '#voting'
  }
])

const title = $t('header.community.title')
const description = $t('header.community.description')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div>
    <UPage class="relative">
      <UPageHero
        id="feedback"
        :title="$t('community.feedback.title')"
        :description="$t('community.feedback.description')"
        :links="featLinks"
      />
      <ClientOnly>
        <EFeedBack />
      </ClientOnly>
      <UPageHero
        id="voting"
        :title="$t('community.voting.title')"
        :description="$t('community.voting.description')"
      />
      <ClientOnly>
        <EVoteCards />
      </ClientOnly>
    </UPage>
  </div>
</template>
