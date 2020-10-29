module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '购物网站'
        return args
      })
  },
  configureWebpack:{
    resolve:{
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer:{
    host: "0.0.0.0",
    port: 8888,
    https: false,
    open: true,
    hotOnly: true
  }
}
