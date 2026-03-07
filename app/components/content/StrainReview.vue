<script setup lang="ts">
interface SensoryDetail {
  description: string
  rating: number
  notes?: string[]
}

interface IntensityProfile {
  sweetness: number
  earthiness: number
  sourness: number
  gas: number
}

interface TherapeuticFocus {
  anxiety: number
  pain: number
  sleep: number
  focus: number
}

interface Props {
  productName: string
  brand?: string
  reviewDate?: string
  method?: string // esim. "Höyrystys", "Öljy", "Sublinguaalinen"
  trichomes?: string // esim.'Kirkkaat' | 'Samalliset' | 'Meripihka'
  pricePoint?: string // esim.'Edullinen' | 'Keskihinta' | 'Premium'
  overallScore: number
  appearance: SensoryDetail
  aroma: SensoryDetail
  taste: SensoryDetail
  effects: SensoryDetail
  intensity?: IntensityProfile
  benefits?: TherapeuticFocus
  pros?: string[]
  cons?: string[]
  recommend?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pros: () => [],
  cons: () => [],
  intensity: () => ({ sweetness: 0, earthiness: 5, sourness: 0, gas: 0 }),
  benefits: () => ({ anxiety: 0, pain: 0, sleep: 5, focus: 0 })
})

/* const getIntensityLabel = (val: number) => [$t('strain.intensity.no'), $t('strain.intensity.mild'), $t('strain.intensity.medium'), $t('strain.intensity.strong'), $t('strain.intensity.extreme')][val] || $t('strain.intensity.undefined')
const getTheraLabel = (key: number) => [$t('strain.thera.anxiety'), $t('strain.thera.pain'), $t('strain.thera.sleep'), $t('strain.thera.focus')][key] || $t('strain.thera.undefined')
 */
</script>

<template>
  <div class="my-12 bg-default/80 border border-muted rounded-[2.5rem] overflow-hidden">
    <div class="px-8 py-6 bg-muted/50 border-b border-muted">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center text-default text-2xl">
            {{ props.overallScore }}
          </div>
          <div>
            <h3 class="text-2xl text-default/80 uppercase tracking-tighter leading-none">
              {{ productName }}
            </h3>
            <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1 italic">
              {{ brand }} • {{ reviewDate }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <span
            v-if="method"
            class="px-3 py-1 rounded-full bg-default/80 border border-muted text-[10px] font-bold text-muted uppercase"
          >
            {{ method }}
          </span>
          <span
            v-if="trichomes"
            class="px-3 py-1 rounded-full bg-default/80 border border-muted text-[10px] font-bold text-muted uppercase"
          >
            {{ $t('strain.trichomes') }}: {{ trichomes }}
          </span>
          <span
            v-if="pricePoint"
            class="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-bold text-primary uppercase"
          >
            {{ pricePoint }}
          </span>
        </div>
      </div>
    </div>
    <div class="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div class="lg:col-span-8 space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="sense in [
              { label: $t('strain.sense.look'), data: appearance, icon: 'lucide:eye' },
              { label: $t('strain.sense.smell'), data: aroma, icon: 'lucide:wind' },
              { label: $t('strain.sense.taste'), data: taste, icon: 'lucide:utensils' },
              { label: $t('strain.sense.effect'), data: effects, icon: 'lucide:zap' }
            ]"
            :key="sense.label"
            class="group p-5 rounded-2xl bg-muted/30 border border-muted duration-300 hover:scale-110"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <Icon
                  :name="sense.icon"
                  class="size-4 text-primary"
                />
                <span class="text-[10px] uppercase tracking-widest text-muted">
                  {{ sense.label }}
                </span>
              </div>
              <div class="flex gap-0.5">
                <div
                  v-for="i in 5"
                  :key="i"
                  :class="['w-3 h-1 rounded-full', i <= sense.data.rating ? 'bg-primary/60' : 'bg-muted']"
                />
              </div>
            </div>
            <p class="text-sm font-medium text-muted leading-snug duration-300 group-hover:text-default">
              {{ sense.data.description }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 class="text-[10px] uppercase tracking-widest text-muted mb-4">
              {{ $t('strain.taste.title') }}
            </h4>
            <div class="space-y-3">
              <div
                v-for="(val, key) in intensity"
                :key="key"
                class="space-y-1"
              >
                <div class="flex justify-between text-[10px] font-bold uppercase text-muted">
                  <span>
                    {{ $t(`strain.taste.${key}`) }}
                  </span>
                  <span class="text-primary text-xs">
                    {{ val }}
                  </span>
                </div>
                <div class="h-1 w-full rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary/40"
                    :style="{ width: `${val * 25}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-[10px] uppercase tracking-widest text-muted mb-4">
              {{ $t('strain.thera.title') }}
            </h4>
            <div class="space-y-3">
              <div
                v-for="(val, key) in benefits"
                :key="key"
                class="space-y-1"
              >
                <div class="flex justify-between text-[10px] font-bold uppercase text-muted">
                  <span>
                    {{ $t(`strain.thera.${key}`) }}
                  </span>
                  <span class="text-primary text-xs">
                    {{ val }}/5
                  </span>
                </div>
                <div class="h-1 w-full rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary/40"
                    :style="{ width: `${val * 20}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4 space-y-8 flex flex-col justify-between">
        <div class="space-y-6">
          <div v-if="pros.length">
            <h4 class="text-sm uppercase tracking-widest text-success mb-3">
              {{ $t('strain.good') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="pro in pros"
                :key="pro"
                class="flex items-start gap-2 text-sm font-bold text-muted"
              >
                <Icon
                  name="lucide:plus-circle"
                  class="size-4 text-success shrink-0"
                />
                {{ pro }}
              </li>
            </ul>
          </div>
          <div v-if="cons.length">
            <h4 class="text-sm uppercase tracking-widest text-error mb-3">
              {{ $t('strain.bad') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="con in cons"
                :key="con"
                class="flex items-start gap-2 text-sm font-bold text-muted"
              >
                <Icon
                  name="lucide:minus-circle"
                  class="size-4 text-error shrink-0"
                />
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="recommend !== undefined"
          :class="['group p-6 rounded-3xl border-2 flex flex-col items-center gap-3 text-center transition-all', recommend ? 'border-success/40 bg-muted' : 'border-muted/30']"
        >
          <Icon
            :name="recommend ? 'lucide:thumbs-up' : 'lucide:thumbs-down'"
            :class="['size-8 duration-300 group-hover:scale-110', recommend ? 'text-success' : 'text-muted']"
          />
          <span class="text-xs uppercase tracking-widest duration-300 group-hover:text-primary">
            {{ recommend ? $t('strain.recommend') : $t('strain.recommendno') }}
          </span>
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
