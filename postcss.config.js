module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 18.75,
      minPixelValue: 0.01,
      propList: ['*'],
      exclude: /node_modules/i,
      replace: true,
      // 不允许在媒体查询转换
      mediaQuery: false,
    },
  },
};
