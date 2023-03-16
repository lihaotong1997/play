<template>
    <el-container>
      <el-main>
        <container></container>
      </el-main>
      <el-aside :width="`${props.rightAside}px`">
        <asides></asides>
      </el-aside>
    </el-container>
</template>

<script setup lang="ts">
import asides from "./aside.vue";
import { defineProps } from "vue";
import { useStore } from "vuex";
import container from "./container.vue";
const store = useStore();
const props = defineProps(["rightAside"])
</script>

<style scoped lang="scss">
.el-main{
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>