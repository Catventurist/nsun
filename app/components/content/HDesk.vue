<script setup lang="ts">
type SupportType = 'technical' | 'billing' | 'emergency' | 'feedback' | 'docs' | 'general'
type SupportStatus = 'online' | 'busy' | 'offline'

interface Props {
  title?: string
  description?: string
  link?: string
  icon?: string
  type?: SupportType
  status?: SupportStatus
  ticketId?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'general',
  status: 'online',
  icon: 'lucide-info'
})

const copied = ref(false)
const themeConfig = computed(() => {
  const themes: Record<SupportType, { color: string, icon: string, label: string, bg: string }> = {
    technical: { color: 'text-info', icon: 'lucide-cpu', label: $t('contact.technical'), bg: 'bg-info/20' },
    billing: { color: 'text-warning', icon: 'lucide-banknote', label: $t('contact.billing'), bg: 'bg-warning/20' },
    emergency: { color: 'text-error', icon: 'lucide-siren', label: $t('contact.emergency'), bg: 'bg-error/20' },
    feedback: { color: 'text-purple-600', icon: 'lucide-message-circle', label: $t('contact.feedback'), bg: 'bg-purple-400/20' },
    docs: { color: 'text-amber-600', icon: 'lucide-book-open', label: $t('contact.docs'), bg: 'bg-amber-400/20' },
    general: { color: 'text-neutral', icon: 'lucide-help-circle', label: $t('contact.general'), bg: 'bg-neutral/20' }
  }
  return themes[props.type] || themes.general
})

const statusMap = {
  online: { class: 'bg-success', label: $t('contact.online') },
  busy: { class: 'bg-warning', label: $t('contact.busy') },
  offline: { class: 'bg-muted', label: $t('contact.offline') }
}

const copyToClipboard = async (text: string) => {
  if (!text) return
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="relative overflow-hidden p-6 my-8 border rounded-2xl bg-default/80 border-muted group">
    <div :class="['absolute -right-4 -top-4 size-24 rounded-full opacity-10 blur-2xl transition-colors', themeConfig.color.replace('text', 'bg')]" />
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div :class="['p-2.5 rounded-xl transition-transform group-hover:scale-110', themeConfig.bg, themeConfig.color]">
          <Icon
            :name="icon || themeConfig.icon"
            class="size-6"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest opacity-60">
            {{ $t(`contact.${type}`) }}
          </span>
          <h3 class="font-bold text-primary leading-tight">
            {{ title }}
          </h3>
        </div>
      </div>
      <div class="flex items-center gap-2 px-2 py-1 rounded-full bg-muted/80">
        <span :class="['size-2 rounded-full animate-pulse', statusMap[status].class]" />
        <span class="text-[10px] font-bold text-muted uppercase">
          {{ statusMap[status].label }}
        </span>
      </div>
    </div>
    <p
      v-if="description"
      class="text-muted mb-6"
    >
      {{ description }}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <NuxtLink
        v-if="link"
        :to="link"
        class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-default text-sm font-bold hover:opacity-90 transition-all"
      >
        <span>
          {{ $t('contact.assis') }}
        </span>
        <Icon
          name="lucide-external-link"
          class="size-4"
        />
      </NuxtLink>
      <UButton
        v-if="ticketId"
        variant="soft"
        class="justify-center"
        @click="copyToClipboard(ticketId)"
      >
        <Icon
          :name="copied ? 'lucide-check' : 'lucide-copy'"
          :class="['size-4', copied ? 'text-success' : '']"
        />
        <span>{{ copied ? $t('contact.copied') : $t('contact.copytic') }}</span>
      </UButton>
    </div>
    <div
      v-if="$slots.default"
      class="mt-6 pt-4 border-t border-muted text-sm"
    >
      <slot />
    </div>
  </div>
</template>
