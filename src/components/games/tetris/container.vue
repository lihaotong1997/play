<template>
  <div :style="style">
    容器
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
    subWidth:computed(()=>store.state.tetris.container.subWidth),
    subHeight:computed(()=>store.state.tetris.container.subHeight),
    row:computed(()=>store.state.tetris.container.row),
    column:computed(()=>store.state.tetris.container.column),
})
const style = reactive({
  width: state.subWidth * state.column + "px",
  height: state.subHeight * state.row + "px",
})
</script>

<style scoped>

</style>