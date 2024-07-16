<template>
    <slot v-if="showSlot" :userPermissions="permissions"></slot>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from './useAuth.js';

const props = defineProps({
    permission: {
        type: [String, Array]
    }
});

const { permissions } = useAuth();
const showSlot = computed(() => {
    if (!props.permission) {
        // 没传入权限，直接显示
        return true;
    }
    if (!permissions) {
        // 没有任何权限，直接隐藏
        return false;
    }

    if (Array.isArray(props.permission)) {
        return props.permission.every((p) => permissions.includes(p));
    } else {
        return permissions.includes(props.permission);
    }
});
</script>
