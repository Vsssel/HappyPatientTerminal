import { createWebHistory, createRouter } from "vue-router";

import PatientsListView from './src/pages/PatientsList/PatientsListView.vue';
import PatientConfirmationView from "./src/pages/PatientConfirmation/PatientConfirmationView.vue";
import AuthPageView from "./src/pages/Auth/AuthPageView.vue";

const routes = [
    { path: '/', name: 'PatientsList', component: PatientsListView },
    { path: '/:id', name: 'PatientsConfirmation', component: PatientConfirmationView },
    { path: '/auth', name: 'AuthPage', component: AuthPageView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
