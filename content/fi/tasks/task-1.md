---
title: Markdown-komponentteja
description: Erinäsisiä apuvälineitä ja tiedon esittämistä eri tavoin.
priority: high
status: pending
start: 2026-03-03
end: 2026-03-10
completed: false
---

## Ongelmat

- [ ] Voisi viimeistellä monikielisyyttä.
- [ ] Yhtenäisempi Ulkoasu

## Reaktiot

Paljon nippelihommaa

## Ratkaisut

Lisää ja parempia koodinpätkiä

## Esimerkkejä

### Kysely

::quick-quiz
---
questions:
  - question: What is the primary language of Nuxt?
    options: [JavaScript, TypeScript, Python, Go]
    answer: 2
  - question: Which module is used for Git-based CMS in Nuxt?
    options: [Nuxt UI, Nuxt Content, Nuxt Image]
    answer: 2
---
::

### Käännöshuomautus

::translation-note{targetLocale=Spanish status=missing}
::

### Käännöspohja

::translation-form{targetLang=French sourceLang=English studioPath=/fi sourceText=A nice place to collaborate on projects.}
NS est le meilleur endroit pour collaborer sur vos projets.
::

### Hyötytyhteydet

::connection-count
---
title: Kasvupolkusi
items:
  - id: workshop-lead
    label: Työpajavetäjä
    type: vaatimus
    icon: presentation
    impactScore: 5
    description: Järjestä vähintään yksi tekninen työpaja neljännesvuosittain uusille jäsenille.
    rawConnections:
      - { label: Esiintymistaidot, icon: mic, category: Taito }
      - { label: Tekninen asiantuntijuus, icon: shield-check, category: Ura }
      - { label: Yhteisön johtaminen, icon: users, category: Verkosto }
  - id: credits
    label: Nettiresurssit
    type: etu
    icon: cloud
    impactScore: 5
    description: Palvelinpuolesta huolehtiminen.
    rawConnections:
      - { label: Skaalautuva arkkitehtuuri, icon: server, category: Taito }
      - { label: Tuotantokokemus, icon: terminal, category: Ura }
  - id: mentorship
    label: Ammattilaismentorointi
    type: etu
    icon: user-plus
    impactScore: 4
    description: Pääset kuukausittaiseen uravalmennukseen alan asiantuntijan kanssa.
    rawConnections:
      - { label: Henkilöbrändäys, icon: fingerprint, category: Ura }
      - { label: Työhaastattelutaidot, icon: message-square, category: Taito }
      - { label: Globaali verkosto, icon: globe, category: Verkosto }
---
::

### Tasovertailu

::tier-comp
---
title: Membership Tiers
subtitle: Whether you're just starting out or ready to lead, there's a place for you.
tiers:
  - id: basic
    name: Standard Member
    price: Free
    description: Perfect for students who want to attend workshops and events.
    features:
      - Access to all bi-weekly workshops
      - Entry to community Discord
      - Monthly newsletter
      - Basic networking events
    buttonLabel: Join Now
    buttonLink: /
  - id: executive
    name: Executive Leader
    price: €15
    isHighlighted: true
    description: For active members who want to shape the future of the club.
    features:
      - All Basic Member perks
      - Voting rights on club decisions
      - Exclusive industry mentor pairing
      - Early access to limited-seat events
      - LinkedIn endorsement upon term completion
    buttonLabel: Apply for Exec
    buttonLink: /
  - id: alumni
    name: Alumni / Partner
    price: €50
    description: Stay connected and give back to the community after graduation.
    features:
      - All Basic Member perks
      - Priority access to hire club members
      - Guest speaker opportunities
      - Annual Gala invitation
    buttonLabel: Contact Us
    buttonLink: /
---
::

### Yhteystyökaluja

::com-tools
---
tools:
  - name: Discord
    category: communication
    icon: message-square
    description: Our main hub for daily chat, voice hangouts, and announcements.
    link: https://discord.com
  - name: GitHub
    category: collaboration
    icon: github
    description: Where we host our club projects and open-source contributions.
    link: https://github.com/club-org
  - name: Notion
    category: productivity
    icon: book
    description: Central wiki for club documentation, meeting notes, and resources.
    link: https://notion.so
  - name: Google Calendar
    category: collaboration
    icon: calendar
    description: Keep track of all upcoming workshops, meetings, and social events.
    link: https://calendar.google.com
  - name: Trello
    category: productivity
    icon: layout
    description: Visual task management for organizing club event logistics.
    link: https://trello.com
  - name: Figma
    category: collaboration
    icon: figma
    description: Used by our design team for club branding and UI/UX projects.
    link: https://figma.com
---
::

### Portaali

::com-portal
---
title: Developer Portal
description: Everything you need to build on our platform.
items:
  - title: API Reference
    description: Explore our endpoints and authentication.
    icon: lucide-code
    to: /
  - title: SDKs
    description: Official libraries for Node and Nuxt.
    icon: lucide-wrench
    to: /
  - title: Community
    description: Join our community to get help from others.
    icon: lucide-users
    to: /
---
::

### Lajikevalinta

::strain-select
---
strains:
  title: Pohjoisen Erikoislajikkeet
strains:
  - name: Pohjolan Hohto
    type: Hybridi
    thc: 0.18%
    cbd: 14.2%
    cbg: 0.8%
    parentage: Finnish Finola x Fedora 17
    floweringTime: 7-8 Viikkoa
    yield: Korkea
    aroma: [Mäntymetsä, Kataja, Sitrus]
    difficulty: Helppo
    description: Erityisesti Suomen lyhyeen kesään soveltuva kestävä lajike, joka tarjoaa puhtaan ja raikkaan aromiprofiilin.
    terpenes: [Pinene, Limonene, Myrcene]
    effects: [Virkistävä, Selkeä, Rauhoittava]
    coaUrl: /
  
  - name: Metsän Henki
    type: Indica
    thc: 0.22%
    cbd: 18.5%
    cbg: 2.1%
    parentage: Kompolti x Kush CBD
    floweringTime: 8-9 Viikkoa
    yield: Keskitaso
    aroma: [Kostea maa, Myski, Marjainen]
    difficulty: Keskivaikea
    description: Raskas ja hartsinen lajike, joka on kehitetty erityisesti iltakäyttöön ja lihasrentoutukseen.
    terpenes: [Caryophyllene, Humulene, Linalool]
    effects: [Syvä rentoutus, Unenlaatu, Kivunlievitys]
    coaUrl: /
  - name: Finola
    type: Hybridi
    thc: 0,12%
    cbd: 3,5%
    parentage: Landrace x Vavilov
    floweringTime: 100-110 päivää
    yield: Korkea
    aroma: [Pähkinäinen, Olkimainen]
    difficulty: Helppo
    description: Suomalainen klassikkolajike, joka on tunnettu erinomaisesta öljyntuotannosta ja kestävyydestä pohjoisissa olosuhteissa.
    terpenes: [Myrcene, Pinene]
    effects: [Tasapainottava, Luonnollinen]
    coaUrl: /
  - name: Huimaamaton Haze
    type: Sativa
    thc: 0,28%
    cbd: 16,4%
    cbg: 1,5%
    parentage: Silver Haze x High-CBD Hybrid
    floweringTime: 9 Viikkoa
    yield: Keskitaso
    aroma: [Sitrushedelmät, Mausteinen, Suitsuke]
    difficulty: Haastava
    description: Korkealaatuinen aromikukka, joka on jalostettu maksimoimaan terpeenipitoisuus pysyen silti EU-rajojen sisällä.
    terpenes: [Limonene, Terpinolene, Caryophyllene]
    effects: [Luova, Energinen, Kirkas]
    coaUrl: /
---
::