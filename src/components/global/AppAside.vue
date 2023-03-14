<template>
    <el-menu router  :default-active="$route.path">
        <el-menu-item index="/games/tetris">
            <el-icon>
                <SwitchFilled />
            </el-icon>
            俄罗斯方块
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { SwitchFilled } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.el-menu{
    height: 100%;
}
</style>