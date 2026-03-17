<script setup lang="ts">
const temp = ref(110) // C
const time = ref(40) // Min
const initialAcid = ref(150) // mg/g

const Ea = 95000 // Aktivointienergia (J/mol)
const R = 8.314 // Kaasuvakio (J/mol*K)
const A = 2.5e10 // Esieksponentiaalinen kerroin (s^-1)

const stats = computed(() => {
  const T_kelvin = temp.value + 273.15
  const time_seconds = time.value * 60
  // Nopeusvakio k (Arrhenius)
  const k = A * Math.exp(-Ea / (R * T_kelvin))
  const remainingAcid = Math.max(0, Math.exp(-k * time_seconds))
  const conversion = 1 - remainingAcid
  const activeMg = initialAcid.value * conversion
  const degradationRisk = temp.value > 135 || time.value > 90
  return {
    conversionPercent: (conversion * 100).toFixed(1),
    activeMg: activeMg.toFixed(1),
    remainingAcidMg: (initialAcid.value - activeMg).toFixed(1),
    degradationRisk
  }
})

const terpeneAnalysis = computed(() => {
  if (temp.value < 100) return { status: 'Säilyy hyvin', color: 'text-success', icon: 'lucide:leaf' }
  if (temp.value <= 125) return { status: 'Kohtalainen hävikki', color: 'text-warning', icon: 'lucide:wind' }
  return { status: 'Kriittinen hävikki', color: 'text-error', icon: 'lucide:flame' }
})
</script>

<template>
  <div class="my-12 border border-muted rounded-[3rem]overflow-hidden">
    <div class="p-8 border-b border-muted bg-muted/60 flex items-center gap-4">
      <div class="p-3 rounded-2xl bg-muted">
        <Icon
          name="lucide:thermometer-sun"
          class="size-6"
        />
      </div>
      <div>
        <h3 class="text-2xl uppercase tracking-tighter italic leading-none">
          {{ $t('strain.decarb.title') }}
        </h3>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
          {{ $t('strain.decarb.description') }}: CBDa ➔ CBD + CO₂
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="p-8 space-y-8">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <p
              id="temp"
              class="text-[10px] uppercase tracking-widest"
            >
              {{ $t('strain.insight.params.temp') }}
            </p>
            <span class="text-lg">
              {{ temp }}°C
            </span>
          </div>
          <USlider
            v-model="temp"
            tooltip
            :min="80"
            :max="160"
            :step="1"
            class="w-full"
          />
          <div class="flex justify-between text-[9px] font-bold text-muted uppercase">
            <span>{{ $t('strain.decarb.slow') }} (80°C)</span>
            <span>{{ $t('strain.decarb.rapid') }} (160°C)</span>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <p class="text-[10px] uppercase tracking-widest">
              {{ $t('strain.decarb.time') }}
            </p>
            <span class="text-lg">
              {{ time }} min
            </span>
          </div>
          <USlider
            v-model="time"
            tooltip
            :min="5"
            :max="120"
            :step="1"
            class="w-full"
          />
          <div class="flex justify-between text-[9px] font-bold text-muted uppercase">
            <span>{{ $t('strain.decarb.rapid') }} (5 min)</span>
            <span>{{ $t('strain.decarb.long') }} (120 min)</span>
          </div>
        </div>
        <div class="p-4 rounded-2xl bg-default border border-muted">
          <p class="text-[9px] uppercase tracking-widest text-muted block mb-2">
            {{ $t('strain.decarb.oxide') }} (mg/g)
          </p>
          <UInputNumber
            id="acid"
            v-model="initialAcid"
          />
        </div>
      </div>
      <div class="p-8 bg-default/20 space-y-6">
        <div class="relative h-4 w-full rounded-full overflow-hidden">
          <div
            class="h-full bg-primary/60 transition-all duration-700"
            :style="{ width: `${stats.conversionPercent}%` }"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-5 rounded-3xl border border-muted shadow-sm">
            <span class="text-[9px] text-muted uppercase block mb-1">
              {{ $t('strain.decarb.conversion') }}
            </span>
            <span class="text-3xl text-muted">
              {{ stats.conversionPercent }}%
            </span>
          </div>
          <div class="p-5 rounded-3xl border border-muted shadow-sm">
            <span class="text-[9px] text-muted uppercase block mb-1">
              {{ $t('strain.decarb.active') }} CBD
            </span>
            <span class="text-3xl">
              {{ stats.activeMg }}
              <small class="text-xs opacity-40">
                mg
              </small>
            </span>
          </div>
        </div>
        <div class="space-y-3">
          <div :class="['flex items-center gap-3 p-4 rounded-2xl border transition-all', terpeneAnalysis.color.replace('text', 'border')]">
            <Icon
              :name="terpeneAnalysis.icon"
              class="size-5"
            />
            <div class="flex-1">
              <span class="text-xs uppercase opacity-60">
                {{ $t('strain.decarb.terpene') }}
              </span>
              <p class="text-xs font-bold">
                {{ terpeneAnalysis.status }}
              </p>
            </div>
          </div>
          <div
            v-if="stats.degradationRisk"
            class="flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-error/40 text-error"
          >
            <Icon
              name="lucide:alert-triangle"
              class="size-5"
            />
            <div class="flex-1">
              <span class="text-xs uppercase opacity-80">
                {{ $t('strain.decarb.risk.title') }}
              </span>
              <p class="text-xs font-bold">
                {{ $t('strain.decarb.risk.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="p-8 bg-muted/80 text-sm font-medium leading-relaxed italic"
    >
      <slot />
    </div>
  </div>
</template>
