<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
/* import { Container, Draggable } from 'vue3-smooth-dnd' */
import { project } from './data'
import { Motion } from 'motion-v'

interface ColumnContent {
  title: string
  tasks: any[]
}

interface Column {
  [key: string]: ColumnContent
}

const columns = reactive<Column>({
  new: {
    title: $t('menu.board.state.new'),
    tasks: []
  },
  inProgress: {
    title: $t('menu.board.state.progress'),
    tasks: []
  },
  blocked: {
    title: $t('menu.board.state.blocked'),
    tasks: []
  },
  onHold: {
    title: $t('menu.board.state.hold'),
    tasks: []
  },
  inReview: {
    title: $t('menu.board.state.review'),
    tasks: []
  },
  done: {
    title: $t('menu.board.state.done'),
    tasks: []
  }
})

const tasks = ref(project.tasks)

if (tasks.value) {
  for (const task of tasks.value) {
    switch (task.status) {
      case 0:
        columns.new?.tasks.push(task)
        break
      case 1:
        columns.inProgress?.tasks.push(task)
        break
      case 2:
        columns.blocked?.tasks.push(task)
        break
      case 3:
        columns.onHold?.tasks.push(task)
        break
      case 4:
        columns.inReview?.tasks.push(task)
        break
      case 5:
        columns.done?.tasks.push(task)
        break
    }
  }
}

const board = computed(() => Object.values(columns || {}))

const currentTask = ref()

function openTaskPanel(id: number, tasks: any) {
  currentTask.value = tasks.find((task: any) => task.id === id)
}

function onDrop(column: ColumnContent, dropResult: { addedIndex: number | null, removedIndex: number | null }) {
  if (
    typeof dropResult?.addedIndex !== 'number'
    || typeof dropResult?.removedIndex !== 'number'
  ) {
    return
  }
  if (dropResult.addedIndex === dropResult.removedIndex) {
    return
  }

  let itemToAdd

  if (dropResult.removedIndex !== null) {
    itemToAdd = column.tasks.splice(dropResult.removedIndex, 1)[0]
  }
  if (dropResult.addedIndex !== null) {
    column.tasks.splice(dropResult.addedIndex, 0, itemToAdd)
  }
}
const constraintsRef = ref<HTMLDivElement>()
</script>

<template>
  <div>
    <UCard class="rounded-lg overflow-hidden">
      <div class="w-full h-[825px] flex flex-col">
        <div class="w-full bg-default/80 transition-all duration-300 border-b border-muted">
          <nav class="relative mx-auto w-full px-4 md:px-6">
            <div class="flex w-full items-center justify-between h-16 flex-row">
              <div class="grow w-auto">
                <div class="flex h-16 w-full items-center gap-x-4">
                  <NuxtLinkLocale
                    to="/"
                    class="flex items-center justify-center"
                  >
                    <Icon
                      name="lucide:cat"
                      class="size-8 text-default/80"
                    />
                  </NuxtLinkLocale>
                  <KanWork />
                </div>
              </div>
              <div class="row items-center z-0 block bg-transparent">
                <div class="flex items-center justify-end gap-2">
                  <div
                    role="button"
                    class="cursor-pointer h-8 w-48 hidden md:flex items-center justify-between bg-default/80 text-muted hover:text-default hover:ring-muted gap-2 ps-3 pe-1 py-1 rounded-md ring-1 ring-muted transition-colors duration-300"
                  >
                    <div class="pointer-events-none">
                      <span class="text-sm">
                        {{ $t('menu.board.search') }}
                      </span>
                    </div>
                    <div class="flex gap-1">
                      <UKbd
                        size="sm"
                        variant="soft"
                        class="h-6"
                      >
                        Ctrl
                      </UKbd>
                      <UKbd
                        size="sm"
                        variant="soft"
                        class="px-2 font-semibold h-6"
                      >
                        K
                      </UKbd>
                    </div>
                  </div>
                  <KanUserMenu />
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="w-full bg-default/80 overflow-hidden">
          <div class="flex items-center justify-between h-14 w-full px-4 md:px-6">
            <p>{{ project.name }}</p>
            <UAvatarGroup
              :avatars="project.team"
              size="xs"
              :limit="4"
              class="grayscale"
            />
          </div>
        </div>
        <div class="grow h-[calc(100%-7.5rem)] flex w-full ps-4 md:ps-6 space-x-6 bg-default/80 overflow-x-auto transition-all duration-300 hover:bg-radial from-primary/10">
          <div
            v-for="column in board"
            :key="column.title"
            class="flex h-full w-72 shrink-0 flex-col"
          >
            <div class="flex h-14 shrink-0 items-center px-2">
              <span class="block  text-sm font-semibold">
                {{ column.title }}
              </span>
              <span class="text-muted ms-2 flex size-5 items-center justify-center text-sm font-semibold">
                {{ column.tasks.length }}
              </span>
              <UButton
                variant="soft"
                icon="lucide-plus"
              />
            </div>
            <div class="overflow-auto pb-10 pe-2">
              <Motion
                as="div"
                class="flex flex-col gap-y-4"
                :drop="(dropResult: any) => onDrop(column, dropResult)"
              >
                <template v-if="column.tasks.length > 0">
                  <Motion
                    v-for="task in column.tasks"
                    :key="task.id"
                    ref="constraintsRef"
                    as="div"
                  >
                    <Motion
                      as="button"
                      drag="y"
                      :drag-constraints="{ top: -300, bottom: 300 }"
                      :while-drag="{ scale: 1.2, rotate: 9, z: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }"
                      class="border-muted group relative flex cursor-pointer flex-col items-start rounded-lg border bg-default/80 p-4 hover:bg-muted/80"
                      draggable
                      @click="() => openTaskPanel(task.id, project?.tasks)"
                    >
                      <div class="relative mb-2">
                        <div class="mb-2 flex w-full items-center justify-between gap-2">
                          <UBadge variant="outline">
                            {{ $t('menu.board.task') }} #{{ task.id }}
                          </UBadge>
                          <p class="text-muted">
                            {{ task.created }}
                          </p>
                        </div>
                        <h4 class="text-md">
                          {{ task.name }}
                        </h4>
                      </div>
                      <Motion
                        as="div"
                        class="text-muted mt-2 flex w-full items-center justify-between text-xs"
                      >
                        <div class="flex items-center gap-2">
                          <UAvatar
                            :src="task.assignee.src"
                            size="xs"
                            class="shrink-0 grayscale"
                          />
                          <p class="text-muted">
                            {{ task.assignee.tooltip }}
                          </p>
                        </div>
                        <div class="text-muted flex items-center gap-1">
                          <UPopover mode="hover">
                            <UButton
                              color="success"
                              icon="lucide:circle-check"
                              variant="ghost"
                            />
                            <template #content>
                              <div
                                v-if="task.checklist.length"
                                class="p-2 gap-1 flex"
                              >
                                <UBadge
                                  :label="task.checklist.length"
                                  size="lg"
                                  variant="subtle"
                                />
                                {{ $t('menu.board.substask', task.checklist.length) }}
                                <!-- {{ ` subtask${task.checklist.length > 1 ? 's' : ''} in checklist` }} -->
                              </div>
                            </template>
                          </UPopover>
                          <UPopover mode="hover">
                            <UButton
                              color="warning"
                              icon="lucide:file-text"
                              variant="ghost"
                            />
                            <template #content>
                              <div
                                v-if="task.files.length"
                                class="p-2 gap-1 flex"
                              >
                                <UBadge
                                  :label="task.files.length"
                                  size="lg"
                                  variant="subtle"
                                />
                                {{ $t('files_uploaded', task.files.length) }}
                                <!-- {{ ` file${task.files.length > 1 ? 's' : ''} uploaded` }} -->
                              </div>
                            </template>
                          </UPopover>
                          <UPopover mode="hover">
                            <UButton
                              color="info"
                              icon="lucide:message-circle-more"
                              variant="ghost"
                            />
                            <template #content>
                              <div
                                v-if="task.comments.length"
                                class="p-2 gap-1 flex"
                              >
                                <UBadge
                                  :label="task.comments.length"
                                  size="lg"
                                  variant="subtle"
                                />
                                {{ $t('comment', task.comments.length) }}
                                <!-- {{ ` comment${task.comments.length > 1 ? 's' : ''}` }} -->
                              </div>
                            </template>
                          </UPopover>
                        </div>
                      </Motion>
                    </Motion>
                  </Motion>
                </template>
                <div v-else>
                  <div class="text-muted mt-10 flex items-center justify-center">
                    <Icon
                      name="lucide:list"
                      class="size-12"
                    />
                  </div>
                  <div class="mt-2 text-center">
                    <h4 class="text-lg">
                      {{ $t('menu.board.empty.title') }}
                    </h4>
                    <p class="text-muted mx-auto max-w-[220px]">
                      {{ $t('menu.board.empty.description') }}
                    </p>
                    <UButton
                      icon="lucide:plus"
                      :label="$t('menu.board.newt')"
                      variant="soft"
                    />
                  </div>
                </div>
              </Motion>
            </div>
          </div>
          <div class="flex w-72 shrink-0 flex-col">
            <div class="flex h-14 shrink-0 items-center px-2">
              <span class="block text-sm font-semibold">
                {{ $t('menu.board.customize') }}
              </span>
            </div>
            <div class="w-full">
              <UButton
                variant="soft"
                icon="lucide-arrow-up"
                :label="$t('menu.board.manage')"
                class="cursor-pointer text-muted hover:text-default border-muted hover:border-muted flex h-12 w-full items-center justify-center gap-x-2 rounded-lg border-2 border-dashed px-6 transition-colors duration-300- hover:border-solid"
              />
            </div>
          </div>
          <div class="w-6 shrink-0" />
        </div>
      </div>
    </UCard>
  </div>
</template>
