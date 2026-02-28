<script setup lang="ts">
import { motion } from 'motion-v'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  name: undefined,
  email: undefined,
  subject: undefined,
  message: undefined
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: $t('contact.error.name') })
  if (!state.email) errors.push({ name: 'email', message: $t('contact.error.email') })
  if (!state.subject) errors.push({ name: 'subject', message: $t('contact.error.subject') })
  if (!state.message) errors.push({ name: 'message', message: $t('contact.error.message') })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: $t('contact.toast.title'), description: $t('contact.toast.description'), color: 'success' })
  console.log(event.data)
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const contactInfo = [
  {
    icon: 'i-lucide-mail',
    label: $t('contact.email'),
    value: 'hello@example.com',
    to: 'mailto:hello@example.com'
  },
  {
    icon: 'i-lucide-phone',
    label: $t('contact.phone'),
    value: '+1 (555) 123-4567',
    to: 'tel:+15551234567'
  },
  {
    icon: 'i-lucide-map-pin',
    label: $t('contact.location'),
    value: 'Finland',
    to: '#'
  }
]
</script>

<template>
  <div class="relative w-full overflow-hidden bg-default px-4 py-12 sm:py-16 md:py-20 lg:py-24">
    <div class="absolute inset-0 -z-10 h-full w-full bg-[linear-linear(to_right,#8080800a_1px,transparent_1px),linear-linear(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
    <div class="mx-auto w-full max-w-6xl">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.5 }"
        class="mb-12 sm:mb-16 md:mb-20 text-center"
      >
        <h2 class="mb-4 text-3xl font-bold tracking-tight text-default sm:text-4xl md:text-5xl">
          {{ $t('contact.headline') }}
        </h2>
        <p class="mx-auto max-w-2xl px-4 text-base text-muted sm:text-lg">
          {{ $t('contact.desc') }}
        </p>
      </motion.div>

      <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          :initial="{ opacity: 0, x: -20 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.2 }"
        >
          <div class="relative overflow-hidden rounded-xl border border-muted/40 bg-default/60 p-6 backdrop-blur-sm sm:p-8">
            <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
            <UForm
              :validate="validate"
              :state="state"
              class="relative z-10 space-y-6"
              @submit="onSubmit"
              @error="onError"
            >
              <UFormField
                :label="$t('contact.name')"
                name="name"
              >
                <UInput
                  v-model="state.name"
                  class="w-2/3"
                />
              </UFormField>
              <UFormField
                :label="$t('contact.email')"
                name="email"
              >
                <UInput
                  v-model="state.email"
                  class="w-2/3"
                />
              </UFormField>
              <UFormField
                :label="$t('contact.subject')"
                name="subject"
              >
                <UInput
                  v-model="state.subject"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                :label="$t('contact.message')"
                name="message"
              >
                <UTextarea
                  v-model="state.message"
                  :rows="5"
                  :placeholder="$t('contact.messagedesc')"
                  class="w-full"
                />
              </UFormField>
              <UButton
                :label="$t('contact.sendme')"
                trailing-icon="lucide-send"
                type="submit"
                class="w-full justify-center"
              />
            </UForm>
          </div>
        </motion.div>
        <div class="space-y-6 lg:space-y-8">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div
              v-for="(info, index) in contactInfo"
              :key="index"
              :initial="{ opacity: 0, y: 20 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ delay: index * 0.1 + 0.3, duration: 0.5 }"
            >
              <div class="group relative overflow-hidden rounded-xl border border-muted/40 bg-default/60 p-4 transition-all duration-300 hover:border-default/20 hover:-translate-y-1 backdrop-blur-sm sm:p-6">
                <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <NuxtLink
                  :to="info.to"
                  class="relative z-10 flex items-center gap-4"
                >
                  <div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 group-hover:text-primary-foreground">
                    <UIcon
                      :name="info.icon"
                      class="size-5"
                    />
                  </div>
                  <div>
                    <h3 class="mb-1 font-semibold text-default">
                      {{ info.label }}
                    </h3>
                    <p class="text-sm text-muted transition-colors group-hover:text-default/80">
                      {{ info.value }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </motion.div>
          </div>

          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ delay: 0.6, duration: 0.5 }"
          >
            <div class="rounded-xl border border-muted/40 bg-default/60 p-6 backdrop-blur-sm sm:p-8 duration-300 hover:bg-radial from-primary/20">
              <h3 class="mb-4 text-xl font-semibold text-default">
                {{ $t('contact.work.title') }}
              </h3>
              <div class="space-y-3 text-sm text-muted sm:text-base">
                <div class="flex justify-between border-b border-muted/40 pb-2">
                  <span>
                    {{ $t('contact.work.mon') }}
                  </span>
                  <span class="font-medium text-default">
                    9:00 - 6:00
                  </span>
                </div>
                <div class="flex justify-between border-b border-muted/40 pb-2">
                  <span>
                    {{ $t('contact.work.sat') }}
                  </span>
                  <span class="font-medium text-default">
                    10:00 - 4:00
                  </span>
                </div>
                <div class="flex justify-between pt-1">
                  <span>
                    {{ $t('contact.work.sun') }}
                  </span>
                  <span class="font-medium text-primary">
                    {{ $t('contact.work.closed') }}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</template>
