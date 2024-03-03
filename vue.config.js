const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: `/PD_VUE/`,
  transpileDependencies: [
    'vuetify'
  ]
})
