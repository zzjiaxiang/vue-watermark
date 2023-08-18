<script setup>
import { reactive, ref } from "vue";
import WaterMark from "../package/components/water-mark/src/water-mark.vue";
const font = reactive({
  fontColor: "rgba(0,0,0,.15)",
  fontSize: 16
});
const rotate = ref(-22);
const content = ref("This is default content");
const gapX = ref(200);
const gapY = ref(200);
const text = `
  JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2023, 98.7% of websites use JavaScript on the client side for webpage behavior,[10] often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.

  JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[11] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).

  The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.

  JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.

  Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.
  `;
</script>
<template>
  <h2>自定义配置</h2>
  <div class="content">
    <water-mark
      :rotate="rotate"
      :content="content"
      :fontColor="font.fontColor"
      :fontSize="font.fontSize"
      :gapX="gapX"
      :gapY="gapY"
      style="flex: 4"
    >
      <pre style="white-space: pre-wrap">
          {{ text }}
      </pre>
    </water-mark>
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
  <h2>图片作为背景</h2>
  <div class="content">
    <water-mark image="https://png.zjiaxiang.cn/blog/webps.svg" :content="content">
      <pre style="white-space: pre-wrap">
          {{ text }}
      </pre>
    </water-mark>
  </div>
</template>
<style>
.content {
  display: flex;
  height: 100%;
}
.right {
  flex: 1;
  border-left: 1px solid rgb(238, 238, 238);
  padding-left: 20px;
}
</style>
