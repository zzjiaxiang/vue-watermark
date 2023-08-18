import WaterMark from './src/water-mark.vue'
WaterMark.install = (app) => {
  app.component(WaterMark.name, WaterMark)
}
export default WaterMark