require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'goldensuisse-myaccount',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/preloader.css',
    '@fortawesome/fontawesome-svg-core/styles.css',

    '@/assets/main.scss',
    // '@/assets/css/dashboard_v2.scss',
    '@/assets/css/app_common.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api.js",
    "~/plugins/bootstrap.js",
    '~/plugins/fontawesome.js',
    '~/plugins/echarts.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
   
  ],

  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
},
proxy: {
  '/api': {
    target: process.env.SANDBOX_APP_API_ENDPOINT, // 目标接口域名
    changeOrigin: true, // 表示是否跨域
    pathRewrite: {
      '^/api': '/', // 把 /api 替换成 /
    }
  }
},


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vue-google-charts'
    ]
  }
}
