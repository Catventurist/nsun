<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { PageCollections, TodosEnCollectionItem, TodosFiCollectionItem } from '@nuxt/content'
import { CalendarDate } from '@internationalized/date'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: todo } = await useAsyncData('todos-' + slug.value, async () => {
  const content = await queryCollection(('todos_' + locale.value) as keyof PageCollections).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('todos_en').first()
  }
  return content as TodosEnCollectionItem | TodosFiCollectionItem
}, {
  watch: [locale]
})
const title = todo.value?.seo?.title || todo.value?.title
const description = todo.value?.seo?.description || todo.value?.description

const inputDate = useTemplateRef('inputDate')

const modelValue = shallowRef({
  start: new CalendarDate(2026, 3, 4),
  end: new CalendarDate(2026, 3, 7)
})
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <div
    v-if="todo"
    class="mx-4"
  >
    <UPageHero
      :title="todo.title"
      :description="todo.description"
    >
      <div class="flex flex-col justify-center items-center gap-3 mt-4">
        <UAvatarGroup :max="3">
          <ULink
            :to="localePath('/authors/catventurist')"
            class="hover:ring-primary transition"
            raw
          >
            <UAvatar
              src="/cat.png"
              alt="Cat"
              loading="lazy"
            />
          </ULink>
          <ULink
            to="#"
            target="_blank"
            class="hover:ring-primary transition"
            raw
          >
            <UAvatar
              src="/catbirchdark.webp"
              alt="OG"
              loading="lazy"
            />
          </ULink>
          <ULink
            to="#"
            class="hover:ring-primary transition"
            raw
          >
            <UAvatar
              src="/ns-logo-dark.webp"
              alt="NS"
              loading="lazy"
            />
          </ULink>
        </UAvatarGroup>
        <UFieldGroup>
          <UInputDate
            ref="inputDate"
            v-model="modelValue"
            range
          >
            <template #trailing>
              <UPopover :reference="inputDate?.inputsRef[0]?.$el">
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-lucide-calendar"
                  aria-label="Select a date range"
                  class="px-0"
                />
                <template #content>
                  <UCalendar
                    v-model="modelValue"
                    class="p-2"
                    :number-of-months="2"
                    range
                  />
                </template>
              </UPopover>
            </template>
          </UInputDate>
          <ETodoStatusMenu class="max-w-70" />
        </UFieldGroup>
        <UButton
          v-for="link in todo.links"
          :key="link.label"
          variant="subtle"
          v-bind="link"
        />
      </div>
    </UPageHero>
    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="todo"
          :value="todo.body"
        />
      </UPageBody>
    </UPage>
  </div>
</template>
