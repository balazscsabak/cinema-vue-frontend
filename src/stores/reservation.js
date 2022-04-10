import { defineStore } from 'pinia';

export const useReservationStore = defineStore({
	id: 'reservation',
	state: () => ({
		tickets: [],
		showForm: false,
	}),

	// actions: {
	// 	increment() {
	// 		this.counter++;
	// 	},
	// },
});
