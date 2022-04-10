<script >
import { getCurrentInstance, ref, onMounted } from "vue";
import { format, addDays, setHours } from "date-fns";

export default {
  setup() {
    const films = ref([]);
    const selectedFilm = ref({});

    const halls = ref([]);
    const selectedHall = ref({});

    const selectedHour = ref(12);
    const selectedMinute = ref(0);

    const selectedDate = ref({
      label: format(new Date(), "yyyy-MM-dd"),
      data: {
        formatted: format(new Date(), "yyyy-MM-dd"),
        date: new Date(),
      },
    });

    const next7Days = [...Array(6)].map((_, i) => {
      const _date = addDays(new Date(), i);

      return {
        date: _date,
        formatted: format(_date, "yyyy-MM-dd"),
      };
    });

    return {
      films,
      selectedFilm,
      halls,
      selectedHall,
      selectedHour,
      selectedMinute,
      selectedDate,
      next7Days,
    };
  },

  async mounted() {
    const [filmsRes, hallsRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/films`),
      fetch(`${import.meta.env.VITE_API_URL}/halls`),
    ]);

    this.films = await filmsRes.json();
    this.halls = await hallsRes.json();
  },

  methods: {
    generateSelectedData() {
      const hour =
        this.selectedHour < 9 ? "0" + this.selectedHour : this.selectedHour;
      const minute =
        this.selectedMinute < 9
          ? "0" + this.selectedMinute
          : this.selectedMinute;
      return `${hour}:${minute} - ${this.selectedFilm?.name || ""} - ${
        this.selectedHall?.name || ""
      }`;
    },

    async validateSession() {
      if (Object.keys(this.selectedFilm).length === 0) {
        this.$toast.error("Please select film", {
          position: "bottom",
          duration: 3000,
        });

        return false;
      }

      if (Object.keys(this.selectedHall).length === 0) {
        this.$toast.error("Please select hall", {
          position: "bottom",
          duration: 3000,
        });

        return false;
      }

      // const selectedFullDate = setHours(
      //   this.selectedDate.data.date,
      //   this.selectedHour
      // ).setMinutes(this.selectedMinute);
      const fullDate = this.selectedDate.data.date;
      fullDate.setHours(this.selectedHour);
      fullDate.setMinutes(this.selectedMinute);
      fullDate.setSeconds(0);
      fullDate.toISOString();

      const validateRes = await fetch(
        `${import.meta.env.VITE_API_URL}/sessions`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            filmId: this.selectedFilm.id,
            startDate: format(fullDate, "yyyy-MM-dd"),
            startTime: fullDate.toISOString(),
            hallId: this.selectedHall.id,
          }),
        }
      );

      if (validateRes.status === 201) {
        this.$toast.success("Session created", {
          position: "bottom",
          duration: 3000,
        });
      } else {
        this.$toast.error("Validation FAILED ... probably date is reserved", {
          position: "bottom",
          duration: 3000,
        });
      }
    },
  },
};
</script>

<template>
  <div class="mt-16">
    <div class="container">
      <h1 class="h1 mb-10">Create <span>session</span></h1>

      <div class="grid gap-4 grid-cols-2">
        <div>
          <div class="mb-6">
            <div class="text-2xl ml-4 mb-4">Movie</div>
            <div class="w-72 ml-8">
              <v-select
                :options="
                  films &&
                  films.map((film) => {
                    return { label: film.name, data: film };
                  })
                "
                v-model="selectedFilm"
                :filterable="false"
                :searchable="false"
                :reduce="(option) => option.data"
              />
            </div>
          </div>

          <div class="mb-6">
            <div class="text-2xl ml-4 mb-4">Hall</div>
            <div class="w-72 ml-8">
              <v-select
                :options="
                  halls &&
                  halls.map((hall) => {
                    return { label: hall.name, data: hall };
                  })
                "
                v-model="selectedHall"
                :filterable="false"
                :searchable="false"
                :reduce="(option) => option.data"
                class="custom-select"
              />
            </div>
          </div>

          <div class="mb-6">
            <div class="text-2xl ml-4 mb-4">Date</div>
            <div class="w-40 ml-8">
              <v-select
                :options="[
                  ...next7Days.map((day) => {
                    return {
                      label: day.formatted,
                      data: day,
                    };
                  }),
                ]"
                v-model="selectedDate"
                :filterable="false"
                :searchable="false"
                :reduce="
                  (option) => {
                    return {
                      data: option.data,
                    };
                  }
                "
              />
            </div>
          </div>

          <div class="flex items-end mb-14">
            <div>
              <div class="text-2xl ml-4 mb-4">Start</div>
              <div class="w-28 ml-8">
                <div class="text-xl mb-4">hour</div>
                <v-select
                  :options="[
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                  ]"
                  v-model="selectedHour"
                  :filterable="false"
                  :searchable="false"
                />
              </div>
            </div>
            <div class="ml-8">
              <div class="w-28 ml-8">
                <div class="text-xl mb-4">minute</div>
                <v-select
                  :options="[...Array(12)].map((_, i) => i * 5)"
                  v-model="selectedMinute"
                  :filterable="false"
                  :searchable="false"
                />
              </div>
            </div>
          </div>

          <div class="mb-1 ml-20 text-4xl opacity-40">
            {{ selectedDate.data.formatted }}
          </div>
          <div class="mb-14 ml-20 text-4xl opacity-40">
            {{ generateSelectedData() }}
          </div>
          <div>
            <button @click="validateSession" class="btn btn-primary ml-6">
              Validate session
            </button>
          </div>
        </div>

        <div>
          <div>
            <div class="text-center text-2xl mb-4">
              {{ selectedFilm?.name || "" }}
            </div>
            <div class="w-44 mx-auto mb-10">
              <!-- <img /> -->
              <img :src="selectedFilm?.posterPath" class="rounded" />
            </div>
          </div>

          <div v-if="selectedHall?.seats" class="opacity-40">
            <div
              v-for="row in JSON.parse(selectedHall?.seats)"
              :key="row"
              class="flex justify-center gap-x-2 text-xs mb-4"
            >
              <div v-for="seat in row" :key="seat">
                <div v-if="seat === 's'" class="seat seat__empty">
                  <font-awesome-icon :icon="['fas', 'couch']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>