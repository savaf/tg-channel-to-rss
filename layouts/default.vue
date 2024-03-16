<script setup lang="ts">
const route = useRoute()
const pageName = computed(() => `${route.name}-page`)
</script>
<template>
  <div
    :class="[pageName]"
    class="relative min-h-screen flex justify-center items-center w-full flex-col backdrop-blur-md overflow-x-hidden"
  >
    <Gradient />


    <slot />

    <Footer />
  </div>
</template>

<style></style>
