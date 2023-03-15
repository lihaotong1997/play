<script setup lang="ts">
  import AppAside from "@/components/global/AppAside.vue";
</script>

<template>
    <el-container>
      <el-aside width="200px">
        <AppAside></AppAside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<style scoped lang="scss">
.el-container{
    height: 100%;
}
.el-main{
  padding: 0;
}
</style>
