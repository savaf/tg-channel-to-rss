const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  routeRules: {
    '/**': isDev
      ? {}
      : {
          // isr: 60,
          cache: {
            swr: true,
            maxAge: 120,
            staleMaxAge: 60,
            headersOnly: true,
          },
        },
    // "/": isDev
    //   ? {}
    //   : {
    //       prerender: true,
    //     },
    // "/api/*": isDev
    //   ? {}
    //   : {
    //       cache: { maxAge: 60 * 60 },
    //     },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Create RSS feed from a Telegram channel | tg-channel-to-rss',
      htmlAttrs: { lang: 'en', class: 'h-full antialiased' },
      bodyAttrs: {
        class: 'bg-slate-950',
      },
      meta: [
        // SEO meta tags
        { charset: 'utf-8' },
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        { name: 'keywords', content: '' },
        {
          name: 'description',
          content: 'Create RSS feed from a Telegram channel',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
    },
  },

  googleFonts: {
    families: {
      "JetBrains+Mono": [400, 600, 700],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
  },
})
