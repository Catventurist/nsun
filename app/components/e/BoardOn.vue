<script setup lang="ts">
interface OnboardingStep {
  title: string
  description: string
  icon: string
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  steps?: OnboardingStep[]
  nextText?: string
  prevText?: string
  finishText?: string
  color?: 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral' | undefined
  cardVariant?: 'outline' | 'solid' | 'soft' | 'subtle' | undefined
}>(), {
  title: 'Liity klubiin',
  description: 'Seuraa ohjeita viimeistelläksesi jäsenyytesi.',
  nextText: 'Seuraava',
  prevText: 'Edellinen',
  finishText: 'Valmis',
  color: 'primary',
  steps: () => [
    { title: 'Profiili', description: 'Lisää tietosi.', icon: 'i-lucide-user' },
    { title: 'Säännöt', description: 'Hyväksy ehdot.', icon: 'i-lucide-book-open' },
    { title: 'Vahvistus', description: 'Viimeistele tili.', icon: 'i-lucide-check-circle' }
  ]
})

const currentStep = ref(0)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === props.steps.length - 1)
const progress = computed(() => ((currentStep.value + 1) / props.steps.length) * 100)

const next = () => {
  if (!isLastStep.value) currentStep.value++
}

const prev = () => {
  if (!isFirstStep.value) currentStep.value--
}
</script>

<template>
  <UCard
    :variant="cardVariant"
    class="max-w-xl mx-auto my-10 overflow-hidden shadow-sm shadow-primary border-0"
  >
    <template #header>
      <div class="px-4 py-2">
        <h2 class="text-xl font-bold">
          {{ title }}
        </h2>
        <p class="text-sm text-muted">
          {{ description }}
        </p>
      </div>
      <UProgress
        v-model="progress"
        :max="100"
        :color="color"
        size="xs"
        class="mt-4"
      />
    </template>
    <div class="p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
      <div
        v-if="steps[currentStep]"
        :key="currentStep"
        class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <div :class="`mx-auto size-16 rounded-full bg-${color}/20 flex items-center justify-center`">
          <UIcon
            :name="steps[currentStep]?.icon"
            :class="`size-8 text-${color}`"
          />
        </div>
        <div>
          <h3 class="text-lg font-bold">
            {{ currentStep + 1 }}. {{ steps[currentStep]?.title }}
          </h3>
          <p class="text-muted mt-2">
            {{ steps[currentStep]?.description }}
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-chevron-left"
          :label="prevText"
          :disabled="isFirstStep"
          @click="prev"
        />
        <div class="flex gap-1">
          <div
            v-for="(_, i) in steps"
            :key="i"
            :class="[
              'size-2 rounded-full transition-colors',
              i === currentStep ? `bg-${color}/20` : 'bg-muted'
            ]"
          />
        </div>
        <UButton
          :color="color"
          :trailing-icon="isLastStep ? 'i-lucide-check' : 'i-lucide-chevron-right'"
          variant="ghost"
          @click="next"
        >
          {{ isLastStep ? finishText : nextText }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<!-- <script setup lang="ts">
interface OnboardingStep {
  title: string
  description: string
  icon: string
  completed?: boolean
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  steps?: OnboardingStep[]
  buttonText?: string
  buttonIcon?: string
  color?: 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral' | undefined
  cardVariant?: 'outline' | 'solid' | 'soft' | 'subtle' | undefined
  showProgress?: boolean
  loading?: boolean
  iconSize?: string
}>(), {
  title: 'Club Membership',
  description: 'Complete these steps to unlock full access to the community.',
  buttonText: 'Get Started',
  buttonIcon: 'i-lucide-arrow-right',
  color: 'primary',
  cardVariant: 'outline',
  showProgress: true,
  loading: false,
  iconSize: 'size-6',
  steps: () => [
    { title: 'Profile Info', description: 'Add your bio and avatar.', icon: 'i-lucide-user' },
    { title: 'Community Rules', description: 'Read and accept our terms.', icon: 'i-lucide-book-open' },
    { title: 'First Post', description: 'Introduce yourself to the club.', icon: 'i-lucide-megaphone' }
  ]
})

const emit = defineEmits(['action'])

const completedCount = computed(() => props.steps.filter(s => s.completed).length)
const progress = computed(() => (completedCount.value / props.steps.length) * 100)
const pro = ref(progress.value)
</script>

<template>
  <UCard
    :variant="cardVariant"
    class="relative max-w-2xl mx-auto my-10 overflow-hidden ring-1 ring-muted"
    :ui="{ body: 'p-0' }"
  >
    <template #header>
      <div class="relative px-6 py-8 text-center overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-3xl font-extrabold tracking-tight mb-2">
            {{ title }}
          </h2>
          <p class="text-muted max-w-md mx-auto">
            {{ description }}
          </p>
        </div>
      </div>
      <UProgress
        v-if="showProgress"
        v-model="pro"
        :max="props.steps.length"
        :color="color"
        class="absolute h-4 -bottom-1 left-0"
      />
    </template>
    <div class="divide-y divide-muted">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="group flex gap-5 p-6 transition-colors hover:bg-default/40"
      >
        <div
          class="shrink-0 flex items-center justify-center size-12 rounded-xl border-2 transition-transform group-hover:scale-110"
          :class="[
            step.completed ? `bg-${color}/20 border-${color}/60 text-${color}` : 'bg-default/80 border-muted text-muted'
          ]"
        >
          <UIcon :name="step.icon" :class="iconSize" />
        </div>
        <div class="grow pt-1">
          <div class="flex items-center gap-2">
            <h3 class="font-boldtext-lg">
              {{ step.title }}
            </h3>
            <UIcon
              v-if="step.completed"
              name="i-lucide-check-circle-2"
              class="text-success size-5"
            />
          </div>
          <p class="text-muted mt-1">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
        <span class="text-sm text-muted font-medium">
          {{ completedCount }} of {{ steps.length }} steps finished
        </span>
        <UButton
          :color="color"
          :loading="loading"
          size="lg"
          :label="buttonText"
          :trailing-icon="buttonIcon"
          @click="emit('action')"
        />
      </div>
    </template>
  </UCard>
</template>
 -->
