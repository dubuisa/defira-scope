const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    resolve: {
      fallback: {
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      },
    }
  }
})
