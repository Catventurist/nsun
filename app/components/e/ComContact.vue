<script setup lang="ts">
interface Method {
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | undefined
  link: string
}

interface Props {
  title?: string
  description?: string
  signalLink?: string
  telegramLink?: string
  emailAddress?: string
  facebookLink?: string
  githubLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Join our Community',
  description: 'Connect with us on your favorite platform.',
  signalLink: '',
  telegramLink: '',
  emailAddress: 'cat@cat.com',
  facebookLink: '',
  githubLink: 'https://github.com/Catventurist/nsun'
})

const activeMethods = computed(() => {
  const methods: Method[] = []
  if (props.signalLink) {
    methods.push({ label: 'signal', icon: 'i-simple-icons-signal', color: 'info', link: props.signalLink })
  }
  if (props.telegramLink) {
    methods.push({ label: 'telegram', icon: 'i-simple-icons-telegram', color: 'info', link: props.telegramLink })
  }
  if (props.facebookLink) {
    methods.push({ label: 'facebook', icon: 'i-simple-icons-facebook', color: 'info', link: props.facebookLink })
  }
  if (props.githubLink) {
    methods.push({ label: 'GitHub', icon: 'i-simple-icons-github', color: 'neutral', link: props.githubLink })
  }
  if (props.emailAddress) {
    methods.push({ label: 'Email', icon: 'i-lucide-mail', color: 'primary', link: `mailto:${props.emailAddress}` })
  }
  return methods
})
</script>

<template>
  <UCard class="my-8 text-center size-100 bg-radial from-default/60 to-muted/70">
    <template #header>
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">
          {{ props.title }}
        </h2>
        <p class="text-muted">
          {{ props.description }}
        </p>
      </div>
    </template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UButton
        v-for="method in activeMethods"
        :key="method.label"
        :to="method.link"
        :icon="method.icon"
        :label="method.label"
        target="_blank"
        size="xl"
        block
        variant="soft"
        :color="method.color"
        class="flex items-center justify-center gap-3"
      />
    </div>
  </UCard>
</template>
