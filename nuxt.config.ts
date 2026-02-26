export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: false
  },
  css: ['~/assets/css/main.css'],
  mdc: {
    highlight: {
      noApiRoute: false
    }
  },
  ui: {
    experimental: {
      componentDetection: true
      /* ['Button', 'PageCard', 'PageGrid', 'PageHero', 'PageSection', 'PageCTA', 'Tabs', 'Accordion', 'Avatar', 'Steps', 'Callout', 'CodeCollapse', 'CodeGroup', 'CodePreview', 'CodeTree', 'Collapsible', 'Icon', 'Kbd'] */
    }
  },

  routeRules: {
    '/api/**': {
      cors: true
    },
    '/en/docs/**': { appLayout: 'docs' },
    '/en/login/**': { appLayout: 'auth' },
    '/en/signup/**': { appLayout: 'auth' },
    '/fi/docs/**': { appLayout: 'docs' },
    '/fi/login/**': { appLayout: 'auth' },
    '/fi/signup/**': { appLayout: 'auth' }
  },

  compatibilityDate: '2026-02-23',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  telemetry: false,

  hooks: {
    'content:file:beforeParse'(ctx) {
      const { file } = ctx

      if (file.id.endsWith('.md')) {
        file.body = file.body.replace(/react/gi, 'Vue')
      }
    },
    'content:file:afterParse'(ctx) {
      const { file, content } = ctx

      const wordsPerMinute = 180
      const text = typeof file.body === 'string' ? file.body : ''
      const wordCount = text.split(/\s+/).length

      content.readingTime = Math.ceil(wordCount / wordsPerMinute)
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Finlandica', provider: 'bunny' },
      { name: 'Arima Madurai', provider: 'bunny' },
      { name: 'Chivo Mono', provider: 'bunny' },
      { name: 'Caveat', provider: 'bunny' }
    ]
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', dir: 'ltr', file: 'en.yml', icon: 'cat-usa' },
      { code: 'fi', name: 'Suomi', language: 'fi-FI', dir: 'ltr', file: 'fi.yml', icon: 'cat-finland' }
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    skipSettingLocaleOnNavigate: true
  },

  icon: {
    provider: 'iconify',
    customCollections: [{
      prefix: 'cat',
      dir: './app/assets/icons'
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  }
})
