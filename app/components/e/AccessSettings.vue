<script setup lang="ts">
import { MemberSettingsSchema, useMemberSettings } from '~/composables/useMember'

const settings = useMemberSettings()
const error = ref<string | boolean | undefined>()
const colors = ['red', 'orange', 'amber', 'yellow', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const tones = ['slate', 'cool', 'zinc', 'neutral', 'stone']
const radii = [
  { label: 'Sharp', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Round', value: 'full' }
]

const onSave = () => {
  const result = MemberSettingsSchema.safeParse(settings.value)
  if (result.success) {
    error.value = false
  } else {
    error.value = result.error.issues[0]?.message
  }
}

watch(settings, () => {
  if (error.value === false) error.value = undefined
}, { deep: true })
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2 font-bold">
          <UIcon
            name="i-lucide-fingerprint"
            class="size-5 text-primary"
          />
          Workspace Identity
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField
          label="Full Name"
          :error="error"
        >
          <UInput
            v-model="settings.name"
            icon="i-lucide-user"
          />
        </UFormField>
        <UFormField label="Email Address">
          <UInput
            v-model="settings.email"
            icon="i-lucide-mail"
          />
        </UFormField>
        <UFormField label="Current Role">
          <UBadge
            color="primary"
            variant="subtle"
            class="mt-2 capitalize"
          >
            {{ settings.role }}
          </UBadge>
        </UFormField>
      </div>
    </UCard>
    <UCard>
      <template #header>
        <div class="flex items-center gap-2 font-bold">
          <UIcon
            name="i-lucide-palette"
            class="size-5 text-primary"
          />
          Brand & Theme Settings
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <UFormField
            label="Primary Color"
            help="The main accent color for buttons and highlights."
          >
            <div class="flex flex-wrap gap-2 mt-2">
              <UButton
                v-for="color in colors"
                :key="color"
                :variant="settings.primaryColor === color ? 'solid' : 'ghost'"
                size="xs"
                class="rounded-full size-6 p-0"
                @click="settings.primaryColor = color"
              />
            </div>
          </UFormField>
          <UFormField
            label="Gray Tone"
            help="Neutral color used for borders and backgrounds."
          >
            <USelect
              v-model="settings.grayTone"
              :options="tones"
            />
          </UFormField>
        </div>
        <div class="space-y-4">
          <UFormField label="Border Radius">
            <USelectMenu
              v-model="settings.radius"
              :options="radii"
              value-attribute="value"
            />
          </UFormField>
          <UFormField label="Font Family">
            <URadioGroup
              v-model="settings.fontFamily"
              :options="[{ label: 'Sans-Serif', value: 'sans' }, { label: 'Serif', value: 'serif' }, { label: 'Monospace', value: 'mono' }]"
            />
          </UFormField>
        </div>
      </div>
    </UCard>
    <UCard>
      <template #header>
        <div class="flex items-center gap-2 font-bold">
          <UIcon
            name="i-lucide-layout-template"
            class="size-5 text-primary"
          />
          Interface Options
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center justify-between p-3 border border-muted rounded-lg">
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-eye-off"
              class="text-muted"
            />
            <div class="flex flex-col">
              <span class="text-sm font-medium">
                Privacy Masking
              </span>
            </div>
          </div>
          <!-- <USwitch v-model="settings.privacyMode" /> -->
        </div>
        <div class="flex items-center justify-between p-3 border rounded-lg">
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-minimize-2"
              class="text-muted"
            />
            <div class="flex flex-col">
              <span class="text-sm font-medium">Compact Interface</span>
            </div>
          </div>
          <!-- <USwitch v-model="settings.compactMode" /> -->
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs">
            <UIcon
              :name="error === false ? 'i-lucide-check-circle' : 'i-lucide-info'"
              :class="error === false ? 'text-success' : 'text-info'"
            />
            <span :class="error === false ? 'text-success/80' : 'text-info/80'">
              {{ error === false ? 'Workspace settings synchronized' : 'Changes are saved to your local storage' }}
            </span>
          </div>
          <UButton
            label="Validate Config"
            icon="i-lucide-save"
            @click="onSave"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
