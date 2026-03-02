<script lang="ts" setup>
const toast = useToast()
const { locale } = useI18n()

function handleComplete() {
  const eventDate = new Date(Date.now() + Math.random() * 100)
  const formattedDate = eventDate.toLocaleDateString(locale.value, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  toast.add({
    title: $t('scratch.title'),
    description: $t('scratch.description') + ` ${formattedDate}.`,
    icon: 'i-lucide-calendar-days',
    color: 'success'
  })
}
</script>

<template>
  <MScratch
    :width="250"
    :height="250"
    :min-scratch-percentage="50"
    class="mx-auto flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dimmed bg-muted/80"
    :gradient-colors="['#A97CF8', '#F38CB8', '#FDCC92']"
    @complete="handleComplete"
  >
    <div class="text-8xl">
      🥳
    </div>
  </MScratch>
</template>
