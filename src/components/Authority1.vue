<template>
    <slot v-if="showSlot" :userPermissions="userPermissions"></slot>
</template>

<script setup>
import { computed } from 'vue';

import { storeToRefs } from 'pinia'
import { userPermissionsStore } from '@/stores/index'
const store = userPermissionsStore()
// 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()
const { userPermissions } = storeToRefs(store)

const props = defineProps({
	// 需要的权限
    permissions: {
        type: [String, Array]
    }
});
const showSlot = computed(() => {
    if (!props.permissions) {
        return true
    }
    if (!userPermissions.value) {
        return false
    }
    if (Array.isArray(props.permissions)) {
        return props.permissions.every(p => {
            return userPermissions.value.includes(p)
        })
    } else {
        return userPermissions.value.includes(props.permissions)
    }
})

</script>

<style scoped>
</style>
