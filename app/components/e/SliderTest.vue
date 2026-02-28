<script lang="ts" setup>
const testimonials = [
  {
    img: '/hero/random-1.avif',
    quote:
      'Northern Sun is sleeker than my star cruiser. Launch-ready in seconds. Zero crashes, zero gravity.',
    name: 'Buzz Lightyear',
    role: 'Intergalactic Interface Command'
  },
  {
    img: '/hero/random-2.avif',
    quote:
      'Clickig around this thing feels like riding a horse with turbo boosters. It has got giddyup!',
    name: 'Jessie',
    role: 'Yeehaw Engagement & Barnyard UX'
  },
  {
    img: '/hero/random-3.avif',
    quote:
      'I have seen some clunky UIs in my day... but this one? Smoother than a tumbleweed on Tuesday.',
    name: 'Woody',
    role: 'Sheriff'
  },
  {
    img: '/hero/random-4.avif',
    quote:
      'I was terrified. Then I clicked. Nothing exploded. Northern Sun is a safe space. I am thriving.',
    name: 'Rex',
    role: 'Senior Panic Tester, Dinosaur Usability Lab'
  }
]
</script>

<template>
  <div class="relative h-[500px] w-full overflow-hidden rounded-lg">
    <div class="mt-[64px] flex justify-center px-12">
      <ATestSlider :testimonials="testimonials" />
    </div>
  </div>
</template>
