<template>
  <div
    class="bg-transparent min-h-110 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg"
  >
    <NuxtImg
      src="/ns-logo-dark.webp"
      :width="80"
      :height="80"
      class="z-10 rounded-full duration-300 hover:scale-110 active:scale-130"
    />
    <StarsBg />
    <AOrbit
      class="size-8 items-center justify-center border-none bg-transparent"
      :duration="30"
      :delay="0"
      :radius="120"
      direction="reverse"
      to="/fi"
    >
      <Icon
        name="simple-icons-whatsapp"
        size="24"
        class="text-success"
      />
    </AOrbit>
    <AOrbit
      class="size-12 items-center justify-center border-none bg-transparent"
      :duration="40"
      :delay="8"
      :radius="160"
      direction="normal"
    >
      <Icon
        name="simple-icons-facebook"
        size="24"
      />
    </AOrbit>
    <AOrbit
      class="size-8 items-center justify-center border-none bg-transparent"
      :duration="20"
      :delay="10"
      :radius="80"
      path
      direction="reverse"
    >
      <Icon
        name="simple-icons-telegram"
        size="24"
        class="text-info"
      />
    </AOrbit>
    <AOrbit
      class="size-10 items-center justify-center border-none bg-transparent"
      :duration="20"
      :delay="70"
      :radius="80"
      direction="normal"
    >
      <Icon
        name="lucide-at-sign"
        size="28"
        class="text-warning"
      />
    </AOrbit>
    <AOrbit
      class="size-12.5 items-center justify-center border-none bg-transparent"
      :radius="190"
      :duration="60"
      path
    >
      <Icon
        name="simple-icons-google-drive"
        size="50"
      />
    </AOrbit>
    <AOrbit
      class="size-10 items-center justify-center border-none bg-transparent"
      :radius="120"
      :duration="30"
      :delay="100"
      direction="reverse"
    >
      <Icon
        name="simple-icons-github"
        size="34"
      />
    </AOrbit>
    <AOrbit
      class="items-center justify-center border-none bg-transparent text-4xl"
      :radius="140"
      :delay="4"
    >
      🌕
    </AOrbit>
  </div>
</template>
