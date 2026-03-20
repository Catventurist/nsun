<script setup lang="ts">
import { z } from 'zod/v4'

const props = withDefaults(defineProps<{
  loading?: boolean
}>(), {
  loading: false
})

const emit = defineEmits<{
  (e: 'activate', token: string): void
}>()

const accessToken = useState<string>('access-token', () => '')
const showToken = ref(false)
const error = ref<string | boolean | undefined>()
const TokenSchema = z.string().trim().min(32, 'Access token must be at least 32 characters')

const validateAndSet = (val: string) => {
  const result = TokenSchema.safeParse(val)
  if (result.success) {
    accessToken.value = result.data
    error.value = false
    return true
  } else {
    error.value = result.error.issues[0]?.message
    return false
  }
}

const onGenerate = () => {
  const randomToken = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  validateAndSet(randomToken)
  showToken.value = true
}

const onActivate = () => {
  if (validateAndSet(accessToken.value)) {
    emit('activate', accessToken.value)
  }
}

const onInput = (val: string) => {
  accessToken.value = val
  if (!val) {
    error.value = undefined
  } else {
    validateAndSet(val)
  }
}
/* const generateToken = () => {
  const randomToken = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  accessToken.value = randomToken
  showToken.value = true
  error.value = undefined
}

const handleUpdate = (val: string) => {
  const result = TokenSchema.safeParse(val)
  if (result.success) {
    accessToken.value = result.data
    error.value = false
  } else {
    error.value = result.error.issues[0]?.message
  }
}

const saveToken = () => {
  if (error.value === false) {
    emit('created', accessToken.value)
  } else {
    error.value = 'Please provide a valid token first'
  }
} */
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-key-round"
          class="size-5 text-primary"
        />
        <span class="font-bold">
          Security Credentials
        </span>
      </div>
    </template>
    <div class="space-y-4">
      <UFormField
        label="Project Access Token"
        :error="error"
        help="Generate or paste your project security key."
      >
        <div class="flex gap-2">
          <UInput
            :model-value="accessToken"
            :type="showToken ? 'text' : 'password'"
            icon="i-lucide-hash"
            placeholder="32+ character hex token"
            class="flex-1"
            @update:model-value="onInput"
          />
          <UButton
            color="neutral"
            variant="soft"
            :icon="showToken ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            @click="showToken = !showToken"
          />
        </div>
      </UFormField>
      <div class="flex flex-col sm:flex-row gap-2">
        <UButton
          label="Generate"
          icon="i-lucide-sparkles"
          color="neutral"
          variant="outline"
          class="flex-1 justify-center"
          @click="onGenerate"
        />

        <UButton
          label="Activate Token"
          icon="i-lucide-check-circle"
          color="primary"
          class="flex-1 justify-center"
          variant="soft"
          :loading="props.loading"
          @click="onActivate"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex items-center gap-2 text-xs">
        <UIcon
          :name="error === false ? 'i-lucide-shield-check' : 'i-lucide-shield-alert'"
          :class="error === false ? 'text-success' : 'text-warning'"
        />
        <span :class="error === false ? 'text-success/80' : 'text-warning/80'">
          {{ error === false ? 'Token is valid and ready' : 'Waiting for valid security key' }}
        </span>
      </div>
    </template>
  </UCard>
</template>
