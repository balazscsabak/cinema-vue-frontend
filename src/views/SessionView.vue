<script setup>
import Loader from "../components/Loader.vue";
import CinemaBgTop from "../assets/img/cinemabg-top.png";
import CinemaBgBotton from "../assets/img/cinemabg-botton.png";
import { format } from "date-fns";
import { mapStores } from "pinia";
import { useReservationStore } from "../stores/reservation";
import ReservationForm from "../components/ReservationForm.vue";
</script>

<template >
  <div class="py-16">
    <Loader v-if="loading" />
    <div v-else class="container">
      <div v-if="session">
        <div class="flex mb-10">
          <div class="w-1/2">
            <div class="mb-6">
              <div class="text-3xl font-light text-site-2 mb-2">Start time</div>
              <div>
                {{
                  session.startTime &&
                  format(new Date(session?.startTime), "yyyy-MM-dd  HH:mm")
                }}
              </div>
            </div>
            <div>
              <div class="text-3xl font-light text-site-2 mb-2">Movie</div>
              <div class="text-2xl mb-4">
                {{ session?.film?.name }}
              </div>
              <div class="font-light leading-7">
                {{ session?.film?.description }}
              </div>
            </div>
          </div>
          <div class="w-1/2 movie-image">
            <img :src="session?.film?.posterPath" alt="" />
          </div>
        </div>
        <div class="text-3xl font-light text-site-2 mb-2">Ticket Prices</div>
        <div class="mb-10">
          <div class="flex text-xl items-center text-site-5">
            <div class="mr-3 ml-6">
              <svg height="10" width="10">
                <circle cx="5" cy="5" r="3" fill="#9bc6a1" />
              </svg>
            </div>
            <div>Normal:</div>
            <div class="ml-2">$9.8</div>
          </div>
          <div class="flex text-xl items-center text-site-5 mt-1">
            <div class="mr-3 ml-6">
              <svg height="10" width="10">
                <circle cx="5" cy="5" r="3" fill="#9bc6a1" />
              </svg>
            </div>
            <div>Student:</div>
            <div class="ml-2">$5.8</div>
          </div>
        </div>
        <div class="text-3xl font-light text-site-2 mb-6">Select tickets</div>
        <div class="pl-6">
          <div class="flex items-center mb-4">
            <div class="w-28 text-xl">Normal</div>
            <div class="w-48">
              <v-select
                :options="[0, 1, 2, 3, 4, 5, 6]"
                v-model="selectedNormalTicketsCounts"
                :filterable="false"
                :searchable="false"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-28 text-xl">Student</div>
            <div class="w-48">
              <v-select
                :options="[0, 1, 2, 3, 4, 5, 6]"
                v-model="selectedStudentTicketsCounts"
                :filterable="false"
                :searchable="false"
              />
            </div>
          </div>
          <div class="text-3xl mt-6">
            Selected: {{ selectedTicketCount }} /
            {{ selectedStudentTicketsCounts + selectedNormalTicketsCounts }}
          </div>
          <div>
            <button
              class="relative z-10 btn mt-10 btn-primary"
              :class="{ 'opacity-40': !canMakeOrder }"
              @click="placeOrderClick"
            >
              Place order
            </button>
          </div>
        </div>
        <div class="relative -mt-28">
          <img
            :src="CinemaBgTop"
            alt="image"
            class="cinema-seats-bg opacity-20 mb-20 w-7/12"
          />
          <img
            :src="CinemaBgBotton"
            alt="image"
            class="cinema-seats-bg w-10/12"
          />

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -mt-10">
            <div
              v-for="(row, rowIndex) in seats"
              :key="row"
              class="flex justify-center gap-x-6 text-2xl mb-4"
            >
              <div v-for="(seat, seatIndex) in row" :key="seat">
                <div
                  v-if="seat === 's'"
                  @click="() => seatClick(rowIndex, seatIndex)"
                  class="seat seat__empty"
                >
                  <font-awesome-icon :icon="['fas', 'couch']" />
                </div>

                <div
                  v-else-if="seat === 'x'"
                  @click="() => seatClick(rowIndex, seatIndex)"
                  class="seat seat__pre-reserved"
                >
                  <font-awesome-icon :icon="['fas', 'couch']" />
                </div>

                <div v-else-if="seat === 'r'" class="seat seat__reserved">
                  <font-awesome-icon :icon="['fas', 'couch']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ReservationForm v-if="reservationStore.showForm" />
</template>

<script>
export default {
  data() {
    return {
      session: {},
      seats: [],
      originalSeats: [],
      selectedNormalTicketsCounts: 0,
      selectedStudentTicketsCounts: 0,
      selectedTicketCount: 0,
      canMakeOrder: false,
    };
  },
  computed: {
    ...mapStores(useReservationStore),
  },
  watch: {
    seats(newSeats) {
      let selectedCount = 0;

      newSeats.map((row) => {
        for (let char of row) {
          if (char === "x") selectedCount++;
        }
      });

      this.selectedTicketCount = selectedCount;
      if (
        selectedCount !== 0 &&
        selectedCount ===
          this.selectedNormalTicketsCounts + this.selectedStudentTicketsCounts
      ) {
        this.canMakeOrder = true;
      } else {
        this.canMakeOrder = false;
      }
    },
    selectedNormalTicketsCounts() {
      this.seats = this.originalSeats;
    },
    selectedStudentTicketsCounts() {
      this.seats = this.originalSeats;
    },
  },
  methods: {
    seatClick(rowIndex, seatIndex) {
      if (
        this.selectedNormalTicketsCounts + this.selectedStudentTicketsCounts <
        1
      ) {
        this.$toast.error("Please select ticket types", {
          position: "bottom",
          duration: 6000,
        });
        return;
      }

      const selectedSeat = this.seats[rowIndex][seatIndex];
      const seatsClone = [...this.seats];

      if (selectedSeat === "s") {
        if (
          this.selectedNormalTicketsCounts +
            this.selectedStudentTicketsCounts <=
          this.selectedTicketCount
        ) {
          this.$toast.error("You have selected all the tickets", {
            position: "bottom",
            duration: 6000,
          });
          return;
        }

        seatsClone[rowIndex] =
          seatsClone[rowIndex].substring(0, seatIndex) +
          "x" +
          seatsClone[rowIndex].substring(seatIndex + 1);

        this.seats = seatsClone;
      } else if (selectedSeat === "x") {
        seatsClone[rowIndex] =
          seatsClone[rowIndex].substring(0, seatIndex) +
          "s" +
          seatsClone[rowIndex].substring(seatIndex + 1);

        this.seats = seatsClone;
      }
    },

    placeOrderClick() {
      if (!this.canMakeOrder) {
        this.$toast.error("Please select tickets", {
          position: "bottom",
          duration: 6000,
        });

        return;
      }

      const selectedTicketsPositions = [];

      this.seats.map((row, rowIndex) => {
        let counter = 0;
        for (let char of row) {
          if (char === "x") {
            selectedTicketsPositions.push({ row: rowIndex, seat: counter });
          }

          counter++;
        }
      });

      this.reservationStore.tickets = selectedTicketsPositions;
      this.reservationStore.showForm = true;
    },
  },
  async mounted() {
    const resSession = await fetch(
      `${import.meta.env.VITE_API_URL}/sessions/${this.$route.params.id}`
    );
    const session = await resSession.json();

    this.session = session;
    this.seats = JSON.parse(session.seats);
    this.originalSeats = JSON.parse(session.seats);
    this.loading = false;
  },
};
</script>
