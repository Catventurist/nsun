<script setup lang="ts">
const appConfig = useAppConfig()
const { footerLinks } = useHeader()
const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: $t('header.subscribed.title'),
    description: $t('header.subscribed.description')
  })
}
</script>

<template>
  <USeparator
    :icon="appConfig.ui.icons.cat"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerLinks">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                :label="$t('header.subscribe.description')"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  :placeholder="$t('header.subscribe.enter')"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      variant="soft"
                      :trailing-icon="appConfig.ui.icons.send"
                      :label="$t('header.subscribe.title')"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        {{ appConfig.footer.credits }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://t.me/catventurists"
        target="_blank"
        icon="i-simple-icons-telegram"
        aria-label="Telegram"
        color="info"
        variant="ghost"
      />
      <UButton
        to="https://www.facebook.com/NorthernSunUprising"
        target="_blank"
        icon="i-simple-icons-facebook"
        aria-label="Facebook"
        color="info"
        variant="ghost"
      />
      <UButton
        to="https://github.com/Catventurist/nsun"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
