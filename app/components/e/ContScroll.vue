<template>
  <div class="flex flex-col overflow-hidden">
    <AContainerScroll>
      <template #title>
        <h1 class="text-4xl font-semibold text-default">
          {{ $t('site.description') }}
          <br>
          <span class="mt-1 text-4xl leading-none font-bold md:text-[6rem] text-warning">
            {{ $t('site.title') }}
          </span>
        </h1>
      </template>
      <template #card>
        <NuxtImg
          src="/catbirchdark.webp"
          class="mx-auto h-full rounded-2xl object-cover object-top-left"
          alt="cat"
          :height="720"
          :width="1400"
        />
      </template>
    </AContainerScroll>
  </div>
</template>
