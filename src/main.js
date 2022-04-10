import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vSelect from 'vue-select';
import VueToast from 'vue-toast-notification';

library.add(faCouch);

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-select', vSelect);
app.use(VueToast);
app.use(createPinia());
app.use(router);

app.mount('#app');
