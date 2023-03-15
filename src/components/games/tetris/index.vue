<template>
    <router-view :rightAside="rightAside"></router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const rightAside = ref(400)
</script>

<style scoped></style>