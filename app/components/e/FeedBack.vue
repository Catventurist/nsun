<script setup lang="ts">
const { t, d } = useI18n()

interface FeedbackItem {
  id: number
  labelKey: string
  comment: string
  score: number
  lastUser: string
  lastDate: string
}

const items = ref<FeedbackItem[]>([
  {
    id: 1,
    labelKey: 'feedback.items.clarity',
    comment: 'feedback.items.clarityc',
    score: 45,
    lastUser: 'Alex',
    lastDate: '2025-11-01T10:30:00Z'
  },
  {
    id: 2,
    labelKey: 'feedback.items.speed',
    comment: 'feedback.items.speedc',
    score: -15,
    lastUser: 'Jordan',
    lastDate: '2025-11-02T14:15:00Z'
  },
  {
    id: 3,
    labelKey: 'feedback.items.support',
    comment: 'feedback.items.supportc',
    score: 0,
    lastUser: 'Taylor',
    lastDate: '2025-11-03T09:00:00Z'
  }
])

const getThermalColor = (score: number) => {
  const percentage = (score + 50) / 100
  const hue = 240 - (percentage * 240)
  return `hsl(${hue}, 80%, 50%)`
}

const getEmoji = (score: number) => {
  if (score <= -25) return '❄️'
  if (score < 0) return '🍃'
  if (score === 0) return '😐'
  if (score < 25) return '☀️'
  return '🔥'
}

const onSliderChange = (id: number) => {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.lastDate = new Date().toISOString()
    item.lastUser = t('feedback.user.current')
  }
}
</script>

<template>
  <div class="space-y-6 max-w-xl mx-auto p-6 rounded-xl">
    <UCard
      v-for="item in items"
      :key="item.id"
      class="relative"
    >
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg">
              {{ t(item.labelKey) }}
            </h3>
            <p class="text-xs text-muted flex items-center gap-1 mt-1">
              <UIcon name="i-lucide-clock" />
              <time>{{ d(new Date(item.lastDate)) }}</time>
              • {{ item.lastUser }}
            </p>
          </div>
          <div class="text-4xl drop-shadow-sm drop-shadow-primary">
            {{ getEmoji(item.score) }}
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-[10px] font-bold text-muted uppercase tracking-widest">
            <span>{{ t('feedback.actions.colder') }}</span>
            <span
              :style="{ color: getThermalColor(item.score) }"
              class="text-2xl"
            >
              {{ item.score > 0 ? '+' : '' }}{{ item.score }}
            </span>
            <span>{{ t('feedback.actions.hotter') }}</span>
          </div>
          <USlider
            v-model="item.score"
            :min="-50"
            :max="50"
            :step="1"
            @change="onSliderChange(item.id)"
          />
        </div>
      </div>
      <UCollapsible class="flex flex-col gap-2 w-full">
        <UButton
          class="group"
          :label="t('feedback.comments')"
          color="neutral"
          variant="ghost"
          icon="lucide-message-circle-more"
          trailing-icon="i-lucide-chevron-down"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }"
          block
        />
        <template #content>
          <div class="bg-muted/80 p-2">
            <h2 class="text-lg text-primary text-shadow-md text-shadow-info">
              {{ item.lastUser }}
            </h2>
            {{ t(item.comment) }}
          </div>
          <UTextarea
            :placeholder="t('feedback.write')"
            class="w-full"
            trailing-icon="i-lucide-message-circle-plus"
            autoresize
            :avatar="{
              src: '/cat.png',
              loading: 'lazy'
            }"
          />
        </template>
      </UCollapsible>
    </UCard>
  </div>
</template>
