<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { MutateObserver, getPixelRatio, getStyleStr, reRendering, rotateWatermark } from "./utils";
const props = defineProps({
  gapX: {
    type: Number,
    default: 100
  },
  gapY: {
    type: Number,
    default: 100
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 64
  },
  rotate: {
    type: Number,
    default: -22
  },
  image: {
    type: String,
    default: ""
  },
  imageWidth: {
    type: Number,
    default: 120
  },
  imageHeight: {
    type: Number,
    default: 64
  },
  content: {
    type: String,
    default: "ant design Ant Design Ant Design Ant Design"
  },
  fontColor: {
    type: String,
    default: "rgba(0,0,0,.15)"
  },
  fontStyle: {
    type: String,
    default: "normal"
  },
  fontFamily: {
    type: String,
    default: "sans-serif"
  },
  fontWeight: {
    type: String,
    default: "normal"
  },
  fontSize: {
    type: [String, Number],
    default: 16
  }
});
const markWrap = ref(null);
const watermark = ref(null);
const stopObservation = ref(false);
const watermarkStyle = () => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: props.zIndex,
  backgroundRepeat: "repeat"
});
const getMarkSize = ctx => {
  let defaultWidth = 120;
  let defaultHeight = 64;
  if (ctx.measureText) {
    ctx.font = `${Number(props.fontSize)}px ${props.fontFamily}`;
    const contents = Array.isArray(props.content) ? props.content : [props.content];
    const widths = contents.map(item => ctx.measureText(item).width);
    defaultWidth = Math.ceil(Math.max(...widths));
    defaultHeight = Number(props.fontSize) * contents.length;
  }
  return [defaultWidth, defaultHeight];
};
const appendWatermark = (base64Url, markWidth) => {
  if (markWrap.value && watermark.value) {
    stopObservation.value = true;
    watermark.value.setAttribute(
      "style",
      getStyleStr({
        ...watermarkStyle(),
        backgroundImage: `url(${base64Url})`,
        backgroundSize: `${props.gapX + markWidth}px`
      })
    );
    markWrap.value?.append(watermark.value);
    nextTick(() => {
      stopObservation.value = false;
    });
  }
};
const renderWatermark = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    if (!watermark.value) {
      watermark.value = document.createElement("div");
    }
    const ratio = getPixelRatio();
    const [markWidth, markHeight] = getMarkSize(ctx);
    const canvasWidth = `${(props.gapX + markWidth) * ratio}px`;
    const canvasHeight = `${(props.gapY + markHeight) * ratio}px`;
    const drawX = (props.gapX * ratio) / 2;
    const drawY = (props.gapY * ratio) / 2;
    const drawWidth = markWidth * ratio;
    const drawHeight = markHeight * ratio;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    if (props.image) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        /** Draw interleaved pictures after rotation */
        // ctx.restore();
        // rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
        // ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
        appendWatermark(canvas.toDataURL(), markWidth);
      };
      img.onerror = () => (img.crossOrigin = "anonymous");
      img.setAttribute("crossOrigin", "no-referrer");
      img.src = props.image;
    } else {
      // ctx.textBaseline = "middle";
      // ctx.textAlign = "center";
      // 文字绕中间旋转
      // ctx.translate(markWidth, markHeight);
      // ctx.rotate((Math.PI / 180) * Number(props.rotate));
      const markSize = Number(props.fontSize) * ratio;
      ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${markSize}px/${drawHeight}px ${props.fontFamily}`;
      ctx.fillStyle = props.fontColor;
      rotateWatermark(ctx, markWidth, markHeight, props.rotate);
      ctx.fillText(props.content, drawX, drawY);

      // ctx.restore();
      appendWatermark(canvas.toDataURL(), markWidth);
    }
  }
};
const destroyedWatermark = () => {
  if (watermark.value) {
    watermark.value.remove();
    // release vue reactive
    watermark.value = null;
  }
};
const onMutate = targetNode => {
  const callback = mutationsList => {
    if (stopObservation.value) {
      return;
    }
    mutationsList.forEach(mutationsL => {
      if (reRendering(mutationsL, watermark.value)) {
        destroyedWatermark();
        renderWatermark();
      }
    });
  };
  MutateObserver(targetNode, callback);
};
watch(props, () => renderWatermark(), { deep: true });
onMounted(() => {
  renderWatermark();
  onMutate(markWrap.value);
});
</script>

<template>
  <div ref="markWrap" :style="{ position: 'relative' }">
    <slot />
    <div ref="watermark" />
  </div>
</template>
