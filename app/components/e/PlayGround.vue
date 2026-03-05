<script setup lang="ts">
/* import CodeViewer from '@/components/examples/playground/components/CodeViewer.vue'
import MaxLengthSelector from '@/components/examples/playground/components/MaxLengthSelector.vue'
import ModelSelector from '@/components/examples/playground/components/ModelSelector.vue'
import PresetActions from '@/components/examples/playground/components/PresetActions.vue'
import PresetSave from '@/components/examples/playground/components/PresetSave.vue'
import PresetSelector from '@/components/examples/playground/components/PresetSelector.vue'
import PresetShare from '@/components/examples/playground/components/PresetShare.vue'

import TemperatureSelector from '@/components/examples/playground/components/TemperatureSelector.vue'
import TopPSelector from '@/components/examples/playground/components/TopPSelector.vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/new-york-v4/ui/hover-card'
import { Label } from '@/registry/new-york-v4/ui/label'
import { Separator } from '@/registry/new-york-v4/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'
import { Textarea } from '@/registry/new-york-v4/ui/textarea' */

const items = [
  {
    label: 'Complete',
    icon: 'i-lucide-check',
    slot: 'complete'
  },
  {
    label: 'Insert',
    icon: 'i-lucide-arrow-down',
    slot: 'insert'
  },
  {
    label: 'Edit',
    icon: 'i-lucide-pen',
    slot: 'edit'
  }
]

/* const state = reactive({
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}) */

useSeoMeta({
  title: 'Playground',
  description: 'Playground built using some components.'
})
</script>

<template>
  <div>
    <div class="md:hidden">
      <UColorModeImage
        light="/catbirch.webp"
        dark="/catbirchdark.webp"
        :width="1280"
        :height="916"
        alt="Img"
      />
    </div>
    <div class="hidden flex-col md:flex">
      <div class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 class="text-lg font-semibold">
          Playground
        </h2>
        <div class="ml-auto flex w-full space-x-2 sm:justify-end">
        <!-- <PresetSelector presets="{presets}" />
        <PresetSave />
        <div class="hidden space-x-2 md:flex">
          <CodeViewer />
          <PresetShare />
        </div>
        <PresetActions />
        -->
        </div>
      </div>
      <USeparator />
      <UTabs
        :items="items"
        default-value="complete"
        class="flex-1"
      >
        <template #complete>
          <div class="flex flex-col space-y-4">
            <UTextarea
              placeholder="Write a tagline for an ice cream shop"
              class="size-full flex-1 p-4"
            />
            <div class="flex items-center space-x-2">
              <UButton
                label="Submit"
                variant="soft"
                trailing-icon="lucide-send"
              />
              <UButton
                label="Show history"
                icon="lucide-rotate-ccw"
                variant="soft"
              />
            </div>
          </div>
        </template>
        <template #insert>
          <div class="flex flex-col space-y-4">
            <div class="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
              <UTextarea
                placeholder="We're writing"
                class="h-full size-full flex-1 p-2"
              />
              <div class="rounded-md border border-muted bg-muted" />
            </div>
            <div class="flex items-center space-x-2">
              <UButton
                label="Submit"
                variant="soft"
                trailing-icon="lucide-send"
              />
              <UButton
                label="Show history"
                icon="lucide-rotate-ccw"
                variant="soft"
              />
            </div>
          </div>
        </template>
        <template #edit>
          <div class="flex flex-col space-y-4">
            <div class="grid gap-6 lg:grid-cols-2 justify-center">
              <div class="flex flex-col space-y-4">
                <div class="flex flex-1 flex-col space-y-2">
                  <UFormField label="Input" for="input">
                    <UTextarea
                      id="input"
                      placeholder="New things someday."
                      class="size-full flex-1 p-2"
                      autoresize
                    />
                  </UFormField>
                </div>
                <div class="flex flex-col space-y-2">
                  <UFormField label="Instructions" for="instructions">
                    <UTextarea
                      id="instructions"
                      placeholder="Fix something."
                      class="w-full flex-1"
                    />
                  </UFormField>
                </div>
              </div>
              <div class="mt-[21px] rounded-md border border-muted bg-muted" />
            </div>
            <div class="flex items-center space-x-2">
              <UButton
                label="Submit"
                variant="soft"
                trailing-icon="lucide-send"
              />
              <UButton
                label="Show history"
                icon="lucide-rotate-ccw"
                variant="soft"
              />
            </div>
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>
