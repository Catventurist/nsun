<script setup lang="ts">
import { UBadge, UButton } from '#components'
import { ref, computed } from 'vue'

interface Strain {
  name: string
  type: 'Sativa' | 'Indica' | 'Hybrid'
  thc: string
  cbd: string
  cbg?: string
  cbn?: string
  parentage?: string
  floweringTime?: string
  yield?: 'low' | 'medium' | 'high'
  aroma?: string[]
  coaUrl?: string
  difficulty?: 'easy' | 'moderate' | 'expert'
  description: string
  terpenes: string[]
  effects: string[]
  limit: number
}

const props = defineProps<{
  title?: string
  strains: Strain[]
}>()

const activeIndex = ref(0)
const selectedStrain = computed(() => props.strains[activeIndex.value])
const limit = ref(0.3)
const isLegal = (thcStr: string) => {
  const val = parseFloat(thcStr.replace('%', '').replace(',', '.'))
  return val <= 0.3
}
</script>

<template>
  <div class="my-10 border border-muted rounded-2xl overflow-hidden">
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/4  p-4 border-b lg:border-b-0 lg:border-r border-muted/60">
        <div class="flex flex-col gap-2">
          <button
            v-for="(strain, index) in strains"
            :key="strain.name"
            :class="[
              'text-left px-4 py-3 rounded-lg transition-all duration-300 border',
              activeIndex === index
                ? 'bg-success/40 border-success/40 shadow-md shadow-success'
                : 'bg-default/80 text-muted border-muted hover:border-primary'
            ]"
            @click="activeIndex = index"
          >
            <span class="block font-bold">
              {{ strain.name }}
            </span>
            <span class="block text-[10px] uppercase tracking-tighter opacity-70">
              {{ strain.type }} • CBD {{ strain.cbd }}
            </span>
          </button>
        </div>
      </div>
      <div v-if="selectedStrain" class="flex-1 p-6 md:p-10">
        <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h3 class="text-4xl text-info">
              {{ selectedStrain.name }}
            </h3>
            <p v-if="selectedStrain.parentage" class="text-sm text-success font-medium mt-1">
              {{ $t('strain.genetics') }}: {{ selectedStrain.parentage }}
            </p>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div
              :class="[
                'px-3 py-1 text-sm flex items-center rounded-xl border',
                isLegal(selectedStrain.thc) ? 'bg-success/20 text-success border-success' : 'bg-error/20 text-error border-error'
              ]"
            >
              THC: {{ selectedStrain.thc }}
              <UTooltip :text="($t('strain.legall') + ' < ' + limit + '%')">
                <UButton icon="lucide-info" variant="soft" class="rounded-full" size="sm" color="info" />
              </UTooltip>
            </div>
            <UButton v-if="selectedStrain.coaUrl" :to="selectedStrain.coaUrl" :label="$t('strain.results')" variant="subtle" />
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted/30 rounded-xl">
          <div class="text-center border-r border-muted">
            <span class="block text-[10px] text-muted uppercase font-bold">
              CBD {{ $t('strain.content') }}
            </span>
            <span class="text-lg font-mono text-success">
              {{ selectedStrain.cbd }}
            </span>
          </div>
          <div class="text-center border-r border-muted">
            <span class="block text-[10px] text-muted uppercase font-bold">
              CBG {{ $t('strain.content') }}
            </span>
            <span class="text-lg font-mono text-info">
              {{ selectedStrain.cbg || $t('strain.none') }}
            </span>
          </div>
          <div class="text-center border-r border-muted">
            <span class="block text-[10px] text-muted uppercase font-bold">
              {{ $t('strain.flowering') }}
            </span>
            <span class="text-lg font-bold text-muted">
              {{ selectedStrain.floweringTime || '--' }}
            </span>
          </div>
          <div class="text-center">
            <span class="block text-[10px] text-muted uppercase font-bold">
              {{ $t('strain.yield') }}
            </span>
            <span class="text-lg font-bold text-muted mb-10">
              {{ selectedStrain.yield || '--' }}
            </span>
          </div>
        </div>
        <p class="text-lg leading-relaxed">
          {{ selectedStrain.description }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-muted">
          <div class="max-w-none">
            <div v-if="selectedStrain.aroma" class="flex flex-col">
              <h4 class="text-xs text-muted uppercase tracking-wide mb-4">
                {{ $t('strain.aroma') }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <UBadge v-for="a in selectedStrain.aroma" :key="a" :label="a" variant="soft" />
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-xs text-muted uppercase tracking-widest mb-4">
              {{ $t('strain.terpenea') }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="t in selectedStrain.terpenes" :key="t" :label="t" variant="outline" />
            </div>
          </div>
          <div>
            <h4 class="text-xs uppercase text-muted tracking-wide mb-4">
              {{ $t('strain.difficultyc') }}
            </h4>
            <span
              :class="[
                'px-4 py-2 rounded text-xs uppercase',
                selectedStrain.difficulty === 'easy' ? 'bg-success/20 text-success'
                : selectedStrain.difficulty === 'moderate' ? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
              ]">
              {{ selectedStrain.difficulty || $t('strain.norate') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
