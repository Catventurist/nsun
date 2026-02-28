<script setup lang="ts">
interface ProductPrice {
  regular: number
  sale?: number
  currency: string
}

interface Product {
  name: string
  image: {
    src: string
    alt: string
  }
  link: string
  description: string
  price: ProductPrice
  badge?: {
    text: string
    color?: string
  }
}

/* type ProductCardProps = Product */

type ProductList = Array<Product>

const prod: ProductList = [
  {
    name: $t('product.tinctures.title'),
    image: {
      src: '/hero/random-1.avif',
      alt: ''
    },
    link: '#',
    description: $t('product.tinctures.description'),
    price: {
      regular: 4,
      sale: 3,
      currency: '€'
    },
    badge: {
      text: $t('product.fast'),
      color: 'oklch(57.7% 0.245 27.325)'
    }
  },
  {
    name: $t('product.seeds.title'),
    image: {
      src: '/hero/random-2.avif',
      alt: ''
    },
    link: '#',
    description: $t('product.seeds.description'),
    price: {
      regular: 8,
      currency: '€'
    }
  },
  {
    name: $t('product.oils.title'),
    image: {
      src: '/hero/random-3.avif',
      alt: ''
    },
    link: '#',
    description: $t('product.oils.description'),
    price: {
      regular: 20,
      sale: 15,
      currency: '€'
    },
    badge: {
      text: $t('product.new')
    }
  }
]
/*
interface ProductList1Props {
  class?: string
}

 const props: ProductCardProps = ref({
  name: 'Thing',
  description: 'Does things',
  link: '',
  image: '',
  badge: '',
  price: 0
})

const { regular, sale, currency } = price */
</script>

<template>
  <div class="py-32">
    <div class="container">
      <UPageHero
        :title="$t('product.title')"
        icon="lucide-leaf"
      />
      <div class="grid place-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(item, index) in prod"
          :key="index"
          class="block size-full max-w-md opacity-80 transition-opacity duration-300 hover:opacity-100 hover:bg-linear-to-t from-muted"
        >
          <UCard class="h-full overflow-hidden p-0">
            <template #header>
              <NuxtLink
                :to="item.link"
                class="relative block p-0"
              >
                <NuxtImg
                  :src="item.image.src"
                  :alt="item.image.alt"
                  :height="100"
                  :width="100"
                  class="block size-full object-contain object-center rounded-md duration-300 hover:translate-y-2"
                />
                <UBadge
                  v-if="item.badge"
                  :label="item.badge.text"
                  size="lg"
                  :style="{ backgroundColor: item.badge.color }"
                  class="absolute inset-s-4 top-4 text-shadow-sm text-shadow-inverted"
                />
              </NuxtLink>
            </template>

            <div class="flex h-full flex-col gap-4 pb-2">
              <h2 class="text-xl font-semibold">
                {{ item.name }}
              </h2>
              <p class="font-medium text-muted">
                {{ item.description }}
              </p>
              <div class="mt-auto">
                <div class="flex flex-wrap items-center justify-around gap-x-2 text-lg font-semibold">
                  <span
                    v-if="item.price.sale"
                    class="leading-tight text-2xl text-error"
                  >
                    {{ item.price.sale + item.price.currency }}
                  </span>
                  <span
                    class="leading-tight text-muted"
                    :class="item.price.sale ? 'line-through': 'text-primary text-2xl'"
                  >
                    {{ item.price.regular }}{{ item.price.currency }}
                  </span>
                  <UButton
                    :to="item.link"
                    :label="$t('product.more')"
                    trailing-icon="lucide-arrow-right"
                    variant="ghost"
                    class="w-full mt-4 justify-center"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
