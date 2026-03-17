<script setup lang="ts">
interface Props {
  title?: string
  author?: string
  format?: 'pdf' | 'md'
  progress?: number
  isbn?: string
  publisher?: string
  publishedDate?: string
  language?: string
  categories?: string[]
  nightMode?: boolean
  blueLightFilter?: boolean
  filterIntensity?: number
  readingTime?: string
  fontSize?: 'sm' | 'base' | 'lg' | 'xl'
  fontFamily?: 'sans' | 'serif' | 'mono'
  showSidebar?: boolean
  coverUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Untitled Document',
  author: 'Unknown Author',
  format: 'md',
  progress: 0,
  isbn: 'N/A',
  publisher: 'N/A',
  publishedDate: 'N/A',
  language: 'English',
  categories: () => [],
  nightMode: false,
  blueLightFilter: true,
  filterIntensity: 30,
  readingTime: '5 min',
  fontSize: 'base',
  fontFamily: 'serif',
  showSidebar: true,
  coverUrl: '/catbirchdark.webp'
})

const isNightMode = ref(props.nightMode)
const isBlueLight = ref(props.blueLightFilter)
const currentFontSize = ref(props.fontSize)
const currentFontFamily = ref(props.fontFamily)

const filterStyle = computed(() => {
  if (!props.blueLightFilter) return {}
  return {
    backgroundColor: `rgba(251, 191, 36, ${props.filterIntensity / 1000})`,
    mixBlendMode: 'multiply' as const
  }
})

const fontClass = computed(() => {
  const families = { sans: 'font-sans', serif: 'font-serif', mono: 'font-mono' }
  const sizes = { sm: 'prose-sm', base: 'prose-base', lg: 'prose-lg', xl: 'prose-xl' }
  return `${families[props.fontFamily]} ${sizes[props.fontSize]}`
})
</script>

<template>
  <div class="relative flex flex-col h-screen overflow-hidden border border-muted rounded-xl">
    <div
      v-if="isBlueLight"
      class="absolute inset-0 pointer-events-none z-100"
      :style="filterStyle"
    />

    <div
      class="flex flex-col size-full transition-colors duration-500"
      :class="isNightMode ? 'bg-black text-gray-300 border-gray-900' : 'bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800'"
    >
      <header
        class="px-6 py-3 border-b flex items-center justify-between"
        :class="isNightMode ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'"
      >
        <div class="flex items-center gap-4">
          <Icon
            :name="props.format === 'pdf' ? 'i-lucide-file-text' : 'i-lucide-book-open'"
            class="size-6 text-primary"
          />
          <div class="hidden sm:block">
            <h2 class="text-xs font-bold truncate max-w-[150px]">
              {{ props.title }}
            </h2>
            <p class="text-[9px] opacity-60 uppercase tracking-widest">
              {{ props.author }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center bg-muted/50 rounded-lg p-1 gap-1">
            <UButton
              variant="soft"
              :icon="isNightMode ? 'i-lucide-moon' : 'i-lucide-sun'"
              :class="isNightMode ? 'bg-white dark:bg-gray-600 text-primary' : ''"
              @click="isNightMode = !isNightMode"
            />
            <UButton
              variant="soft"
              icon="i-lucide-eye"
              :class="isBlueLight ? 'bg-muted text-warning' : ''"
              @click="isBlueLight = !isBlueLight"
            />
          </div>
          <div class="flex items-center bg-muted/60 rounded-lg p-1 gap-1">
            <UButton
              v-for="size in (['sm', 'base', 'lg'] as const)"
              :key="size"
              :label="size"
              variant="soft"
              :class="currentFontSize === size ? 'bg-default/80 shadow-sm' : 'opacity-50'"
              @click="currentFontSize = size"
            />
          </div>
          <div class="flex items-center bg-muted/60 rounded-lg p-1 gap-1">
            <UButton
              v-for="family in (['sans', 'serif'] as const)"
              :key="family"
              :label="family"
              variant="soft"
              :class="currentFontFamily === family ? 'bg-muted/80' : 'opacity-50'"
              @click="currentFontFamily = family"
            />
          </div>
        </div>
      </header>
      <div class="flex flex-1 overflow-hidden">
        <aside
          v-if="props.showSidebar"
          class="w-64 border-r border-muted p-6 overflow-y-auto hidden lg:block"
          :class="isNightMode ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200'"
        >
          <MTilted
            container-height="300px"
            image-width="220px"
          />
          <!-- <NuxtImg
            v-if="props.coverUrl"
            :src="props.coverUrl"
            :width="256"
            class="w-full aspect-3/4 object-cover rounded shadow-sm shadow-primary mb-6"
          />
          -->
          <div class="mt-4 space-y-4 text-[11px]">
            <div
              v-for="(val, key) in { ISBN: props.isbn, Publisher: props.publisher, Time: props.readingTime }"
              :key="key"
            >
              <p class="opacity-50 font-bold uppercase tracking-tighter text-[9px]">
                {{ key }}
              </p>
              <p class="font-medium truncate">
                {{ val }}
              </p>
            </div>
            <div class="flex flex-wrap gap-1 pt-2">
              <span
                v-for="cat in props.categories"
                :key="cat"
                class="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-bold border border-primary/40 uppercase"
              >
                {{ cat }}
              </span>
            </div>
          </div>
        </aside>

        <main
          class="flex-1 overflow-y-auto p-12 prose max-w-none transition-all duration-300"
          :class="[isNightMode ? 'prose-invert prose-slate' : 'dark:prose-invert', fontClass]"
        >
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
