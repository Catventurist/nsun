<script setup lang="ts">
interface Props {
  title?: string
  system?: 'DWC' | 'NFT' | 'Aeroponics' | 'Ebb & Flow' | 'Deep Water'
  stage?: 'seedling' | 'vegetative' | 'flowering' | 'flush'
  phRange?: string
  ecRange?: string
  temp?: string
  humidity?: string
  vpd?: string
  co2?: string
  lightCycle?: string
  ppfd?: string
  reservoirSize?: string
  pumpGph?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  system: 'DWC',
  stage: 'vegetative',
  phRange: '5.8 - 6.2',
  ecRange: '1.2 - 1.8',
  temp: '68°F',
  humidity: '60%',
  vpd: '0.8 - 1.1 kPa',
  co2: 'Ambient',
  lightCycle: '18/6',
  ppfd: '400 - 600',
  reservoirSize: '50 l',
  pumpGph: '250 GPH'
})
</script>

<template>
  <div class="my-8 border border-muted rounded-2xl overflow-hidden">
    <div class="p-6 border-b border-muted bg-muted/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-muted rounded-xl text-primary">
            <UIcon
              name="i-lucide-droplets"
              class="size-6"
            />
          </div>
          <div>
            <h3 class="text-2xl m-0 tracking-tight">
              {{ props.title }}
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <UBadge
                color="info"
                variant="solid"
                size="xs"
              >
                {{ system }}
              </UBadge>
              <UBadge
                color="success"
                variant="subtle"
                size="xs"
              >
                {{ $t(`strain.grow.stage.${stage}`) }}
              </UBadge>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="text-right">
            <div class="text-[10px] uppercase font-bold text-muted">
              {{ $t('strain.grow.cycle') }}
            </div>
            <div class="flex items-center gap-1 font-bold text-sm">
              <UIcon
                name="i-lucide-sun-medium"
                class="text-warning"
              />
              {{ lightCycle }}
            </div>
          </div>
          <div class="text-right border-l pl-3 border-muted">
            <div class="text-[10px] uppercase font-bold text-muted">
              CO2 {{ $t('strain.grow.level') }}
            </div>
            <div class="flex items-center gap-1 font-bold text-sm">
              <UIcon
                name="i-lucide-wind"
                class="text-success"
              />
              {{ co2 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 border-muted">
      <div class="p-4 flex items-start gap-3 bg-info/10">
        <UIcon
          name="i-lucide-test-tube"
          class="size-5 text-info mt-0.5"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            pH / EC
          </div>
          <div class="text-sm">
            {{ phRange }}
            <span class="text-muted font-normal">
              |
            </span>
            {{ ecRange }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-start gap-3">
        <UIcon
          name="i-lucide-thermometer-sun"
          class="size-5 text-warning mt-0.5"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t('strain.grow.temph') }}
          </div>
          <div class="text-sm">
            {{ temp }}
            <span class="text-muted font-normal">|</span>
            {{ humidity }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-start gap-3">
        <UIcon
          name="i-lucide-gauge"
          class="size-5 text-purple-500 mt-0.5"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            VPD / PPFD
          </div>
          <div class="text-sm">
            {{ vpd }}
            <span class="text-muted font-normal">|</span>
            {{ ppfd }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-start gap-3">
        <UIcon
          name="i-lucide-container"
          class="size-5 text-muted mt-0.5"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t('strain.grow.respump') }}
          </div>
          <div class="text-sm">
            {{ reservoirSize }}
            <span class="text-muted">|</span>
            {{ pumpGph }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-6 flex flex-col gap-6">
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center gap-2 font-bold border-b pb-2">
          <UIcon
            name="i-lucide-clipboard"
            class="text-primary"
          />
          {{ $t('strain.grow.instructions') }}
        </div>
        <div class="prose prose-sm dark:prose-invert max-w-none">
          <slot />
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <div
          v-if="$slots.nutrients"
          class="p-4 rounded-xl bg-success/20 border border-success/60"
        >
          <div class="text-xs font-bold text-success uppercase mb-2 flex items-center gap-2">
            <UIcon name="i-lucide-beaker" />
            {{ $t('strain.grow.recipe') }}
          </div>
          <div class="text-sm">
            <slot name="nutrients" />
          </div>
        </div>
        <div
          v-if="$slots.alert"
          class="p-4 rounded-xl bg-error/20 border-error/60"
        >
          <div class="text-xs font-bold text-error uppercase mb-2 flex items-center gap-2">
            <UIcon name="i-lucide-alert-octagon" />
            {{ $t('strain.grow.warning') }}
          </div>
          <div class="text-xs">
            <slot name="alert" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
