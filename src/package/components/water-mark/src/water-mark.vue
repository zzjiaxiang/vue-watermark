<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { MutateObserver, getPixelRatio, getStyleStr, reRendering, rotateWatermark } from "./utils";
defineOptions({
  name: "WaterMark"
});
const FontGap = 3;

const props = defineProps({
  gapX: {
    type: Number,
    default: 200
  },
  gapY: {
    type: Number,
    default: 200
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
    type: [String, Array],
    default: ""
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
const fillTexts = (ctx, drawX, drawY, drawWidth, drawHeight, canvas, markWidth) => {
  const ratio = getPixelRatio();
  const mergedFontSize = Number(props.fontSize) * ratio;
  ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${mergedFontSize}px/${drawHeight}px ${props.fontFamily}`;
  ctx.fillStyle = props.fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.translate(drawWidth / 2, 0);
  const contents = Array.isArray(props.content) ? props.content : [props.content];
  contents?.forEach((item, index) => {
    ctx.fillText(item ?? "", drawX, drawY + index * (mergedFontSize + FontGap * ratio));
  });
  appendWatermark(canvas.toDataURL(), markWidth);
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
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    const drawX = (props.gapX * ratio) / 2;
    const drawY = (props.gapY * ratio) / 2;
    const drawWidth = markWidth * ratio;
    const drawHeight = markHeight * ratio;
    const rotateX = (drawWidth + props.gapX * ratio) / 2;
    const rotateY = (drawHeight + props.gapY * ratio) / 2;
    rotateWatermark(ctx, rotateX, rotateY, props.rotate);
    if (props.image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      img.src = props.image;

      img.onload = () => {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        appendWatermark(canvas.toDataURL(), markWidth);
      };
      img.onerror = () => {
        fillTexts(ctx, drawX, drawY, drawWidth, drawHeight, canvas, markWidth);
      };
    } else {
      fillTexts(ctx, drawX, drawY, drawWidth, drawHeight, canvas, markWidth);
    }
    ctx.restore();
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
