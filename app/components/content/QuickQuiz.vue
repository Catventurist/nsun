<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'

interface Question {
  question: string
  options: string[]
  answer: number
}

const props = defineProps<{
  questions: Question[]
}>()

const currentQuestionIndex = ref(0)
const selectedOption = ref<number | null>(null)
const score = ref(0)
const finished = ref(false)

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value])

function submitAnswer() {
  if (selectedOption.value === Number(currentQuestion.value?.answer)) {
    score.value++
  }

  if (currentQuestionIndex.value < props.questions.length - 1) {
    currentQuestionIndex.value++
    selectedOption.value = null
  } else {
    finished.value = true
  }
}
function restart() {
  score.value = 0
  currentQuestionIndex.value = 0
  selectedOption.value = null
  finished.value = false
}
</script>

<template>
  <UCard class="my-4 size-80">
    <AnimatePresence>
      <Motion
        v-if="!finished"
        :initial="{ y: -4, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        as="div"
      >
        <div class="mb-4 font-bold text-lg">
          {{ currentQuestion?.question }}
        </div>

        <URadioGroup
          v-model="(selectedOption as number | undefined)"
          :items="currentQuestion?.options.map((opt, i) => ({ label: opt, value: i + 1 }))"
        />

        <div class="flex items-center justify-start gap-4 mt-6">
          <UButton
            trailing-icon="lucide-arrow-right"
            variant="soft"
            :disabled="selectedOption === null"
            @click="submitAnswer"
          >
            {{ currentQuestionIndex === questions.length - 1 ? $t('quiz.finish') : $t('quiz.next') }}
          </UButton>
          <span class="text-sm text-muted">
            {{ $t('quiz.question') }} {{ currentQuestionIndex + 1 }} {{ $t('quiz.of') }} {{ questions.length }}
          </span>
        </div>
      </Motion>
      <Motion
        v-else
        :initial="{ y: -4, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        as="div"
        class=""
      >
        <h3 class="text-2xl text-success font-bold mb-2">
          {{ $t('quiz.finished') }}
        </h3>
        <p>
          {{ $t('quiz.score') }}
        </p>
        <p class="text-4xl text-primary">
          {{ score }} / {{ questions.length }}
        </p>
        <UButton
          :label="$t('quiz.retry')"
          icon="lucide-refresh-ccw"
          class="mt-4"
          variant="subtle"
          @click="restart"
        />
      </Motion>
    </AnimatePresence>
  </UCard>
</template>
