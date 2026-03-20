<script setup lang="ts">
const activities = ref<Activity[]>([
  {
    id: 'act-001',
    type: 'habit',
    title: 'Morning Code Review',
    value: 12,
    goal: 30,
    memberId: 'user-123',
    createdAt: new Date(),
    tags: ['development', 'daily']
  },
  {
    id: 'act-002',
    type: 'time',
    title: 'UI Design Refinement',
    value: 450,
    goal: 1000,
    memberId: 'user-123',
    createdAt: new Date(),
    tags: ['design', 'project-alpha']
  },
  {
    id: 'act-003',
    type: 'content',
    title: 'Documentation Posts',
    value: 5,
    goal: 10,
    memberId: 'user-123',
    createdAt: new Date(),
    tags: ['writing', 'studio']
  }
])

const rewards = ref<Rewards>({
  balance: 1250,
  totalEarned: 5800,
  history: [
    {
      id: 'rev-001',
      amount: 50,
      reason: 'Progress on Morning Code Review',
      timestamp: new Date()
    },
    {
      id: 'rev-002',
      amount: 100,
      reason: 'Content Milestone Reached',
      timestamp: new Date()
    }
  ]
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-8 space-y-8">
    <EAccessReward :rewards="rewards" />
    <EAccessActivity
      :activities="activities"
      :reward-rate="10"
      @update="(newVal) => activities = newVal"
      @reward="(amount, reason) => rewards.balance += amount"
    />
    <div class="text-center text-xs text-muted">
      <p>Data initialized from local examples for development testing.</p>
    </div>
  </div>
</template>
