<template>
  <div id="wrap" v-loading="loading">
    <el-button @click="store.dispatch('run')">开始</el-button>
    <el-button>暂停</el-button>
    <div class="row" v-for="(item1, index1) in store.getters.container" :key="index1">
      <box v-for="(item2, index2) in item1" :key="index2" :options="item2"></box>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from "vuex";
  import box from "./container/box.vue";
  const store = useStore();
  let loading = ref(true);
  //创建容器
  await store.dispatch('createContainer');
  loading.value = false;
</script>
<style scoped lang="scss">
#wrap{
  width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
}
.row{
  overflow: hidden;
}
</style>
