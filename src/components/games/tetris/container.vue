<template>
  <div :style="style">
    <div v-for="(item1,index1) in state.data" :key="index1">
      <div v-for="(item2,index2) in item1" :key="index2">
        <box :options="item2"></box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import box from "./box.vue";
const store = useStore();
const state = reactive({
    subWidth:computed(()=>store.state.tetris.container.subWidth),
    subHeight:computed(()=>store.state.tetris.container.subHeight),
    row:computed(()=>store.state.tetris.container.row),
    column:computed(()=>store.state.tetris.container.column),
    data:computed(()=>store.state.tetris.container.data),
})
const style = reactive({
  width: state.subWidth * state.column + "px",
  height: state.subHeight * state.row + "px",
})
store.dispatch("tetris/create")
</script>

<style scoped>
</style>