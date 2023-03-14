<script setup lang="ts">
  import AppHead from "@/components/global/AppHead.vue";
</script>

<template>
  <el-container>
    <el-header>
      <AppHead></AppHead>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.el-container{
    height: 100vh;
    .el-header,.el-main{
        padding: 0;
    }
}
</style>
