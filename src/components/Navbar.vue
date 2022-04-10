<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bg-black bg-opacity-10 navbar">
    <div class="container flex justify-center items-center py-6">
      <div class="flex-1 text-right text-xl flex">
        <RouterLink to="/" class="ml-auto mr-32">Home</RouterLink>
        <RouterLink to="/movies" class="mr-32 block">Movies</RouterLink>
      </div>
      <div>
        <img src="@/assets/img/logo2.png" />
        <div
          class="uppercase mt-1 text-center text-site-2 font-medium text-2xl"
        >
          Dream
        </div>
        <div class="text-center -mt-1">Cinema</div>
      </div>
      <div class="flex-1 text-xl flex">
        <RouterLink to="/program" class="ml-32">Program</RouterLink>
        <RouterLink to="/scheduler" class="ml-32 block">Scheduler</RouterLink>
      </div>
    </div>
  </div>
</template>