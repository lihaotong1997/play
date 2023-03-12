<template>
    <div class="box" :style="style">

    </div>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { useStore } from "vuex";
const props = defineProps(["options"])
const store = useStore();
const style = computed(()=>{
    return {
        width:`${store.state.containerOptions.boxWidth}px`,
        height:`${store.state.containerOptions.boxHeight}px`,
        backgroundColor:`${props.options.type === "move" ? 'red':''}`
    }
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