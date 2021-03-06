import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';
const px2rem = require('postcss-pxtorem');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  mock: false,
  // 禁用sourcemap
  devtool: false,
  fastRefresh: {},
  esbuild: {},
  locale: {
    default: 'zh-CN',
  },
  dva: {
    // 是否启用 dva 的 热更新
    hmr: true,
    immer: true,
  },
  theme,
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
  lessLoader: {
    globalVars: {
      '@padding': '2vw',
      '@animate-time': '400ms',
    },
  },
  proxy: {
    '/api': {
      target: 'http://localhost:4000/graphql',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  inlineLimit: 1000000,
  antd: {
    compact: true,
  },
  chainWebpack(memo) {
    memo.module
      .rule('media')
      .test(/.mp(3|4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'assets/[name].[ext]',
      });
  },
});
