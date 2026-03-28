<template>
  <div class="flex flex-col overflow-hidden">
    <AContainerScroll>
      <template #title>
        <h2 class="text-3xl font-semibold text-success">
          Mining and Ecology
          <br>
          <span class="mt-1 text-4xl leading-none font-bold text-warning">
            The Earth at the Turning Point
          </span>
        </h2>
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
