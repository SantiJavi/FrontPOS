export default {
  // Global page headers: https://go.nuxtjs.dev/config-head  
  //mode: 'production',
  head: {
    title: 'Sys_Facturas',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'referrer', content: 'no-referrer-when-downgrade'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      { rel: 'stylesheet', href: '/assets/css/nucleo-icons.css'},      
      { rel: 'stylesheet', href: '/assets/css/nucleo-svg.css'},  
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'},  
      { rel: 'stylesheet', href: '/assets/css/soft-ui-dashboard.min.css'},      
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" }
    ],
    script:[
        {src:"/assets/js/core/popper.min.js"},
        {src:"/assets/js/core/bootstrap.min.js"},
        {src:"/assets/js/plugins/perfect-scrollbar.min.js"},
        {src:"/assets/js/plugins/smooth-scrollbar.min.js"},
        {src:"/assets/js/plugins/dropzone.min.js"},
        {src:"/assets/js/plugins/dragula/dragula.min.js"},
        {src:"/assets/js/plugins/jkanban/jkanban.js"},
        { src: "https://kit.fontawesome.com/42d5adcbca.js", crossorigin: "anonymous" },
        {src:"/assets/js/plugins/chartjs.min.js"},        
        { src: '/assets/js/lib/forge.min.js'},
        { src: '/assets/js/lib/buffer.js'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
      '@nuxtjs/axios',
      'vue-sweetalert2/nuxt',
      '@nuxtjs/dotenv'
  ]
}
