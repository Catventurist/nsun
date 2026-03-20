<script setup lang="ts">
type SectorId = 'love' | 'skill' | 'need' | 'value'

interface IkigaiSector {
  id: SectorId
  title: string
  description: string
  icon: string
  color: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined
}

interface Props {
  title?: string
  sectors?: IkigaiSector[]
  showIcons?: boolean
  showMissingStateIcons?: boolean
  isEditable?: boolean
  minCharCount?: number
  accentColor?: string
  emptyStateText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Your Journey',
  showIcons: true,
  showMissingStateIcons: true,
  isEditable: true,
  minCharCount: 8,
  accentColor: 'primary',
  emptyStateText: 'Awaiting your definition...',
  sectors: () => [
    { id: 'love', title: 'Passion', description: 'What you love doing', icon: 'i-lucide-heart', color: 'error' },
    { id: 'skill', title: 'Mastery', description: 'What you excel at', icon: 'i-lucide-brain-circuit', color: 'warning' },
    { id: 'need', title: 'Mission', description: 'What the world requires', icon: 'i-lucide-earth', color: 'info' },
    { id: 'value', title: 'Economy', description: 'What you are paid for', icon: 'i-lucide-coins', color: 'success' }
  ]
})

const userInputs = ref<Record<SectorId, string>>({
  love: '',
  skill: '',
  need: '',
  value: ''
})

const activeId = ref<SectorId>('love')
const primaryIntersections = computed(() => {
  const { love, skill, need, value } = userInputs.value
  return [
    { label: 'Passion', active: love && skill, desc: 'Love + Skill', icon: 'i-lucide-flame' },
    { label: 'Mission', active: love && need, desc: 'Love + Need', icon: 'i-lucide-flag' },
    { label: 'Vocation', active: need && value, desc: 'Need + Value', icon: 'i-lucide-graduation-cap' },
    { label: 'Profession', active: skill && value, desc: 'Skill + Value', icon: 'i-lucide-trending-up' }
  ]
})

const advancedStates = computed(() => {
  const { love, skill, need, value } = userInputs.value
  return [
    {
      label: 'Satisfaction',
      active: skill && need && value && !love,
      missing: 'Passion',
      icon: 'i-lucide-smile-plus',
      message: 'Comfortable, but feeling of emptiness.'
    },
    {
      label: 'Excitement',
      active: love && skill && value && !need,
      missing: 'Mission',
      icon: 'i-lucide-rocket',
      message: 'Successful, but sense of uncertainty.'
    },
    {
      label: 'Delight',
      active: love && skill && need && !value,
      missing: 'Vocation',
      icon: 'i-lucide-sun',
      message: 'Fullness, but no financial security.'
    },
    {
      label: 'Flow',
      active: love && need && value && !skill,
      missing: 'Mastery',
      icon: 'i-lucide-wind',
      message: 'Complacency, but lacking technical depth.'
    }
  ]
})

const isIkigaiReached = computed(() => {
  return Object.values(userInputs.value).every(val => val.length >= props.minCharCount)
})

const activeSector = computed(() => props.sectors.find(s => s.id === activeId.value) || props.sectors[0])
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 lg:p-10 space-y-12">
    <div class="grid lg:grid-cols-12 gap-8 items-stretch">
      <div class="lg:col-span-4 flex flex-col gap-3">
        <div
          v-for="sector in sectors"
          :key="sector.id"
          class="group p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-center gap-4 duration-300 hover:scale-110 active:scale-90"
          :class="[
            activeId === sector.id ? `border-${sector.color}/40 bg-${sector.color}/20` : 'border-muted opacity-60'
          ]"
          @click="activeId = sector.id"
        >
          <div :class="[`p-2 rounded-lg bg-${sector.color}/20 text-${sector.color}`]">
            <UIcon
              :name="sector.icon"
              class="size-6"
            />
          </div>
          <div class="flex-1">
            <h4 class="text-xs uppercase tracking-widest">
              {{ sector.title }}
            </h4>
            <p class="text-sm font-bold text-muted truncate">
              {{ userInputs[sector.id] || emptyStateText }}
            </p>
          </div>
          <UIcon
            v-if="userInputs[sector.id].length >= minCharCount"
            name="i-lucide-check-circle-2"
            class="text-success size-5"
          />
        </div>
      </div>
      <UCard
        v-if="activeSector"
        class="lg:col-span-8 flex flex-col justify-center"
        :class="[`border-l-8 border-${activeSector.color}/60`]"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              :name="activeSector.icon"
              :class="[`size-8 text-${activeSector.color}`]"
            />
            <h3 class="text-3xl italic tracking-tighter">
              {{ activeSector.title }}
            </h3>
          </div>
        </template>

        <UTextarea
          v-if="isEditable"
          v-model="userInputs[activeSector.id]"
          :placeholder="`Describe ${activeSector.description.toLowerCase()}...`"
          :color="activeSector.color"
          variant="outline"
          :rows="6"
          class="size-full text-xl font-medium"
        />
        <template #footer>
          <p class="text-xs font-bold uppercase tracking-widest text-muted">
            Requirement: {{ minCharCount }} characters minimum
          </p>
        </template>
      </UCard>
    </div>
    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-6">
        <h4 class="text-xs uppercase tracking-[0.3em] text-muted border-b pb-2">
          Core Intersections
        </h4>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="intersect in primaryIntersections"
            :key="intersect.label"
            class="p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-2 duration-300 hover:bg-radial from-primary/20"
            :class="[intersect.active ? 'border-primary/60 shadow-md shadow-primary' : 'border-dashed border-muted opacity-30 grayscale']"
          >
            <UIcon
              :name="intersect.icon"
              class="size-8 text-primary"
            />
            <p class="text-sm uppercase italic">
              {{ intersect.label }}
            </p>
            <p class="text-sm font-bold text-muted">
              {{ intersect.desc }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-6">
        <h4 class="text-xs uppercase tracking-[0.3em] text-muted border-b pb-2">
          Synthesis
        </h4>
        <div class="space-y-4">
          <div
            v-for="state in advancedStates"
            :key="state.label"
          >
            <div
              v-if="state.active"
              class="p-6 bg-muted rounded-3xl border-l-4 border-primary/40 flex items-start gap-4"
            >
              <UIcon
                :name="state.icon"
                class="size-10 text-primary shrink-0"
              />
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h5 class="italic uppercase">
                    {{ state.label }}
                  </h5>
                  <UBadge
                    color="warning"
                    variant="subtle"
                    size="xs"
                  >
                    Missing {{ state.missing }}
                  </UBadge>
                </div>
                <p class="text-sm font-medium text-muted leading-relaxed">
                  {{ state.message }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="isIkigaiReached"
            class="p-10 rounded-md shadow-2xl shadow-sucess relative overflow-hidden group"
          >
            <div class="relative z-10 space-y-4">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-sparkles"
                  class="text-yellow-500 size-10 animate-pulse"
                />
                <h2 class="text-5xl italic tracking-tighter">
                  Well done!
                </h2>
              </div>
              <p class="text-lg text-muted font-medium max-w-sm">
                You have achieved the perfect balance between passion, mission, vocation, and profession.
              </p>
              <UButton
                label="Download Life Map"
                trailing-icon="lucide-download"
                color="info"
                variant="soft"
                class="rounded-full uppercase tracking-widest mt-4 ms-8"
              />
            </div>
            <UIcon
              name="i-lucide-clover"
              class="absolute opacity-20 -right-10 -bottom-10 size-64 text-muted rotate-12 group-hover:rotate-35 transition-transform duration-600"
            />
          </div>
          <div
            v-else
            class="h-full min-h-[100px] border-2 border-dashed border-muted rounded-3xl flex items-center justify-center p-8 text-center"
          >
            <p class="text-sm font-bold text-muted uppercase tracking-widest italic">
              Complete all sectors to see a synthesis
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
