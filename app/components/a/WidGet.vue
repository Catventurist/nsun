<script setup lang="ts">
import { Primitive } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import { reactiveOmit } from '@vueuse/core'

const props = defineProps<PrimitiveProps & {
  variant?: WidgetVariants['variant']
  class?: HTMLAttributes['class']
  headerClass?: HTMLAttributes['class']
  iconClass?: HTMLAttributes['class']
  titleClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  footerClass?: HTMLAttributes['class']
  size?: WidgetVariants['size']
  design?: WidgetVariants['design']
  title?: string
  to?: string
  icon?: string
  number?: number
}>()

const widgetVariants = tv({
  base: 'relative flex flex-col border-2 whitespace-nowrap shadow-md shadow-primary/50 rounded-3xl overflow-hidden',
  variants: {
    size: {
      sm: 'size-48',
      md: 'w-96 h-48',
      lg: 'size-96'
    },
    design: {
      default: 'p-6',
      slim: 'p-4'
    },
    variant: {
      default: 'bg-default text-default',
      primary: 'bg-primary/20 text-primary',
      muted: 'bg-muted text-muted hover:bg-muted/40 border-transparent',
      outline: 'text-default border-primary/60',
      shadow: 'bg-muted/30 text-primary inset-shadow-sm inset-shadow-primary/40 duration-300 hover:text-default'
    }
  },
  defaultVariants: {
    size: 'sm',
    design: 'default',
    variant: 'default'
  }
})

type WidgetVariants = VariantProps<typeof widgetVariants>

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <NuxtLink :to="to">
    <Primitive
      v-bind="delegatedProps"
      data-slot="widget"
      :class="[widgetVariants({ variant, size: props.size, design: props.design }), props.class]"
    >
      <div
        class="text-semibold flex flex-none items-start justify-between"
        :class="headerClass"
      >
        <slot name="header">
          <div class="flex flex-row w-full items-center justify-between">
            <h4
              class="leading-none font-semibold tracking-tight"
              :class="titleClass"
            >
              {{ title }}
            </h4>
            <UIcon
              v-if="icon"
              :name="icon"
              :class="iconClass"
            />
            <MCountUp
              v-else-if="number"
              :max="number"
              :min="0"
              class="font-bold"
            />
          </div>
        </slot>
      </div>
      <div
        class="flex flex-1 items-center justify-around"
        :class="contentClass"
      >
        <slot />
      </div>
      <div
        class="flex flex-none items-center justify-between"
        :class="footerClass"
      >
        <slot name="footer" />
      </div>
    </Primitive>
  </NuxtLink>
</template>
