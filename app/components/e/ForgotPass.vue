<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: $t('login.email.title'),
  placeholder: $t('login.email.placeholder'),
  required: true
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: $t('login.with.google') })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: $t('login.with.github') })
  }
}]

const schema = z.object({
  email: z.email($t('login.email.invalid'))
})

type Schema = z.output<typeof schema>

const toast = useToast()
function onSubmit(payload: FormSubmitEvent<Schema>) {
  toast.add({ title: $t('login.email.success'), description: $t('login.email.sent'), color: 'success' })
  console.log(payload.data)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :title="$t('login.forgot')"
        :description="$t('login.forgotdesc')"
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
