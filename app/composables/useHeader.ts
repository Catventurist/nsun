export function useHeader() {
  const route = useRoute()
  const localePath = useLocalePath()
  const appConfig = useAppConfig()
  const { t } = useI18n()

  const desktopLinks = computed(() => [{
    label: t('header.pages'),
    icon: appConfig.ui.icons.info,
    slot: 'pages' as const,
    children: [
      {
        label: t('header.about.title'),
        description: t('header.about.description'),
        to: localePath('/about'),
        icon: appConfig.ui.icons.info
      }, {
        label: t('header.features.title'),
        description: t('header.features.description'),
        to: localePath('/features'),
        icon: appConfig.ui.icons.give
      }, {
        label: t('header.authors.title'),
        description: t('header.authors.description'),
        to: localePath('/authors'),
        icon: appConfig.ui.icons.users
      }, {
        label: t('header.pricing.title'),
        description: t('header.pricing.description'),
        to: localePath('/pricing'),
        icon: appConfig.ui.icons.euro
      }, {
        label: t('editor.title'),
        description: t('editor.description'),
        to: localePath('/editor'),
        icon: appConfig.ui.icons.pen
      }, {
        label: t('header.projects.title'),
        description: t('header.projects.description'),
        to: localePath('/projects'),
        icon: appConfig.ui.icons.light
      }]
  }, {
    label: t('header.docs.title'),
    to: localePath('/docs/getting-started/introduction'),
    icon: appConfig.ui.icons.book,
    active: route.path.startsWith(localePath('/docs'))
  }, {
    label: t('header.blog.title'),
    to: localePath('/blog'),
    icon: appConfig.ui.icons.bookOpen
  }, {
    label: t('header.guides.title'),
    to: localePath('/guides'),
    icon: appConfig.ui.icons.notebook
  /*   }, {
    label: t('header.dashboard.title'),
    to: localePath('/dash'),
    icon: appConfig.ui.icons.layoutDashboard
 */
  }])

  const mobileLinks = computed(() => [{
    label: t('header.about.title'),
    to: localePath('/about'),
    icon: appConfig.ui.icons.info
  }, {
    label: t('header.authors.title'),
    to: localePath('/authors'),
    icon: appConfig.ui.icons.users
  }, {
    label: t('header.docs.title'),
    to: localePath('/docs/getting-started/introduction'),
    icon: appConfig.ui.icons.book,
    active: route.path.startsWith(localePath('/docs'))
  }, {
    label: t('header.blog.title'),
    to: localePath('/blog'),
    icon: appConfig.ui.icons.bookOpen
  }, {
    label: t('header.guides.title'),
    to: localePath('/guides'),
    icon: appConfig.ui.icons.notebook
  }, {
    label: t('header.pricing.title'),
    to: localePath('/pricing'),
    icon: appConfig.ui.icons.euro
  }, {
    label: t('editor.title'),
    to: localePath('/editor'),
    icon: appConfig.ui.icons.pen
  /* }, {
    label: t('header.dashboard.title'),
    to: localePath('/dash'),
    icon: appConfig.ui.icons.layoutDashboard */
  }, {
    label: t('header.projects.title'),
    to: localePath('/projects'),
    icon: appConfig.ui.icons.light
  }, {
    label: t('login.title'),
    to: localePath('/login'),
    icon: appConfig.ui.icons.login
  }, {
    label: t('signup.title'),
    to: localePath('/signup'),
    icon: appConfig.ui.icons.signup
  }])

  const tocLinks = computed(() => [{
    icon: 'lucide-pen',
    label: t('links.edit.editor'),
    to: '/',
    disabled: true
  }, {
    icon: 'lucide-file-pen',
    label: t('links.edit.git'),
    to: 'https://github.com/catventurist',
    target: '_blank'
  }, {
    icon: appConfig.ui.icons.star,
    label: t('links.star'),
    to: 'https://github.com/catventurist',
    target: '_blank'
  }, {
    icon: appConfig.ui.icons.pages,
    label: 'Nuxt UI',
    to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
    target: '_blank'
  }])

  const footerLinks = [{
    label: t('header.resources'),
    children: [{
      label: t('header.help'),
      to: localePath('/changelog#faq')
    }, {
      label: t('header.docs.title'),
      to: localePath('/docs/getting-started')
    }, {
      label: t('header.roadmap'),
      to: localePath('/about#roadmap')
    }, {
      label: t('header.changelog.title'),
      to: localePath('/changelog')
    }]
  }, {
    label: t('header.features.title'),
    children: [{
      label: t('header.affiliates.title'),
      to: localePath('/features#affiliates')
    }, {
      label: t('header.portal')
    }, {
      label: t('header.jobs.title'),
      to: localePath('/features#jobs')
    }, {
      label: t('header.sponsors.title'),
      to: localePath('/features#sponsors')
    }]
  }, {
    label: t('header.company'),
    children: [{
      label: t('header.about.title'),
      to: localePath('/about')
    }, {
      label: t('header.pricing.title'),
      to: localePath('/pricing')
    }, {
      label: t('header.jobs.title'),
      to: localePath('/features#jobs')
    }, {
      label: t('header.blog.title'),
      to: localePath('/blog')
    }]
  }]

  return {
    desktopLinks,
    mobileLinks,
    tocLinks,
    footerLinks
  }
}
