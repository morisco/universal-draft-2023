export default {
  // mode: 'universal',
  head: {
    title: 'draft-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
    ],
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/VueYoutube', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'big_board_player_share',
        path: '/:player_id',
        component: resolve(__dirname, 'pages/index.vue')
      });
      routes.push({
        name: 'mock_draft_player_share',
        path: '/mock-draft/:player_id',
        component: resolve(__dirname, 'pages/mock-draft.vue')
      });
      routes.push({
        name: 'team_needs_team_share',
        path: '/team-needs/:team_id',
        component: resolve(__dirname, 'pages/team-needs.vue')
      });
      routes.push({
        name: 'draft_results_player_share',
        path: '/draft-results/:player_id',
        component: resolve(__dirname, 'pages/draft-results.vue')
      });
    }
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/dotenv', { 
      filename: '.env.staging',
      // filename: '.env' 
    }],
    '@nuxtjs/google-analytics',
  ],

  googleAnalytics: {
    id: 'UA-98869396-1',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxt-mq',
    'cookie-universal-nuxt',
    ['nuxt-lazy-load', {
      images: true,
      audios: false,
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
