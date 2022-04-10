<script setup>
import { RouterLink } from "vue-router";
import { format } from "date-fns";
</script>

<template>
  <div>
    <div class="container">
      <h1 class="h1 text-right">Today's <span> programme</span></h1>
      <div class="mt-10">
        <div
          v-for="session in sessions"
          :key="session.filmId"
          class="flex items-center font-light mb-10"
        >
          <div class="flex items-center w-72 text-2xl">
            <div class="mr-8">
              <svg height="10" width="10">
                <circle cx="5" cy="5" r="3" fill="#9bc6a1" />
              </svg>
            </div>
            <div>{{ session.name }}</div>
          </div>
          <div class="flex items-center text-xl gap-20 ml-16">
            <div v-for="_session in session.sessions" :key="_session.id">
              <RouterLink :to="'/session/' + _session.id">
                {{ format(new Date(_session.startTime), "HH:mm") }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sessions: Array,
  },
};
</script>