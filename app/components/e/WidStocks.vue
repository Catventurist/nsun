<template>
  <AWidGet
    design="default"
    variant="shadow"
    title="Stonks"
  >
    <div class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
      +2.76
    </div>
    <div class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
      +0.47%
    </div>
    <template #footer>
      <div class="flex-col items-start">
        <h3 class="text-xl font-medium">
          Northern Sun
        </h3>
        <div class="text-muted text-base">
          Well-being
        </div>
      </div>
    </template>
  </AWidGet>
</template>
