const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost",
    prot: 9090,
    open:true,
  }
})
