<script setup lang="ts">
const workspaces = ref([
  {
    id: 1,
    name: $t('menu.work.business'),
    logo: '/cat.png'
  },
  {
    id: 2,
    name: $t('menu.work.hdesk'),
    logo: '/catbirchdark.webp'
  },
  {
    id: 3,
    name: $t('menu.work.innovation'),
    logo: '/catbirch.webp'
  }
])

const selectedWorkspace = ref(workspaces.value[0])
const target = ref(null)
const open = ref(false)

function openDropdown() {
  open.value = true
}

onClickOutside(target, () => (open.value = false))

function setWorkspace(workspace: { id: number, name: string, logo: string } | { id: number, name: string, logo: string } | undefined) {
  selectedWorkspace.value = workspace
  open.value = false
}
</script>

<template>
  <div
    ref="target"
    class="group/workspace relative z-10 ms-auto w-full max-w-[170px] md:ms-0 me-4 md:me-0 md:max-w-[240px]"
  >
    <button
      type="button"
      class="w-full max-w-[170px] rounded-lg py-1.5 pe-3 ps-2 border border-muted  transition-colors duration-300 group-hover/workspace:bg-muted-100 dark:group-hover/workspace:bg-muted/60 md:max-w-[240px]"
      :class="open && 'bg-muted/60'"
      @click="openDropdown()"
    >
      <span class="flex w-full items-center gap-3 text-start">
        <UAvatar
          size="xs"
          :src="selectedWorkspace?.logo"
          class="grayscale"
        />
        <div>
          <p
            size="sm"
            class="line-clamp-1 block text-muted dark:text-muted"
          >
            {{ selectedWorkspace?.name }}
          </p>
        </div>
        <Icon
          name="lucide:chevrons-up-down"
          class="ms-auto size-4 text-muted transition-transform duration-300"
          :class="open && 'rotate-180'"
        />
      </span>
    </button>
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="absolute inset-e-0 top-12 backdrop-blur-sm w-full min-w-[280px] overflow-hidden rounded-xl border border-muted bg-default/80 md:inset-s-0 md:min-w-[575px]"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-muted">
          <div>
            <div class="font-sans flex items-center border-b border-muted ">
              <div class="shrink-0 size-8 flex items-center justify-center">
                <Icon
                  name="lucide:search"
                  class="size-4 text-muted"
                />
              </div>
              <UInput
                type="text"
                class="h-10 px-2 w-full border-none outline-none bg-transparent text-sm text-muted"
                :placeholder="$t('menu.work.find.space')"
              />
              <UButton
                :label="$t('menu.work.esc')"
                variant="soft"
                class="me-2 ms-auto rounded-lg border border-muted px-2 py-0.5"
              />
            </div>
            <div class="flex h-[calc(100%-2.5rem)] flex-col p-3">
              <h4 class="text-muted">
                {{ $t('menu.work.spaces') }}
              </h4>
              <div class="my-3 xs:max-h-[128px] xs:min-h-[128px]">
                <ul class="space-y-1">
                  <li
                    v-for="workspace in workspaces"
                    :key="workspace.id"
                  >
                    <button
                      type="button"
                      class="flex w-full items-center gap-2 rounded-lg py-2 pe-4 ps-2 transition-colors duration hover:bg-muted-100 dark:hover:bg-muted"
                      @click="setWorkspace(workspace)"
                    >
                      <UAvatar
                        size="xs"
                        :src="workspace.logo"
                        class="grayscale"
                      />
                      <p size="sm">
                        {{ workspace.name }}
                      </p>
                      <Icon
                        v-if="selectedWorkspace === workspace"
                        name="lucide:check"
                        class="ms-auto size-4 text-muted"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="mt-auto">
                <UButton
                  :label="$t('menu.work.create.space')"
                  icon="lucide:plus"
                  variant="subtle"
                  class="w-full"
                />
              </div>
            </div>
          </div>
          <div class="block">
            <div class="font-sans flex items-center border-b border-muted ">
              <div class="shrink-0 size-8 flex items-center justify-center">
                <Icon
                  name="lucide:search"
                  class="size-4 text-muted"
                />
              </div>
              <UInput
                type="text"
                class="h-10 px-2 w-full border-none outline-none bg-transparent text-sm text-muted"
                :placeholder="$t('menu.work.find.project')"
              />
              <UButton
                :label="$t('menu.work.esc')"
                variant="soft"
                class="me-2 ms-auto rounded-lg border border-muted px-2 py-0.5"
              />
            </div>
            <div class="flex h-[calc(100%-2.5rem)] flex-col p-3">
              <h4 class="text-muted">
                {{ $t('menu.work.projects') }}
              </h4>
              <div class="my-3 xs:max-h-[128px] xs:min-h-[128px]">
                <ul>
                  <li>
                    <div>
                      <h4>
                        {{ $t('menu.work.empty.title') }}
                      </h4>
                      <p class="text-muted">
                        {{ $t('menu.work.empty.description') }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-auto">
                <UButton
                  icon="lucide:plus"
                  :label="$t('menu.work.create.project')"
                  variant="soft"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
