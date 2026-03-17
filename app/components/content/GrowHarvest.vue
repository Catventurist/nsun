<script setup lang="ts">
interface Props {
  title?: string
  variety?: 'fiber' | 'grain' | 'cbd' | 'cbg'
  moisture?: string
  window?: string
  method?: string
  thcLimit?: string
  labor?: string
  yield?: string
  humidity?: string
  difficulty?: 1 | 2 | 3 | 4 | 5
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hemp Harvest Protocol',
  variety: 'fiber',
  moisture: '10% - 12%',
  window: '70 - 120 Days',
  method: 'Combine / Hand',
  thcLimit: '0.3%',
  labor: 'Low (Mechanized)',
  yield: '2,500 lbs/acre',
  humidity: '50% - 60%',
  difficulty: 3
})

const badge = ref($t(`strain.harvest.variety.${props.variety}`) + $t(`strain.harvest.variety.title`))
</script>

<template>
  <div class="my-8 border border-muted rounded-2xl overflow-hidden">
    <div class="p-6 bg-linear-to-r from-muted/60 border-b border-muted">
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-muted rounded-lg">
            <UIcon
              name="i-lucide-scissors"
              class="size-6 text-primary"
            />
          </div>
          <div>
            <h3 class="text-2xl m-0 tracking-tight">
              {{ props.title }}
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <UBadge
                :label="badge"
                color="primary"
                variant="subtle"
                size="sm"
              />
              <span class="text-xs text-muted font-medium flex items-center gap-1">
                <UIcon
                  name="i-lucide-users"
                  class="size-3"
                />
                {{ labor }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-[10px] uppercase font-bold text-muted mb-1">
            {{ $t(`strain.harvest.diff`) }}
          </div>
          <div class="flex gap-1">
            <div
              v-for="i in 5"
              :key="i"
              class="w-4 h-1 rounded-full"
              :class="i <= difficulty ? 'bg-warning' : 'bg-muted'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 mx-2 border-b border-muted">
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-scale"
          class="size-5 text-success"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t(`strain.harvest.yield`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ yield }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-shield-alert"
          class="size-5 text-error"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            THC {{ $t(`strain.harvest.tresh`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ thcLimit }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-cloud-rain"
          class="size-5 text-info"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t(`strain.harvest.humi`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ humidity }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-droplets"
          class="size-5 text-info"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t(`strain.harvest.moist`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ moisture }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-calendar"
          class="size-5 text-purple-500"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t(`strain.harvest.window`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ window }}
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-3 duration-300 hover:scale-110">
        <UIcon
          name="i-lucide-settings"
          class="size-5 text-muted"
        />
        <div>
          <div class="text-[10px] uppercase font-bold text-muted">
            {{ $t(`strain.harvest.method`) }}
          </div>
          <div class="text-sm font-bold text-primary">
            {{ method }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="prose prose-sm dark:prose-invert max-w-none">
        <slot />
      </div>
      <div
        v-if="$slots.compliance"
        class="mt-6 p-4 rounded-xl bg-error/20 border border-error/60"
      >
        <div class="flex items-center gap-2 text-error font-bold text-xs uppercase mb-2">
          <UIcon name="i-lucide-gavel" />
          {{ $t(`strain.harvest.legal`) }}
        </div>
        <div class="text-sm">
          <slot name="compliance" />
        </div>
      </div>
    </div>
  </div>
</template>
