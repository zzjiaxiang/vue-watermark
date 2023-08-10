<script setup>
import { reactive, ref } from "vue";
import Watermarks from "../components/watermarks.vue";
const font = reactive({
  fontColor: "rgba(0,0,0,.15)",
  fontSize: 12
});
const rotate = ref(-22);
const content = ref("text");
const gapX = ref(100);
const gapY = ref(100);
</script>
<template>
  <div class="content">
    <!-- image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original" -->
    <Watermarks
      :fontColor="font.fontColor"
      :rotate="rotate"
      :content="content"
      :fontSize="font.fontSize"
      :gapX="gapX"
      :gapY="gapY"
      style="flex: 1"
    >
      <div style="height: 500px">这是测试内容</div>
    </Watermarks>
    <div class="right">
      <div>Color</div>
      <el-color-picker v-model="font.fontColor" show-alpha />
      <div>Rotate</div>
      <el-slider v-model="rotate" :min="-180" :max="180" />
      <div>FontSize</div>
      <el-slider v-model="font.fontSize" />
      <div>Content</div>
      <el-input v-model="content" />
      <div>Gap</div>
      <el-input-number v-model="gapX" controls-position="right" />
      <el-input-number v-model="gapY" controls-position="right" />
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
}
.right {
  border-left: 1px solid rgb(238, 238, 238);
  padding-left: 20px;
}
</style>
