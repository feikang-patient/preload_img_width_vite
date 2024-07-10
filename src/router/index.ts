import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const UserDetails = () => import(/* webpackChunkName: "group-user" */ '../views/UserDetails.vue');
const UserDashboard = () =>
    import(/* webpackChunkName: "group-user" */ '../views/UserDashboard.vue');
const UserProfileEdit = () =>
    import(/* webpackChunkName: "group-user" */ '../views/UserProfileEdit.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/users',
            name: 'user-dashboard',
            component: UserDashboard
        },
        {
            path: '/users/:id',
            name: 'user-details',
            component: UserDetails
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
});

export default router;
