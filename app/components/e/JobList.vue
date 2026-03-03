<script setup lang="ts">
const projects = [
  {
    title: $t('jobs.brand.title'),
    image: '/catbirchdark.webp',
    description: $t('jobs.brand.description'),
    client: 'CatVenture',
    role: $t('jobs.brand.pos'),
    skills: [
      'Inkscape',
      'Gimp',
      'Brand'
    ],
    time: '2026-2027',
    link: '#'
  },
  {
    title: $t('jobs.research.title'),
    image: '/catbirchdark.webp',
    description: $t('jobs.research.description'),
    client: 'ShouldConnect',
    role: $t('jobs.research.pos'),
    skills: ['Figma', 'Maze', 'Miro', 'User Research', 'HTML/CSS'],
    time: '2026-2028',
    link: '#'
  },
  {
    title: $t('jobs.product.title'),
    image: '/catbirchdark.webp',
    description: $t('jobs.product.description'),
    client: 'SoftDesign',
    role: $t('jobs.product.pos'),
    skills: [
      'Nuxt',
      'Zod',
      'OAuth'
    ],
    time: '2026-2028',
    link: '#'
  }
]
</script>

<template>
  <div>
    <div class="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
      <UPageHero
        :title="$t('header.jobs.title')"
        :description="$t('header.jobs.description')"
      />
      <div class="space-y-10">
        <div
          v-for="project in projects"
          :key="project.title"
          class="bg-radial to-muted/60 overflow-hidden rounded-xl shadow-sm shadow-primary transition-all hover:bg-primary/20"
        >
          <div class="grid md:grid-cols-3">
            <div class="relative items-center aspect-video w-full overflow-hidden md:aspect-auto md:h-full">
              <NuxtImg
                :src="project.image"
                :alt="project.title"
                :height="300"
                :width="300"
                class="object-cover"
              />
            </div>
            <div class="p-6 md:col-span-2 md:p-8">
              <div class="mb-6 flex flex-wrap gap-2">
                <UBadge
                  v-for="tech in project.skills.slice(0, 3)"
                  :key="tech"
                  :label="tech"
                  variant="subtle"
                />
              </div>
              <h3 class="mb-2 text-xl md:text-2xl">
                {{ project.title }}
              </h3>
              <div class="text-muted mb-8 flex flex-col items-center justify-between flex-wrap gap-x-4 text-sm md:flex-row">
                <span class="flex items-center gap-2">
                  <Icon name="lucide-anvil" />
                  {{ project.client }}
                </span>
                <span class="flex items-center gap-2">
                  <Icon name="lucide-briefcase" />
                  {{ project.role }}
                </span>
                <span class="flex items-center gap-2">
                  <Icon name="lucide-calendar" />
                  {{ project.time }}
                </span>
              </div>
              <p class="text-default mb-6">
                {{ project.description }}
              </p>
              <UButton
                :to="project.link"
                :label="$t('jobs.apply')"
                trailing-icon="lucide-arrow-right"
                variant="link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
