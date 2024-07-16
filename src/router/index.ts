import { createRouter, createWebHistory } from 'vue-router';
import { userPermissionsStore } from '../stores/index';
import { storeToRefs } from 'pinia';
import HomeView from '../views/HomeView.vue';

const UserDetails = () =>
    import(/* webpackChunkName: "group-user-details" */ '../views/UserDetails.vue');
const UserDashboard = () =>
    import(/* webpackChunkName: "group-user-dashboard" */ '../views/UserDashboard.vue');
const UserProfileEdit = () =>
    import(/* webpackChunkName: "group-user-edit" */ '../views/UserProfileEdit.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/users',
            name: 'user-dashboard',
            component: UserDashboard
        },
        {
            path: '/users/edit/:id',
            name: 'user-edit',
            component: UserProfileEdit
        },
        {
            path: '/users/details/:id',
            name: 'user-details',
            component: UserDetails
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('../views/AuthView1.vue')
        },
        {
            path: '/',
            name: 'about',
            meta: {
                requireAuth: true, // 添加该字段，表示需要登录权限
                roles: ['admin', 'user'] // 用户角色
            },
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
});

// 添加路由前置守卫
router.beforeEach((to, from, next) => {
    const store = userPermissionsStore();
    // 获取当前登录状态及用户角色
    const { isLogin, roles } = storeToRefs(store);
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 如果需要，则校验用户是否已经登录
        if (isLogin.value) {
            // 判断当前用户是否有访问该路由的权限
            if (to.meta.roles.includes(roles.value)) {
                next(); // 用户有访问权限，直接进入页面
            } else {
                next('/denied'); // 跳转到其他页面
            }
        } else {
            // 如果用户未登录，则跳转到登录页面
            next('/login');
        }
    } else {
        next(); // 如果不需要登录权限，直接进入页面
    }
});
export default router;
