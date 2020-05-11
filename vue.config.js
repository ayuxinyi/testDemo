const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // transpileDependencies: ['webpack-dev-server/client'],
  publicPath: "./",
  devServer: {
    port: 8001,
    proxy: {
      '/api': {
        target: 'http://60.208.23.51:7181/xdl-core',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''    //代理的路径
        }
      }
    }

  },

  chainWebpack: (config) => {
    // config.entry.app = ['babel-polyfill', './src/main.js'];
    config.resolve.alias
      .set('@', resolve("src"))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  },
  configureWebpack: {
    // if (process.env.NODE_ENV === 'production') {
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    // }
    externals: {
      'echarts': 'echarts'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/style/base.scss";`
      },
      scss: {
        prependData: `@import "~@/style/base.scss";`
      }
    }
  }
};
