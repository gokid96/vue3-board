<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import HeaderUI from './components/HeaderUI.vue'
import NavBar from './components/NavBar.vue'
</script>
<template class="">
  <div class="min-h-screen bg-neutral-300 flex flex-col">
    <header class="px-5 h-10 min-w-screen">
      <HeaderUI class="" />
    </header>
    <div class="flex flex-1">
      <aside class=" sticky   w-34 min-h-screen  ">
        <nav class="mt-5">
          <NavBar />
        </nav>
      </aside>
      <main class=" min-w-2xl  mx-auto ">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style></style>
