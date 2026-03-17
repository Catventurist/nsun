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
          <ETaskGrid
            :tasks="[
              { id: '01', title: 'i18n-tuki', status: 'done', priority: 'high' },
              { id: '02', title: 'Uusia tyylejä', status: 'progress', priority: 'medium' }
            ]"
            id-label="Nº"
            title-label="Jotain jännää"
            status-label="Tila"
            priority-label="Tärkeys"
            :zebra="true"
            primary-color="blue"
          />
          <ETaskBoard
            :tasks="[
              { id: 'DOC-1', title: 'i18n-opas', status: 'done', priority: 'high', description: 'Kieli-ominaisuuksiin tutustuminen' },
              { id: 'UI-2', title: 'Kanban-komponentti', status: 'progress', priority: 'medium', description: 'MDC-listaus' },
              { id: 'FIX-3', title: 'Bugi: Tieto ei päivity', status: 'todo', priority: 'low', description: 'Kaavojen tarkistus' }
            ]"
            :columns="[
              { id: 'todo', label: 'Tehtävissä', icon: 'i-lucide-list-todo' },
              { id: 'progress', label: 'Tehtävänä', icon: 'i-lucide-refresh-cw' },
              { id: 'done', label: 'Tehty', icon: 'i-lucide-check-circle' }
            ]"
            board-title="Hommalista"
          />
          <ETaskDash
            :tasks="[
              { id: 1, status: 'done', priority: 'high' },
              { id: 2, status: 'done', priority: 'medium' },
              { id: 3, status: 'progress', priority: 'high' },
              { id: 4, status: 'pending', priority: 'low' },
              { id: 5, status: 'pending', priority: 'low' }
            ]"
            title="2.0-kehitys"
            done-label="Tehty"
            total-label="Yhteensä"
            pending-label="Tehtävissä"
            progress-label="Tehtävänä"
            priority-label="Tärkeys"
            primary-color="primary"
          />
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
