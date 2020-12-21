export default {
  // mode: 'universal',
  head: {
    title: 'draft-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxt-mq',
    ['nuxt-lazy-load', {
      observerConfig: {
        'rootMargin': '1000px'
      }
    }]
  ],

  mq: {
    breakpoints: {
      mobile: 768,
      tablet: 900,
      small_desktop: 1200,
      medium_desktop: 1400,
      large_desktop: Infinity
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  styleResources: {
    scss: [
      '~/assets/scss/mixins.scss',
      '~/assets/scss/fonts.scss',
      '~/assets/scss/vars.scss',
    ]
}
}
