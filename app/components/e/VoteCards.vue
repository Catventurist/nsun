<script setup lang="ts">
import { z } from 'zod/v4'

const DecisionSchema = z.object({
  id: z.string(),
  titleKey: z.string(),
  score: z.number().min(-50).max(50).default(0),
  lastVoter: z.string().default('Cat'),
  updatedAt: z.date().optional(),
  comment: z.string().optional(),
  createdBy: z.string()
})

const { t, d } = useI18n()
const rawData = [
  { id: 'dec-1', titleKey: 'community.logo', score: 35, lastVoter: 'Cat', updatedAt: new Date(), comment: t('community.logoc'), createdBy: t('community.user.current') },
  { id: 'dec-2', titleKey: 'community.rules', score: -10, lastVoter: 'Kitty', updatedAt: new Date(), comment: t('community.rulesc'), createdBy: t('community.user.current') },
  { id: 'dec-3', titleKey: 'community.event', score: 0, lastVoter: 'Feline', updatedAt: new Date(), comment: t('community.eventc'), createdBy: t('community.user.current') }
]
const decisions = ref(rawData.map(item => DecisionSchema.parse(item)))

const getApprovalColor = (val: number) => {
  const percentage = (val + 50) / 100
  const hue = percentage * 120
  return `hsl(${hue}, 80%, 45%)`
}

const updateVote = (id: string) => {
  const item = decisions.value.find(d => d.id === id)
  if (item) {
    item.updatedAt = new Date()
    item.lastVoter = t('community.you')
  }
}
/* const getThermalHSL = (score: number) => {
  const percentage = (score + 50) / 100
  const hue = 240 - (percentage * 240)
  return `hsl(${hue}, 80%, 50%)`
}

const updateVote = (id: string, newScore: number) => {
  const index = decisions.value.findIndex(d => d.id === id)
  if (index !== -1) {
    const updated = DecisionSchema.parse({
      ...decisions.value[index],
      score: newScore,
      lastVoter: t('community.user.current'),
      updatedAt: new Date().toISOString()
    })
    decisions.value[index] = updated
  }
} */
</script>

<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <UCard
      v-for="item in decisions"
      :key="item.id"
      class="relative group"
    >
      <div class="flex flex-col gap-4">
        <div
          class="absolute top-0 left-0 w-full h-1.5 transition-colors duration-500"
          :style="{ backgroundColor: getApprovalColor(item.score) }"
        />
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ t(item.titleKey) }}
          </h3>
          <div
            class="text-2xl tabular-nums rounded-xl transition-colors duration-500"
            :style="{ color: getApprovalColor(item.score) }"
          >
            {{ item.score > 0 ? '+' : '' }}{{ item.score }}
          </div>
        </div>
        <div class="space-y-2">
          <USlider
            v-model="item.score"
            :min="-50"
            :max="50"
            :style="{ '--slider-color': getApprovalColor(item.score) }"
            class="decision-slider"
            @change="updateVote(item.id)"
          />
          <div class="flex justify-between text-[10px] font-bold text-muted uppercase">
            <span>{{ t('community.reject') }}</span>
            <span>{{ t('community.neutral') }}</span>
            <span>{{ t('community.approve') }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-muted">
          <div class="flex items-center gap-2">
            <UAvatar
              :alt="item.createdBy"
              size="xs"
            />
            <span
              v-if="item.updatedAt"
              class="text-xs text-muted"
            >
              {{ item.lastVoter }} {{ d(new Date(item.updatedAt as Date)) }}
            </span>
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
              <div
                v-if="item.comment"
                class="bg-muted/80 p-2"
              >
                <h2 class="text-lg text-primary text-shadow-md text-shadow-info">
                  {{ item.lastVoter }}
                </h2>
                {{ item.comment }}
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
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.decision-slider :deep(input[type="range"]) {
  accent-color: var(--slider-color);
}
</style>
