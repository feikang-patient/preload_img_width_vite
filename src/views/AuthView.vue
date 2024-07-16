<template>
    <div>
        <Authority permissions="sys:user:add">
            <button>新增用户</button>
        </Authority>
        <Authority :permissions="['sys:user:view', 'sys:user:update']">
            <button>新增用户</button>
        </Authority>
        <Authority>
        <template #default="{ userPermissions }">
            <button :disabled="!userPermissions.includes('sys:user:add')">新增用户</button>
        </template>
        </Authority>
    </div>
</template>