<template>
  <div class="flex items-center justify-center">
    <AFlipCard>
      <template #default>
        <NuxtImg
          src="/catbirchdark.webp"
          alt="image"
          class="size-full rounded-2xl object-cover shadow-md shadow-primary"
        />
        <div class="absolute bottom-4 left-4 text-xl font-bold text-default text-shadow-md text-shadow-primary">
          Pohjoinen Aurinko
        </div>
      </template>
      <template #back>
        <div class="flex min-h-full flex-col gap-2 justify-between">
          <h1 class="text-xl font-bold text-default">
            Northern Sun
          </h1>
          <p class="mt-1 border-y border-y-muted py-4 text-pretty leading-normal font-medium text-muted duration-300 hover:text-default">
            We offer some great products and cultivation information.
          </p>
          <UButton
            label="Read more"
            icon="lucide-info"
            variant="soft"
            class="w-full"
          />
        </div>
      </template>
    </AFlipCard>
  </div>
</template>
