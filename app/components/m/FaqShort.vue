<script setup lang="ts">
import { motion } from 'motion-v'

type FAQItem = {
  question: string
  answer: string
}

const localePath = useLocalePath()
const faqItems: FAQItem[] = [
  {
    question: $t('faq.firstq'),
    answer: $t('faq.firsta')
  },
  {
    question: $t('faq.secondq'),
    answer: $t('faq.seconda')
  }
]
</script>

<template>
  <div class="bg-muted/50 py-8 sm:py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          :initial="{ opacity: 0, x: -50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.3 }"
        >
          <div class="space-y-4 mt-28">
            <UBadge
              :label="$t('header.faq.short')"
              variant="outline"
              class="text-sm font-normal"
            />
            <h2 class="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {{ $t('header.faq.title') }}
            </h2>
            <p class="text-muted text-xl leading-relaxed">
              {{ $t('header.faq.description') }}
            </p>
          </div>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, x: 50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.7, delay: 0.3 }"
          class="flex justify-end"
        >
          <div class="space-y-7 lg:w-[80%]">
            <motion.div
              v-for="(item, index) in faqItems"
              :key="index"
              :initial="{ opacity: 0, y: -30 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.6, delay: 0.6 + index * 0.15 }"
            >
              <UCard class="shadow-none hover:shadow-md hover:shadow-primary">
                <div class="space-y-2">
                  <h3 class="text-xl font-medium">
                    {{ item.question }}
                  </h3>
                  <p class="text-muted leading-relaxed">
                    {{ item.answer }}
                  </p>
                </div>
              </UCard>
            </motion.div>
            <motion.div
              :initial="{ opacity: 0, y: -30 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.6, delay: 0.3 + faqItems.length * 0.15 }"
            >
              <UButton
                :to="localePath('/pricing#faq')"
                :label="$t('faq.check')"
                variant="link"
                class="h-auto p-0 text-base underline"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</template>
