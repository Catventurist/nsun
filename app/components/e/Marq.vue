<template>
  <UPageHero
    :title="$t('header.partners.title')"
    :description="$t('header.partners.description')"
  >
    <UMarquee
      :overlay="true"
      class="**:size-10 **:shrink-0 **:text-primary"
    >
      <UIcon name="i-simple-icons-github" />
      <UIcon name="i-simple-icons-x" />
      <UIcon name="i-simple-icons-signal" />
      <UIcon name="i-simple-icons-telegram" />
      <UIcon name="i-simple-icons-facebook" />
    </UMarquee>
  </UPageHero>
</template>
