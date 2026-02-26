<script setup lang="ts">
const toast = useToast()

function showToast() {
  const t = toast.add({
    'title': $t('upload.load.title'),
    'description': $t('upload.load.description'),
    'icon': 'i-lucide-cloud-upload',
    'duration': 3000,
    'onUpdate:open': (open: boolean) => {
      if (open) {
        return
      }

      toast.update(t.id, {
        'title': $t('upload.loaded.title'),
        'description': $t('upload.loaded.description'),
        'icon': 'i-lucide-check',
        'color': 'success',
        'onUpdate:open': undefined
      })
    }
  })
}
</script>

<template>
  <UButton
    :label="$t('upload.title')"
    color="neutral"
    variant="outline"
    @click="showToast"
  />
</template>
