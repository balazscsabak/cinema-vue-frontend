<script setup>
import MoviesCarousel from "./MoviesCarousel.vue";
</script>

<template>
  <div>
    <div class="container">
      <h1 class="h1">Featured <span>movies</span></h1>
      <div>
        <MoviesCarousel :movies="movies" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: Array,
  },
};
</script>