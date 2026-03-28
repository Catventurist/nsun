<script setup lang="ts">
type ProductItem = {
  image?: string
  imgAlt?: string
  name?: string
  price?: number
  salePrice?: number
  badges?: string[]
  to?: string
}

const { locale } = useI18n()
const formatCurrency = (price: number) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
const productItems: ProductItem[] = [
  {
    image: '/hero/random-1.avif',
    imgAlt: 'Strong Sun 6',
    name: 'Strong Sun 6',
    price: 12,
    badges: ['Seed', 'Strong'],
    to: '/'
  },
  {
    image: '/hero/random-2.avif',
    imgAlt: 'Strong Sun 7',
    name: 'Strong Sun 7',
    price: 22,
    salePrice: 20,
    badges: ['Seed', 'Strong'],
    to: '/'
  },
  {
    image: '/hero/random-3.avif',
    imgAlt: 'Strong Sun Ultra',
    name: 'Strong Sun Ultra',
    price: 19,
    badges: ['Seed', 'Strong'],
    to: '/'
  },
  {
    image: '/hero/random-4.avif',
    imgAlt: 'Strong Sun 3',
    name: 'Strong Sun 3',
    price: 12,
    badges: ['Seed', 'Strong'],
    to: '/'
  },
  {
    image: '/hero/random-5.avif',
    imgAlt: 'Special Sun',
    name: 'Special Sun',
    price: 23,
    badges: ['Seed', 'Special'],
    to: '/'
  },
  {
    image: '/hero/random-6.avif',
    imgAlt: 'Simple Sun',
    name: 'Simple Sun',
    price: 11,
    badges: ['Seed', 'Strong'],
    to: '/'
  }
]
</script>

<template>
  <div class="py-8">
    <div class="mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8">
      <UPageHero
        :title="$t('product.title')"
        :description="$t('product.description')"
      />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="(product, index) in productItems"
          :key="index"
          :class="product.salePrice && 'relative'"
          class="duration-300 hover:bg-radial from-primary/20"
        >
          <UBadge
            v-if="product.salePrice"
            label="Sale"
            class="bg-success/10 hover:bg-success/5 focus-visible:ring-success/20 text-success absolute top-6 left-6 rounded-sm px-3 py-1 uppercase focus-visible:outline-none"
          />
          <div class="flex flex-1 flex-col justify-between gap-6">
            <NuxtLinkLocale :to="product.to">
              <NuxtImg
                :src="product.image"
                :alt="product.imgAlt"
                :height="200"
                :width="200"
                class="mx-auto size-50"
              />
            </NuxtLinkLocale>
            <div class="space-y-4">
              <div class="flex flex-col gap-2 text-center">
                <NuxtLinkLocale :to="product.to">
                  <h3 class="text-xl font-semibold">
                    {{ product.name }}
                  </h3>
                </NuxtLinkLocale>
                <div class="flex items-center justify-center gap-2">
                  <UBadge
                    v-for="(badge, idx) in product.badges"
                    :key="idx"
                    :label="badge"
                    class="rounded-sm bg-success/10 text-success focus-visible:ring-success/20 focus-visible:outline-none"
                  />
                </div>
              </div>
              <USeparator />
              <div class="flex items-center justify-between">
                <span
                  v-if="!product.salePrice"
                  class="text-2xl font-semibold"
                >
                  {{ formatCurrency(Number(product.price)) }}
                </span>
                <div
                  v-if="product.salePrice"
                  class="flex flex-row items-center gap-2.5"
                >
                  <span class="text-2xl font-semibold">
                    {{ formatCurrency(Number(product.salePrice)) }}
                  </span>
                  <span class="text-dimmed font-medium line-through">
                    {{ formatCurrency(Number(product.price)) }}
                  </span>
                </div>
                <div class="flex flex-row items-center">
                  <!-- <UCheckbox
                    class="focus-visible:ring-default/50 rounded-sm p-2.5 outline-none focus-visible:ring-3 **:data-[state=checked]:text-error **:data-[state=checked]:bg-default **:data-[state=indeterminate]:bg-muted **:data-[state=indeterminate]:text-muted"
                    icon="i-lucide-heart"
                    default-value="indeterminate"
                    indeterminate-icon="i-lucide-heart"
                    size="xl"
                    aria-label="Heart icon"
                  />
                  <UCheckbox
                    class="focus-visible:ring-default/50 rounded-sm p-2.5 outline-none focus-visible:ring-3 **:data-[state=checked]:text-success **:data-[state=checked]:bg-default **:data-[state=indeterminate]:bg-muted **:data-[state=indeterminate]:text-muted"
                    icon="i-lucide-shopping-cart"
                    default-value="indeterminate"
                    indeterminate-icon="i-lucide-shopping-cart"
                    size="xl"
                    aria-label="Cart icon"
                  /> -->
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
