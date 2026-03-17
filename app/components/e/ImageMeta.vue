<script setup lang='ts'>
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useElementBounding } from '@vueuse/core'

interface ImageMetadata {
  created?: string
  updated?: string
  by?: string
  source?: string
}

interface ImageMetadataPreviewProps {
  imageSrc?: string
  alt?: string
  filename?: string
  description?: string
  metadata?: ImageMetadata
  onShare?: () => void
}

const props = withDefaults(defineProps<ImageMetadataPreviewProps>(), {
  imageSrc: '/catbirchdark.webp',
  alt: 'Image preview',
  filename: 'Untitled',
  description: 'No description provided.',
  onShare: () => { }
})

const openInfo = ref(false)
const isHoverDevice = ref(false)
/*   const [elementRef, bounds] = useMeasure() */
const el = ref<HTMLElement | null>(null)
const { height } = useElementBounding(el)
const shouldReduceMotion = useReducedMotion()

watchEffect(() => {
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  isHoverDevice.value = (mediaQuery.matches)

  const handleChange = (e: MediaQueryListEvent) => {
    isHoverDevice.value = (e.matches)
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
})

const handleClickOpen = () => {
  openInfo.value = !openInfo.value
}

const handleClickClose = () => {
  openInfo.value = !openInfo.value
}
</script>

<template>
  <UCard class="relative min-h-86">
    <div class="absolute bottom-1 flex flex-col items-center justify-center gap-4">
      <motion.div
        :initial="{ y: 0, opacity: 0 }"
        :animate="shouldReduceMotion ? {} : { y: height, opacity: 1 }"
        class="pointer-events-none overflow-hidden rounded-xl"
        :transition="shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }"
      >
        <NuxtImg
          v-if="props.imageSrc"
          :alt="alt"
          :height="300"
          :src="imageSrc"
        />
      </motion.div>
      <div class="relative flex w-full flex-col items-center gap-4">
        <div class="relative flex w-full flex-row items-center justify-center gap-4">
          <UButton
            aria-label="Share"
            icon="lucide-share"
            variant="soft"
            :class="isHoverDevice ? 'hover:bg-muted' : ''"
            :disabled="!onShare"
            @click="onShare"
          />
          <UButton
            aria-label="Connect"
            icon="lucide-scan-heart"
            variant="subtle"
            disabled
          />
          <AnimatePresence>
            <motion.button
              :animate="
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, filter: 'blur(0px)' }"
              aria-label="Open Metadata Preview"
              class="px-2 py-1 text-primary shadow-xs shadow-primary rounded-xl"
              :class="isHoverDevice ? 'hover:bg-muted' : ''"
              :initial="
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, filter: 'blur(4px)' }"
              :style="{ borderRadius: 100 }"
              :transition=" shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }"
              @click="handleClickOpen"
            >
              <UIcon
                name="lucide-chevron-up"
                aria-hidden="true"
                :size="16"
              />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          v-if="openInfo"
          :animate="
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)' }"
          class="absolute bottom-0 w-full cursor-pointer gap-4 rounded-t-lg border border-muted bg-default/80 backdrop-blur-sm p-5 shadow-xs shadow-primary"
          :initial="
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: 'blur(4px)' }"
          :style="{ borderRadius: 20 }"
          :transition="
            shouldReduceMotion
              ? { duration: 0 }
              : { type: 'spring', duration: 0.25, bounce: 0 }"
          @click="handleClickClose"
        >
          <div
            ref="el"
            class="flex flex-col items-start"
          >
            <div class="flex w-full flex-row items-start justify-between gap-4">
              <div>
                <p class="text-default">
                  {{ filename }}
                </p>
                <p class="text-muted">
                  {{ description }}
                </p>
              </div>
              <button
                aria-label="Close metadata preview"
                class="flex min-h-[44px] min-w-[44px] items-center justify-center rounded p-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                :class="isHoverDevice ? 'hover:bg-muted' : ''"
                type="button"
                @click="(e: { stopPropagation: () => void }) => { e.stopPropagation(); handleClickClose() }"
              >
                <Icon
                  name="lucide-circle-x"
                  aria-hidden="true"
                  :size="16"
                />
              </button>
            </div>
            <table class="flex w-full flex-col items-center gap-4 text-default">
              <tbody
                v-if="metadata"
                class="w-full"
              >
                <tr class="flex w-full flex-row items-center gap-4">
                  <td class="w-1/2">
                    Created
                  </td>
                  <td class="w-1/2 text-primary">
                    {{ metadata.created }}
                  </td>
                </tr>
                <tr class="flex w-full flex-row items-center gap-4">
                  <td class="w-1/2">
                    Updated
                  </td>
                  <td class="w-1/2 text-primary">
                    {{ metadata.updated }}
                  </td>
                </tr>
                <tr class="flex w-full flex-row items-center gap-4">
                  <td class="w-1/2">
                    By
                  </td>
                  <td class="w-1/2">
                    {{ metadata.by }}
                  </td>
                </tr>
                <tr class="flex w-full flex-row items-center gap-4">
                  <td class="w-1/2">
                    Source
                  </td>
                  <td class="w-1/2 truncate">
                    {{ metadata.source }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </UCard>
</template>
