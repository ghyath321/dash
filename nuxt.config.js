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
    bodyAttrs: {
      class: 'fix-header fix-sidebar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' }
    ],
    script: [
      // Supported  Nuxt 1.0
      { src: '/js/lib/jquery/jquery.min.js', body: true },
      { src: '/js/lib/bootstrap/js/popper.min.js', body: true },
      { src: '/js/lib/bootstrap/js/popper.min.js', body: true },
      { src: '/js/jquery.slimscroll.js', body: true },
      { src: '/js/sidebarmenu.js', body: true },
      { src: '/js/lib/sticky-kit-master/dist/sticky-kit.min.js', body: true },
      { src: '/js/custom.min.js', body: true },
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      
    ]
  },
  loading: { color: 'green',height:'2px' },

  css: [
  ],

  plugins: ['~/plugins/axios.js','~/plugins/mixins/globals.js','~/plugins/moment.js',
  {src:'~/plugins/custom.js',ssr:false},
  {src:'~/plugins/laravel-echo.js',ssr:false}],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
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
