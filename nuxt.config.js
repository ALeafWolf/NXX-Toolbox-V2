export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nxxtoolbox-nuxt",
    htmlAttrs: {
      lang: "zh",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["ant-design-vue/dist/antd.css", "@/assets/scss/global.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/global-variables.js', '~/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
  ],
  i18n: {
    vueI18nLoader: true,
    locales: [
      {
        code: "zh",
        iso: "zh-CN",
      },
      {
        code: "en",
        iso: "en-US",
      },
      {
        code: "ko",
        iso: "ko-KR",
      },
    ],
    defaultLocale: "zh",
    seo: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_nxxtoolbox",
      alwaysRedirect: false,
      fallbackLocale: "zh",
    },
  },
  styleResources: {
    scss: ["@/assets/scss/*.scss"],
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    timing: false,
  },
  axios: {
    baseURL: process.env.API_URL || "http://localhost:1338",
  },
  apollo: {
    clientConfigs: {
      default: "~/plugins/apollo-config.js",
    },
    // errorHandler: '~/plugins/errorhandler.apollo.js'
  },
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1338",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
