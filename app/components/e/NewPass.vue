<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }, {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter new password',
    required: true
  }, {
    name: 'passwordconf',
    type: 'password',
    label: 'Password Confirmation',
    placeholder: 'Enter new password again',
    required: true
  }, {
    name: 'country',
    type: 'select',
    label: 'Country',
    placeholder: 'Select country',
    items: [
      {
        label: 'United States',
        value: 'us'
      },
      {
        label: 'Finland',
        value: 'fi'
      },
      {
        label: 'United Kingdom',
        value: 'uk'
      },
      {
        label: 'Australia',
        value: 'au'
      }
    ]
  }, {
    name: 'otp',
    type: 'otp',
    label: 'OTP',
    length: 6,
    placeholder: '○'
  }, {
    name: 'remember',
    type: 'checkbox',
    label: 'Remember me',
    description: 'You will be logged in for 30 days.'
  }
])
</script>

<template>
  <UAuthForm
    :fields="fields"
    class="max-w-sm"
  />
</template>
