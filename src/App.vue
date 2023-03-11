<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import IndexHeader from './components/global/indexHeader.vue';
const route = useRoute();

</script>

<template>
  <el-container>
    <el-header height="40px">
      <IndexHeader v-if="route.meta.needHeader"></IndexHeader>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
@import "@/assets/sass/global/indexHeader.scss";
</style>
