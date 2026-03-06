<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items = [
  {
    slot: 'primary' as const,
    title: 'primary',
    description: 'First steps',
    icon: 'i-lucide-house'
  }, {
    slot: 'learning' as const,
    title: 'learning',
    description: 'Teach yourself',
    icon: 'i-lucide-brain'
  }, {
    slot: 'joining' as const,
    title: 'joining',
    description: 'Join us',
    icon: 'i-lucide-arrow-up'
  }, {
    slot: 'editing' as const,
    title: 'editing',
    description: 'Add and edit content',
    icon: 'i-lucide-pen'
  }
] satisfies StepperItem[]

const primaryItems: StepperItem[] = [
  {
    title: 'Get to know',
    description: 'Read some information presented in many ways',
    icon: 'i-lucide-eye',
    to: '',
    content: '## Links'
  }, {
    title: 'Join',
    description: 'The rapidly growing Club',
    icon: 'i-lucide-users',
    content: '[Go](#joining)'
  }, {
    title: 'Buy or Invest',
    description: 'Choose what you want',
    icon: 'i-lucide-euro',
    content: 'b'
  }
]

const stepper = useTemplateRef('stepper')
const mstepper = useTemplateRef('mstepper')
</script>

<template>
  <div>
    <UStepper
      ref="mstepper"
      :items="items"
      class="w-full"
    >
      <template #primary>
        <UCard class="aspect-video">
          <div class="w-full">
            <UStepper
              ref="stepper"
              :items="primaryItems"
              orientation="vertical"
            >
              <template #content="{ item }">
                <div class="aspect-video flex flex-col gap-2">
                  <h2 class="text-2xl text-primary">
                    {{ item.title }}
                  </h2>
                  {{ item.description }}
                  <USeparator />
                  <MDC :value="(item.content as string | Record<string, any>)" />
                </div>
              </template>
            </UStepper>
          </div>
        </UCard>
      </template>
      <template #editing>
        <UCard class="aspect-video">
          Editing content
        </UCard>
      </template>
      <template #learning>
        <UCard class="aspect-video">
          Learn new things every day.
        </UCard>
      </template>
      <template #joining>
        <UCard class="aspect-video">
          Joining the Club
        </UCard>
      </template>
    </UStepper>
    <div class="flex gap-2 justify-between mt-4">
      <UButton
        label="Prev"
        leading-icon="i-lucide-arrow-left"
        variant="soft"
        :disabled="!mstepper?.hasPrev"
        @click="mstepper?.prev()"
      />
      <UButton
        label="Next"
        trailing-icon="i-lucide-arrow-right"
        variant="soft"
        :disabled="!mstepper?.hasNext"
        @click="mstepper?.next()"
      />
    </div>
  </div>
</template>
