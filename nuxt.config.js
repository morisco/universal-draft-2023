export default {
  // mode: 'universal',
  head: {
    title: 'The Ringer\'s 2022 NBA Draft Guide',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', href: 'https://cdn-images-1.medium.com/fit/c/128/128/1*w1O1RbAfBRNSxkSC48L1PQ.png' },
      { rel: 'apple-touch-icon', href: 'https://cdn-images-1.medium.com/fit/c/152/152/1*w1O1RbAfBRNSxkSC48L1PQ.png', sizes:'152x152' },
      { rel: 'apple-touch-icon', href: 'https://cdn-images-1.medium.com/fit/c/120/120/1*w1O1RbAfBRNSxkSC48L1PQ.png', sizes:'120x120' },
      { rel: 'apple-touch-icon', href: 'https://cdn-images-1.medium.com/fit/c/76/76/1*w1O1RbAfBRNSxkSC48L1PQ.png', sizes:'76x76' },
      { rel: 'apple-touch-icon', href: 'https://cdn-images-1.medium.com/fit/c/60/60/1*w1O1RbAfBRNSxkSC48L1PQ.png', sizes:'60x60' }
    ],
    script: [
    ],
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  serverMiddleware: ['~/server-middleware/cache'],
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/VueYoutube', mode: 'client'},
    {src: '~/plugins/analytics', mode: 'client'},
    {src: '~/plugins/donut', mode: 'client'},
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
        name: 'draft_grades_player_share',
        path: '/draft-grades/:player_id',
        component: resolve(__dirname, 'pages/draft-grades.vue')
      });
    }
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/moment',
    ['@nuxtjs/dotenv', { 
      filename: '.env.staging' 
    }],
    // '@nuxtjs/google-analytics',
  ],

  // googleAnalytics: {
  //   id: 'UA-132999529-1',
  //   // disableScriptLoader: true, 
  //   autoTracking: {
  //     pageviewOnLoad: false
  //   },
  //   debug: {
  //     enabled: true,
  //     sendHitTask: true
  //   }
  // },
  // server: {
  //   host: '0.0.0.0' // default: localhost
  // },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxt-mq',
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
