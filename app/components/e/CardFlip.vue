<template>
  <div class="flex items-center justify-center">
    <AFlipCard>
      <template #default>
        <NuxtImg
          src="/ns-logo-dark.webp"
          alt="logo"
          class="size-full rounded-2xl object-cover shadow-md shadow-primary"
        />
        <div class="absolute bottom-4 left-4 text-xl font-bold text-default text-shadow-md text-shadow-primary">
          {{ $t('site.offer') }}
        </div>
      </template>
      <template #back>
        <div class="flex min-h-full flex-col gap-2 justify-between">
          <h1 class="text-xl font-bold text-default">
            {{ $t('site.title') }}
          </h1>
          <p class="mt-1 border-y border-y-muted py-4 text-pretty leading-normal font-medium text-muted duration-300 hover:text-default">
            {{ $t('site.description') }}
          </p>
          <UButton
            :label="$t('product.more')"
            icon="lucide-info"
            variant="soft"
            class="w-full"
          />
        </div>
      </template>
    </AFlipCard>
  </div>
</template>
