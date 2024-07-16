<template>
    <el-button type="success" plain v-permission="'sys:user:add'">添加用户1</el-button>
    <el-button type="primary" plain v-if="hasPermission('sys:user:add')">添加用户1</el-button>
</template>

<script setup>
import { userPermissionsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
const store = userPermissionsStore();
const { userPermissions } = storeToRefs(store);

const vPermission = {
    mounted(el, binding) {
        const requiredPermission = binding.value;
        if (!userPermissions.value.includes(requiredPermission)) {
            el.style.display = 'none';
        }
    }
};
const hasPermission = (permission) => {
    return userPermissions.value.includes(permission);
}
</script>
