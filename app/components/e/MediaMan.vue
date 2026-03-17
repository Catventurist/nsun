<script setup lang="ts">
interface MediaItem {
  id: number | string
  name: string
  size: string
  type: 'image' | 'video' | 'document' | 'archive'
  category: string
  uploadedBy?: string
  date?: string
}

const props = withDefaults(defineProps<{
  title?: string
  allowUpload?: boolean
  allowDelete?: boolean
  maxFileSize?: string
  acceptedFormats?: string[]
  items?: MediaItem[]
  viewMode?: 'grid' | 'list'
  showStats?: boolean
  accentColor?: 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral' | undefined
}>(), {
  title: 'Projektin Media-arkisto',
  allowUpload: true,
  allowDelete: true,
  maxFileSize: '2MB',
  acceptedFormats: () => ['.png', '.jpg', 'avif', 'webp', '.pdf', '.mp4'],
  viewMode: 'grid',
  showStats: true,
  accentColor: 'primary',
  items: () => [
    { id: 1, name: 'logo_final.svg', size: '45 KB', type: 'image', category: 'Brändi', uploadedBy: 'Cat', date: '2026-03-15' },
    { id: 2, name: 'vuosiraportti_2023.pdf', size: '2.1 MB', type: 'document', category: 'Dokumentit', uploadedBy: 'Kisu', date: '2026-03-10' }
  ]
})

const currentView = ref(props.viewMode)
const searchQuery = ref('')
const isUploading = ref(false)
const selectedItem = ref<MediaItem | null>(null)

const filteredItems = computed(() => {
  return props.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const stats = computed(() => ({
  totalCount: props.items.length,
  totalSize: '2.5 MB',
  freeSpace: '95%'
}))

const simulateUpload = () => {
  isUploading.value = true
  setTimeout(() => {
    isUploading.value = false
  }, 2000)
}

const getIcon = (type: string) => {
  const icons = {
    image: 'i-lucide-image',
    video: 'i-lucide-play-circle',
    document: 'i-lucide-file-text',
    archive: 'i-lucide-archive'
  }
  return icons[type as keyof typeof icons] || 'i-lucide-file'
}
</script>

<template>
  <div class="space-y-6 mx-2 my-10">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div class="space-y-1">
        <h2 class="text-3xl tracking-tight">
          {{ title }}
        </h2>
        <div
          v-if="showStats"
          class="flex gap-4 text-sm text-muted"
        >
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-files"
              class="size-4 text-primary"
            />
            {{ stats.totalCount }} tiedostoa
          </span>
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-hard-drive"
              class="size-4 text-primary"
            />
            {{ stats.freeSpace }} vapaana
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <UFieldGroup
          size="sm"
          variant="soft"
          color="neutral"
        >
          <UButton
            icon="i-lucide-layout-grid"
            :color="currentView === 'grid' ? accentColor : 'neutral'"
            variant="outline"
            @click="currentView = 'grid'"
          />
          <UButton
            icon="i-lucide-list"
            :color="currentView === 'list' ? accentColor : 'neutral'"
            variant="outline"
            @click="currentView = 'list'"
          />
        </UFieldGroup>
      </div>
    </div>
    <UCard
      v-if="allowUpload"
      class="border-2 border-dashed border-muted bg-muted/60"
      :ui="{ body: 'p-8' }"
    >
      <div class="flex flex-col items-center text-center space-y-4">
        <div class="p-4 flex items-center rounded-full shadow-sm shadow-primary">
          <UIcon
            :name="isUploading ? 'i-lucide-loader-2' : 'i-lucide-cloud-upload'"
            :class="['size-8', isUploading ? 'animate-spin text-primary' : 'text-muted']"
          />
        </div>
        <div>
          <p class="font-bold">
            Raahaa tiedostot tähän tai klikkaa selaa
          </p>
          <p class="text-xs text-muted mt-1">
            Sallitut: {{ acceptedFormats.join(', ') }} (Enintään {{ maxFileSize }})
          </p>
        </div>
        <UButton
          :color="accentColor"
          :loading="isUploading"
          label="Valitse tiedostoja"
          variant="soft"
          @click="simulateUpload"
        />
      </div>
    </UCard>
    <UInput
      v-model="searchQuery"
      icon="i-lucide-search"
      placeholder="Etsi arkistosta..."
      size="lg"
      transparent
      class="rounded-lg shadow-sm shadow-primary"
    />
    <div
      v-if="currentView === 'grid'"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group relative rounded-xl border border-muted p-3 hover:shadow-xl shadow-primary transition-all cursor-pointer"
        @click="selectedItem = item"
      >
        <div class="aspect-square rounded-lg bg-muted/60 flex items-center justify-center mb-3">
          <UIcon
            :name="getIcon(item.type)"
            class="size-12 text-muted duration-300 group-hover:text-primary transition-colors"
          />
        </div>
        <div class="space-y-1">
          <p class="text-xs font-bold truncate">
            {{ item.name }}
          </p>
          <p class="text-[10px] text-muted uppercase tracking-wider font-medium">
            {{ item.size }} • {{ item.category }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="rounded-xl border border-muted overflow-hidden"
    >
      <table class="w-full text-left text-sm">
        <thead class="bg-muted/60 text-muted font-medium">
          <tr>
            <th class="p-4">
              Nimi
            </th>
            <th class="p-4">
              Koko
            </th>
            <th class="p-4">
              Lisääjä
            </th>
            <th class="p-4 text-right">
              Toiminnot
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-muted">
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="hover:bg-default/30"
          >
            <td class="p-4 flex items-center gap-3 font-medium">
              <UIcon
                :name="getIcon(item.type)"
                class="size-5 text-muted"
              />
              {{ item.name }}
            </td>
            <td class="p-4 text-muted">
              {{ item.size }}
            </td>
            <td class="p-4 text-muted text-xs">
              {{ item.uploadedBy || 'Järjestelmä' }}
            </td>
            <td class="p-4 text-right">
              <UButton
                icon="i-lucide-more-vertical"
                variant="ghost"
                color="neutral"
                size="xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UModal
      v-if="selectedItem"
      v-model="selectedItem"
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg">
              Tiedoston tiedot
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              @click="selectedItem = null"
            />
          </div>
        </template>
        <div class="p-4 space-y-6">
          <div class="aspect-video rounded-xl flex items-center justify-center">
            <UIcon
              :name="getIcon(selectedItem.type)"
              class="size-24 text-muted"
            />
          </div>
          <div class="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <span class="text-muted">
              Tiedostonimi:
            </span>
            <span class="font-medium text-right">
              {{ selectedItem.name }}
            </span>
            <span class="text-muted">
              Lisätty:
            </span>
            <span class="font-medium text-right">
              {{ selectedItem.date || 'Ei tiedossa' }}
            </span>
            <span class="text-muted">
              Koko:
            </span>
            <span class="font-medium text-right text-primary">
              {{ selectedItem.size }}
            </span>
          </div>
        </div>
        <template #footer>
          <div class="flex gap-2">
            <UButton
              v-if="allowDelete"
              color="error"
              variant="soft"
              label="Poista arkistosta"
              icon="i-lucide-trash"
              class="grow"
            />
            <UButton
              label="Lataa"
              icon="i-lucide-download"
              variant="subtle"
              class="grow"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
