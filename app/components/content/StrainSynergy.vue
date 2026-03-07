<script setup lang="ts">
const nutrients = ref([
  { id: 'N', name: 'Typpi', val: 5, icon: 'lucide:leaf' },
  { id: 'P', name: 'Fosfori', val: 5, icon: 'lucide:test-tube' },
  { id: 'K', name: 'Kalium', val: 5, icon: 'lucide:zap' },
  { id: 'Ca', name: 'Kalsium', val: 5, icon: 'lucide:gem' },
  { id: 'Mg', name: 'Magnesium', val: 5, icon: 'lucide:sun' },
  { id: 'Fe', name: 'Rauta', val: 5, icon: 'lucide:magnet' },
  { id: 'Mn', name: 'Mangaani', val: 5, icon: 'lucide:microscope' }
])

/* const updateVal = (id: string, newVal: number) => {
  const n = nutrients.value.find(i => i.id === id)
  if (n) n.val = newVal
} */

const issues = computed(() => {
  const results: { type: 'alert' | 'warning' | 'info', title: string, desc: string, icon: string }[] = []
  const getVal = (id: string) => nutrients.value.find(n => n.id === id)?.val || 5

  const N = getVal('N'), P = getVal('P'), K = getVal('K'), Ca = getVal('Ca'), Mg = getVal('Mg'), Fe = getVal('Fe'), Mn = getVal('Mn')

  // 1. Kalsiumin (Ca) vaikutukset
  if (Ca > 7) {
    if (K < 6) results.push({ type: 'alert', title: 'Kaliumin (K) Lukkiutuminen', desc: 'Korkea kalsiumpitoisuus estää kaliumin imeytymistä. Riski hidastuneeseen kasvuun ja heikkoihin varsiin.', icon: 'lucide:zap-off' })
    if (Mg < 6) results.push({ type: 'warning', title: 'Magnesiumin (Mg) Puutosriski', desc: 'Liiallinen kalsium syrjäyttää magnesiumia. Tarkkaile lehtien välistä kloroosia.', icon: 'lucide:sun-medium' })
    if (P > 7) results.push({ type: 'info', title: 'Kalsiumfosfaatin Muodostuminen', desc: 'Korkeat Ca ja P tasot voivat reagoida muodostaen kalsiumfosfaattia, jota kasvi ei pysty hyödyntämään.', icon: 'lucide:box' })
  }

  // 2. Typen (N) vaikutukset
  if (N > 8) {
    results.push({ type: 'alert', title: 'Typpitoksisuus', desc: 'Korkea typpi lisää soluseinien venymistä ja vesipitoisuutta, mikä houkuttelee tuholaisia.', icon: 'lucide:bug' })
    if (K < 5) results.push({ type: 'warning', title: 'N/K Epätasapaino', desc: 'Suuri typen määrä suhteessa kaliumiin heikentää solurakennetta ja altistaa taudeille.', icon: 'lucide:shield-off' })
  }

  // 3. Kaliumin (K) vaikutukset
  if (K > 8) {
    if (Mg < 5) results.push({ type: 'alert', title: 'Magnesiumin Antagonismi', desc: 'Liiallinen kalium on yleisin syy magnesiumin puutteeseen. Kasvi ei pysty ottamaan Mg:tä vaikka sitä olisi maaperässä.', icon: 'lucide:ban' })
    if (Ca < 5) results.push({ type: 'warning', title: 'Kalsiumin Syrjäytyminen', desc: 'Korkea kalium voi häiritä kalsiumin kulkeutumista, mikä johtaa kasvupisteiden kuolemaan.', icon: 'lucide:skull' })
  }

  // 4. Hivenaineiden (Fe, Mn) suhde
  if (Mn > 7 && Fe < 6) {
    results.push({ type: 'warning', title: 'Raudan Lukkiutuminen', desc: 'Liiallinen mangaani kilpailee samoista kuljetusreiteistä raudan kanssa. Lehdet voivat kellastua (Fe-puutos).', icon: 'lucide:alert-circle' })
  }

  return results
})
</script>

<template>
  <div class="my-12 border border-muted rounded-[2.5rem] overflow-hidden">
    <div class="p-8 border-b border-muted bg-muted/50 flex items-center gap-4">
      <div class="p-3 rounded-2xl bg-muted">
        <Icon
          name="lucide:flask-conical"
          class="size-6 text-primary"
        />
      </div>
      <div>
        <h3 class="text-2xl uppercase tracking-tighter italic leading-none">
          Nutrient Antagonism Mapper
        </h3>
        <p class="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
          Hampun ravinteiden väliset vuorovaikutukset (Mulderin kaavio)
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="p-8 space-y-6">
        <h4 class="text-[10px] uppercase tracking-widest text-muted mb-6">
          Syötä pitoisuudet (1-10)
        </h4>
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="n in nutrients"
            :key="n.id"
            class="space-y-2 group"
          >
            <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted">
              <div class="flex items-center gap-2">
                <Icon
                  :name="n.icon"
                  class="size-4 text-primary"
                />
                <span>
                  {{ n.name }} ({{ n.id }})
                </span>
              </div>
              <span class="text-primary text-xs">
                <MCountUp
                  :max="n.val"
                  :min="0"
                />
                /10
              </span>
            </div>
            <USlider
              v-model="n.val"
              tooltip
              type="range"
              :min="1"
              :max="10"
              :step="0.5"
            />
          </div>
        </div>
      </div>
      <div class="p-8 bg-muted/20">
        <h4 class="text-[10px] uppercase tracking-widest text-muted mb-8 italic">
          Diagnostinen analyysi
        </h4>
        <div
          v-if="issues.length > 0"
          class="space-y-4"
        >
          <div
            v-for="issue in issues"
            :key="issue.title"
            :class="['p-5 rounded-3xl border',
                     issue.type === 'alert' ? 'bg-error/20 border-error/60'
                     : issue.type === 'warning' ? 'bg-warning/20 border-warning/60'
                       :'bg-info/20 border-info/60']"
          >
            <div class="flex items-start gap-4">
              <div :class="['p-3 rounded-2xl', issue.type === 'alert' ? 'text-error' : issue.type === 'warning' ? 'text-warning' : 'text-info']">
                <Icon
                  :name="issue.icon"
                  class="size-6"
                />
              </div>
              <div>
                <span
                  :class="['text-[9px] uppercase px-2 py-0.5 rounded-full border mb-2 inline-block',
                           issue.type === 'alert' ? 'border-error/60 text-error'
                           : issue.type === 'warning' ? 'border-warning/60 text-warning' : 'border-info text-info/60']"
                >
                  {{ $t(`strain.status.${issue.type}`) }}
                </span>
                <h5 class="uppercase tracking-tight leading-none mb-2">
                  {{ issue.title }}
                </h5>
                <p class="text-xs text-muted leading-relaxed font-medium italic">
                  {{ issue.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-[2.5rem]"
        >
          <Icon
            name="lucide:check-circle-2"
            class="size-12 text-success mb-4"
          />
          <h5 class="text-sm uppercase mb-2 tracking-tighter">
            Ravinneprofiili Tasapainossa
          </h5>
          <p class="text-xs text-muted font-medium">
            Nykyisillä tasoilla ei havaita merkittävää antagonismin riskiä. Imeytyminen on optimaalista.
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="p-8 bg-muted/60 text-sm italic font-medium"
    >
      <slot />
    </div>
  </div>
</template>
