<script setup lang="ts">
// Raskasmetallien biokertymiskertoimet (BCF - Bioconcentration Factor)
const BCF_FACTORS = {
  lead: 0.8, // Lyijy (Pb)
  cadmium: 3.5, // Kadmium (Cd)
  arsenic: 0.4, // Arseeni (As)
  mercury: 0.2 // Elohopea (Hg)
}

const soilPb = ref(150) // mg/kg
const soilCd = ref(5) // mg/kg
const areaHectares = ref(1)
const biomassYield = ref(12) // t/ha

const remediationStats = computed(() => {
  const annualReductionPb = (biomassYield.value * 1000 * (soilPb.value / 1000000) * BCF_FACTORS.lead)
  const annualReductionCd = (biomassYield.value * 1000 * (soilCd.value / 1000000) * BCF_FACTORS.cadmium)
  // EU-standardit: Pb < 100, Cd < 1.5
  const yearsToSafePb = Math.max(0, Math.ceil((soilPb.value - 100) / (annualReductionPb * 10)))
  const yearsToSafeCd = Math.max(0, Math.ceil((soilCd.value - 1.5) / (annualReductionCd * 100)))

  return {
    pbReduction: annualReductionPb.toFixed(3),
    cdReduction: annualReductionCd.toFixed(3),
    yearsPb: yearsToSafePb,
    yearsCd: yearsToSafeCd,
    totalBiomass: areaHectares.value * biomassYield.value
  }
})
</script>

<template>
  <div class="my-12 bg-default/80 border border-muted rounded-[3rem] soverflow-hidden">
    <div class="p-8 border-b border-muted bg-muted/60 flex items-center gap-4">
      <div class="p-3 rounded-2xl bg-success/20">
        <Icon
          name="lucide:sprout"
          class="size-6"
        />
      </div>
      <div>
        <h3 class="text-2xl  uppercase tracking-tighter italic leading-none">
          {{ $t('strain.clean.title') }}
        </h3>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
          {{ $t('strain.clean.description') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="p-8 space-y-6">
        <h4 class="text-[10px] uppercase tracking-widest text-muted mb-6 italic">
          {{ $t('strain.clean.original') }} (mg/kg)
        </h4>
        <div class="space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between text-xs uppercase">
              <span>{{ $t('strain.clean.lead') }} (Pb)</span>
              <span class="text-success">{{ soilPb }} mg/kg</span>
            </div>
            <USlider
              v-model="soilPb"
              :min="0"
              :max="500"
              class="w-full"
            />
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs uppercase">
              <span>{{ $t('strain.clean.cadmium') }} (Cd)</span>
              <span class="text-success">{{ soilCd }} mg/kg</span>
            </div>
            <USlider
              v-model="soilCd"
              :min="0"
              :max="50"
              :step="0.5"
              class="w-full"
            />
          </div>
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-muted">
            <div class="space-y-2">
              <UFormField class="text-[9px] uppercase text-muted">
                {{ $t('strain.clean.area') }} (ha)
                <UInputNumber v-model="areaHectares" />
              </UFormField>
            </div>
            <div class="space-y-2">
              <UFormField class="text-[9px] uppercase text-muted">
                {{ $t('strain.clean.mass') }} (t/ha)
                <UInputNumber v-model="biomassYield" />
              </UFormField>
            </div>
          </div>
        </div>
      </div>
      <div class="p-8 bg-muted/20 flex flex-col justify-between">
        <div>
          <h4 class="text-[10px] uppercase tracking-widest text-muted mb-8 italic">
            {{ $t('strain.clean.season') }}
          </h4>
          <div class="space-y-4 mb-10">
            <div class="flex items-center justify-between p-5 rounded-3xl bg-default/80 border border-muted shadow-sm shadow-primary">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl bg-muted/30 text-success">
                  <Icon
                    name="lucide:arrow-down-to-dot"
                    class="size-5"
                  />
                </div>
                <div>
                  <span class="text-[10px] text-muted uppercase">
                    {{ $t('strain.clean.removed') }} {{ $t('strain.clean.lead') }}
                  </span>
                  <p class="text-xl">
                    {{ remediationStats.pbReduction }} kg/ha
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-success uppercase">
                  {{ $t('strain.clean.goal') }}: {{ remediationStats.yearsPb }} v.
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between p-5 rounded-3xl border border-muted shadow-sm shadow-primary">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl bg-muted/30 text-success">
                  <Icon
                    name="lucide:arrow-down-to-dot"
                    class="size-5"
                  />
                </div>
                <div>
                  <span class="text-[10px] text-muted uppercase">
                    {{ $t('strain.clean.removed') }} {{ $t('strain.clean.cadmium') }}
                  </span>
                  <p class="text-xl">
                    {{ remediationStats.cdReduction }} kg/ha
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-success uppercase">
                  Tavoite: {{ remediationStats.yearsCd }} v.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 rounded-2xl bg-muted shadow-md shadow-success/20 relative overflow-hidden">
          <Icon
            name="lucide:info"
            class="absolute -right-2 -top-2 size-16 opacity-10"
          />
          <h5 class="text-[10px] uppercase tracking-widest opacity-60 mb-2">
            {{ $t('strain.clean.note.title') }}
          </h5>
          <p class="text-xs font-bold leading-relaxed relative z-10">
            {{ areaHectares }} {{ $t('strain.clean.note.hect') }} {{ remediationStats.totalBiomass }} {{ $t('strain.clean.note.tons') }}
            {{ $t('strain.clean.note.result') }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="p-8 bg-muted/30 border-t border-muted"
    >
      <div class="prose prose-sm dark:prose-invert max-w-none italic text-muted">
        <slot />
      </div>
    </div>
  </div>
</template>
