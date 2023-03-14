<template>
    <el-empty description="还没有选择游戏哟">
        <el-button type="primary" @click="playGame">
            玩一玩
        </el-button>
    </el-empty>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const playGame = function(){
    router.push({
        path:"/games/tetris"
    })
}
</script>

<style scoped></style>