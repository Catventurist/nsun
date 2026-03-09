<script setup lang="ts">
const selectedSize = ref({ label: 'Medium', value: 'm' })
const selectedColor = ref('blue')
const quantity = ref(1)

interface Props {
  title: string
  price: number
  description?: string
  image?: string
  sizes?: { label: string, value: string }[]
  colors?: { label: string, value: string, chip: string }[]
}

const props = withDefaults(defineProps<Props>(), {
  image: '/catbirchdark.webp',
  sizes: () => [
    { label: 'Small', value: 's' },
    { label: 'Medium', value: 'm' },
    { label: 'Large', value: 'l' }
  ],
  colors: () => [
    { label: 'Blue', value: 'blue', chip: 'blue' },
    { label: 'Red', value: 'red', chip: 'red' },
    { label: 'Green', value: 'green', chip: 'green' }
  ]
})
</script>

<template>
  <div class="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
    <div class="lg:col-span-7">
      <div class="h-100 rounded-xl overflow-hidden duration-300 group-hover:overflow-visible bg-muted">
        <NuxtImg :src="props.image" :alt="title" :height="100" class="size-full rounded-md object-contain duration-300 group-hover:scale-110" />
      </div>
    </div>
    <div class="lg:col-span-5 space-y-4">
      <div>
        <h1 class="text-3xl font-bold text-primary">
          {{ title }}
        </h1>
        <p class="text-2xl font-semibold mt-2">
          {{ price }}€
        </p>
      </div>
      <p class="text-muted">
        {{ description }}
      </p>

      <div class="flex flex-col space-y-4 pt-6 border-t border-muted">
        <UFormField label="Select Size" name="size">
          <USelectMenu
            v-model="selectedSize"
            :items="sizes"
            icon="i-lucide-maximize"
          />
        </UFormField>
        <UFormField label="Choose Color" name="color">
          <div class="flex gap-2">
            <UButton
              v-for="color in colors"
              :key="color.value"
              :color="selectedColor === color.value ? 'info' : 'neutral'"
              :variant="selectedColor === color.value ? 'solid' : 'ghost'"
              size="sm"
              class="rounded-full"
              @click="selectedColor = color.value"
            >
              <span
                class="size-3 rounded-full mr-1"
                :style="{ backgroundColor: color.chip }"
              />
              {{ color.label }}
            </UButton>
          </div>
        </UFormField>
        <UFormField label="Quantity" name="quantity">
          <UInputNumber v-model="quantity" />
          <!-- <div class="flex items-center gap-3">
            <UButton
              icon="i-lucide-minus"
              variant="soft"
              color="neutral"
              square
              @click="quantity > 1 && quantity--"
            />
            <span class="w-8 text-center font-bold">{{ quantity }}</span>
            <UButton
              icon="i-lucide-plus"
              variant="soft"
              color="neutral"
              square
              @click="quantity++"
            />
          </div> -->
        </UFormField>
      </div>
      <div class="flex gap-4 px-2">
        <UButton
          icon="i-lucide-shopping-cart"
          variant="soft"
          label="Add to Cart"
          size="xl"
          class="flex-1 justify-center"
        />
        <UButton
          icon="i-lucide-heart"
          variant="outline"
          color="error"
          size="xl"
          square
        />
      </div>
      <div class="flex items-center gap-2 text-sm text-muted">
        <UIcon name="i-lucide-truck" class="size-4" />
        <span>Free shipping on orders over 50 €</span>
      </div>
    </div>
  </div>
</template>
