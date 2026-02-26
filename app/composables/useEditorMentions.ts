import type { EditorMentionMenuItem } from '@nuxt/ui'
import type { CollaborationUser } from './useEditorCollaboration'

const FALLBACK_USERS = [{
  label: 'Catventurist',
  avatar: { src: '/cat.png' }
}, {
  label: 'Hannu',
  avatar: { src: '/ns-logo-dark.webp' }
}]

export function useEditorMentions(collaborationUsers?: Ref<CollaborationUser[]>) {
  const items = computed<EditorMentionMenuItem[]>(() => {
    if (!collaborationUsers?.value?.length) {
      return FALLBACK_USERS
    }

    return collaborationUsers.value.map(user => ({
      label: user.name,
      avatar: {
        alt: user.name,
        style: { color: user.color }
      }
    }))
  })

  return {
    items
  }
}
