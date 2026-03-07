<script setup lang="ts">
interface Props {
  airTemp: number
  humidity: number
  leafOffset?: number
  stage?: 'seedling' | 'veg' | 'flower' | 'late-flower'
  ppfd?: number // (µmol/m²/s)
  co2?: number // CO2 (ppm)
  lightCycle?: 'on' | 'off'
}

const props = withDefaults(defineProps<Props>(), {
  leafOffset: -2,
  stage: 'veg',
  ppfd: 0,
  co2: 400,
  lightCycle: 'on'
})

// (kPa)
const vpdValue = computed(() => {
  const leafTemp = props.airTemp + props.leafOffset
  const svpLeaf = 0.61078 * Math.exp((17.27 * leafTemp) / (leafTemp + 237.3))
  const svpAir = 0.61078 * Math.exp((17.27 * props.airTemp) / (props.airTemp + 237.3))
  const avpAir = svpAir * (props.humidity / 100)
  return Math.max(0, parseFloat((svpLeaf - avpAir).toFixed(2)))
})

const transpirationLoad = computed(() => {
  const vpd = vpdValue.value
  const lightEffect = props.lightCycle === 'on' ? (props.ppfd / 1000) * 20 : 0
  return Math.min(100, (vpd / 2.0 * 80) + lightEffect)
})

const insight = computed(() => {
  const v = vpdValue.value
  const co2 = props.co2
  const light = props.lightCycle
  const p = props.ppfd

  if (light === 'off') {
    return {
      label: $t('strain.insight.dark.title'),
      color: 'text-info',
      icon: 'lucide:moon',
      advice: $t('strain.insight.dark.advice')
    }
  }

  if (co2 > 1000 && v < 1.2) {
    return {
      label: $t('strain.insight.rich.title'),
      color: 'text-success',
      icon: 'lucide:zap',
      advice: $t('strain.insight.rich.advice')
    }
  }

  if (p > 1000 && v < 1.0) {
    return {
      label: $t('strain.insight.stress.title'),
      color: 'text-warning',
      icon: 'lucide:sun',
      advice: $t('strain.insight.stress.advice')
    }
  }

  return v < 0.8
    ? { label: $t('strain.insight.low.title'), color: 'text-info', icon: 'lucide:droplets', advice: $t('strain.insight.low.advice') }
    : v > 1.6
      ? { label: $t('strain.insight.high.title'), color: 'text-error', icon: 'lucide:thermometer-sun', advice: $t('strain.insight.high-advice') }
      : { label: $t('strain.insight.optimal.title'), color: 'text-success', icon: 'lucide:check', advice: $t('strain.insight.low.advice') }
})

const params = { temp: props.airTemp + '°C', humidity: props.humidity + '%', colevel: props.co2 + ' ppm', light: props.ppfd + ' µmol' }
</script>

<template>
  <div class="my-12 p-8 border border-muted rounded-xl overflow-hidden">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div class="flex items-center gap-4">
        <div :class="['p-4 rounded-3xl bg-opacity-10 transition-colors', insight.color.replace('text', 'bg')]">
          <Icon
            :name="insight.icon"
            :class="['size-8', insight.color]"
          />
        </div>
        <div>
          <h3 class="text-3xl uppercase tracking-tighter italic leading-none">
            {{ $t('strain.vpdtitle') }}
          </h3>
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
            {{ $t('strain.status.title') }}: {{ insight.label }} • {{ stage }}
          </p>
        </div>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-5xl  leading-none">
          {{ vpdValue }}
        </span>
        <span class="text-xs font-bold text-muted uppercase">
          kPa
        </span>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div class="lg:col-span-4 space-y-4">
        <h4 class="text-[10px] uppercase tracking-widest text-muted mb-4">
          {{ $t('strain.insight.params.title') }}
        </h4>
        <div
          v-for="(val, label) in params"
          :key="label"
          class="flex items-center justify-between p-4 rounded-2xl bg-muted/60 border border-muted"
        >
          <span class="text-xs font-bold text-muted uppercase tracking-tighter">
            {{ $t(`strain.insight.params.${label}`) }}
          </span>
          <span class="text-sm text-default">
            {{ val }}
          </span>
        </div>
      </div>
      <div class="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-xl bg-muted/50 border border-muted">
        <div class="relative w-40 h-40 flex items-center justify-center mb-6">
          <svg class="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              class="stroke-neutral"
              stroke-width="10"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              :class="insight.color.replace('text', 'stroke')"
              stroke-width="10"
              stroke-dasharray="440"
              :stroke-dashoffset="440 - (transpirationLoad / 100 * 440)"
              stroke-linecap="round"
              class="transition-all duration-1000"
            />
          </svg>
          <div class="text-center">
            <span class="block text-3xl leading-none">
              {{ Math.round(transpirationLoad) }}%
            </span>
            <span class="text-[9px] font-bold text-muted uppercase">
              {{ $t('strain.insight.vapo') }}
            </span>
          </div>
        </div>
        <p class="text-[10px] text-center font-bold text-muted uppercase leading-relaxed max-w-[150px]">
          {{ $t('strain.insight.metab.activity') }}
        </p>
      </div>
      <div class="lg:col-span-4 space-y-6">
        <div :class="['p-6 rounded-4xl border-2 transition-all', insight.color.replace('text', 'border')]">
          <h4 class="text-[11px] uppercase tracking-widest mb-3 opacity-60">
            {{ $t('strain.insight.metab.analysis') }}
          </h4>
          <p class="text-sm font-bold text-muted leading-relaxed italic">
            "{{ insight.advice }}"
          </p>
        </div>
        <div class="p-6 rounded-4xl">
          <div class="flex items-center gap-3 mb-4">
            <Icon
              name="lucide:lightbulb"
              class="size-5 opacity-60"
            />
            <span class="text-[10px] uppercase tracking-widest">
              {{ $t('strain.insight.opthint') }}
            </span>
          </div>
          <p class="text-xs font-bold opacity-80 leading-relaxed">
            {{ lightCycle === 'on' ? $t('strain.insight.lighton') : $t('strain.insight.lighton') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
