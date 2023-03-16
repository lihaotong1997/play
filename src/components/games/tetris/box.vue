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
        backgroundColor: store.state.tetris.emptyColor,
    }
    if(props.options.type === 2){
        obj.backgroundColor = store.state.tetris.noEmptyColor;
    }else if(store.state.tetris.container.data && store.state.tetris.currentBox){
        const box = store.state.tetris.currentBox;
        const list = box.list[box.state].forEach((item1:any) => {
            const x = item1[0] + box.x;
            const y = item1[1] + box.y;
            if(props.options.coor[0] === x && props.options.coor[1] === y){
                obj.backgroundColor = box.color;
            }
        });
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