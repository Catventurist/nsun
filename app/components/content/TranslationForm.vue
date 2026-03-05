<script setup>
const { t, locale } = useI18n()
const toast = useToast()
const props = defineProps({
  targetLang: { type: String, required: true },
  sourceLang: { type: String, default: 'English' },
  sourceText: { type: String, default: '' },
  studioPath: { type: String, default: '/' }
})

const eventDate = new Date(Date.now() + Math.random() * 31536000000)
const formattedDate = eventDate.toLocaleDateString(locale.value, {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const copySource = () => {
  navigator.clipboard.writeText(props.sourceText)
  toast.add({
    title: t('translation.copys') + ` : ${formattedDate}.`,
    description: t('translation.copieds'),
    icon: 'i-lucide-book-a'
  })
}
</script>

<template>
  <div class="rounded-xl overflow-hidden my-8 shadow-sm">
    <div class="bg-default/80 border-b border-dimmed p-3 flex flex-wrap gap-2 justify-between items-center">
      <div class="flex gap-2">
        <UButton
          :label="t('translation.copys')"
          icon="lucide-copy"
          variant="soft"
          @click="copySource"
        />
        <UButton
          :label="t('translation.open')"
          :to="studioPath"
          icon="lucide-pen"
          variant="subtle"
        />
      </div>
      <div class="flex gap-2">
        <UButton
          :label="t('translation.changes')"
          to="/"
          icon="lucide-notebook"
          variant="subtle"
        />
        <UButton
          :label="t('translation.rules')"
          to="/"
          icon="lucide-book"
          variant="soft"
        />
      </div>
    </div>
    <div class="p-6 bg-default/80">
      <div class="flex items-center gap-2 mb-3">
        <span class="px-2 py-0.5 bg-info/20 text-default text-[10px] font-bold uppercase rounded">
          {{ t('translation.ndraft') }}
        </span>
        <span class="text-sm font-semibold text-muted">
          {{ targetLang }}
        </span>
      </div>
      <div class="prose prose-sm max-w-none min-h-[100px] border-2 border-dashed border-dimmed rounded-lg p-4 italic text-muted">
        <slot />
        <UTextarea class="size-full" />
      </div>
    </div>
    <div class="p-6 bg-default/80 border-t border-dimmed">
      <div class="flex items-center gap-2 mb-3">
        <span class="px-2 py-0.5 bg-dimmed text-muted text-[10px] font-bold uppercase rounded">
          {{ t('translation.refs') }}
        </span>
        <span class="text-sm font-semibold text-default">
          {{ sourceLang }}
        </span>
      </div>
      <div class="text-sm text-muted leading-relaxed bg-default/50 p-4 rounded border border-dimmed">
        {{ sourceText }}
      </div>
    </div>
  </div>
</template>
