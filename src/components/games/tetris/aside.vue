<template>
  <el-descriptions class="container" title="俄罗斯方块" :column="1">
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
    <el-descriptions-item label="消除行数">{{ state.crushNums }}</el-descriptions-item>
    <el-descriptions-item label="用时">{{ state.time }}</el-descriptions-item>
    <el-descriptions-item label="难度">{{ state.difficulty }}</el-descriptions-item>
    <el-descriptions-item label="得分">{{ state.number }}</el-descriptions-item>
    <el-descriptions-item label="暂停">
       <el-button type="primary" @click="stop">暂停</el-button>
        <el-button type="primary" @click="restart">重新开始</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="下一个" v-if="state.afterBox">
      <div class="box-container">
        <div v-for="(item1,index1) in 4" :key="index1" class="box-row">
          <div v-for="(item2,index2) in 4" :key="index2" class="box" :style="getStyle(index2,index1)"></div>
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
const store = useStore();
const state = reactive({
    crushNums:computed(()=>store.state.tetris.crushNums),
    time:computed(()=>store.getters["tetris/times"]),
    difficulty:computed(()=>store.state.tetris.difficulty.options.find(item=>item.label === store.state.tetris.difficulty.active).name),
    afterBox:computed(()=>store.state.tetris.afterBox),
    number:computed(()=>store.getters["tetris/number"]),
    stop:computed({
      get:()=>store.state.tetris.stop,
      set:(v)=>{
        store.state.tetris.stop = v;
      }
    }),
})
const getStyle = (x,y)=>{
  let obj = {
    width:`${store.state.tetris.container.subWidth}px`,
    height:`${store.state.tetris.container.subHeight}px`,
  }
  const list = state.afterBox.list[state.afterBox.state];
  for(let i = 0; i < list.length; i++){
    if(list[i][0] === x && list[i][1] === y){
      obj.backgroundColor = state.afterBox.color;
      obj.border = "1px solid #999999";
      obj.borderRadius = "8px";
    }
  }
  return obj;
}
const stop = ()=>{
  store.dispatch("tetris/enter");
}
const restart = ()=>{
  store.dispatch("tetris/create").then(()=>{
    ElMessage({
    message: '重新开始啦',
    type: 'success',
  })
  });
}
</script>

<style scoped lang="scss">
.container{
  padding: 20px;
  height: 100%;
  border-left:solid 1px var(--el-menu-border-color)
}
.box-container{
  overflow: hidden;
  padding: 20px;
  .box-row{
    overflow: hidden;
    .box{
        float: left;
        box-sizing: border-box;
    }
  }
}
</style>