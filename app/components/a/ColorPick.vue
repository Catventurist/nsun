<script setup lang="ts">
import type { Color } from 'reka-ui'
import {
  ColorAreaArea,
  ColorAreaRoot,
  ColorAreaThumb,
  ColorFieldInput,
  ColorFieldRoot,
  ColorSliderRoot,
  ColorSliderThumb,
  ColorSliderTrack,
  ColorSwatch,
  colorToString,
  normalizeColor,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'reka-ui'
import { computed, ref } from 'vue'

const colorObj = ref<Color>(normalizeColor('#56d799'))
const hexColor = computed(() => colorToString(colorObj.value, 'hex'))

function handleColorUpdate(newColor: Color) {
  colorObj.value = newColor
}

function handleHexUpdate(hex: string) {
  colorObj.value = normalizeColor(hex)
}
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger
      class="inline-flex min-w-36 items-center gap-2 px-3 py-2 rounded-md bg-default/80 border border-muted transition hover:bg-muted/80 data-[state=open]:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <ColorSwatch
        :color="hexColor"
        class="size-5 rounded-sm border border-default/60 bg-(--reka-color-swatch-color)"
        :style="{ defaultColor: 'var(--reka-color-swatch-color)' }"
      />
      <span class="text-sm font-mono text-default">
        {{ hexColor }}
      </span>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="8"
        class="rounded-lg p-4 w-[280px] bg-default/60 backdrop-blur-sm border border-muted shadow shadow-primary will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade"
      >
        <div class="flex flex-col gap-4 bg-default/60 backdrop-blur-sm">
          <div class="flex items-center gap-3 bg-default/60 backdrop-blur-sm">
            <ColorSwatch
              :color="hexColor"
              class="size-8 rounded-md border border-default/60"
              :style="{ defaultColor: 'var(--reka-color-swatch-color)' }"
            />
            <div class="flex flex-col">
              <span class="text-sm font-medium text-default">
                {{ $t('theme.color') }}
              </span>
              <code class="text-xs text-muted">
                {{ hexColor }}
              </code>
            </div>
          </div>
          <ColorAreaRoot
            v-slot="{ style }"
            :model-value="colorObj"
            color-space="hsl"
            x-channel="saturation"
            y-channel="lightness"
            class="relative"
            @update:color="handleColorUpdate"
          >
            <ColorAreaArea
              class="relative w-full h-[140px] rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/60"
              :style="style"
            >
              <ColorAreaThumb class="block size-4 rounded-full bg-default border-2 border-default shadow-md shadow-primary cursor-pointer hover:scale-110 transition-transform" />
            </ColorAreaArea>
          </ColorAreaRoot>
          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium text-muted">
              {{ $t('theme.hue') }}
            </label>
            <ColorSliderRoot
              :model-value="colorObj"
              channel="hue"
              color-space="hsl"
              class="relative flex items-center w-full h-4"
              @update:color="handleColorUpdate"
            >
              <ColorSliderTrack class="relative flex-1 rounded-full h-2">
                <div class="absolute inset-0 rounded-full hue-gradient" />
              </ColorSliderTrack>
              <ColorSliderThumb class="block size-4 rounded-full bg-default border-2 border-default shadow-md shadow-primary cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/60" />
            </ColorSliderRoot>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium text-muted">
              {{ $t('theme.alpha') }}
            </label>
            <ColorSliderRoot
              :model-value="colorObj"
              channel="alpha"
              color-space="hsl"
              class="relative flex items-center w-full h-4"
              @update:color="handleColorUpdate"
            >
              <ColorSliderTrack class="relative flex-1 rounded-full h-2 checkerboard-bg">
                <div class="absolute inset-0 rounded-full" />
              </ColorSliderTrack>
              <ColorSliderThumb class="block size-4 rounded-full bg-default border-2 border-default shadow-md shadow-primary cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/60" />
            </ColorSliderRoot>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium text-muted">
              {{ $t('theme.values') }}
            </label>
            <div class="flex gap-2">
              <ColorFieldRoot
                :model-value="hexColor"
                class="flex-2"
                @update:model-value="handleHexUpdate"
              >
                <ColorFieldInput
                  class="w-full px-2 py-1.5 text-sm border border-muted bg-default/80 rounded-md text-default focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary font-mono"
                  placeholder="#000000"
                />
              </ColorFieldRoot>
              <ColorFieldRoot
                :model-value="colorObj"
                channel="hue"
                color-space="hsl"
                class="flex-1"
                @update:color="handleColorUpdate"
              >
                <ColorFieldInput
                  class="w-full px-2 py-1.5 text-sm border border-muted bg-default/80 rounded-md text-default focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary text-center"
                  placeholder="H"
                />
              </ColorFieldRoot>
              <ColorFieldRoot
                :model-value="colorObj"
                channel="saturation"
                color-space="hsl"
                class="flex-1"
                @update:color="handleColorUpdate"
              >
                <ColorFieldInput
                  class="w-full px-2 py-1.5 text-sm border border-muted bg-default/80 rounded-md text-default focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary text-center"
                  placeholder="S"
                />
              </ColorFieldRoot>
              <ColorFieldRoot
                :model-value="colorObj"
                channel="lightness"
                color-space="hsl"
                class="flex-1"
                @update:color="handleColorUpdate"
              >
                <ColorFieldInput
                  class="w-full px-2 py-1.5 text-sm border border-muted bg-default/80 rounded-md text-default focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary text-center"
                  placeholder="L"
                />
              </ColorFieldRoot>
            </div>
          </div>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped>
.hue-gradient {
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}

.checkerboard-bg {
  background-image:
    linear-gradient(45deg, #808080 25%, transparent 25%),
    linear-gradient(-45deg, #808080 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #808080 75%),
    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  background-color: #404040;
}
</style>
