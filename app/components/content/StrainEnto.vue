<script setup lang="ts">
interface Ingredient {
  name: string
  value: number // pitoisuus % tai mg/g
  type: 'cannabinoid' | 'terpene'
}

interface Props {
  title?: string
  ingredients?: Ingredient[]
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Entourage-synergia-analyysi',
  ingredients: () => [],
  target: 'CBD'
})
const synergyRules = [
  {
    source: 'Myrcene', target: 'CBD',
    effect: 'Läpäisevyys',
    desc: 'Lisää solukalvojen ja veri-aivoesteen läpäisevyyttä, tehostaen CBD:n imeytymistä.',
    icon: 'lucide:zap'
  },
  {
    source: 'Caryophyllene', target: 'CBD',
    effect: 'Inflammaatio-synergia',
    desc: 'Molemmat sitoutuvat CB2-reseptoreihin, voimistaen anti-inflammatorista vaikutusta.',
    icon: 'lucide:shield-plus'
  },
  {
    source: 'Limonene', target: 'CBD',
    effect: 'Serotoniini-modulaatio',
    desc: 'Tehostaa 5-HT1A-reseptoriaktiivisuutta, parantaen anksiolyyttisiä (ahdistusta poistavia) vaikutuksia.',
    icon: 'lucide:smile'
  },
  {
    source: 'Pinene', target: 'THC',
    effect: 'Kognitiivinen suoja',
    desc: 'Estää asetyylikoliiniesteraasia, mikä voi vähentää THC:n aiheuttamia muistihäiriöitä.',
    icon: 'lucide:brain'
  },
  {
    source: 'Linalool', target: 'CBD',
    effect: 'Sedatiivinen tehostus',
    desc: 'Toimii synergistisesti GABA-järjestelmän kautta, syventäen rentouttavaa vaikutusta.',
    icon: 'lucide:moon'
  }
]

const activeSynergies = computed(() => {
  const presentNames = props.ingredients.map(i => i.name.toLowerCase())
  return synergyRules.filter((rule) => {
    const sourcePresent = presentNames.includes(rule.source.toLowerCase())
    const targetPresent = presentNames.includes(rule.target.toLowerCase())

    return sourcePresent && targetPresent
  })
})

const getIngredientColor = (type: string) =>
  type === 'cannabinoid' ? 'text-primary bg-primary/20' : 'text-info bg-info/20'
</script>

<template>
  <div class="my-12 p-8 bg-default border border-muted rounded-md relative overflow-hidden">
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-10">
        <div class="p-3 rounded-2xl bg-primary-600 text-default shadow-lg shadow-primary/20">
          <Icon
            name="lucide:combine"
            class="size-6"
          />
        </div>
        <div>
          <h2 class="text-2xl text-default uppercase tracking-tighter italic leading-none">
            {{ title }}
          </h2>
          <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
            {{ $t('strain.entour') }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-5 space-y-4">
          <h4 class="text-[10px] uppercase tracking-widest text-muted mb-4">
            {{ $t('strain.analyzed') }}
          </h4>
          <div
            v-for="item in ingredients"
            :key="item.name"
            class="flex items-center justify-between p-4 rounded-2xl border border-muted bg-muted/60 duration-300 hover:scale-110"
          >
            <div class="flex items-center gap-3">
              <div :class="['p-2 rounded-lg font-mono text-[10px] font-bold', getIngredientColor(item.type)]">
                {{ item.type.substring(0, 4).toUpperCase() }}
              </div>
              <span class="font-bold text-muted">
                {{ item.name }}
              </span>
            </div>
            <span class="font-mono text-primary">
              {{ item.value }}%
            </span>
          </div>
        </div>
        <div class="lg:col-span-7">
          <h4 class="text-[10px] uppercase tracking-widest text-muted mb-6">
            {{ $t('strain.synergyf') }}
          </h4>
          <div
            v-if="activeSynergies.length > 0"
            class="space-y-6"
          >
            <div
              v-for="synergy in activeSynergies"
              :key="synergy.effect"
              class="relative p-6 rounded-3xl border-2 border-muted bg-muted/80 duration-300 hover:bg-radial from-primary/20"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-2xl bg-default shadow-sm shadow-primary text-primary">
                  <Icon
                    :name="synergy.icon"
                    class="size-6"
                  />
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs text-primary uppercase">
                      {{ synergy.source }}
                    </span>
                    <Icon
                      name="lucide:chevrons-right"
                      class="size-3 text-muted"
                    />
                    <span class="text-xs text-default uppercase">
                      {{ synergy.target }}
                    </span>
                  </div>
                  <h5 class="text-default uppercase tracking-tight mb-2">
                    {{ synergy.effect }}
                  </h5>
                  <p class="text-sm text-muted leading-relaxed">
                    {{ synergy.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-3xl text-center"
          >
            <Icon
              name="lucide:flask-conical-off"
              class="size-12 text-muted mb-4"
            />
            <p class="text-sm font-bold text-muted uppercase">
              Ei merkittäviä synergioita tunnistettu tästä profiilista.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="mt-12 pt-8 border-t border-muted text-sm text-muted italic"
    >
      <slot />
    </div>
  </div>
</template>
