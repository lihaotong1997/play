<template>
    <el-descriptions title="俄罗斯方块" :column="1">
        <el-descriptions-item label="游戏介绍：">
            《俄罗斯方块》（Tetris， 俄文：Тетрис）是一款由俄罗斯人阿列克谢·帕基特诺夫于1984年6月发明的休闲游戏。   
        </el-descriptions-item>
        <el-descriptions-item label="游戏规则：">
            《俄罗斯方块》的基本规则是移动、旋转和摆放游戏自动输出的各种方块，使之排列成完整的一行或多行并且消除得分。
        </el-descriptions-item>
        <el-descriptions-item label="操作介绍：">
            通过左、右键进行移动，下键加速下落，空格键进行旋转。
        </el-descriptions-item>
        <el-descriptions-item label="难度选择：">
            <el-radio-group v-model="level" class="ml-4">
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
import { computed } from "vue";
let level = computed({
    get(){
        return "elementary"
    },
    set(){

    }
})
const play = function(){
    
}
</script>

<style scoped>

</style>