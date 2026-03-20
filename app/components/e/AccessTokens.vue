<script setup lang="ts">
import { z } from 'zod/v4'

const TokenSchema = z.string().min(32, 'Access token must be at least 32 characters')
const accessToken = useState<string>('access-token', () => '')
const error = ref<string | boolean | undefined>()
const validateToken = (val: string) => {
  const result = TokenSchema.safeParse(val)
  if (result.success) {
    accessToken.value = result.data
    error.value = false
  } else {
    error.value = result.error.issues[0]?.message || 'Invalid token'
  }
}
const resetToken = () => {
  accessToken.value = ''
  error.value = undefined
}
</script>

<template>
  <UCard class="max-w-md mx-auto h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-shield-check"
          class="size-5 text-primary"
        />
        <span class="font-bold">
          Access Control
        </span>
      </div>
    </template>
    <UFormField
      label="Access Token"
      :error="error"
      help="Enter your 32-character security token."
    >
      <div class="flex gap-2">
        <UInput
          :model-value="accessToken"
          type="password"
          icon="i-lucide-key"
          placeholder="••••••••••••••••••••••••••••••••"
          class="flex-1"
          @update:model-value="validateToken"
        />
        <UButton
          color="neutral"
          variant="soft"
          icon="i-lucide-refresh-cw"
          @click="resetToken"
        />
        <UPopover>
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-play"
          />
          <template #content>
            <div class="m-4 inline-flex">
              <EAccessMakeToken />
            </div>
          </template>
        </UPopover>
      </div>
    </UFormField>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-sm">
          <UIcon
            :name="accessToken && !error ? 'i-lucide-check-circle-2' : 'i-lucide-alert-circle'"
            :class="accessToken && !error ? 'text-success' : 'text-warning'"
          />
          <span :class="accessToken && !error ? 'text-success/80' : 'text-warning/80'">
            {{ accessToken && !error ? 'Token Active' : 'Configuration Required' }}
          </span>
        </div>
        <UButton
          v-if="accessToken && !error"
          variant="soft"
          size="sm"
          color="primary"
          label="Test Connection"
          icon="i-lucide-external-link"
          trailing
        />
      </div>
    </template>
  </UCard>
</template>
