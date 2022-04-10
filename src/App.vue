<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "vue-toast-notification/dist/theme-sugar.css";
@import "vue-select/dist/vue-select.css";
@import "vue3-carousel/dist/carousel.css";
@import "@/assets/index.css";
</style>
