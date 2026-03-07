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

## Tehtävää

- TierComp.vue Simppeli tasojen vertailu
  - sisältö
  - käännökset

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
    link: /
  - name: GitHub
    category: collaboration
    icon: github
    description: Where we host our club projects and open-source contributions.
    link: https://github.com/catventurist
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

## Apukeskus

::h-desk
---
title: Tarvitsetko apua?
description: Asiakaspalvelumme on täällä sinua varten. Vastaamme tyypillisesti arkisin 24 tunnin sisällä.
buttonText: Ota yhteyttä
link: /fi/community
type: general
status: online
---
Voit myös tutustua [usein kysyttyihin kysymyksiin](/fi/pricing) löytääksesi vastaukset nopeasti.
::

::h-desk
---
title: Tekninen tuki
description: Onko sinulla vaikeuksia API-integraation kanssa? Asiantuntijamme auttavat teknisissä ongelmissa.
buttonText: Avaa tukipyyntö
link: /fi/docs/getting-started
type: technical
icon: lucide:terminal
ticketId: n.2
---
Muista liittää mukaan mahdolliset virhelokit ja ympäristötiedot nopeuttaaksesi vianetsintää.
::

## Kasvun vaiheet

::grow-phase
---
strainName: Northern Lights
genetics: Indica Dominant
stage: flowering
lightCycle: 12/12
phLevel: 6.2
ecLevel: 1.8
temperature: 24
humidity: 45
plantedDate: 2026-01-15
estimatedHarvest: 2026-04-10
---
- Kukintoja alkaa muodostua runsaasti. 
- **Haju** on voimistunut merkittävästi.
- Ilmankosteus on laskettu [45]() prosenttiin _homeen_ välttämiseksi.
- Lisätty **fosfori**- ja **kaliumpitoista** lannoitetta.
::

## Kasvuspeksit

::grow-specs
---
title: Kasvuolosuhteet - Vegetatiivinen vaihe
specs:
  - label: Lämpötila
    icon: lucide:thermometer
    current: 24.5
    unit: °C
    target: 22 - 28 °C
    status: optimal
  - label: Ilmankosteus
    icon: lucide:cloud-rain
    current: 68
    unit: %
    target: 60 - 70 %
    status: optimal
  - label: Valojakso
    icon: lucide:timer
    current: 18/6
    target: 18/6 tai 20/4
    status: optimal
  - label: pH-arvo
    icon: lucide:test-tube
    current: 5.5
    target: 5.8 - 6.2
    status: alert
  - label: Veden EC
    icon: lucide:zap
    current: 1.4
    unit: mS/cm
    target: 1.2 - 1.6
    status: optimal
  - label: VPD
    icon: lucide:wind
    current: 0.9
    unit: kPa
    target: 0.8 - 1.1 kPa
    status: warning
---
::warning
**Huomio:** pH-arvo on tällä hetkellä tavoitealueen alapuolella.
::
Tarkista kalibrointi ja nosta pH-tasoa välittömästi ravinteiden imeytymisen varmistamiseksi.
::

## Certificate of Analysis, COA

::grow-results
---
sampleName: Sun Premium
batchId: LOT-FG-2024-X11
labName: SunLab
date: 22.02.2026
totalThc: 0.12
totalCbd: 18.4
moisture: 9.2
waterActivity: 0.58
coaLink: /
cannabinoids:
  - name: CBD
    value: 17.1
  - name: CBDa
    value: 1.2
  - name: CBG
    value: 2.1
  - name: THC
    value: 0.11
terpenes:
  - name: Beta-Caryophyllene
    value: 5.4
  - name: Limonene
    value: 3.8
  - name: Linalool
    value: 1.2
heavyMetals:
  - name: Arseeni
    value: 0.01
    limit: 0.2
    unit: ppm
    status: pass
  - name: Lyijy
    value: 0.05
    limit: 0.5
    unit: ppm
    status: pass
microbiology:
  - name: Salmonella
    status: pass
  - name: E. Coli
    status: pass
  - name: Aspergillus
    status: pass
---
**Asiantuntijan lausunto:**

Erä osoittaa poikkeuksellista puhtautta.

- Raskasmetallien pitoisuudet ovat kaukana sallituista rajoista.
- Matala vesiaktiivisuus (0.58 aw) takaa erinomaisen säilyvyyden ja estää mikrobiologisen kasvun varastoinnin aikana.
::

## Tuotearviot

::strain-review
---
productName: Royal Sun CBD
brand: Green Garden
reviewDate: 01.03.2026
method: Vaporisointi (190°C)
trichomes: Samalliset
pricePoint: Premium
overallScore: 9.2
recommend: true
appearance:
  rating: 5
  description: Erittäin tiiviitä, hartsia tihkuvia kukkia. Väri on tummanvihreä liiloilla sävyillä.
aroma:
  rating: 5
  description: Pistävä polttoaineen ja havun tuoksu. Täyttää huoneen välittömästi.
taste:
  rating: 4
  description: Maanläheinen maku, jossa on vivahteita suklaasta ja kahvista.
effects:
  rating: 5
  description: Vahva fyysinen rentoutus, joka auttaa poistamaan jännitystä ilman väsymystä.
intensity:
  sweetness: 1
  earthiness: 5
  sourness: 2
  gas: 4
benefits:
  anxiety: 4
  pain: 4
  sleep: 3
  focus: 4
pros:
  - Poikkeuksellinen terpeeniprofiili
  - Todella siisti trimmaus
  - Välitön vaikutus
cons:
  - Korkea hinta
  - Voi olla liian voimakas maku joillekin
---
::tip
Tämä on tähän mennessä testatuista CBD-lajikkeista vaikuttavin.
::

Tuoksu on niin voimakas, että se muistuttaa enemmän perinteistä THC-lajiketta.

Höyrystettynä maku on paksu ja täyteläinen.
::

## Tutkimuslinkkejä

::strain-links
---
title: Tutkimusten tietopankki
categories:
  - label: Lääketieteellinen tutkimus
    icon: lucide:microscope
    description: Kliiniset tutkimukset CBD:n ja muiden kannabinoidien terapeuttisista vaikutuksista.
    links:
      - title: CBD:n vaikutus ahdistuneisuuteen - Kliininen katsaus
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: PubMed
        year: 2022
        tags: [CBD, Ahdistus]
      - title: Kannabinoidit kivunhoidossa
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Journal of Pain Research
        year: 2023
        tags: [Kipu, Kliininen]
  - label: Teollinen käyttö
    icon: lucide:factory
    description: Hampun hyödyntäminen rakennusmateriaalina, tekstiileissä ja muoveissa.
    links:
      - title: Hamppubetoni kestävän rakentamisen osana
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Green Build Magazine
        year: 2021
        tags: [Rakentaminen, CO2]
      - title: Hampun biomuovien kestävyysanalyysi
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: EcoPlastics Review
        year: 2024
        tags: [Biomuovi, Innovaatio]
  - label: Ympäristö ja Maatalous
    icon: lucide:sprout
    description: Hampun rooli maaperän puhdistuksessa ja resurssien säästämisessä.
    links:
      - title: Hampun fytoremediaatiokyky saastuneilla alueilla
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Environmental Science
        year: 2020
        tags: [Maaperä, Puhdistus]
      - title: Hampun käyttö kuivikkeena
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Hemp Pub
        year: 2026
        tags: [Kuivike, Eläimet]
  - label: Ravitsemustiede
    icon: lucide:apple
    description: Tutkimuksia hampunsiementen ravintoarvoista, proteiinikoostumuksesta ja rasvahapoista.
    links:
      - title: Hampunsiementen omega-3 ja -6 suhde sydänterveydessä
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Nutritional Journal
        year: 2021
        tags: [Omega-3, Sydänterveys]
      - title: Hamppuproteiinin sulavuus ja aminohappoprofiili
        url: https://pubmed.ncbi.nlm.nih.gov/
        source: Food Science Review
        year: 2023
        tags: [Proteiini, Vegan]

---
Tämä lista **päivittyy** säännöllisesti uusien tutkimustulosten myötä.

Kaikki linkit viittaavat **vertaisarvioituihin** lähteisiin tai _arvostettuihin_ alan julkaisuihin.
::

## Entourage-vaikutuksista

::strain-ento
---
title: Synergia-analyysi - Rentotus-öljy
ingredients:
  - name: CBD
    value: 15
    type: cannabinoid
  - name: Myrcene
    value: 2.4
    type: terpene
  - name: Limonene
    value: 1.8
    type: terpene
  - name: CBG
    value: 0.5
    type: cannabinoid
---
Analyysi perustuu tunnettuihin biokemiallisiin vuorovaikutusmalleihin.

Myrcene tehostaa tässä tuotteessa CBD:n läpäisyä, kun taas Limonene moduloi **serotoniinivastetta**, mikä selittää tuotteen voimakkaan _anksiolyyttisen_ vaikutuksen.
::

## Ympäristön kokonaisvaltainen metabolinen kuorma

::strain-vpd
---
airTemp: 29.5
humidity: 62
leafOffset: -1.5
stage: late-flower
ppfd: 1100
co2: 1250
lightCycle: on
---
Tämä analyysi on suunniteltu ammattilaiskäyttöön.

Korkea **valoteho** (1100 µmol) ja **hiilidioksidiruokinta** (1250 ppm) nostavat kasvin aineenvaihdunnan nopeutta, mikä edellyttää tarkkaa VPD-hallintaa (1.2-1.5 kPa) kukkien **tiheyden** ja **hartsinmuodostuksen** maksimoimiseksi.
::

## Ympäristölaskuri

::strain-calc
---
---
Tämä laskuri auttaa sinua hienosäätämään ympäristösi.

Syötä lämpötila ja ilmankosteus nähdäksesi VPD-arvon, sekä valon teho ja aika nähdäksesi päivittäisen valokertymän (DLI).
::

## Ravinteiden Antagonismi- ja Synergia-analysaattori

Antagonismi (Estäminen) ja Synergia (Edistäminen)

::strain-synergy
?
::

## Dekarboksylaation kineettinen simulaattori

::strain-decarb
Ok
::

## Maaperän puhdistus

::strain-land
-
::