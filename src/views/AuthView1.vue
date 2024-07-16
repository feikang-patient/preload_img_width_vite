<template>
    <div class="auth">
        <div class="search">
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    @change="change"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
    <div>
        <!-- 这里可以根据返回的权限，做自己想判断的事情 -->
        <Authority>
            <template #default="{ userPermissions }">
                <el-button :disabled="!userPermissions.includes('sys:user:delete')" type="primary"
                    >禁用用户1</el-button
                >
            </template>
        </Authority>
        <!-- 传入组件所需要的权限 -->
        <Authority permissions="sys:user:view">
            <el-button>查询用户2</el-button>
        </Authority>
        <Authority permissions="sys:user:update">
            <el-button type="success">修改用户3</el-button>
        </Authority>
        <Authority permissions="sys:user:delete">
            <el-button type="info">删除用户4</el-button>
        </Authority>
        <Authority permissions="sys:user:add">
            <el-button type="warning">添加用户5</el-button>
        </Authority>
        <Authority :permissions="['sys:user:update', 'sys:user:delete']">
            <el-button type="danger">禁用用户6</el-button>
        </Authority>
    </div>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Authority from '@/components/Authority1.vue';
import { userPermissionsStore } from '@/stores/index';
const value = ref('');
const options = [
    {
        value: '0',
        label: 'admin',
        permissions: ['sys:user:view', 'sys:user:update', 'sys:user:delete', 'sys:user:add']
    },
    {
        value: '1',
        label: 'editor',
        permissions: ['sys:user:view', 'sys:user:update', 'sys:user:add']
    },
    {
        value: '2',
        label: 'guest',
        permissions: ['sys:user:view']
    }
];

const store = userPermissionsStore();
// 作为 action 的 setUserPermissions 可以直接解构
const { setUserPermissions } = store;
const change = (e) => {
    setUserPermissions(options[e].permissions);
};
</script>

<style scoped>
.auth {
    height: 100vh;
}
.search {
    display: flex;
    width: 200px;
}
</style>
