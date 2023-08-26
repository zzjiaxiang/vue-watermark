import { defineConfig } from 'rollup'
// import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json'
import PluginTerser from '@rollup/plugin-terser'
import PluginVue from 'rollup-plugin-vue'
import PluginCommonJS from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  input: 'src/package/components/water-mark/index.js',
  output: [
    {
      file: 'lib/bundle-cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/bundle-es.js',
      format: 'es',
    },
    {
      file: 'lib/bundle-es-min.js',
      format: 'es',
      plugins: [PluginTerser()],
    },
  ],
  plugins: [
    PluginCommonJS(),
    // resolve(),
    PluginVue(),
    json(),
    esbuild({
      target: 'chrome64',
      include: /\.vue$/,
      loaders: {
        '.vue': 'js',
      },
    }),
  ],
  // 指出哪些模块需要被视为外部引入
  external: ['vue'],
})
