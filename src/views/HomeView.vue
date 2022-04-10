<script setup>
import FeaturedMovies from "../components/FeaturedMovies.vue";
import Loader from "../components/Loader.vue";
import TodayProgramme from "../components/TodayProgramme.vue";
</script>

<template >
  <div class="py-16">
    <Loader v-if="loading" />
    <div v-else>
      <FeaturedMovies :movies="films" />
      <div class="mt-28">
        <TodayProgramme :sessions="sessions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      films: [],
      sessions: [],
    };
  },
  async mounted() {
    const [resFilms, resSessions] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/films`),
      fetch(`${import.meta.env.VITE_API_URL}/sessions/today`),
    ]);
    const films = await resFilms.json();
    const sessions = await resSessions.json();

    this.loading = false;
    this.films = films;
    this.sessions = sessions;
  },
};
</script>
