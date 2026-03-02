<script setup lang="ts">
import { DATA } from '@/utils/resume'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'

const BLUR_FADE_DELAY = 0.04
</script>

<template>
  <div class="min-h-dvh flex flex-col gap-14 mt-10 mx-4 relative">
    <section id="hero">
      <div class="mx-auto w-full max-w-2xl space-y-8">
        <div class="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
          <div class="gap-2 flex flex-col order-2 md:order-1">
            <MBlurFadeText
              :delay="BLUR_FADE_DELAY"
              class="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
              :y-offset="8"
              :text="`Hi, I'm ${DATA.name.split(' ')[0]}`"
            />
            <MBlurFadeText
              class="text-muted max-w-[600px] md:text-lg lg:text-xl"
              :delay="BLUR_FADE_DELAY"
              :text="DATA.description"
            />
          </div>
          <MBlurFade
            :delay="BLUR_FADE_DELAY"
            class="order-1 md:order-2"
          >
            <UAvatar
              :src="DATA.avatarUrl"
              :alt="DATA.name"
              class="size-24 md:size-32 rounded-full shadow-lg shadow-primary ring-4 ring-muted"
            />
          </MBlurFade>
        </div>
      </div>
    </section>
    <section id="about">
      <div class="flex min-h-0 flex-col gap-y-4">
        <MBlurFade :delay="BLUR_FADE_DELAY * 3">
          <h2 class="text-xl font-bold">
            About
          </h2>
        </MBlurFade>
        <MBlurFade :delay="BLUR_FADE_DELAY * 4">
          <div class="prose max-w-full text-pretty leading-relaxed text-muted dark:prose-invert">
            <MDC :value="DATA.summary" />
          </div>
        </MBlurFade>
      </div>
    </section>
    <section id="work">
      <div class="flex min-h-0 flex-col gap-y-6">
        <MBlurFade :delay="BLUR_FADE_DELAY * 5">
          <h2 class="text-xl font-bold">
            Work Experience
          </h2>
        </MBlurFade>
        <MBlurFade :delay="BLUR_FADE_DELAY * 6">
          <AccordionRoot
            type="single"
            collapsible
            class="w-full grid gap-6"
          >
            <AccordionItem
              v-for="work in DATA.work"
              :key="work.company"
              :value="work.company"
              class="w-full border-b-0 grid gap-2"
            >
              <AccordionTrigger class="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
                <div class="flex items-center gap-x-3 justify-between w-full text-left">
                  <div class="flex items-center gap-x-3 flex-1 min-w-0">
                    <NuxtImg
                      :src="work.logoUrl"
                      :alt="work.company"
                      :height="20"
                      :width="20"
                      class="rouded-full"
                    />
                    <div class="flex-1 min-w-0 gap-0.5 flex flex-col">
                      <div class="font-semibold leading-none flex items-center gap-2">
                        {{ work.company }}
                        <span class="relative inline-flex items-center size-3.5">
                          <Icon
                            name="lucide-chevron-right"
                            class="absolute size-3.5 shrink-0 text-muted stroke-2 transition-all duration-300 ease-out translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                          />
                          <Icon
                            name="lucide-chevron-down"
                            class="absolute size-3.5 shrink-0 text-muted stroke-2 transition-all duration-200 opacity-0 rotate-0 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                          />
                        </span>
                      </div>
                      <div class="text-sm text-muted">
                        {{ work.title }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 text-xs tabular-nums text-muted text-right flex-none">
                    <span>
                      {{ work.start }} - {{ work.end ?? 'Present' }}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent class="p-0 ml-13 text-xs sm:text-sm text-muted">
                {{ work.description }}
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </MBlurFade>
      </div>
    </section>
    <section id="education">
      <div class="flex min-h-0 flex-col gap-y-6">
        <MBlurFade :delay="BLUR_FADE_DELAY * 7">
          <h2 class="text-xl font-bold">
            Education
          </h2>
        </MBlurFade>
        <div class="flex flex-col gap-8">
          <MBlurFade
            v-for="(education, index) in DATA.education"
            :key="education.school"
            :delay="BLUR_FADE_DELAY * 8 + index * 0.05"
          >
            <NuxtLink
              :to="education.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-x-3 justify-between group"
            >
              <div class="flex items-center gap-x-3 flex-1 min-w-0">
                <NuxtImg
                  v-if="education.logoUrl"
                  :src="education.logoUrl"
                  :alt="education.school"
                  class="size-8 md:size-10 p-1rounded-full ring-2 ring-muted overflow-hidden object-contain flex-none"
                />
                <div
                  v-else
                  class="size-8 md:size-10 p-1 rounded-full ring-2 ring-muted bg-muted flex-none"
                />
                <div class="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div class="font-semibold leading-none flex items-center gap-2">
                    {{ education.school }}
                    <Icon
                      name="lucide-arrow-up-right"
                      class="size-3.5 text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </div>
                  <div class="font-sans text-sm text-muted">
                    {{ education.degree }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-1 text-xs tabular-nums text-muted text-right flex-none">
                <span>
                  {{ education.start }} - {{ education.end }}
                </span>
              </div>
            </NuxtLink>
          </MBlurFade>
        </div>
      </div>
    </section>
    <section id="skills">
      <div class="flex min-h-0 flex-col gap-y-4">
        <MBlurFade :delay="BLUR_FADE_DELAY * 9">
          <h2 class="text-xl font-bold">
            Skills
          </h2>
        </MBlurFade>
        <div class="flex flex-wrap gap-2">
          <MBlurFade
            v-for="(skill, id) in DATA.skills"
            :key="skill.name"
            :delay="BLUR_FADE_DELAY * 10 + id * 0.05"
          >
            <div class="border bg-muted border-muted ring-2 ring-muted/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
              <Icon
                v-if="skill.icon"
                :name="skill.icon"
                class="size-4 rounded overflow-hidden object-contain"
              />
              <span class="text-sm font-medium">
                {{ skill.name }}
              </span>
            </div>
          </MBlurFade>
        </div>
      </div>
    </section>
    <section id="projects">
      <MBlurFade :delay="BLUR_FADE_DELAY * 11">
        <div id="projects">
          <div class="flex min-h-0 flex-col gap-y-8">
            <div class="flex flex-col gap-y-4 items-center justify-center">
              <div class="flex items-center w-full">
                <div class="flex-1 h-px bg-linear-to-r from-transparent from-5% via-muted via-95% to-transparent" />
                <div class="border border-muted bg-primary/20 z-10 rounded-xl px-4 py-1">
                  <span class="text-muted text-sm font-medium">
                    My Projects
                  </span>
                </div>
                <div class="flex-1 h-px bg-linear-to-l from-transparent from-5% via-muted via-95% to-transparent" />
              </div>
              <div class="flex flex-col gap-y-3 items-center justify-center">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Check out my latest work
                </h2>
                <p class="text-muted md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                  I have worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
              <MBlurFade
                v-for="(project, index) in DATA.projects"
                :key="project.title"
                :delay="BLUR_FADE_DELAY * 12 + index * 0.05"
                class="h-full"
              >
                <UPageCard
                  :to="project.href"
                  :title="project.title"
                  :image="project.image"
                  class="size-full"
                >
                  <template #description>
                    <MDC :value="project.description" />
                  </template>
                </UPageCard>
              </MBlurFade>
            </div>
          </div>
        </div>
      </MBlurFade>
    </section>
    <section id="hackathons">
      <!-- <MBlurFade :delay="BLUR_FADE_DELAY * 13">
        <div
          id="hackathons"
          class="overflow-hidden"
        >
          <div class="flex min-h-0 flex-col gap-y-8 w-full">
            <div class="flex flex-col gap-y-4 items-center justify-center">
              <div class="flex items-center w-full">
                <div class="flex-1 h-px bg-linear-to-r from-transparent from-5% via-muted via-95% to-transparent" />
                <div class="border bg-primary/20 z-10 rounded-xl px-4 py-1">
                  <span class="text-primary text-sm font-medium">
                    Hackathons
                  </span>
                </div>
                <div class="flex-1 h-px bg-linear-to-l from-transparent from-5% via-muted via-95% to-transparent" />
              </div>
              <div class="flex flex-col gap-y-3 items-center justify-center">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
                  I like building things
                </h2>
                <p class="text-muted md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                  During my time in the past, I attended
                  {{ DATA.hackathons.length }}+
                  hackathons. People from around the country would come together and build incredible things in 2-3 days. It was eye-opening to see the endless possibilities brought to life by a group of motivated and passionate individuals.
                </p>
              </div>
            </div>
            <UTimeline :items="DATA.hackathons">
              <template #description="{ item }">
                <MDC
                  v-if="item.description"
                  :value="item.description"
                />
              </template>
            </UTimeline>
          </div>
        </div>
      </MBlurFade> -->
    </section>
    <section id="contact">
      <MBlurFade :delay="BLUR_FADE_DELAY * 16">
        <div class="rounded-xl p-10 relative">
          <div class="absolute -top-4 border bg-primary/20 z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
            <span class="text-muted text-sm font-medium">
              Contact
            </span>
          </div>
          <div class="relative flex flex-col items-center gap-4 text-center">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p class="mx-auto max-w-lg text-muted text-balance">
              Want to chat? Just shoot me a message
              <NuxtLink
                to="https://t.me/Catventurists"
                target="_blank"
                rel="noopener noreferrer"
                class="text-info hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 rounded-sm"
              >
                with a direct question on Telegram
              </NuxtLink>
              and I will respond whenever I can.
            </p>
          </div>
        </div>
      </MBlurFade>
    </section>
  </div>
</template>
