import { z } from 'zod'
import type { AvatarProps } from '@nuxt/ui'

export const MemberSettingsSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['owner', 'admin', 'editor', 'viewer']),
  primaryColor: z.string().default('green'),
  grayTone: z.string().default('zinc'),
  fontFamily: z.enum(['sans', 'mono', 'serif']).default('sans'),
  radius: z.enum(['none', 'sm', 'md', 'lg', 'full']).default('md'),
  iconSet: z.enum(['lucide', 'tabler', 'simple-icons']).default('lucide'),
  privacyMode: z.boolean().default(true),
  compactMode: z.boolean().default(false),
  notifications: z.boolean().default(true)
})

export type MemberSettings = z.infer<typeof MemberSettingsSchema>

export const useMemberSettings = () => {
  const settings = useState<MemberSettings>('member-settings', () => ({
    name: 'Admin User',
    email: 'admin@docs.com',
    role: 'owner',
    primaryColor: 'green',
    grayTone: 'zinc',
    fontFamily: 'sans',
    radius: 'md',
    iconSet: 'lucide',
    privacyMode: true,
    compactMode: false,
    notifications: true
  }))

  if (import.meta.client) {
    const stored = localStorage.getItem('app-settings')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        settings.value = { ...settings.value, ...parsed }
      } catch (e) {
        console.error('Storage sync failed', e)
      }
    }

    watch(settings, (newVal) => {
      localStorage.setItem('app-settings', JSON.stringify(newVal))
    }, { deep: true })
  }

  return settings
}

export const ContractSchema = z.object({
  id: z.string(),
  title: z.string().min(5, 'Contract title must be at least 5 characters'),
  counterparty: z.string().min(2, 'Counterparty name is required'),
  amount: z.number().min(1, 'Contract value must be greater than 0'),
  status: z.enum(['draft', 'pending', 'signed', 'active']),
  terms: z.string().min(10, 'Terms must provide sufficient detail'),
  createdAt: z.date()
})

export type Contract = z.infer<typeof ContractSchema>

export const useVirtualContracts = () => {
  const contracts = useState<Contract[]>('virtual-contracts', () => [])

  if (import.meta.client) {
    const stored = localStorage.getItem('contracts-data')
    if (stored) {
      try {
        contracts.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse contracts', e)
      }
    }

    watch(contracts, (newVal) => {
      localStorage.setItem('contracts-data', JSON.stringify(newVal))
    }, { deep: true })
  }

  return contracts
}

export interface Member {
  id: string
  name: string
  position: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  avatar: AvatarProps
}

export type ResourceType = 'image' | 'post' | 'link'

/* export interface Resource {
  id: string
  type: ResourceType
  title: string
  content: string
  memberId: string
  createdAt: string
  tags: string[]
} */

export const ResourceSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'post', 'link']),
  title: z.string().min(3, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  memberId: z.uuid(),
  createdAt: z.date(),
  tags: z.array(z.string()).default([])
})

export type Resource = z.infer<typeof ResourceSchema>

export const useWorkspaceResources = () => {
  const resources = useState<Resource[]>('workspace-resources', () => [])

  if (import.meta.client) {
    const stored = localStorage.getItem('resource-data')
    if (stored) {
      try {
        resources.value = JSON.parse(stored)
      } catch (e) {
        console.error('Resource storage sync failed', e)
      }
    }

    watch(resources, (newVal) => {
      localStorage.setItem('resource-data', JSON.stringify(newVal))
    }, { deep: true })
  }

  return resources
}

export type ActivityType = 'habit' | 'time' | 'content'

export const ActivitySchema = z.object({
  id: z.string(),
  type: z.enum(['habit', 'time', 'content']),
  title: z.string().min(3, 'Title is required'),
  value: z.number().min(0),
  goal: z.number().optional(),
  memberId: z.string(),
  createdAt: z.date(),
  tags: z.array(z.string()).default([])
})

export type Activity = z.infer<typeof ActivitySchema>

export const useActivityTracker = () => {
  const activities = useState<Activity[]>('activity-data', () => [])

  if (import.meta.client) {
    const stored = localStorage.getItem('activity-store')
    if (stored) {
      try {
        activities.value = JSON.parse(stored)
      } catch (e) {
        console.error('Activity storage sync failed', e)
      }
    }

    watch(activities, (newVal) => {
      localStorage.setItem('activity-store', JSON.stringify(newVal))
    }, { deep: true })
  }

  return activities
}

export const RewardSchema = z.object({
  balance: z.number().default(0),
  totalEarned: z.number().default(0),
  history: z.array(z.object({
    id: z.string(),
    amount: z.number(),
    reason: z.string(),
    timestamp: z.date()
  })).default([])
})

export type Rewards = z.infer<typeof RewardSchema>

export const useRewards = () => {
  const rewards = useState<Rewards>('token-rewards', () => ({
    balance: 0,
    totalEarned: 0,
    history: []
  }))

  if (import.meta.client) {
    const stored = localStorage.getItem('rewards-store')
    if (stored) {
      try {
        rewards.value = JSON.parse(stored)
      } catch (e) {
        console.error('Rewards storage sync failed', e)
      }
    }

    watch(rewards, (newVal) => {
      localStorage.setItem('rewards-store', JSON.stringify(newVal))
    }, { deep: true })
  }

  return rewards
}
