<script setup lang="ts">
const airTemp = ref(25)
const humidity = ref(60)
const leafOffset = ref(-2)
const ppfd = ref(800)
const lightHours = ref(18)
const ecValue = ref(1.5)

// (kPa)
const vpd = computed(() => {
  const leafTemp = airTemp.value + leafOffset.value
  const svpLeaf = 0.61078 * Math.exp((17.27 * leafTemp) / (leafTemp + 237.3))
  const svpAir = 0.61078 * Math.exp((17.27 * airTemp.value) / (airTemp.value + 237.3))
  const avpAir = svpAir * (humidity.value / 100)
  return Math.max(0, parseFloat((svpLeaf - avpAir).toFixed(2)))
})

// Daily Light Integral - mol/m²/d
const dli = computed(() => {
  const result = (ppfd.value * 3600 * lightHours.value) / 1000000
  return parseFloat(result.toFixed(2))
})

const ppm = computed(() => Math.round(ecValue.value * 500))

const getDliStatus = (val: number) => {
  if (val < 20) return { label: 'Matala', color: 'text-amber-500' }
  if (val <= 45) return { label: 'Optimaalinen', color: 'text-emerald-500' }
  return { label: 'Korkea (CO2 suositeltu)', color: 'text-red-500' }
}
</script>

<template>
  <div class="my-12 bg-default/80 border border-muted/40 rounded-[2.5rem] overflow-hidden">
    <div class="p-8 border-b border-muted bg-muted/60 flex items-center gap-4">
      <div class="p-3 rounded-2xl bg-default">
        <Icon
          name="lucide:calculator"
          class="size-6 text-primary"
        />
      </div>
      <div>
        <h3 class="text-2xl uppercase tracking-tighter italic leading-none">
          {{ $t('strain.counter.title') }}
        </h3>
        <p class="text-sm font-bold text-muted uppercase tracking-widest mt-1">
          {{ $t('strain.counter.description') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="p-8 space-y-6">
        <h4 class="text-sm uppercase tracking-widest mb-6">
          {{ $t('strain.counter.addval') }}
        </h4>
        <div class="flex flex-col justify-around gap-6">
          <UFormField
            :label="$t('strain.insight.params.temp') + ' (°C)'"
            class="max-w-40"
          >
            <USlider
              v-model="airTemp"
              tooltip
              type="range"
              :min="15"
              :max="35"
            />
          </UFormField>
          <UFormField :label="$t('strain.insight.params.humidity') + ' (%)'">
            <USlider
              v-model="humidity"
              tooltip
              type="range"
              :min="20"
              :max="90"
            />
          </UFormField>
          <UFormField :label="$t('strain.insight.params.light') + ' (PPFD)'">
            <UInputNumber v-model="ppfd" />
          </UFormField>
          <UFormField :label="$t('strain.insight.params.lighth') + ' (h)'">
            <UInputNumber
              v-model="lightHours"
              :min="0"
              :max="24"
            />
          </UFormField>
          <UFormField :label="$t('strain.insight.params.nutrients') + ' (EC)'">
            <UInputNumber
              v-model="ecValue"
              :step="0.1"
            />
          </UFormField>
        </div>
      </div>
      <div class="p-8 bg-muted/20 space-y-8">
        <h4 class="text-sm uppercase tracking-widest mb-6 italic">
          {{ $t('strain.counter.results') }}
        </h4>
        <div class="grid grid-cols-1 gap-4">
          <div class="p-6 rounded-3xl bg-default/80 border border-muted shadow-sm shadow-primary flex items-center justify-between duration-300 hover:scale-110">
            <div>
              <span class="text-[10px] font-bold text-muted uppercase block mb-1">
                {{ $t('strain.insight.params.vpd') + ' (VPD)' }}
              </span>
              <span class="text-3xl text-primary">
                {{ vpd }}
                <small class="text-xs opacity-80">
                  kPa
                </small>
              </span>
            </div>
            <Icon
              :name="vpd > 1.2 ? 'lucide:wind' : 'lucide:droplets'"
              class="size-8 text-primary opacity-20"
            />
          </div>
          <div class="p-6 rounded-3xl bg-default/80 border border-muted shadow-sm shadow-primary flex items-center justify-between duration-300 hover:scale-110">
            <div>
              <span class="text-[10px] font-bold text-muted uppercase block mb-1">
                {{ $t('strain.insight.params.lightcol') + ' (DLI)' }}
              </span>
              <span class="text-3xl text-primary">
                {{ dli }}
                <small class="text-xs opacity-80">
                  mol/m²/d
                </small>
              </span>
              <div :class="['text-[10px] mt-1 uppercase', getDliStatus(dli).color]">
                {{ $t('strain.status.title') }}: {{ getDliStatus(dli).label }}
              </div>
            </div>
            <Icon
              name="lucide:sun"
              class="size-8 text-warning opacity-20"
            />
          </div>
          <div class="p-6 rounded-3xl bg-default/80 border border-muted shadow-sm shadow-primary flex items-center justify-between duration-300 hover:scale-110">
            <div>
              <span class="text-[10px] font-bold text-muted uppercase block mb-1">
                {{ $t('strain.insight.params.nutrientcon') + ' (PPM)' }}
              </span>
              <span class="text-3xl text-success">
                {{ ppm }}
                <small class="text-xs opacity-80">
                  ppm
                </small>
              </span>
              <span class="text-[9px] block text-muted font-bold uppercase mt-1">
                {{ $t('strain.counter.scale') }}: 500 (TDS/NaCl)
              </span>
            </div>
            <Icon
              name="lucide:zap"
              class="size-8 text-success opacity-20"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
