<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const events = [
  {
    title: $t('events.meeting.sync'),
    from: '2026-03-02T09:00:00',
    to: '2026-03-02T10:00:00',
    link: localePath('/')
  },
  {
    title: $t('events.meeting.review'),
    from: '2026-03-02T11:30:00',
    to: '2026-03-02T12:30:00',
    link: localePath('/')
  },
  {
    title: $t('events.meeting.pres'),
    from: '2026-03-02T14:00:00',
    to: '2026-03-02T15:00:00',
    link: localePath('/')
  }
]
const date = ref<Date | undefined>(new Date())

/* const formatDateRange = (from: Date, to: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }
  const fmt = new Intl.DateTimeFormat(locale.value, options)
  return `${fmt.format(from)} - ${fmt.format(to)}`
} */

const formatEventRange = (from: Date, to: Date) => {
  const datePart = from.toLocaleDateString(locale.value, { month: 'short', day: 'numeric' })
  const startTime = from.toLocaleTimeString(locale.value, { hour: 'numeric', minute: '2-digit', hour12: false })
  const endTime = to.toLocaleTimeString(locale.value, { hour: 'numeric', minute: '2-digit', hour12: false })
  const yearPart = from.getFullYear()

  return `${datePart}${yearPart}: ${startTime} - ${endTime}`
}
</script>

<template>
  <div>
    <UCard class="w-2xs py-4">
      <UCalendar
        mode="single"
        :selected="date"
        on-select="setDate"
        class="w-full bg-transparent p-0"
        required
      />
      <template #footer>
        <div class="flex flex-col items-start gap-3 border-t px-4 pt-4">
          <div class="flex w-full items-center justify-between px-1">
            <div class="text-sm font-medium">
              {{ date?.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
            <UButton
              variant="ghost"
              name="Add Event"
              icon="lucide-plus"
            />
          </div>
          <div class="flex w-full flex-col gap-2">
            <NuxtLink
              v-for="event in events"
              :key="event.title"
              :to="event.link"
              class="bg-muted duration-300 hover:bg-radial from-primary/20 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
            >
              <div class="font-medium">
                {{ event.title }}
              </div>
              <div class="text-muted text-xs">
                <time>{{ formatEventRange(new Date(event.from), new Date(event.to)) }}</time>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
