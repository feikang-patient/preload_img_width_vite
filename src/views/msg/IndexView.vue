<template>
    <el-button :plain="true" @click="open4">Error</el-button>
</template>

<script lang="ts" setup>
import showMessage from './message';
import { getCurrentInstance } from 'vue'
// const { proxy } = getCurrentInstance();// ctx中有问题，建议使用proxy中获取
const open4 = () => {
    // ElMessage.closeAll(); 这样关闭所有弹窗， 有明显的抖动 效果不够好
    showMessage({
        message: 'Oops, this is a error message.',
        type: 'error',
        plain: true
    });
};
</script>
<style lang="css" scoped>
/* .el-message {
    top: 20px !important;
} */

</style>