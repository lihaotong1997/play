<template>
    <div class="box" :style="style">

    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const props = defineProps(["options"])
const store = useStore();
const style = computed(()=>{
    let obj =  {
        width:`${store.state.tetris.container.subWidth}px`,
        height:`${store.state.tetris.container.subHeight}px`,
        backgroundColor: props.options.color,
    }
    return obj;
})
</script>

<style scoped lang="scss">
.box{
    float: left;
    box-sizing: border-box;
    border: 1px solid #999999;
    border-radius: 8px;
}
</style>