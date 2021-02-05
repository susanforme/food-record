import { defineConfig } from 'umi';
const px2rem = require('postcss-pxtorem');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  // 禁用sourcemap
  devtool: false,
  fastRefresh: {},
  esbuild: {},
  locale: {
    default: 'zh-CN',
  },
  dva: {
    hmr: true, //是否启用 dva 的 热更新
    immer: true,
  },
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 18.75,
      minPixelValue: 0.01,
      propList: ['*'],
      exclude: /node_modules/i,
      replace: true,
      // 不允许在媒体查询转换
      mediaQuery: false,
    }),
  ],
});
