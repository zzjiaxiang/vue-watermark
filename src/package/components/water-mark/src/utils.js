export function toLowercaseSeparator(key) {
  return key
    .replace(/([A-Z])/g, (replacement) => `-${replacement}`)
    .toLowerCase()
}
export function getStyleStr(style) {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`)
    .join(' ')
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}

/** Rotate with the watermark as the center point */
export function rotateWatermark(ctx, rotateX, rotateY, rotate) {
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}

/** Whether to re-render the watermark */
export const reRendering = (mutation, watermarkElement) => {
  let flag = false
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement)
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true
  }
  return flag
}

export const MutateObserver = (targetNode, callback) => {
  const config = {
    subtree: true,
    childList: true,
    attributeFilter: ['style', 'class'],
  }
  if (targetNode && 'MutationObserver' in window) {
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  }
}
