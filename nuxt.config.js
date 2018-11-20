const pkg = require('./package')
const webpack = require('webpack')
module.exports = {
  mode: 'universal',
  
  axios: {
      baseURL: 'http://view-ghyath4.c9users.io:8081/api/admin'
  },
  env: {
    apiUrl: 'http://view-ghyath4.c9users.io:8081',
    pusherKey:'ec516c25671a3ff0fb1c'
  },
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' }
    ]
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'success.token' },
          logout: { url: '/logout-admin', method: 'post' },
          user: { url: '/admin', method: 'get', propertyName: 'admin' },
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      user: '/'
    }
  },
  
  loading: { color: 'green',height:'2px' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/axios.js','~/plugins/mixins/globals.js',
  {src:'~/plugins/custom.js',ssr:false},
  {src:'~/plugins/laravel-echo.js',ssr:false}],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
 
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      allChunks: true
    },
    
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    plugins:[
      new webpack.ProvidePlugin({
         '$': 'jquery',
         'jQuery':'jquery',
         '_': 'lodash'
       })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
       if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
}
