<script setup>
import { ref } from "vue";

const count = ref(0);
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const water = 1;
console.log(ctx, water);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
<style lang="scss" scoped></style>
