export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    },
    icons: {
      arrowDown: 'i-lucide-arrow-down',
      arrowLeft: 'i-lucide-arrow-left',
      arrowRight: 'i-lucide-arrow-right',
      arrowUp: 'i-lucide-arrow-up',
      caution: 'i-lucide-circle-alert',
      check: 'i-lucide-check',
      chevronDoubleLeft: 'i-lucide-chevrons-left',
      chevronDoubleRight: 'i-lucide-chevrons-right',
      chevronDown: 'i-lucide-chevron-down',
      chevronLeft: 'i-lucide-chevron-left',
      chevronRight: 'i-lucide-chevron-right',
      chevronUp: 'i-lucide-chevron-up',
      close: 'i-lucide-x',
      copy: 'i-lucide-copy',
      copyCheck: 'i-lucide-copy-check',
      dark: 'i-lucide-moon',
      drag: 'i-lucide-grip-vertical',
      ellipsis: 'i-lucide-ellipsis',
      error: 'i-lucide-circle-x',
      external: 'i-lucide-arrow-up-right',
      eye: 'i-lucide-eye',
      eyeOff: 'i-lucide-eye-off',
      file: 'i-lucide-file',
      folder: 'i-lucide-folder',
      folderOpen: 'i-lucide-folder-open',
      hash: 'i-lucide-hash',
      info: 'i-lucide-info',
      light: 'i-lucide-sun',
      loading: 'i-lucide-loader-circle',
      menu: 'i-lucide-menu',
      minus: 'i-lucide-minus',
      panelClose: 'i-lucide-panel-left-close',
      panelOpen: 'i-lucide-panel-left-open',
      plus: 'i-lucide-plus',
      reload: 'i-lucide-rotate-ccw',
      search: 'i-lucide-search',
      stop: 'i-lucide-square',
      success: 'i-lucide-circle-check',
      system: 'i-lucide-monitor',
      tip: 'i-lucide-lightbulb',
      upload: 'i-lucide-upload',
      warning: 'i-lucide-triangle-alert',
      logs: 'i-lucide-logs',
      book: 'i-lucide-book',
      help: 'i-lucide-circle-question-mark',
      map: 'i-lucide-map',
      notebook: 'i-lucide-notebook',
      bitcoin: 'i-lucide-bitcoin',
      about: 'i-lucide-badge-info',
      users: 'i-lucide-users',
      send: 'i-lucide-send',
      wrench: 'i-lucide-wrench',
      pages: 'i-lucide-book-open',
      login: 'i-lucide-log-in',
      signup: 'i-lucide-signature',
      swatch: 'i-lucide-swatch-book',
      helpcircle: 'i-lucide-help-circle',
      font: 'i-lucide-type',
      link: 'i-lucide-link',
      rocket: 'i-lucide-rocket',
      list: 'i-lucide-list',
      bell: 'i-lucide-bell',
      userPlus: 'i-lucide-user-plus',
      x: 'i-lucide-x',
      inbox: 'i-lucide-inbox',
      reply: 'i-lucide-reply',
      paperclip: 'i-lucide-paperclip',
      save: 'i-lucide-save',
      calendar: 'i-lucide-calendar',
      chartPie: 'i-lucide-chart-pie',
      circleDollarSign: 'i-lucide-circle-dollar-sign',
      shoppingCart: 'i-lucide-shopping-cart',
      checkCircle: 'i-lucide-check-circle',
      triangleAlert: 'i-lucide-triangle-alert',
      star: 'i-lucide-star',
      circlePause: 'i-lucide-circle-pause',
      cat: 'i-lucide-cat',
      bookOpen: 'i-lucide-book-open',
      layoutDashboard: 'i-lucide-layout-dashboard',
      circlePlus: 'i-lucide-circle-plus',
      cog: 'i-lucide-cog',
      chevronsUpDown: 'i-lucide-chevrons-up-down',
      user: 'i-lucide-user',
      creditCard: 'i-lucide-credit-card',
      settings: 'i-lucide-settings',
      palette: 'i-lucide-palette',
      sunMoon: 'i-lucide-sun-moon',
      logOut: 'i-lucide-log-out',
      house: 'i-lucide-house',
      messageCircle: 'i-lucide-message-circle',
      heart: 'i-lucide-heart',
      crown: 'i-lucide-crown',
      shieldCheck: 'i-lucide-shield-check',
      gitPullRequest: 'i-lucide-git-pull-request',
      cake: 'i-lucide-cake',
      lock: 'i-lucide-lock',
      trash: 'i-lucide-trash',
      wallet: 'i-lucide-wallet',
      arrowUpNarrow: 'i-lucide-arrow-up-narrow-wide',
      arrowDownWide: 'i-lucide-down-wide-narrow',
      arrowUpDown: 'i-lucide-arrow-up-down',
      settings2: 'i-lucide-settings-2',
      mail: 'i-lucide-mail',
      shield: 'i-lucide-shield',
      euro: 'i-lucide-euro',
      pen: 'i-lucide-pen'
    },
    prose: {
      codeIcon: {
        terminal: 'i-lucide-terminal',
        config: 'i-lucide-settings',
        package: 'i-lucide-package'
      }
    },
    editor: {
      slots: {
        base: [
          '[&_table]:w-full [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:rounded-md',
          '[&_th]:py-3 [&_th]:px-4 [&_th]:font-semibold [&_th]:text-sm [&_th]:text-left [&_th]:bg-muted/50 [&_th]:border-t [&_th]:border-b [&_th]:border-e [&_th]:first:border-s [&_th]:border-muted',
          '[&_th_p]:my-0 [&_th_p]:leading-5',
          '[&_td]:py-3 [&_td]:px-4 [&_td]:text-sm [&_td]:text-left [&_td]:border-b [&_td]:border-e [&_td]:first:border-s [&_td]:border-muted',
          '[&_td_p]:my-0 [&_td_p]:leading-5 [&_td_code]:text-xs/5 [&_td_ul]:my-0 [&_td_ol]:my-0 [&_td_ul]:ps-4.5 [&_td_ol]:ps-4.5 [&_td_li]:leading-6 [&_td_li]:my-0.5',
          '[&_tr:first-child_th:first-child]:rounded-tl-md [&_tr:first-child_th:last-child]:rounded-tr-md [&_tr:last-child_td:first-child]:rounded-bl-md [&_tr:last-child_td:last-child]:rounded-br-md',
          '[&_.selectedCell]:bg-primary/10 [&_.selectedCell]:ring-2 [&_.selectedCell]:ring-primary [&_.selectedCell]:ring-inset',
          '[&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:ps-1',
          '[&_ul[data-type=taskList]_li]:flex [&_ul[data-type=taskList]_li]:items-center [&_ul[data-type=taskList]_li]:ps-0',
          '[&_ul[data-type=taskList]_li_label]:inline-flex [&_ul[data-type=taskList]_li_label]:pr-2.5',
          '[&_ul[data-type=taskList]_li_label_input]:appearance-none [&_ul[data-type=taskList]_li_label_input]:size-4 [&_ul[data-type=taskList]_li_label_input]:rounded-sm [&_ul[data-type=taskList]_li_label_input]:ring [&_ul[data-type=taskList]_li_label_input]:ring-inset [&_ul[data-type=taskList]_li_label_input]:ring-accented [&_ul[data-type=taskList]_li_label_input]:bg-center',
          '[&_ul[data-type=taskList]_li_label_input:checked]:bg-primary [&_ul[data-type=taskList]_li_label_input:checked]:ring-primary [&_ul[data-type=taskList]_li_label_input:checked]:bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDZMOSAxN2wtNS01Ii8+PC9zdmc+)] dark:[&_ul[data-type=taskList]_li_label_input:checked]:bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDZMOSAxN2wtNS01Ii8+PC9zdmc+)]',
          '[&_ul[data-type=taskList]_li[data-checked=true]>div>p]:line-through [&_ul[data-type=taskList]_li[data-checked=true]>div>p]:opacity-50'
        ]
      }
    }
  },
  theme: {
    radius: 0.25,
    blackAsPrimary: false,
    icons: 'lucide',
    font: 'Finlandica'
  },
  header: {
    title: 'Northern Sun',
    to: '/',
    logo: {
      alt: 'NS',
      light: '/ns-logo-light.webp',
      dark: '/ns-logo-dark.webp'
    },
    search: true,
    colorMode: true,
    theme: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Catventurist',
      'target': '_blank',
      'aria-label': 'GitHub'
    }],
    meetingLink: '/',
    mail: 'cat@mail.com'
  },
  footer: {
    credits: `Catventurist • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Catventurist',
      'target': '_blank',
      'aria-label': 'Github'
    }, {
      'icon': 'i-custom-ecency',
      'to': 'https://ecency.com/@catventurist',
      'target': '_blank',
      'aria-label': 'Ecency'
    }, {
      'icon': 'i-simple-icons-gitlab',
      'to': 'https://gitlab.com/Catventurist',
      'target': '_blank',
      'aria-label': 'GitLab'
    }]
  },
  toaster: {
    position: 'bottom-center' as const,
    duration: 4200,
    max: 5,
    expand: true
  }
})
