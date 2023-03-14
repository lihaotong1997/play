<template>
    <el-menu  mode="horizontal" router :default-active="$route.path">
        <el-menu-item index="/games">玩游戏</el-menu-item>
        <el-menu-item index="/music">听音乐</el-menu-item>
        <el-menu-item index="/movie">看电影</el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">

</script>

<style scoped lnag="scss">
.el-menu{
    justify-content: center;
}
</style>