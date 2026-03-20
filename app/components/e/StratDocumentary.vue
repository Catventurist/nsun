<script setup lang="ts">
interface Accolade {
  label: string
  icon: string
  source?: string
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface StreamingPlatform {
  name: string
  url: string
  icon: string
}

interface PressQuote {
  text: string
  author: string
  rating?: number
}

interface Props {
  title?: string
  subtitle?: string
  synopsis?: string
  image?: string
  videoUrl?: string
  director?: string
  producer?: string
  narrator?: string
  cast?: string[]
  year?: string
  duration?: string
  rating?: string
  productionCompany?: string
  copyright?: string
  accolades?: Accolade[]
  socials?: SocialLink[]
  streamingOn?: StreamingPlatform[]
  pressQuotes?: PressQuote[]
  primaryCta?: string
  secondaryCta?: string
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'The Silent Forest',
  subtitle: 'A journey into the heart of the unknown',
  synopsis: 'Deep in the heart of the ancient woods, researchers discover an ecosystem that defies the laws of biology as we know them.',
  image: '/carbirchdark.webp',
  director: 'Sarah Jenkins',
  producer: 'Marcus Thorne',
  narrator: 'David Attenborough',
  cast: () => ['Dr. Aris Varma', 'Elena Rodriguez', 'Julian Frost'],
  year: '2026',
  duration: '104 min',
  rating: 'PG-13',
  productionCompany: 'Evergreen Films',
  copyright: '© 2026 Evergreen Media Group',
  accentColor: 'text-yellow-500',
  accolades: () => [
    { label: 'Best Documentary', icon: 'i-lucide-award', source: 'Sundance' },
    { label: 'Official Selection', icon: 'i-lucide-star', source: 'Cannes' }
  ],
  socials: () => [
    { platform: 'Instagram', url: '#', icon: 'i-lucide-instagram' },
    { platform: 'X', url: '#', icon: 'i-lucide-x' }
  ],
  streamingOn: () => [
    { name: 'Youtube', url: '#', icon: 'i-lucide-tv' },
    { name: 'Prime', url: '#', icon: 'i-lucide-clapperboard' }
  ],
  pressQuotes: () => [
    { text: 'A visual masterpiece that redefines the genre.', author: 'The New York Times', rating: 5 },
    { text: 'Unforgettable and hauntingly beautiful.', author: 'The Guardian', rating: 5 }
  ],
  primaryCta: 'Watch Trailer',
  secondaryCta: 'View Screenings'
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <NuxtImg
        :src="image"
        :alt="title"
        :height="100"
        class="size-full object-cover opacity-40 grayscale"
      />
      <div class="absolute inset-0 bg-linear-to-t from-muted via-muted/40 to-transparent" />
      <div class="absolute inset-0 bg-linear-to-r from-muted via-transparent to-muted/20" />
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center min-h-screen">
      <div class="flex flex-wrap gap-16 mb-16 items-center">
        <div
          v-for="a in accolades"
          :key="a.label"
          class="flex flex-col items-center text-center"
        >
          <UIcon
            :name="a.icon"
            :class="[accentColor, 'size-10 mb-2']"
          />
          <span class="text-sm uppercase tracking-[0.3em] opacity-60">{{ a.label }}</span>
          <span class="text-xs font-bold">{{ a.source }}</span>
        </div>
      </div>
      <div class="grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-8 space-y-8">
          <div class="flex items-center gap-6">
            <UBadge
              :label="props.rating"
              variant="outline"
              color="primary"
              class="border-2 px-4 py-1"
            />
            <span class="h-px w-16 bg-muted/40" />
            <span class="text-sm uppercase tracking-widest opacity-80">
              {{ year }} • {{ duration }}
            </span>
          </div>
          <h1 class="text-7xl md:text-9xl uppercase tracking-tighter leading-none">
            {{ title }}
          </h1>
          <p :class="['text-2xl md:text-4xl font-light italic max-w-3xl border-l-8 pl-10 py-4', accentColor.replace('text-', 'border-')]">
            {{ subtitle }}
          </p>
          <p class="text-xl text-info max-w-2xl leading-relaxed font-medium">
            {{ synopsis }}
          </p>

          <div class="flex flex-wrap gap-6 pt-8">
            <UButton
              size="xl"
              :label="primaryCta"
              color="primary"
              class="uppercase tracking-widest"
              icon="i-lucide-play"
            />
            <UButton
              size="xl"
              :label="secondaryCta"
              variant="outline"
              color="info"
              class="uppercase tracking-widest"
              icon="i-lucide-calendar"
            />
          </div>
        </div>
        <div class="lg:col-span-4 space-y-12 lg:border-l border-muted lg:pl-12 pt-12 lg:pt-0">
          <div class="space-y-6">
            <div
              v-for="q in pressQuotes"
              :key="q.author"
              class="space-y-2"
            >
              <div class="flex gap-1">
                <UIcon
                  v-for="i in q.rating"
                  :key="i"
                  name="i-lucide-star"
                  :class="[accentColor, 'size-4']"
                />
              </div>
              <q class="text-lg font-bold italic">
                "{{ q.text }}"
              </q>
              <p class="text-xs uppercase tracking-widest opacity-50">
                — {{ q.author }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <p :class="['text-sm uppercase tracking-widest mb-2', accentColor]">
                Director
              </p>
              <p class="text-lg uppercase">
                {{ director }}
              </p>
            </div>
            <div>
              <p :class="['text-sm uppercase tracking-widest mb-2', accentColor]">
                Narrator
              </p>
              <p class="text-lg uppercase">
                {{ narrator }}
              </p>
            </div>
          </div>

          <div>
            <p :class="['text-sm uppercase tracking-widest mb-2', accentColor]">
              Featuring
            </p>
            <p class="text-sm font-bold opacity-80 leading-loose uppercase tracking-wider">
              {{ cast.join(' / ') }}
            </p>
          </div>

          <div class="pt-8 border-t border-white/10 space-y-6">
            <div>
              <p class="text-sm uppercase tracking-widest mb-4 opacity-40">
                Streaming Now
              </p>
              <div class="flex gap-4">
                <UButton
                  v-for="s in streamingOn"
                  :key="s.name"
                  :to="s.url"
                  variant="soft"
                  color="neutral"
                  size="sm"
                  :icon="s.icon"
                  :label="s.name"
                />
              </div>
            </div>
            <div class="flex items-center justify-between pt-4">
              <div class="flex gap-4">
                <UButton
                  v-for="link in socials"
                  :key="link.platform"
                  :to="link.url"
                  variant="ghost"
                  color="primary"
                  :icon="link.icon"
                />
              </div>
              <div class="text-right">
                <p class="text-sm uppercase tracking-tighter opacity-30">
                  {{ productionCompany }}
                </p>
                <p class="text-sm opacity-30">
                  {{ copyright }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
