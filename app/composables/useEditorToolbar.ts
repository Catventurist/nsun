import type { EditorToolbarItem, EditorCustomHandlers } from '@nuxt/ui'
import type { Editor } from '@tiptap/vue-3'

interface UseEditorToolbarOptions {
  aiLoading?: Ref<boolean | undefined>
}

export function useEditorToolbar<T extends EditorCustomHandlers>(_customHandlers?: T, options: UseEditorToolbarOptions = {}) {
  const { aiLoading } = options
  const { t } = useI18n()
  const toolbarItems: EditorToolbarItem<T>[][] = [[{
    kind: 'undo',
    icon: 'i-lucide-undo',
    tooltip: { text: t('editor.undo') }
  }, {
    kind: 'redo',
    icon: 'i-lucide-redo',
    tooltip: { text: t('editor.redo') }
  }], [{
    kind: 'imageUpload',
    label: t('editor.add.title'),
    icon: 'i-lucide-image',
    tooltip: { text: t('editor.add.image') }
  }]]

  const bubbleToolbarItems = computed(() => [[{
    icon: 'i-lucide-sparkles',
    label: t('editor.slopify'),
    activeColor: 'neutral',
    activeVariant: 'ghost',
    loading: aiLoading?.value,
    content: {
      align: 'start'
    },
    items: [{
      kind: 'aiFix',
      label: t('editor.spelling'),
      icon: 'i-lucide-spell-check'
    }, {
      kind: 'aiExtend',
      label: t('editor.extend'),
      icon: 'i-lucide-unfold-vertical'
    }, {
      kind: 'aiReduce',
      label: t('editor.reduce'),
      icon: 'i-lucide-fold-vertical'
    }, {
      kind: 'aiSimplify',
      label: t('editor.simplify'),
      icon: 'i-lucide-lightbulb'
    }, {
      kind: 'aiContinue',
      label: t('editor.continue'),
      icon: 'i-lucide-text'
    }, {
      kind: 'aiSummarize',
      label: t('editor.summarize'),
      icon: 'i-lucide-list'
    }, {
      label: t('editor.translate'),
      icon: 'i-lucide-languages',
      children: [{
        kind: 'aiTranslate',
        language: 'English',
        label: t('editor.english')
      }, {
        kind: 'aiTranslate',
        language: 'Finnish',
        label: t('editor.finnish')
      }, {
        kind: 'aiTranslate',
        language: 'French',
        label: t('editor.french')
      }, {
        kind: 'aiTranslate',
        language: 'Spanish',
        label: t('editor.spanish')
      }, {
        kind: 'aiTranslate',
        language: 'German',
        label: t('editor.german')
      }]
    }]
  }], [{
    label: t('editor.turn'),
    trailingIcon: 'i-lucide-chevron-down',
    activeColor: 'neutral',
    activeVariant: 'ghost',
    tooltip: { text: t('editor.turn') },
    content: {
      align: 'start'
    },
    ui: {
      label: 'text-xs'
    },
    items: [{
      type: 'label',
      label: t('editor.turn')
    }, {
      kind: 'paragraph',
      label: t('editor.paragraph'),
      icon: 'i-lucide-type'
    }, {
      kind: 'heading',
      level: 1,
      label: t('editor.heading') + ' 1',
      icon: 'i-lucide-heading-1'
    }, {
      kind: 'heading',
      level: 2,
      label: t('editor.heading') + ' 2',
      icon: 'i-lucide-heading-2'
    }, {
      kind: 'heading',
      level: 3,
      label: t('editor.heading') + ' 3',
      icon: 'i-lucide-heading-3'
    }, {
      kind: 'heading',
      level: 4,
      label: t('editor.heading') + ' 4',
      icon: 'i-lucide-heading-4'
    }, {
      kind: 'bulletList',
      label: t('editor.bullet'),
      icon: 'i-lucide-list'
    }, {
      kind: 'orderedList',
      label: t('editor.ordered'),
      icon: 'i-lucide-list-ordered'
    }, {
      kind: 'taskList',
      label: t('editor.task'),
      icon: 'i-lucide-list-check'
    }, {
      kind: 'blockquote',
      label: t('editor.blockquote'),
      icon: 'i-lucide-text-quote'
    }]
  }], [{
    kind: 'mark',
    mark: 'bold',
    icon: 'i-lucide-bold',
    tooltip: { text: 'Bold' }
  }, {
    kind: 'mark',
    mark: 'italic',
    icon: 'i-lucide-italic',
    tooltip: { text: 'Italic' }
  }, {
    kind: 'mark',
    mark: 'underline',
    icon: 'i-lucide-underline',
    tooltip: { text: 'Underline' }
  }, {
    kind: 'mark',
    mark: 'strike',
    icon: 'i-lucide-strikethrough',
    tooltip: { text: 'Strikethrough' }
  }, {
    kind: 'mark',
    mark: 'code',
    icon: 'i-lucide-code',
    tooltip: { text: 'Code' }
  }], [{
    slot: 'link' as const,
    icon: 'i-lucide-link'
  /* }, {
    kind: 'imageUpload',
    icon: 'i-lucide-image',
    tooltip: { text: 'Image' } */
  }]] satisfies EditorToolbarItem<T>[][])

  const getImageToolbarItems = (editor: Editor): EditorToolbarItem<T>[][] => {
    const node = editor.state.doc.nodeAt(editor.state.selection.from)

    return [[{
      icon: 'i-lucide-download',
      to: node?.attrs?.src,
      download: true,
      tooltip: { text: 'Download' }
    }, {
      icon: 'i-lucide-refresh-cw',
      tooltip: { text: 'Replace' },
      onClick: () => {
        const { state } = editor
        const { selection } = state

        const pos = selection.from
        const node = state.doc.nodeAt(pos)

        if (node && node.type.name === 'image') {
          editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).insertContentAt(pos, { type: 'imageUpload' }).run()
        }
      }
    }], [{
      icon: 'i-lucide-trash',
      tooltip: { text: 'Delete' },
      onClick: () => {
        const { state } = editor
        const { selection } = state

        const pos = selection.from
        const node = state.doc.nodeAt(pos)

        if (node && node.type.name === 'image') {
          editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run()
        }
      }
    }]]
  }

  const getTableToolbarItems = (editor: Editor): EditorToolbarItem<T>[][] => {
    return [[{
      icon: 'i-lucide-between-vertical-start',
      tooltip: { text: 'Add row above' },
      onClick: () => {
        editor.chain().focus().addRowBefore().run()
      }
    }, {
      icon: 'i-lucide-between-vertical-end',
      tooltip: { text: 'Add row below' },
      onClick: () => {
        editor.chain().focus().addRowAfter().run()
      }
    }, {
      icon: 'i-lucide-between-horizontal-start',
      tooltip: { text: 'Add column before' },
      onClick: () => {
        editor.chain().focus().addColumnBefore().run()
      }
    }, {
      icon: 'i-lucide-between-horizontal-end',
      tooltip: { text: 'Add column after' },
      onClick: () => {
        editor.chain().focus().addColumnAfter().run()
      }
    }], [{
      icon: 'i-lucide-rows-3',
      tooltip: { text: 'Delete row' },
      onClick: () => {
        editor.chain().focus().deleteRow().run()
      }
    }, {
      icon: 'i-lucide-columns-3',
      tooltip: { text: 'Delete column' },
      onClick: () => {
        editor.chain().focus().deleteColumn().run()
      }
    }], [{
      icon: 'i-lucide-trash',
      tooltip: { text: 'Delete table' },
      onClick: () => {
        editor.chain().focus().deleteTable().run()
      }
    }]]
  }

  return {
    toolbarItems,
    bubbleToolbarItems,
    getImageToolbarItems,
    getTableToolbarItems
  }
}
