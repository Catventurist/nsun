<script setup lang="ts">
type HempStage = 'germination' | 'seedling' | 'vegetative' | 'flowering' | 'harvesting' | 'curing'

interface Props {
  strainName: string
  genetics?: string
  stage?: HempStage
  lightCycle?: '18/6' | '12/12' | '24/0' | '10/14'
  phLevel?: number
  ecLevel?: number
  humidity?: number
  temperature?: number
  plantedDate?: string
  estimatedHarvest?: string
}

const props = withDefaults(defineProps<Props>(), {
  stage: 'vegetative',
  lightCycle: '18/6',
  phLevel: 6.0,
  ecLevel: 1.2
})

const stageConfig = computed(() => {
  const stages: Record<HempStage, { label: string, icon: string, color: string, progress: number }> = {
    germination: { label: $t('strain.stage.germination'), icon: 'lucide-pipette', color: 'text-emerald-300 bg-muted', progress: 5 },
    seedling: { label: $t('strain.stage.seedling'), icon: 'lucide-sprout', color: 'text-emerald-500 bg-muted', progress: 20 },
    vegetative: { label: $t('strain.stage.vegetative'), icon: 'lucide-leaf', color: 'text-success bg-muted', progress: 50 },
    flowering: { label: $t('strain.stage.flowering'), icon: 'lucide-flower-2', color: 'text-warning bg-muted', progress: 85 },
    harvesting: { label: $t('strain.stage.harvesting'), icon: 'lucide-scissors', color: 'text-error bg-muted', progress: 100 },
    curing: { label: $t('strain.stage.curing'), icon: 'lucide-timer', color: 'text-info bg-muted', progress: 100 }
  }
  return stages[props.stage] || stages.vegetative
})

const getPhStatus = (ph: number) => {
  if (ph >= 5.8 && ph <= 6.2) return 'text-success'
  return 'text-error animate-pulse'
}
</script>

<template>
  <div class="p-6 my-8 border-2 rounded-3xl border-muted overflow-hidden relative">
    <div :class="['absolute top-0 left-0 w-full h-2 opacity-80', stageConfig.color.replace('text', 'bg')]" />
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="flex-1">
        <div class="flex items-center gap-4 mb-6">
          <div :class="['p-3 rounded-2xl bg-muted', stageConfig.color]">
            <Icon
              :name="stageConfig.icon"
              class="size-8"
            />
          </div>
          <div>
            <h3 class="text-2xl text-primary uppercase tracking-tight italic leading-none">
              {{ strainName }}
            </h3>
            <p
              v-if="genetics"
              class="text-xs font-bold text-muted uppercase tracking-widest mt-1"
            >
              {{ $t('strain.genetics') }}: {{ genetics }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="p-3 rounded-xl bg-muted border border-primary">
            <span class="block text-[10px] font-bold text-muted uppercase mb-1">
              {{ $t('strain.cycle') }}
            </span>
            <div class="flex items-center gap-2">
              <Icon
                name="lucide-sun"
                class="size-4 text-warning"
              />
              <span class="text-sm text-primary">
                {{ lightCycle }}
              </span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-muted border border-primary">
            <span class="block text-[10px] font-bold text-muted uppercase mb-1">
              {{ $t('strain.phl') }}
            </span>
            <div class="flex items-center gap-2">
              <Icon
                name="lucide-beaker"
                :class="['size-4', getPhStatus(phLevel)]"
              />
              <span class="text-sm text-primary">
                {{ phLevel.toFixed(1) }}
              </span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-muted border border-primary">
            <span class="block text-[10px] font-bold text-muted uppercase mb-1">
              {{ $t('strain.ecl') }}
            </span>
            <div class="flex items-center gap-2">
              <Icon
                name="lucide-zap"
                class="size-4 text-info"
              />
              <span class="text-sm text-primary">
                {{ ecLevel.toFixed(1) }} mS/cm
              </span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-muted border border-primary">
            <span class="block text-[10px] font-bold text-muted uppercase mb-1">
              {{ $t('strain.climate') }}
            </span>
            <div class="flex items-center gap-2">
              <Icon
                name="lucide-thermometer"
                class="size-4 text-error"
              />
              <span class="text-sm text-primary">
                {{ temperature }}°C / {{ humidity }}%
              </span>
            </div>
          </div>
        </div>
        <div class="relative h-2 w-full bg-muted rounded-full mb-2">
          <div
            :class="['h-full rounded-full transition-all duration-1000', stageConfig.color.replace('text', 'bg')]"
            :style="{ width: `${stageConfig.progress}%` }"
          />
        </div>
        <div class="flex justify-between text-[10px] text-primary uppercase">
          <span>{{ stageConfig.label }}</span>
          <span>
            {{ stageConfig.progress }}%
            {{ $t('strain.progress') }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="mt-8 pt-6 border-t border-muted text-pretty text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
    >
      <slot />
    </div>
  </div>
</template>
