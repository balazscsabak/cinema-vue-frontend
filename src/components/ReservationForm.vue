<script setup>
import { mapStores } from "pinia";
import { useReservationStore } from "../stores/reservation";
import Loader from "./Loader.vue";
</script>

<template>
  <div
    class="fixed z-10 inset-0 flex items-center justify-center"
    style="background-color: #0f0f0fcf"
    @click="backdropClick"
  >
    <div
      class="
        bg-site-5
        rounded
        text-center
        px-16
        py-8
        text-site-1
        relative
        max-h-screen
        overflow-y-scroll
      "
    >
      <h1 class="h1 mb-3">Confirm order</h1>
      <div class="text-left">
        <div>Selected tickets:</div>
        <div class="mb-4">
          <table>
            <thead>
              <th></th>
              <th class="pr-4 text-center">row</th>
              <th class="text-center">seat</th>
            </thead>
            <tbody>
              <tr
                v-for="ticket in reservationStore.tickets"
                :key="ticket.row + ticket.seat"
              >
                <td class="pr-4">
                  <svg height="10" width="10">
                    <circle cx="5" cy="5" r="3" fill="#9bc6a1" />
                  </svg>
                </td>

                <td class="text-center pr-4">
                  {{ ticket.row + 1 }}
                </td>

                <td class="text-center">
                  {{ ticket.seat }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h2 class="text-lg mb-4">Please fill the form below</h2>
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label for="firstname" class="block text-left mb-1">Firstname</label>
          <input
            v-bind="firstname"
            class="w-full rounded px-3 py-2 border border-site-4"
            type="text"
            name="firstname"
            id="firstname"
            required
          />
          <div class="text-red-500" v-if="errors.firstname">
            {{ errors.firstname }}
          </div>
        </div>
        <div>
          <label for="lastname" class="block text-left mb-1">Lastname</label>
          <input
            v-bind="lastname"
            class="w-full rounded px-3 py-2 border border-site-4"
            type="text"
            name="lastname"
            id="lastname"
            required
          />
          <div class="text-red-500" v-if="errors.lastname">
            {{ errors.lastname }}
          </div>
        </div>
      </div>
      <div>
        <label for="email" class="block text-left mb-1">Email</label>
        <input
          v-bind="email"
          class="w-full rounded px-3 py-2 border border-site-4"
          type="email"
          name="email"
          id="email"
          required
        />
        <div class="text-red-500" v-if="errors.email">
          {{ errors.email }}
        </div>
      </div>
      <div class="mt-8 flex">
        <button class="btn bg-gray-50 mx-auto" @click="closePopup">
          Cancel
        </button>
        <button class="btn btn-primary mx-auto" @click="confirm">
          Confirm
        </button>
      </div>

      <div
        v-if="loading"
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-site-5 bg-opacity-70
        "
      >
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errors: {
        firstname: null,
        lastname: null,
        email: null,
      },
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  computed: {
    ...mapStores(useReservationStore),
  },
  methods: {
    backdropClick(e) {
      if (e.target === e.currentTarget) this.reservationStore.showForm = false;
    },
    closePopup() {
      this.reservationStore.showForm = false;
    },
    async confirm() {
      const _firstname = firstname.value;
      const _lastname = lastname.value;
      const _email = email.value;

      let failed = false;

      if (!_firstname || _firstname === "") {
        this.errors.firstname = "Field required";
        failed = true;
      } else {
        this.errors.firstname = null;
      }

      if (!_lastname || _lastname === "") {
        this.errors.lastname = "Field required";
        failed = true;
      } else {
        this.errors.lastname = null;
      }

      if (!_email || _email === "") {
        this.errors.email = "Field required";
        failed = true;
      } else {
        this.errors.email = null;
      }

      if (failed) return;

      this.loading = true;

      const reservatinoRes = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: _firstname,
            lastName: _lastname,
            email: _email,
            sessionId: this.$route.params?.id,
            tickets: this.reservationStore.tickets,
          }),
        }
      );

      if (reservatinoRes.status === 201) {
        this.$toast.success("Thank you for your reservation", {
          position: "bottom",
          duration: 6000,
        });
        this.reservationStore.showForm = false;
        this.$router.push("/");
      } else {
        this.$toast.error("Something went wrong. Try again later", {
          position: "bottom",
          duration: 6000,
        });
      }

      this.loading = false;
    },
  },
};
</script>