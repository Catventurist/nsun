<script setup lang="ts">
interface ProductOption {
  label: string
  value: string
  description?: string
  price?: number
  icon?: string
  suffix?: string
}

interface prodProps {
  label?: string
  description?: string
  icon?: string
  options?: ProductOption[]
  variant?: 'select' | 'radio' | 'button'
  size?: 'sm' | 'md' | 'lg'
  color?: 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'neutral' | undefined
}

const props = withDefaults(defineProps<prodProps>(), {
  label: 'Select Variation',
  description: 'Choose the concentration that fits your needs',
  icon: 'i-lucide-settings-2',
  options: () => [],
  variant: 'select',
  size: 'md',
  color: 'success'
})

const selected = ref(props.options?.[0]?.value || '')
watch(() => props.options, (newOptions) => {
  if (newOptions?.length && !selected.value) {
    selected.value = newOptions[0]?.value as string
  }
}, { immediate: true })

const selectedOption = computed(() =>
  props.options.find(opt => opt.value === selected.value)
)
</script>

<template>
  <div class="p-4 border border-muted rounded-xlspace-y-6">
    <div class="flex items-start gap-4 mb-4">
      <div
        v-if="icon"
        class="p-3 rounded-lg bg-muted text-success"
      >
        <UIcon
          :name="icon"
          class="size-6"
        />
      </div>
      <div>
        <h3 class="font-bold text-lg leading-tight">
          {{ label }}
        </h3>
        <p
          v-if="description"
          class="text-sm text-muted mt-1"
        >
          {{ description }}
        </p>
      </div>
    </div>
    <div class="space-y-4">
      <USelectMenu
        v-if="variant === 'select'"
        v-model="(selected as unknown as ProductOption)"
        :items="options"
        value-attribute="value"
        option-attribute="label"
        :size="size"
        class="w-full"
      >
        <template #item-label>
          <div
            v-if="selectedOption"
            class="flex items-center gap-2"
          >
            <UIcon
              v-if="selectedOption.icon"
              :name="selectedOption.icon"
              class="size-4"
            />
            <span>{{ selectedOption.label }}</span>
            <span
              v-if="selectedOption.price"
              class="ml-auto text-muted font-medium"
            >
              {{ selectedOption.price }}€
            </span>
          </div>
        </template>
      </USelectMenu>
      <URadioGroup
        v-else-if="variant === 'radio'"
        v-model="selected"
        :items="options"
        :size="size"
        variant="table"

        :ui="{ wrapper: 'grid grid-cols-1 gap-3', base: 'mt-8' }"
      >
        <template #label="{ item }">
          <div class="flex items-center justify-between w-full cursor-pointer rounded-xl duration-300 hover:bg-linear-to-b from-primary/20">
            <div class="flex items-center gap-3">
              <UIcon
                v-if="item.icon"
                :name="item.icon"
                class="size-5 text-muted"
              />
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.label }}
                </span>
                <!-- <span
                  v-if="item.description"
                  class="text-xs text-muted italic"
                >
                  {{ item.description }}
                </span> -->
              </div>
            </div>
            <span
              v-if="item.price"
              class="text-lg text-success"
            >
              {{ item.price }}€
            </span>
          </div>
        </template>
      </URadioGroup>
    </div>
    <div class="pt-2">
      <slot :selected="selectedOption" />
    </div>
    <div class="flex items-center justify-between gap-4 pt-2">
      <div class="flex flex-col">
        <span class="text-xs font-bold uppercase tracking-widest text-muted">
          {{ $t('product.total') }}
        </span>
        <span class="text-2xl">
          {{ selectedOption?.price || '---' }}€
        </span>
      </div>
      <UButton
        :color="color"
        size="lg"
        icon="i-lucide-shopping-cart"
        variant="soft"
      >
        {{ $t('product.add') }} {{ selectedOption?.label }} {{ $t('product.cart') }}
      </UButton>
    </div>
  </div>
</template>
