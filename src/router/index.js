import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SchedulerView from '../views/SchedulerView.vue';
import SessionView from '../views/SessionView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/session/:id',
			name: 'session',
			component: SessionView,
		},
		{
			path: '/scheduler',
			name: 'scheduler',
			component: SchedulerView,
		},
	],
});

export default router;
