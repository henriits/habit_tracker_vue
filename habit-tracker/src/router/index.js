import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DatesView from '../components/DatesView.vue';
import DateDetailsView from '../components/DateDetailsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/create_habits',
            name: 'createHabits',
            component: () => import('../views/CreateHabits.vue')
        },
        {
            path: '/dates',
            name: 'dates',
            component: DatesView
        },
        {
            path: '/date/:date',
            name: 'dateDetails',
            component: DateDetailsView
        }
    ]
});

export default router;
