- 基于ant-design <a href="https://github.com/ant-design/ant-design/blob/master/components/watermark/index.tsx" target="_blank">watermark</a> 组件的vue3版本
- <a href="https://vue-watermark.zjiaxiang.cn/" target="_blank">点击这里在线预览</a>

### 使用

```
npm i @zzjiaxiang/vue-watermark
or
yarn add @zzjiaxiang/vue-watermark
```

```
<!-- main.js -->
import WaterMark from '@zzjiaxiang/vue-watermark'
app.use(WaterMark)

<!-- otherPage.vue -->
<Watermarks
  content="This is default content"
>
  <div style='height: 500px;'></div>
</Watermarks>
```

### 参数

| 参数       | 说明                                                        | 类型                                        | 默认值          |
| ---------- | ----------------------------------------------------------- | ------------------------------------------- | --------------- |
| width      | 水印的宽度，`content` 的默认值为自身的宽度                  | number                                      | 120             |
| height     | 水印的高度，`content` 的默认值为自身的高度                  | number                                      | 64              |
| rotate     | 水印绘制时，旋转的角度，单位 `°`                            | number                                      | -22             |
| zIndex     | 追加的水印元素的 z-index                                    | number                                      |                 |
| image      | 图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式) | string                                      | -               |
| content    | 水印文字内容                                                | string \| string[]                          | -               |
| gapX       | 水印之间X的间距                                             | number                                      | 200             |
| gapY       | 水印之间Y的间距                                             | number                                      | 200             |
| fontColor  | 字体颜色                                                    | string                                      | rgba(0,0,0,.15) |
| fontSize   | 字体大小                                                    | number                                      | 16              |
| fontWeight | 字体粗细                                                    | `normal` \| `light` \| `weight` \| number   | normal          |
| fontFamily | 字体类型                                                    | string                                      | sans-serif      |
| fontStyle  | 字体样式                                                    | `none` \| `normal` \| `italic` \| `oblique` | normal          |

传入image属性时优先使用图片源,当图片源加载失败时显示content内容显示水印.

### 开发

```
$ git clone git@github.com:zzjiaxiang/vue-watermark.git
$ cd vue-watermark
$ npm install
$ npm dev
```
