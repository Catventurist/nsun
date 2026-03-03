<script lang='ts' setup>
import type { Ref } from 'vue'
import { Motion, useAnimate } from 'motion-v'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  class?: string
  width: number
  height: number
  minScratchPercentage?: number
  gradientColors?: [string, string, string]
}
const props = withDefaults(defineProps<Props>(), {
  gradientColors: () => ['#360f5a', '#002600', '#000033'],
  minScratchPercentage: 50
})

const emit = defineEmits<{
  complete: []
}>()

const cursorImg = 'cursor-[url(/paw.png),pointer]'

const canvasRef = ref<HTMLCanvasElement>()

const containerWidth = computed(() => `${props.width}px`)
const containerHeight = computed(() => `${props.height}px`)

const context = ref<CanvasRenderingContext2D>()

const isScratching = ref(false)
const isComplete = ref(false)

function handleMouseDown() {
  isScratching.value = true
}
function handleTouchStart() {
  isScratching.value = true
}

const canvasWidth = computed(() => canvasRef.value?.width || props.width)
const canvasHeight = computed(() => canvasRef.value?.height || props.height)

function drawCanvas(canvasRef: Ref<HTMLCanvasElement>) {
  context.value = canvasRef.value.getContext('2d')!
  context.value.fillStyle = '#ccc'
  context.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
  const gradient = context.value.createLinearGradient(0, 0, canvasWidth.value, canvasHeight.value)
  gradient.addColorStop(0, props.gradientColors[0])
  gradient.addColorStop(0.5, props.gradientColors[1])
  gradient.addColorStop(1, props.gradientColors[2])
  context.value.fillStyle = gradient
  context.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
}

function scratch(clientX: number, clientY: number) {
  if (canvasRef.value && context.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    const x = clientX - rect.left + 16
    const y = clientY - rect.top + 16

    context.value.globalCompositeOperation = 'destination-out'
    context.value.beginPath()
    context.value.arc(x, y, 30, 0, Math.PI * 2)
    context.value.fill()
  }
}

function handleDocumentMouseMove(event: MouseEvent) {
  if (!isScratching.value) return
  scratch(event.clientX, event.clientY)
}

function handleDocumentTouchMove(event: TouchEvent) {
  if (!isScratching.value) return
  const touch = event.touches[0] as Touch
  scratch(touch.clientX, touch.clientY)
}

function handleDocumentMouseUp() {
  isScratching.value = false
  checkCompletion()
}
function handleDocumentTouchEnd() {
  isScratching.value = false
  checkCompletion()
}

function addEventListeners() {
  document.addEventListener('mousedown', handleDocumentMouseMove)
  document.addEventListener('mousemove', handleDocumentMouseMove)
  document.addEventListener('touchstart', handleDocumentTouchMove)
  document.addEventListener('touchmove', handleDocumentTouchMove)
  document.addEventListener('mouseup', handleDocumentMouseUp)
  document.addEventListener('touchend', handleDocumentTouchEnd)
  document.addEventListener('touchcancel', handleDocumentTouchEnd)
}

function checkCompletion() {
  if (isComplete.value) return

  if (canvasRef.value && context.value) {
    const imageData = context.value.getImageData(0, 0, canvasWidth.value, canvasHeight.value)
    const pixels = imageData.data
    const totalPixels = pixels.length / 4
    let clearPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        clearPixels++
      }
    }

    const percentage = (clearPixels / totalPixels) * 100

    if (percentage >= props.minScratchPercentage) {
      isComplete.value = true
      context.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

      startAnimation()
    } else {
      isScratching.value = false
    }
  }
}

const [containerRef, animate] = useAnimate()
async function startAnimation() {
  if (!containerRef.value) return
  animate(containerRef.value, {
    scale: 1,
    rotate: [0, 10, -10, 10, -10, 0]
  })

  emit('complete')
}

onMounted(() => {
  if (!canvasRef.value) return

  drawCanvas(canvasRef as Ref<HTMLCanvasElement>)

  addEventListeners()
})

function removeEventListeners() {
  document.removeEventListener('mousedown', handleDocumentMouseMove)
  document.removeEventListener('mousemove', handleDocumentMouseMove)
  document.removeEventListener('touchstart', handleDocumentTouchMove)
  document.removeEventListener('touchmove', handleDocumentTouchMove)
  document.removeEventListener('mouseup', handleDocumentMouseUp)
  document.removeEventListener('touchend', handleDocumentTouchEnd)
  document.removeEventListener('touchcancel', handleDocumentTouchEnd)
}
onUnmounted(() => {
  removeEventListeners()
})
</script>

<template>
  <Motion
    ref="containerRef"
    class="relative select-none"
    :class="[props.class, cursorImg]"
    :style="{
      width: containerWidth,
      height: containerHeight
    }"
    :initial="{
      scale: 1,
      rotate: [0, 10, -10, 10, -10, 0]
    }"
    :transition="{ duration: 0.5 }"
  >
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      class="absolute top-0 left-0"
      willReadFrequently="true"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
    />

    <slot />
  </Motion>
</template>
