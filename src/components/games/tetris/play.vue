<template>
    <el-container>
      <el-main>
        <container></container>
      </el-main>
      <el-aside width="400px">Aside</el-aside>
    </el-container>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import container from "./container.vue";
const store = useStore();
store.dispatch("tetris/create");
</script>

<style scoped lang="scss">
.el-main{
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>