/* ============================================================
   ФИНСЕЙЛС — данные витрины
   ------------------------------------------------------------
   ЗДЕСЬ МЕНЯЕТСЯ ВЕСЬ КОНТЕНТ ПРЕДЛОЖЕНИЙ.
   Правила:
     - id  — латиницей, без пробелов, УНИКАЛЬНЫЙ и ПОСТОЯННЫЙ
             (по нему строятся id заголовков; менять нельзя,
              иначе поедет озвучка карточек у незрячих).
     - url — партнёрская ссылка целиком, вместе с ?erid=...
     - erid — маркер рекламы, показывается под карточкой.
             Если партнёрка erid ещё не выдала — оставить '',
             подпись покажет «Реклама · erid уточняется».
     - advertiser — юр. лицо рекламодателя. Если оставить '',
             строка покажет только «Реклама · erid: ...».
             ЗАПОЛНИТЬ, когда партнёрка пришлёт точные названия.
     - pick: true — предложение попадает в блок «Выбор редакции»
             (берутся первые 3 с pick: true).
     - tags — быстрые фильтры, см. window.DATA.tags ниже.
   ПРАВИЛО ПАРТНЁРКИ (17.09.2026): в текстах НЕЛЬЗЯ обещать время
   оформления и выдачи («за 15 минут», «деньги сразу», «решение
   за 5 минут»). Пишем только условия продукта.
   ============================================================ */

window.DATA = {
  brand: 'ФинСейлс',
  updatedAt: '18 сентября 2026',

  /* Категории. id 'all' обязателен и всегда первый. */
  categories: [
    { id: 'all',      label: 'Все продукты',     short: 'Все' },
    { id: 'debit',    label: 'Дебетовые карты',  short: 'Дебетовые' },
    { id: 'credit',   label: 'Кредитные карты',  short: 'Кредитные' },
    { id: 'deposit',  label: 'Вклады и счета',   short: 'Вклады' },
    { id: 'loan',     label: 'Займы',            short: 'Займы' },
    { id: 'business', label: 'РКО для бизнеса',  short: 'РКО' }
  ],

  /* Быстрые фильтры (чипсы под поисковым виджетом). */
  tags: [
    { id: 'fee0',     label: 'Обслуживание 0 ₽' },
    { id: 'cashback', label: 'Кешбэк' },
    { id: 'grace',    label: 'Без процентов' },
    { id: 'income',   label: 'Доход на остаток' },
    { id: 'online',   label: 'Займы онлайн' }
  ],

  offers: [
    /* ---------- дебетовые карты ---------- */
    {
      id: 'psb-tvoy-keshbek',
      bank: 'ПСБ',
      product: 'Дебетовая карта «Твой кешбэк»',
      category: 'debit',
      color: '#E4610F',
      initials: 'ПСБ',
      benefit: { value: 'до 30%', label: 'кешбэк в выбранных категориях' },
      price:   { value: '0 ₽',    label: 'обслуживание' },
      features: [
        'Кешбэк в трёх категориях на выбор',
        'Карта платёжной системы «Мир»',
        'Снятие наличных в банкоматах партнёров без комиссии'
      ],
      tags: ['fee0', 'cashback'],
      pick: true,
      popularity: 98,
      cta: 'дебетовую карту «Твой кешбэк» ПСБ',
      url: 'https://trk.ppdu.ru/click/8iQZQ0GX?erid=2SDnjdMsAhh',
      erid: '2SDnjdMsAhh',
      advertiser: ''
    },
    {
      id: 'fora-vse-vklyucheno',
      bank: 'Фора-Банк',
      product: 'Дебетовая карта с кешбэком «Всё включено»',
      category: 'debit',
      color: '#1F4E9C',
      initials: 'ФБ',
      benefit: { value: 'до 5%',  label: 'кешбэк в сезонных категориях' },
      price:   { value: 'от 0 ₽', label: 'обслуживание в месяц' },
      features: [
        'Кешбэк рублями, а не баллами',
        'Выгода до 40% у партнёров банка',
        'Именная карта, заявка онлайн'
      ],
      tags: ['fee0', 'cashback'],
      pick: false,
      popularity: 82,
      cta: 'дебетовую карту «Всё включено» Фора-Банка',
      url: 'https://trk.ppdu.ru/click/k8gkWnTi?erid=2SDnjeLQiFt',
      erid: '2SDnjeLQiFt',
      advertiser: ''
    },
    {
      id: 'otp-karta-mir',
      bank: 'ОТП Банк',
      product: 'Дебетовая карта «ОТП Карта» МИР',
      category: 'debit',
      color: '#3D8A1E',
      initials: 'ОТП',
      benefit: { value: '0 ₽',    label: 'выпуск карты' },
      price:   { value: 'онлайн', label: 'заявка на карту' },
      features: [
        'Карта платёжной системы «Мир»',
        'Кешбэк по программе лояльности банка',
        'Получение в отделении или доставка'
      ],
      tags: ['cashback'],
      pick: false,
      popularity: 79,
      cta: 'дебетовую карту «ОТП Карта» МИР',
      url: 'https://trk.ppdu.ru/click/OnuEu2pr?erid=2SDnjeiRuUn',
      erid: '2SDnjeiRuUn',
      advertiser: ''
    },
    {
      id: 'akbars-karta-mir',
      bank: 'Ак Барс Банк',
      product: 'Дебетовая «Ак Барс Карта» МИР',
      category: 'debit',
      color: '#0B8A5A',
      initials: 'АБ',
      benefit: { value: '0 ₽',    label: 'выпуск карты' },
      price:   { value: 'онлайн', label: 'заявка на карту' },
      features: [
        'Карта платёжной системы «Мир»',
        'Бонусы и кешбэк по программе лояльности банка',
        'Управление картой в приложении банка'
      ],
      tags: ['cashback'],
      pick: false,
      popularity: 78,
      cta: 'дебетовую «Ак Барс Карту» МИР',
      url: 'https://trk.ppdu.ru/click/u0jgFR1V?erid=2SDnjdG7KhL',
      erid: '2SDnjdG7KhL',
      advertiser: ''
    },
    {
      id: 'platipomiru-usd',
      bank: 'Плати по всему миру',
      product: 'Виртуальная карта в USD для оплаты за рубежом',
      category: 'debit',
      color: '#5A2D82',
      initials: 'USD',
      benefit: { value: 'USD',    label: 'валюта виртуальной карты' },
      price:   { value: 'онлайн', label: 'выпуск без пластика' },
      features: [
        'Оплата зарубежных сервисов, подписок и покупок',
        'Пополнение с российской карты',
        'Карта выпускается онлайн, без визита в офис'
      ],
      tags: [],
      pick: false,
      popularity: 74,
      cta: 'виртуальную карту в USD «Плати по всему миру»',
      url: 'https://trk.ppdu.ru/click/?uid=318959&oid=2234&erid=2SDnjcj1YF4',
      erid: '2SDnjcj1YF4',
      advertiser: ''
    },

    /* ---------- кредитные карты ---------- */
    {
      id: 'keb-urban-card',
      bank: 'Кредит Европа Банк',
      product: 'Кредитная карта URBAN CARD',
      category: 'credit',
      color: '#0B4DA2',
      initials: 'КЕБ',
      benefit: { value: 'до 12 мес.', label: 'рассрочка у партнёров' },
      price:   { value: '0 ₽',        label: 'выпуск карты' },
      features: [
        'Рассрочка в магазинах-партнёрах без переплаты',
        'Кешбэк рублями на счёт',
        'Онлайн-заявка без визита в отделение'
      ],
      tags: ['fee0', 'grace', 'cashback'],
      pick: true,
      popularity: 84,
      cta: 'кредитную карту URBAN CARD Кредит Европа Банка',
      url: 'https://trk.ppdu.ru/click/76nfCvTJ?erid=2SDnjdLFXE2',
      erid: '2SDnjdLFXE2',
      advertiser: ''
    },
    {
      id: 'uralsib-120',
      bank: 'Уралсиб',
      product: 'Кредитная карта «120 дней без %»',
      category: 'credit',
      color: '#0A7B4B',
      initials: 'УС',
      benefit: { value: '120 дней', label: 'без процентов' },
      price:   { value: '0 ₽',      label: 'обслуживание' },
      features: [
        'Льготный период 120 дней на покупки',
        'Решение по заявке онлайн',
        'Пополнение и погашение без комиссии'
      ],
      tags: ['fee0', 'grace'],
      pick: false,
      popularity: 95,
      cta: 'кредитную карту «120 дней без процентов» банка Уралсиб',
      url: 'https://trk.ppdu.ru/click/21JFzU5O?erid=2SDnjbpvGx2',
      erid: '2SDnjbpvGx2',
      advertiser: ''
    },
    {
      id: 'renaissance-115',
      bank: 'Ренессанс Банк',
      product: 'Кредитная карта «115 дней без %»',
      category: 'credit',
      color: '#1D3F94',
      initials: 'РБ',
      benefit: { value: '115 дней', label: 'без процентов' },
      price:   { value: 'онлайн',   label: 'заявка без визита в банк' },
      features: [
        'Льготный период до 115 дней на покупки',
        'Решение по заявке онлайн',
        'Получение в отделении или доставка карты'
      ],
      tags: ['grace'],
      pick: false,
      popularity: 86,
      cta: 'кредитную карту «115 дней без процентов» Ренессанс Банка',
      url: 'https://trk.ppdu.ru/click/T7zjaEgE?erid=2SDnjdFo9iJ',
      erid: '2SDnjdFo9iJ',
      advertiser: ''
    },
    {
      id: 'yandex-pay-split',
      bank: 'Яндекс Пэй',
      product: 'Кредитная карта «Супер Сплит»',
      category: 'credit',
      color: '#5B4BE0',
      initials: 'ЯП',
      benefit: { value: 'до 2 лет', label: 'Сплит на любые покупки' },
      price:   { value: 'онлайн',   label: 'заявка в приложении' },
      features: [
        'Стоимость покупки делится на части — на кассе и онлайн',
        'Работает в магазинах и сервисах Яндекса и не только',
        'Управление Сплитом в приложении Яндекс Пэй'
      ],
      tags: ['grace'],
      pick: false,
      popularity: 88,
      cta: 'кредитную карту «Супер Сплит» Яндекс Пэй',
      url: 'https://trk.ppdu.ru/click/n6z4sjqz?erid=2SDnjdJuo9L',
      erid: '2SDnjdJuo9L',
      advertiser: ''
    },

    /* ---------- вклады и счета ---------- */
    {
      id: 'yandex-pay-saves',
      bank: 'Яндекс Пэй',
      product: 'Вклады «Сейвы»',
      category: 'deposit',
      color: '#5B4BE0',
      initials: 'ЯП',
      benefit: { value: 'от 1 ₽',  label: 'стартовая сумма' },
      price:   { value: '0 ₽',     label: 'открытие и обслуживание' },
      features: [
        'Проценты начисляются каждый день',
        'Пополнение и снятие в любой момент',
        'Открытие в приложении Яндекс Пэй'
      ],
      tags: ['fee0', 'income'],
      pick: false,
      popularity: 80,
      cta: 'вклад «Сейвы» в Яндекс Пэй',
      url: 'https://trk.ppdu.ru/click/K8C6nELx?erid=2SDnjck9Tog',
      erid: '2SDnjck9Tog',
      advertiser: ''
    },

    /* ---------- займы ---------- */
    {
      id: 'maxcredit-zaim',
      bank: 'Max.Credit',
      product: 'Займ на карту',
      category: 'loan',
      color: '#C8102E',
      initials: 'MC',
      benefit: { value: 'до 30 000 ₽', label: 'сумма займа' },
      price:   { value: 'до 30 дней',  label: 'срок займа' },
      features: [
        'Заявка полностью онлайн, без справок',
        'Сумма от 5 000 до 30 000 ₽',
        'Работают дистанционно по всей России'
      ],
      tags: ['online'],
      pick: true,
      popularity: 76,
      cta: 'займ на карту в Max.Credit',
      url: 'https://trk.ppdu.ru/click/GkVIsMc3?erid=2SDnjcT1SY3',
      erid: '2SDnjcT1SY3',
      advertiser: ''
    },
    {
      id: 'bystrodengi-zaim',
      bank: 'Быстроденьги',
      product: 'Займ наличными или на карту',
      category: 'loan',
      color: '#D46B00',
      initials: 'БД',
      benefit: { value: 'до 100 000 ₽', label: 'сумма займа' },
      price:   { value: '0 ₽',          label: 'комиссия за перевод' },
      features: [
        'На карту, наличными или на электронный кошелёк',
        'Постоянным клиентам — сниженная ставка',
        'Офисы более чем в 100 городах России'
      ],
      tags: ['online'],
      pick: false,
      popularity: 90,
      cta: 'займ в компании Быстроденьги',
      url: 'https://trk.ppdu.ru/click/g8CDc3Jj?erid=2SDnjeVLMFy',
      erid: '2SDnjeVLMFy',
      advertiser: ''
    },
    {
      id: 'prostoy-vopros-zaim',
      bank: 'Простой вопрос',
      product: 'Займ онлайн до 100 000 ₽',
      category: 'loan',
      color: '#C2185B',
      initials: 'ПВ',
      benefit: { value: 'до 100 000 ₽', label: 'сумма займа' },
      price:   { value: 'до 26 недель', label: 'срок займа' },
      features: [
        'Новым клиентам — возврат без процентов в течение 21 дня',
        'Займы для физлиц и самозанятых',
        'Досрочное погашение на любом сроке'
      ],
      tags: ['online', 'grace'],
      pick: false,
      popularity: 68,
      cta: 'займ онлайн в МФО «Простой вопрос»',
      url: 'https://trk.ppdu.ru/click/Wj96kPjL?erid=2SDnjckDMpf',
      erid: '2SDnjckDMpf',
      advertiser: ''
    },
    {
      id: 'likezaim-zaim',
      bank: 'ЛайкЗайм',
      product: 'Займ без страховок',
      category: 'loan',
      color: '#2B6FD6',
      initials: 'ЛЗ',
      benefit: { value: 'до 30 000 ₽', label: 'сумма займа' },
      price:   { value: '0 ₽',         label: 'страховки и допуслуги' },
      features: [
        'Без навязанных страховок',
        'Заявка онлайн по паспорту',
        'Бесплатная поддержка по номеру 8 800'
      ],
      tags: ['online'],
      pick: false,
      popularity: 66,
      cta: 'займ без страховок в ЛайкЗайм',
      url: 'https://trk.ppdu.ru/click/kN6iwNbY?erid=2SDnjevMQUa',
      erid: '2SDnjevMQUa',
      advertiser: ''
    },
    {
      id: 'belkacredit-zaim',
      bank: 'BelkaCredit',
      product: 'Первый займ без процентов',
      category: 'loan',
      color: '#CF5F0C',
      initials: 'BK',
      benefit: { value: 'до 30 000 ₽', label: 'сумма займа' },
      price:   { value: '0%',          label: 'первый займ при возврате в срок' },
      features: [
        'Первый займ без процентов при погашении в срок',
        'Заявка онлайн, нужен только паспорт',
        'Самозанятым — лимит до 100 000 ₽'
      ],
      tags: ['online', 'grace'],
      pick: false,
      popularity: 71,
      cta: 'займ онлайн в BelkaCredit',
      url: 'https://trk.ppdu.ru/click/FJFLJDkc',
      erid: '',   /* партнёрка прислала «erid=*» — маркер ещё не выдан, запросить у клиента */
      advertiser: ''
    },
    {
      id: 'dengi-na-dom-zaim',
      bank: 'Деньги на дом',
      product: 'Займ наличными на дом или на карту',
      category: 'loan',
      color: '#0F7A4A',
      initials: 'ДД',
      benefit: { value: 'наличными', label: 'или переводом на карту' },
      price:   { value: 'онлайн',    label: 'заявка по паспорту' },
      features: [
        'Наличные привозят на дом или переводят на карту',
        'Заявка онлайн, без справок о доходе',
        'Погашение частями по графику'
      ],
      tags: ['online'],
      pick: false,
      popularity: 62,
      cta: 'займ в МФО «Деньги на дом»',
      url: 'https://trk.ppdu.ru/click/ZgpvQFUm?erid=2SDnjcx6GXD',
      erid: '2SDnjcx6GXD',
      advertiser: ''
    },

    /* ---------- РКО для бизнеса ---------- */
    {
      id: 'tochka-rko',
      bank: 'Точка Банк',
      product: 'Расчётный счёт для ИП и ООО',
      category: 'business',
      color: '#111111',
      initials: 'ТБ',
      benefit: { value: 'от 0 ₽', label: 'обслуживание в месяц' },
      price:   { value: '0 ₽',    label: 'открытие счёта' },
      features: [
        'Бесплатная регистрация ИП или ООО',
        'Зарплатный проект для карт любых банков',
        'Онлайн-бухгалтерия и защита счёта от блокировок'
      ],
      tags: ['fee0'],
      pick: false,
      popularity: 70,
      cta: 'расчётный счёт в Точка Банке',
      url: 'https://trk.ppdu.ru/click/UCtPylSZ?erid=2SDnjdABGBD',
      erid: '2SDnjdABGBD',
      advertiser: ''
    },
    {
      id: 'alfa-regbiz-rko',
      bank: 'Альфа-Банк',
      product: 'Регистрация бизнеса + РКО',
      category: 'business',
      color: '#EF3124',
      initials: 'А',
      benefit: { value: '0 ₽',    label: 'регистрация ИП или ООО' },
      price:   { value: 'онлайн', label: 'без визита в налоговую' },
      features: [
        'Регистрация бизнеса без госпошлины',
        'Счёт открывается вместе с регистрацией',
        'Интернет-банк, эквайринг и зарплатный проект'
      ],
      tags: [],
      pick: false,
      popularity: 72,
      cta: 'регистрацию бизнеса и расчётный счёт в Альфа-Банке',
      url: 'https://trk.ppdu.ru/click/O5rA6dTS?erid=2SDnjeEA46e',
      erid: '2SDnjeEA46e',
      advertiser: ''
    },
    {
      id: 'rshb-rko',
      bank: 'Россельхозбанк',
      product: 'РКО «Свой Бизнес» — открытие счёта',
      category: 'business',
      color: '#157A3F',
      initials: 'РСХБ',
      benefit: { value: '0 ₽',    label: 'открытие счёта' },
      price:   { value: 'онлайн', label: 'заявка на счёт' },
      features: [
        'Резервирование номера счёта онлайн',
        'Тарифы для ИП, ООО и агробизнеса',
        'Интернет-банк «Свой Бизнес»'
      ],
      tags: [],
      pick: false,
      popularity: 60,
      cta: 'расчётный счёт в Россельхозбанке',
      url: 'https://trk.ppdu.ru/click/RPX11KhG?erid=2SDnjcUPApa',
      erid: '2SDnjcUPApa',
      advertiser: ''
    },
    {
      id: 'ingo-rko',
      bank: 'Банк Инго',
      product: 'Расчётный счёт для малого бизнеса',
      category: 'business',
      color: '#0B4BBF',
      initials: 'ИНГО',
      benefit: { value: '0 ₽',      label: 'открытие счёта' },
      price:   { value: 'ИП и ООО', label: 'для малого и среднего бизнеса' },
      features: [
        'Расчётный счёт для ИП и юрлиц',
        'Интернет-банк и мобильное приложение',
        'Заявка на открытие онлайн'
      ],
      tags: [],
      pick: false,
      popularity: 55,
      cta: 'расчётный счёт в Банке Инго',
      url: 'https://trk.ppdu.ru/click/eWmterLf?erid=2SDnjcPdd1V',
      erid: '2SDnjcPdd1V',
      advertiser: ''
    }
  ],


  /* ---- Бенто-плитки на главной (как цветные блоки у Авиасейлс) ----
     kind: 'solo'  — одна крупная плитка под один оффер (offer = id)
           'picks' — тёмная плитка с горизонтальной лентой (берёт pick:true)
     tone: peach | sky | dark | coral | mint | white                */
  bento: [
    { kind:'solo', offer:'uralsib-120', tone:'peach', span:'sq', icon:'flame', art:true,
      title:'Горячая кредитка', highlight:'120 дней без %',
      sub:'Самый длинный беспроцентный период в подборке.',
      badge:'Лучшее в подборке' },

    { kind:'solo', offer:'yandex-pay-saves', tone:'coral', span:'sq', icon:'percent',
      title:'Деньги работают', highlight:'каждый день',
      sub:'Проценты капают ежедневно, снять можно в любой момент.',
      badge:'Без срока и штрафов' },

    { kind:'picks', tone:'dark', span:'wide',
      title:'Выбор редакции',
      sub:'Три предложения, которые посетители забирают в первую очередь — по одному на категорию.' },

    { kind:'solo', offer:'bystrodengi-zaim', tone:'sky', span:'sq', icon:'bolt',
      title:'Займ', highlight:'онлайн',
      sub:'Заявка без справок и поручителей, на карту или наличными.',
      badge:'Без визита в офис' },

    { kind:'solo', offer:'alfa-regbiz-rko', tone:'mint', span:'sq', icon:'case',
      title:'Бизнесу', highlight:'счёт + регистрация',
      sub:'Открыть ИП или ООО и расчётный счёт в одной заявке.',
      badge:'Новое: РКО' }
  ],

  /* Отзывы. Имя + город + текст. */
  reviews: [
    {
      text: 'Искала карту с кешбэком на продукты и заправку. Тут сразу видно, у кого какие категории и сколько стоит обслуживание — не пришлось обходить пять сайтов.',
      name: 'Ирина', city: 'Казань'
    },
    {
      text: 'Нужны были деньги до зарплаты. Сравнил два предложения по сумме и сроку, выбрал то, где условия понятнее. Заявку подал прямо с телефона.',
      name: 'Артём', city: 'Новосибирск'
    },
    {
      text: 'Понравилось, что все условия собраны в одну таблицу и ничего не надо выпрашивать у менеджера. Открыл, сравнил, оформил.',
      name: 'Дмитрий', city: 'Ростов-на-Дону'
    }
  ],

  /* Частые вопросы. */
  faq: [
    {
      q: 'ФинСейлс — это банк?',
      a: 'Нет. Мы витрина финансовых продуктов: собираем условия банков и микрофинансовых организаций в одном месте, чтобы их было удобно сравнить. Карту, вклад, займ или расчётный счёт вы оформляете на сайте самой организации, деньги и договор — тоже от неё.'
    },
    {
      q: 'Сколько стоит подбор?',
      a: 'Нисколько. Для вас сервис бесплатный. Мы получаем вознаграждение от банков и МФО за переход по ссылке, и на ваши условия это никак не влияет.'
    },
    {
      q: 'Одобрят ли мне карту или займ?',
      a: 'Решение принимает банк или МФО, а не наш сайт. Мы не видим вашу кредитную историю и не влияем на результат. Чтобы повысить шансы, подавайте заявку с корректными данными и не отправляйте её сразу в десяток мест.'
    },
    {
      q: 'Какие документы нужны?',
      a: 'Для большинства карт и займов достаточно паспорта гражданина России и телефона. Отдельные продукты просят СНИЛС или подтверждение дохода, для расчётного счёта — документы ИП или ООО. Точный список всегда указан на странице заявки у партнёра.'
    },
    {
      q: 'Что означает пометка «Реклама» и код erid?',
      a: 'Это требование закона «О рекламе». Каждое предложение на сайте — реклама партнёра, а erid — её уникальный идентификатор в едином реестре интернет-рекламы. Мы показываем его открыто под каждым предложением.'
    },
    {
      q: 'Условия на сайте всегда актуальны?',
      a: 'Мы обновляем витрину регулярно, но банки и МФО меняют тарифы без предупреждения. Итоговые условия, ставку и полную стоимость кредита смотрите на сайте организации перед подписанием договора.'
    }
  ]
};
