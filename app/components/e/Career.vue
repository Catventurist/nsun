<script lang='ts' setup>
import { stagger, Motion } from 'motion-v'
import type { MotionProps } from 'motion-v'
import type { TabsItem } from '@nuxt/ui'

const all = [{
  tag: $t('jobs.design.tag'),
  icon: 'lucide-bookmark',
  title: $t('jobs.design.title'),
  description: $t('jobs.design.description'),
  type: $t('jobs.remote'),
  location: $t('jobs.anywhere'),
  length: $t('jobs.fullt'),
  level: $t('jobs.senior'),
  currency: '€',
  moneyfrom: '20k',
  moneyto: '60k',
  highlights: [
    '40(k)',
    $t('jobs.remote')
  ]
}, {
  tag: $t('jobs.engi.tag'),
  icon: 'lucide-bookmark',
  title: $t('jobs.engi.title'),
  description: $t('jobs.engi.description'),
  type: $t('jobs.remote'),
  location: $t('jobs.anywhere'),
  length: $t('jobs.fullt'),
  level: $t('jobs.senior'),
  currency: '€',
  moneyfrom: '20k',
  moneyto: '60k',
  highlights: [
    '40(k)',
    $t('jobs.remote')
  ]
}]

const engi = [{
  tag: $t('jobs.engi.tag'),
  icon: 'lucide-bookmark',
  title: $t('jobs.engi.title'),
  description: $t('jobs.engi.description'),
  type: $t('jobs.remote'),
  location: $t('jobs.anywhere'),
  length: $t('jobs.fullt'),
  level: $t('jobs.senior'),
  currency: '€',
  moneyfrom: '20k',
  moneyto: '60k',
  highlights: [
    '40(k)',
    $t('jobs.remote')
  ]
}]

const design = [{
  tag: $t('jobs.design.tag'),
  icon: 'lucide-bookmark',
  title: $t('jobs.design.title'),
  description: $t('jobs.design.description'),
  type: $t('jobs.remote'),
  location: $t('jobs.anywhere'),
  length: $t('jobs.fullt'),
  level: $t('jobs.senior'),
  currency: '€',
  moneyfrom: '20k',
  moneyto: '60k',
  highlights: [
    '40(k)',
    $t('jobs.remote')
  ]
}]

const items: TabsItem[] = [
  {
    label: $t('jobs.all'),
    icon: 'i-lucide-list',
    items: all
  }, {
    label: $t('jobs.engi.tag'),
    icon: 'i-lucide-wrench',
    items: engi
  }, {
    label: $t('jobs.design.tag'),
    icon: 'i-lucide-palette',
    items: design
  }, {
    label: $t('jobs.products'),
    icon: 'i-lucide-shopping-cart'
  }, {
    label: $t('jobs.learning'),
    icon: 'i-lucide-lightbulb'
  }
]

const childVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}
</script>

<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1)
        }
      }
    }"
  >
    <UContainer class="py-16 lg:py-24">
      <div class="mb-12 text-center lg:mb-16">
        <Motion
          as="p"
          :variants="childVariant"
          class="mb-2 font-semibold text-primary"
        >
          {{ $t('header.careers.headline') }}
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mb-4 text-4xl font-bold lg:text-5xl"
        >
          {{ $t('header.careers.title') }}
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-2xl text-lg text-muted lg:text-xl"
        >
          {{ $t('header.careers.description') }}
        </Motion>
      </div>
      <Motion
        :variants="childVariant"
        class="mb-12"
      >
        <UTabs
          :items="items"
          class="w-full"
        >
          <template #content="{ item }">
            <div class="mx-auto w-full justify-start">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Motion
                  v-for="c in item.items"
                  :key="c.title"
                  :variants="childVariant"
                  :transition="{ delay: c.index * 0.05 }"
                >
                  <UCard class="group h-full py-0 transition-all hover:border-primary/50 hover:shadow-lg">
                    <div class="p-6">
                      <div class="mb-4 flex items-start justify-between">
                        <UBadge
                          :label="c.tag"
                          variant="outline"
                        />
                        <UButton
                          :icon="c.icon"
                          variant="ghost"
                          size="sm"
                        />
                      </div>
                      <h3 class="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                        {{ c.title }}
                      </h3>
                      <p class="mb-4 text-sm text-muted">
                        {{ c.description }}
                      </p>
                      <div class="mb-4 space-y-2 text-sm">
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:map-pin"
                            class="size-4"
                          />
                          {{ c.type }} · {{ c.location }}
                        </div>
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:briefcase"
                            class="size-4"
                          />
                          {{ c.length }} · {{ c.level }}
                        </div>
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:dollar-sign"
                            class="size-4"
                          />
                          {{ c.moneyfrom }} - {{ c.moneyto }}{{ c.currency }}
                        </div>
                      </div>
                      <USeparator class="my-4" />
                      <div class="flex flex-wrap gap-2">
                        <UBadge
                          v-for="b in c.highlights"
                          :key="b"
                          :label="b"
                          variant="outline"
                          size="sm"
                        />
                      </div>
                      <UButton
                        :label="$t('jobs.details')"
                        trailing-icon="lucide-arrow-right"
                        class="mt-6 w-full justify-center"
                        variant="subtle"
                      />
                    </div>
                  </UCard>
                </Motion>
              </div>
              <Motion
                :variants="childVariant"
                class="mt-12 text-center"
              >
                <UButton
                  :label="$t('jobs.more')"
                  size="lg"
                  variant="outline"
                />
              </Motion>
            </div>
          </template>
        </UTabs>
      </Motion>
    </UContainer>
  </Motion>
</template>
