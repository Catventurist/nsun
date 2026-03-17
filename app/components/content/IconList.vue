<script setup lang='ts'>
import type { ClassValue, VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import type { HTMLAttributes } from 'vue'

type IconListProps = {
  class?: HTMLAttributes['class']
  variant?: VariantProps<typeof proseIconListStyles>['variant']
  icon?: string
}

type ListItemMeta = {
  icon: string
  variant?: VariantProps<typeof proseIconListStyles>['variant']
}

const proseIconListStyles = tv({
  slots: {
    base: 'ms-2 flex list-none flex-col gap-2',
    item: 'group flex items-start justify-baseline gap-2 *:my-0! *:leading-normal **:[[role=list]]:mt-1 **:[[role=list]]:mb-2 [&>svg]:mt-1! has-[>*_code]:[&>svg]:mt-1!',
    icon: 'translate-y-0.5 size-4 shrink-0 duration-300 group-hover:scale-120 group-hover:translate-x-1'
  },
  variants: {
    variant: {
      success: {
        icon: 'text-success'
      },
      error: {
        icon: 'text-error'
      },
      warning: {
        icon: 'text-warning'
      },
      info: {
        icon: 'text-info'
      },
      star: {
        icon: 'text-yellow-500'
      },
      completed: {
        icon: 'text-success'
      },
      progress: {
        icon: 'text-warning'
      },
      fail: {
        icon: 'text-error'
      },
      help: {
        icon: 'text-info'
      },
      setting: {
        icon: 'text-info'
      },
      bug: {
        icon: 'text-error'
      },
      default: {
        icon: 'text-muted'
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const props = defineProps<IconListProps>()

function getDefaultIcon(variant?: IconListProps['variant']): string {
  if (props.icon) return props.icon

  switch (variant ?? props.variant) {
    case 'success':
      return 'lucide-circle-check'
    case 'error':
      return 'lucide-circle-x'
    case 'warning':
      return 'lucide-triangle-alert'
    case 'info':
      return 'lucide-info'
    case 'star':
      return 'lucide-star'
    case 'completed':
      return 'lucide-check-circle-2'
    case 'progress':
      return 'lucide-clock'
    case 'fail':
      return 'lucide-x-circle'
    case 'help':
      return 'lucide-help-circle'
    case 'setting':
      return 'lucide-settings'
    case 'bug':
      return 'lucide-bug'
    default:
      return 'lucide-dot'
  }
}

const { items: slottedItems } = useDefaultSlotItems<ListItemMeta>({
  slots: useSlots(),
  mapMeta({ props: itemProps }) {
    const itemVariant = (itemProps.variant as IconListProps['variant']) ?? props.variant
    const itemIcon = (itemProps.icon as string) ?? getDefaultIcon(itemVariant)

    return {
      icon: itemIcon,
      variant: itemVariant
    }
  }
})
</script>

<template>
  <div
    role="list"
    data-slot="prose-icon-list"
    :class="proseIconListStyles().base({ class: props.class as ClassValue })"
  >
    <div
      v-for="item in slottedItems"
      :key="item.key ?? item.index"
      role="listitem"
      :class="proseIconListStyles().item()"
    >
      <Icon
        v-if="item.meta.icon"
        data-slot="icon"
        :name="item.meta.icon"
        :class="proseIconListStyles().icon({ variant: item.meta.variant })"
        class=""
      />
      <component :is="item.vnode" />
    </div>
  </div>
</template>
