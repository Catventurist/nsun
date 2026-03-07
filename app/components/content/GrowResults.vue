<script setup lang="ts">
interface Metric {
  name: string
  value: number
  unit?: string
  limit?: string
}

interface SafetyItem {
  name: string
  value: string | number
  limit: string | number
  status: 'pass' | 'fail'
  unit?: string
}

interface Props {
  sampleName: string
  batchId?: string
  labName?: string
  date?: string
  totalThc?: number
  totalCbd?: number
  moisture?: number
  waterActivity?: number
  cannabinoids?: Metric[]
  terpenes?: Metric[]
  heavyMetals?: SafetyItem[]
  microbiology?: SafetyItem[]
  pesticidesPassed?: boolean
  coaLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  cannabinoids: () => [],
  terpenes: () => [],
  heavyMetals: () => [],
  microbiology: () => [],
  pesticidesPassed: true
})

const maxVal = computed(() => Math.max(...props.cannabinoids.map(c => c.value), 1))
</script>

<template>
  <div class="my-12 bg-default border border-muted rounded-4l overflow-hidden">
    <div class="p-8 bg-default/80 border-b border-muted">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="px-2 py-0.5 rounded bg-primary/20 text-default text-[10px] uppercase tracking-tighter">
              {{ $t('strain.analysis.official') }}
            </span>
            <span
              v-if="batchId"
              class="text-[10px] font-mono text-muted font-bold uppercase tracking-widest"
            >
              ID: {{ batchId }}
            </span>
          </div>
          <h3 class="text-3xl uppercase tracking-tighter leading-none mb-2">
            {{ sampleName }}
          </h3>
          <p class="text-xs text-muted font-bold uppercase tracking-widest italic">
            {{ labName }} • {{ $t('strain.analysis.done') }}: {{ date }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="(val, label) in { 'Total THC': totalThc, 'Total CBD': totalCbd, 'Moisture': moisture }"
            :key="label"
            class="px-5 py-3 bg-default p-4 border border-muted rounded-2xl shadow-sm shadow-primary text-center min-w-[100px]"
          >
            <span class="block text-[9px] text-muted uppercase tracking-widest mb-1">
              {{ label }}
            </span>
            <span :class="['text-xl', label.includes('THC') ? 'text-error' : 'text-primary']">
              {{ val }}{{ label === 'Moisture' ? '%' : '%' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="p-8 grid grid-cols-1 xl:grid-cols-3 gap-12">
      <div class="xl:col-span-1">
        <h4 class="text-xs uppercase tracking-widest text-muted mb-6 flex items-center gap-2">
          <Icon
            name="lucide:dna"
            class="size-4 text-primary"
          />
          {{ $t('strain.analysis.profile') }}
        </h4>
        <div class="space-y-4">
          <div
            v-for="item in cannabinoids"
            :key="item.name"
            class="group"
          >
            <div class="flex justify-between text-[11px] font-bold mb-1.5 uppercase tracking-tighter">
              <span class="text-muted">
                {{ item.name }}
              </span>
              <span class="text-default">
                {{ item.value }}{{ item.unit || '%' }}
              </span>
            </div>
            <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                class="h-full group-hover:bg-radial from-primary/20 transition-all duration-500"
                :style="{ width: `${(item.value / maxVal) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="xl:col-span-1 space-y-10">
        <div>
          <h4 class="text-xs uppercase tracking-widest text-muted mb-6 flex items-center gap-2">
            <Icon
              name="lucide:wind"
              class="size-4 text-success"
            />
            {{ $t('strain.analysis.terparo') }}
          </h4>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="terp in terpenes"
              :key="terp.name"
              class="p-2.5 rounded-xl border border-muted flex flex-col"
            >
              <span class="text-[10px] font-bold text-muted uppercase leading-none mb-1">
                {{ terp.name }}
              </span>
              <span class="text-sm text-default">
                {{ terp.value }}
                <p class="text-[9px] opacity-60">mg/g</p>
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="waterActivity"
          class="p-4 rounded-2xl bg-info/20 border border-muted"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon
                name="lucide:droplets"
                class="size-4 text-info"
              />
              <span class="text-xs uppercase tracking-widest text-info">
                {{ $t('strain.analysis.wateract') }}
              </span>
            </div>
            <span class="text-lg text-info">{{ waterActivity }} aw</span>
          </div>
        </div>
      </div>
      <div class="xl:col-span-1 space-y-8">
        <h4 class="text-xs uppercase tracking-widest text-muted mb-6 flex items-center gap-2">
          <Icon
            name="lucide:shield-alert"
            class="size-4 text-warning"
          />
          {{ $t('strain.analysis.wateract') }}
        </h4>
        <div class="space-y-2">
          <span class="text-[9px] text-muted uppercase tracking-widest block mb-2">
            Raskasmetallit (LOQ)
          </span>
          <div
            v-for="metal in heavyMetals"
            :key="metal.name"
            class="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-[10px]"
          >
            <span class="font-bold uppercase text-muted">
              {{ metal.name }}
            </span>
            <div class="flex items-center gap-3">
              <span class="font-mono">
                {{ metal.value }} / {{ metal.limit }} {{ metal.unit }}
              </span>
              <Icon
                :name="metal.status === 'pass' ? 'lucide:check-circle-2' : 'lucide:x-circle'"
                :class="metal.status === 'pass' ? 'text-success' : 'text-error'"
                class="size-3.5"
              />
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <span class="text-[9px] text-muted uppercase tracking-widest block mb-2">
            {{ $t('strain.analysis.micro') }}
          </span>
          <div
            v-for="micro in microbiology"
            :key="micro.name"
            class="flex items-center justify-between p-2 rounded-lg border border-muted text-[10px]"
          >
            <span class="font-bold uppercase text-muted">
              {{ micro.name }}
            </span>
            <div
              class="flex items-center gap-1.5"
              :class="micro.status === 'pass' ? 'text-success' : 'text-error'"
            >
              <span class="uppercase text-[9px]">{{ micro.status === 'pass' ? $t('strain.analysis.negative') : $t('strain.analysis.detected') }}</span>
              <Icon
                :name="micro.status === 'pass' ? 'lucide:check' : 'lucide:alert-triangle'"
                class="size-3.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-8 bg-muted/30 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="max-w-md text-sm text-muted leading-relaxed italic">
        <slot />
      </div>
      <div
        v-if="coaLink"
        class="shrink-0"
      >
        <NuxtLinkLocale
          :to="coaLink"
          class="flex items-center gap-3 px-6 py-3 bg-muted text-default rounded-2xl uppercase tracking-wide duration-300 hover:scale-105 transition-transform"
        >
          <Icon
            name="lucide:file-text"
            class="size-4"
          />
          {{ $t('strain.analysis.download') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
