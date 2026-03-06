<script setup lang="ts">
type ItemType = 'benefit' | 'requirement'
type CategoryType = 'network' | 'skill' | 'career'
type ConnectionWithCount = Connection & { count: number }
type CountMap = Record<string, ConnectionWithCount>

interface Connection {
  label: string
  icon: string
  category: CategoryType
}

interface ClubItem {
  id: string
  label: string
  type: ItemType
  description: string
  icon: string
  impactScore: number
  rawConnections: Connection[]
}

interface Props {
  title?: string
  items?: ClubItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const selectedIndex = ref(0)
const activeItem = computed(() => props.items[selectedIndex.value])

const processedConnections = computed(() => {
  if (!activeItem.value) return []
  return activeItem.value.rawConnections.map(conn => ({
    ...conn,
    strengthKey: activeItem.value!.impactScore > 3 ? $t('jobs.score.high') : $t('jobs.score.growth'),
    displayIcon: conn.icon || 'i-lucide-link'
  }))
})
const topConnections = computed(() => {
  if (!props.items?.length) return []

  const allRaw = props.items.flatMap(item => item.rawConnections)
  const counts = allRaw.reduce<CountMap>((acc, curr) => {
    const key = curr.label
    if (!acc[key]) {
      acc[key] = {
        label: curr.label,
        icon: curr.icon,
        category: curr.category,
        count: 0
      }
    }
    acc[key].count++
    return acc
  }, {})

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
})
/* const topConnections = computed(() => {
  if (!props.items?.length) return []
  const allRaw = props.items.flatMap(item => item.rawConnections)
  const counts = allRaw.reduce((acc, curr) => {
    if (!acc[curr.label]) {
      acc[curr.label] = { ...curr, count: 0 }
    }
    acc[curr.label].count++
    return acc
  }, {} as Record<string, Connection & { count: number }>)
  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
}) */
</script>

<template>
  <div class="my-10 max-w-6xl mx-auto">
    <div class="flex items-center gap-3 mb-8">
      <UIcon name="i-lucide-network" class="size-8 text-primary" />
      <h2 class="text-3xl font-bold">
        {{ title || $t('jobs.conn.title') }}
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-5 space-y-4">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          :class="[
            'p-5 rounded-xl border transition-all duration-300 cursor-pointer group',
            selectedIndex === index
              ? 'bg-default border-primary/40 shadow-lg scale-[1.02]'
              : 'bg-muted border-transparent hover:border-muted'
          ]"
          @click="selectedIndex = index"
        >
          <div class="flex items-start gap-4">
            <div
              :class="[
                'p-2 rounded-lg',
                selectedIndex === index ? 'bg-primary/20 text-default' : 'bg-muted'
              ]"
            >
              <UIcon :name="`i-lucide-${item.icon}`" class="size-6" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-lg">
                  {{ item.label }}
                </span>
                <UBadge :color="item.type === 'benefit' ? 'primary' : 'warning'" variant="outline">
                  {{ item.type }}
                </UBadge>
              </div>
              <p class="text-sm text-muted line-clamp-2">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-7">
        <UCard v-if="activeItem" class="h-full border-dashed border-2 border-primary/40">
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-xl flex items-center gap-2">
                <UIcon name="i-lucide-zap" class="text-warning" />
                {{ $t('jobs.activec') }}
              </h3>
              <div class="flex gap-1">
                <UIcon
                  v-for="i in 5" :key="i"
                  name="i-lucide-star"
                  :class="['size-4', i <= activeItem.impactScore ? 'text-warning fill-warning' : 'text-muted']"
                />
              </div>
            </div>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="conn in processedConnections"
              :key="conn.label"
              class="p-4 border border-muted rounded-lg flex flex-col gap-2 transition duration-300 hover:bg-radial from-primary/20"
            >
              <div class="flex items-center gap-2 text-primary font-semibold">
                <UIcon :name="`i-lucide-${conn.displayIcon}`" />
                {{ conn.label }}
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs px-2 py-0.5 bg-muted rounded text-muted">
                  {{ conn.category }}
                </span>
                <span class="text-[10px] uppercase tracking-wider font-bold text-primary">
                  {{ conn.strengthKey }}
                </span>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="bg-primary/20 p-4 rounded-lg flex items-start gap-3">
              <UIcon name="i-lucide-info" class="text-primary mt-0.5" />
              <p class="text-sm text-default italic">
                {{ $t('jobs.tip.the') }} {{ activeItem.label }} {{ $t('jobs.tip.path') }} {{ activeItem.type === 'benefit' ? $t('jobs.types.resourcea') : $t('jobs.types.commitment') }}
                {{ $t('jobs.tip.strength') }} {{ processedConnections[0]?.category.toLowerCase() }} {{ $t('jobs.tip.profile') }}.
              </p>
            </div>
          </template>
        </UCard>
      </div>
    </div>
    <div v-if="topConnections.length" class="mt-12 p-8 bg-muted/40 rounded-3xl border border-primary/30">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-2 bg-primary/20 rounded-lg ">
          <UIcon name="i-lucide-award" class="size-5" />
        </div>
        <h3 class="font-bold text-2xl">
          {{ $t('jobs.conn.paths') }}
        </h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="path in topConnections"
          :key="path.label"
          class="group p-5 bg-radial from-muted/80 rounded-2xl border border-muted/60 hover:shadow-md hover:shadow-primary transition-shadow"
        >
          <UIcon :name="`i-lucide-${path.icon}`" class="w-8 h-8 text-primary mb-4 opacity-80 group-hover:opacity-100" />
          <div class="font-bold text-lg mb-1">
            {{ path.label }}
          </div>
          <div class="text-sm text-muted uppercase tracking-tighter font-semibold">
            {{ path.category }} • {{ path.count }} {{ $t('jobs.conn.occurrences') }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="path in topConnections"
          :key="path.label"
          class="flex flex-col items-center p-4 rounded-xl shadow-sm border border-primary/70 text-center duration-300 hover:scale-110"
        >
          <div class="p-3 justify-center bg-primary/20 rounded-lg mb-3">
            <UIcon :name="`i-lucide-${path.icon}`" class="size-6 text-primary" />
          </div>
          <span class="font-bold text-sm mb-1">
            {{ path.label }}
          </span>
          <div class="flex items-center gap-1.5">
            <UBadge size="xs" color="primary" variant="soft">
              {{ path.count }} {{ $t('jobs.conn.occurrences') }}
            </UBadge>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
