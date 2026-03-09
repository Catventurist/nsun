/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { useState } from '#app'
import { ExperimentSchema, BasicInfoSchema, FieldInfoSchema, ObjectiveDetailsSchema, ConstraintsSchema, DesignSchema, MeasurementPlanSchema } from '~/utils/expschema'

export const steps = [
  'basic',
  'field',
  'objective',
  'constraints',
  'design',
  'measurement',
  'review'
] as const

export function useExperimentWizard() {
  const wizardState = useState('experiment:wizard', () => ({
    basic: {},
    field: {},
    objective: {},
    constraints: {},
    design: {},
    measurement: {}
  }))

  const currentStep = ref<number>(0)
  const errors = ref<Record<string, any>>({})

  function setStepData<T extends keyof typeof wizardState.value>(step: T, payload: any) {
    wizardState.value[step] = { ...wizardState.value[step], ...payload }
  }

  async function validateStep(stepIndex: number) {
    errors.value = {}
    try {
      switch (steps[stepIndex]) {
        case 'basic':
          BasicInfoSchema.parse(wizardState.value.basic)
          break
        case 'field':
          FieldInfoSchema.parse(wizardState.value.field)
          break
        case 'objective':
          ObjectiveDetailsSchema.parse(wizardState.value.objective)
          break
        case 'constraints':
          ConstraintsSchema.parse(wizardState.value.constraints)
          break
        case 'design':
          DesignSchema.parse(wizardState.value.design)
          break
        case 'measurement':
          MeasurementPlanSchema.parse(wizardState.value.measurement)
          break
        default:
          break
      }
      return true
    } catch (err: any) {
      if (err?.issues) {
        for (const issue of err.issues) {
          const path = issue.path.join('.') || 'form'
          errors.value[path] = issue.message
        }
      } else {
        errors.value['form'] = err.message || String(err)
      }
      return false
    }
  }

  function next() {
    if (currentStep.value < steps.length - 1) currentStep.value++
  }
  function prev() {
    if (currentStep.value > 0) currentStep.value--
  }

  function reset() {
    wizardState.value = { basic: {}, field: {}, objective: {}, constraints: {}, design: {}, measurement: {} }
    currentStep.value = 0
    errors.value = {}
  }

  async function submit() {
    try {
      const parsed = ExperimentSchema.parse(wizardState.value)
      const response = await useFetch('/api/protocols/generate', { method: 'POST', body: parsed })
      return response
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    wizardState,
    currentStep,
    steps,
    errors,
    setStepData,
    validateStep,
    next,
    prev,
    reset,
    submit
  }
}
