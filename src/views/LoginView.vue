<template>
    <div>
        <h3>Array Content:</h3>
        <p v-for="item in arr" :key="item">{{ item }}</p>
        <button @click="updateArrayDirectly">Directly Replace Array</button>
        <button @click="updateArrayUsingMethods">Update Array Using Methods</button>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        // 初始化一个 ref 数组
        const arr = ref([0]);

        // 直接替换 ref 的值，可能不会触发视图更新
        const updateArrayDirectly = () => {
            // 直接赋新数组给 arr.value
            arr.value[0] = [1]; // Vue 可能无法检测到这种替换
            console.log('Array replaced directly:', arr.value); // 控制台会打印新值
        };

        // 使用方法更新数组，确保视图更新
        const updateArrayUsingMethods = () => {
            arr.value.push(4); // 修改原数组，确保触发响应式更新
            console.log('Array updated using methods:', arr.value); // 控制台会打印新值
        };

        return {
            arr,
            updateArrayDirectly,
            updateArrayUsingMethods
        };
    }
};
</script>
