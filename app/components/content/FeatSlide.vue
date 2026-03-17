<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

interface Feature {
  step: string
  title: string
  content: string
  icon: string
  image: string
}

interface Props {
  features?: Feature[]
  intervalMs?: number
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  intervalMs: 4000,
  features: () => [
    {
      step: 'Step 1',
      title: 'Build Faster',
      content: 'Create your Content easily with pre-built blocks and components.',
      icon: 'i-lucide-rocket',
      image: '/hero/random-1.avif'
    },
    {
      step: 'Step 2',
      title: 'Customize Easily',
      content:
      'Tailor every component to your needs with our intuitive design system and flexible architecture.',
      icon: 'lucide-paintbrush',
      image: '/hero/random-2.avif'
    }
  ],
  title: 'Northern sun',
  description: 'Well-being'
})

/* const feat = [
  {
    step: 'Step 1',
    title: 'Build Faster',
    content:
      'Create your MVP in record time with our pre-built blocks and components.',
    icon: 'lucide-rocket',
    image: '/hero/random-1.avif'
  },
  {
    step: 'Step 2',
    title: 'Customize Easily',
    content:
      'Tailor every component to your needs with our intuitive design system and flexible architecture.',
    icon: 'lucide-paintbrush',
    image: '/hero/random-2.avif'
  },
  {
    step: 'Step 3',
    title: 'Deploy Confidently',
    content:
      'Launch your product with confidence using our optimized, responsive, and accessible components.',
    icon: 'lucide-code',
    image: '/hero/random-3.avif'
  },
  {
    step: 'Step 4',
    title: 'Add Yours!',
    content:
      'Contribute your own blocks and become part of the MVPBlocks community.',
    icon: 'lucide-code',
    image: '/hero/random-4.avif'
  }
] */

const currentFeature = ref(0)
const progress = ref(0)

let timer: NodeJS.Timeout | null = null

const startProgress = () => {
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 100 / (4000 / 100)
    } else {
      currentFeature.value = (currentFeature.value + 1) % props.features.length
      progress.value = 0
    }
  }, 100)
}

onMounted(() => {
  startProgress()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="p-8 md:p-12">
    <div class="mx-auto w-full max-w-7xl">
      <div class="relative mx-auto mb-12 max-w-2xl sm:text-center">
        <div class="relative z-10">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            {{ props.title }}
          </h2>
          <p class="text-default/60 mt-3">
            {{ props.description }}
          </p>
        </div>
        <div class="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px] bg-radial from-primary/20" />
      </div>
      <hr class="bg-default/30 mx-auto mb-10 h-px w-1/2">
      <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
        <div class="order-2 space-y-8 md:order-1">
          <motion.div
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-6 md:gap-8"
            :initial="{ opacity: 0.3, x: -20 }"
            :animate="{ opacity: index === currentFeature ? 1 : 0.3, x: 0, scale: index === currentFeature ? 1.05 : 1 }"
            :transition="{ duration: 0.5 }"
          >
            <motion.div
              class="flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14"
              :class="index === currentFeature
                ? 'border-primary bg-primary/10 text-primary scale-110 [box-shadow:0_0_15px_rgba(192,15,102,0.3)]'
                : 'border-muted bg-muted'"
            >
              <UIcon :name="feature.icon" />
            </motion.div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold md:text-2xl">
                {{ feature.title }}
              </h3>
              <p class="text-muted text-sm md:text-base">
                {{ feature.content }}
              </p>
            </div>
          </motion.div>
        </div>
        <div class="border-primary/20 relative order-1 h-[200px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_rgba(192,15,102,0.3)] md:order-2 md:h-[300px] lg:h-[400px]">
          <AnimatePresence mode="popLayout">
            <template
              v-for="(featu, ind) in features"
              :key="ind"
            >
              <motion.div
                v-if="ind === currentFeature"
                class="absolute inset-0 overflow-hidden rounded-lg"
                :initial="{ y: 100, opacity: 0, rotateX: -20 }"
                :animate="{ y: 0, opacity: 1, rotateX: 0 }"
                :exit="{ y: -100, opacity: 0, rotateX: 20 }"
                :transition="{ duration: 0.5, ease: 'easeInOut' }"
              >
                <NuxtImg
                  :src="featu.image"
                  :alt="featu.title"
                  class="size-full transform object-cover transition-transform duration-300 in-hover:scale-105"
                  :width="500"
                />
                <div class="from-default via-default/50 absolute right-0 bottom-0 left-0 h-2/3 bg-linear-to-t to-transparent" />

                <div class="bg-default/60 absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                  <span class="text-primary text-xs font-medium">
                    {{ featu.step }}
                  </span>
                </div>
              </motion.div>
            </template>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
</template>
