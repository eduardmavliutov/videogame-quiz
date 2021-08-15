export default {
  ssr: false,

  publicRuntimeConfig: {
    secret: process.env.NUXT_APP_SECRET
  },

  loading: {
    color: '#ffd848',
    height: '5px',
  },

  loadingIndicator: {
    name: 'cube-grid',
    color: '#bf360c',
    background: '#e8e8e8'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Videogame Quiz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['./assets/scss/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/vuex-persist',
      ssr: false
    },
    {
      src: '@/plugins/validation-rules',
      ssr: false
    },
    {
      src: '@/plugins/vue-croppa',
      ssr: false,
    },
  ],

  pageTransition: {
    name: 'route-change'
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.NUXT_APP_API_KEY,
          authDomain: 'videogame-quizzz.firebaseapp.com',
          projectId: 'videogame-quizzz',
          storageBucket: 'videogame-quizzz.appspot.com',
          messagingSenderId: '9357665547',
          appId: '1:9357665547:web:45870505b613c87248ee0e',
        },
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedAction (ctx, { authUser }) {
                console.log('onAuthStateChangedAction')
                if (!ctx.getters('user/isAuthenticated') && authUser) {
                  ctx.dispatch('user/fetchUserData', {
                    userId: authUser.uid
                  }, { root: true })
                } else {  
                  ctx.commit('user/logout', { root: true })
                }
              }
            }
          },
          database: true,
        },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  styleResources: {
    scss: './assets/scss/_variables.scss',
  },

  router: {
    middleware: ['router-guard'],
    extendRoutes(routes, resolve) {
      routes.push(
        ...[
          {
            path: '/quiz/:quizId',
            component: resolve(__dirname, 'views/QuizPage/QuizPage.vue'),
          },
          {
            path: '/quiz/:quizId/:questionId',
            props: ({ params }) => ({
              quizId: params.quizId,
              questionId: Number(params.questionId),
            }),
            component: resolve(
              __dirname,
              'views/ActiveQuestionPage/ActiveQuestionPage.vue'
            ),
            name: 'quiz-question',
          },
          {
            path: '/admin/quizes/:id?',
            component: resolve(
              __dirname,
              'views/AdminQuizPage/AdminQuizPage.vue'
            ),
            name: 'admin-quizes-id',
          },
        ]
      );
    },
  },
};
