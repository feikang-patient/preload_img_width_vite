import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userPermissionsStore = defineStore('userPermissions', () => {
    // 角色
    const roles = ref('admin');
    // 权限
    const userPermissions = ref([]);
    //是否登录
    const isLogin = ref(true);
    // 设置状态（传入的权限信息赋值给该状态）
    const setUserPermissions = (params: []) => {
        userPermissions.value = params;
    };

    return {
        isLogin,
        userPermissions,
        roles,
        setUserPermissions
    };
});
