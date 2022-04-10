<script setup>
import { RouterLink } from "vue-router";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
  <Carousel :items-to-show="1" :mouseDrag="false" :touchDrag="false">
    <Slide v-for="movie in movies" :key="movie.id">
      <div class="movie-carousel">
        <div class="w-7/12">
          <div class="movie-data">
            <div class="movie-data__title">{{ movie.name }}</div>
            <div class="movie-data__description">{{ movie.description }}</div>
            <div class="flex">
              <RouterLink
                :to="'/movie/' + movie.id"
                class="btn btn-primary mr-5"
                >Show Program</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="w-5/12 movie-image">
          <div>
            <img :src="movie.posterPath" alt="image" />
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
export default {
  props: {
    movies: Array,
  },
};
</script>
