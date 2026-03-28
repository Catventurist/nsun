<script setup lang="ts">
type StepId = 'observation' | 'feeling' | 'need' | 'request'

interface NVCStep {
  id: StepId
  title: string
  icon: string
  color: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral' | undefined
  prefix: string
}

interface Props {
  steps?: NVCStep[]
  activeId?: StepId
}

const props = withDefaults(defineProps<Props>(), {
  steps: () => [
    { id: 'observation', title: 'Observation', icon: 'i-lucide-search', color: 'info', prefix: 'When I see/hear' },
    { id: 'feeling', title: 'Feeling', icon: 'i-lucide-heart', color: 'error', prefix: 'I feel' },
    { id: 'need', title: 'Need', icon: 'i-lucide-target', color: 'warning', prefix: 'because I need' },
    { id: 'request', title: 'Request', icon: 'i-lucide-send', color: 'success', prefix: 'and I would like' }
  ]
})

const userInputs = ref<Record<StepId, string>>({
  observation: '',
  feeling: '',
  need: '',
  request: ''
})

const currentStepIndex = ref(0)
const activeStep = computed(() => {
  return props.steps[currentStepIndex.value] || props.steps[0]
})
const getStepStyle = (id: StepId) => {
  const step = props.steps.find(s => s.id === id) || props.steps[0]
  if (!step) return { color: 'neutral', icon: 'i-lucide-help-circle' }
  return {
    icon: step.icon,
    bg: `bg-${step.color}/20`,
    text: `text-${step.color}`,
    border: `border-${step.color}/60`,
    button: step.color
  }
}

const fullStatement = computed(() => {
  return props.steps
    .map((step) => {
      const input = userInputs.value[step.id].trim()
      return input ? `${step.prefix} '${input}'` : null
    })
    .filter(Boolean)
    .join(', ')
})

const setStep = (index: number) => {
  currentStepIndex.value = index
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        :class="[
          'p-2 rounded-2xl cursor-pointer transition-all border-2 border-primary/40 flex items-center gap-3 duration-300 hover:scale-110',
          currentStepIndex === index ? getStepStyle(step.id).border : 'border-transparent opacity-60'
        ]"
        @click="setStep(index)"
      >
        <UIcon
          :name="step.icon"
          :class="['size-5', getStepStyle(step.id).text]"
        />
        <span class="font-bold text-sm uppercase tracking-wider">
          {{ step.title }}
        </span>
      </div>
    </div>
    <UCard
      v-if="activeStep"
      :class="['border-t', getStepStyle(activeStep.id).border]"
    >
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <div :class="['flex items-center p-3 rounded-xl', getStepStyle(activeStep.id).bg]">
            <UIcon
              :name="getStepStyle(activeStep.id).icon"
              :class="['size-8', getStepStyle(activeStep.id).text]"
            />
          </div>
          <h2 class="text-3xl italic">
            {{ activeStep.title }}
          </h2>
        </div>
        <p class="text-muted font-medium">
          Identify the {{ activeStep.id }} in your situation. Start with:
          <span :class="['font-bold italic', getStepStyle(activeStep.id).text]">"{{ activeStep.prefix }}..."</span>
        </p>
        <UTextarea
          v-model="userInputs[activeStep.id]"
          :placeholder="`Enter your ${activeStep.id}...`"
          :color="getStepStyle(activeStep.id).button"
          variant="outline"
          class="size-full"
          :rows="4"
          autoresize
        />

        <div class="flex justify-between items-center pt-4">
          <UButton
            v-if="currentStepIndex > 0"
            label="Previous"
            variant="ghost"
            color="neutral"
            icon="i-lucide-arrow-left"
            @click="currentStepIndex--"
          />
          <div v-else />
          <UButton
            v-if="currentStepIndex < steps.length - 1"
            :color="getStepStyle(activeStep.id).button"
            label="Continue"
            icon="i-lucide-arrow-right"
            variant="soft"
            trailing
            ariant="ghost"
            @click="currentStepIndex++"
          />
        </div>
      </div>
    </UCard>
    <div
      v-if="fullStatement"
      class="p-8 rounded-3xl shadow-2xl relative overflow-hidden"
    >
      <h4 class="text-xs font-bold text-primary-400 uppercase tracking-[0.3em] mb-4">
        Integrated Statement
      </h4>
      <p class="text-xl md:text-3xl font-hand text-pretty font-medium leading-relaxed italic relative z-10">
        {{ fullStatement }}.
      </p>
      <UIcon
        name="i-lucide-quote"
        class="absolute -right-4 -bottom-4 size-32 opacity-10"
      />
    </div>
  </div>
</template>
