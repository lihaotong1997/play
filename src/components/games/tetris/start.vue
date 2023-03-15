<template>
  <el-descriptions class="descriptions" ref="descriptions" title="俄罗斯方块" :column="1">
    <el-descriptions-item label="游戏介绍：">
      《俄罗斯方块》（Tetris，
      俄文：Тетрис）是一款由俄罗斯人阿列克谢·帕基特诺夫于1984年6月发明的休闲游戏。
    </el-descriptions-item>
    <el-descriptions-item label="游戏规则：">
      《俄罗斯方块》的基本规则是移动、旋转和摆放游戏自动输出的各种方块，使之排列成完整的一行或多行并且消除得分。
    </el-descriptions-item>
    <el-descriptions-item label="操作介绍：">
      通过左、右键进行移动，下键加速下落，空格键进行旋转，回车暂停或继续。
    </el-descriptions-item>
    <el-descriptions-item label="难度选择：">
      <el-radio-group v-model="state.difficultyActive">
        <el-radio label="elementary">初级</el-radio>
        <el-radio label="intermediate">中级</el-radio>
        <el-radio label="advanced">高级</el-radio>
      </el-radio-group>
    </el-descriptions-item>
    <el-descriptions-item label="开始游戏：">
      <el-button type="primary" @click="play">Playing</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus"

const store = useStore();
const router = useRouter();
const descriptions = ref(null);
const state = reactive({
    difficultyActive:computed({
        get(){
            return store.state.tetris.difficulty.active;
        },
        set(v){
            store.commit("tetris/setDifficulty",v);
        }
    }),
    subWidth:computed(()=>store.state.tetris.container.subWidth),
    subHeight:computed(()=>store.state.tetris.container.subHeight),
    row:computed(()=>store.state.tetris.container.row),
    column:computed(()=>store.state.tetris.container.column),
})
const play = function(){
    const dom = descriptions.value.$parent.$el;
    const height = dom.offsetHeight;
    const width = dom.offsetWidth - 200;
    if(height >= state.row * state.subWidth && width >= state.column * state.subHeight){
        router.push({
            path:"/games/tetris/playing"
        })
    }else{
        ElMessage({
            message:"当前视口大小不够您玩游戏的呀",
            type:"error"
        })
    }
}
</script>

<style scoped lang="scss">
.descriptions{
    height: 100%;
}
</style>