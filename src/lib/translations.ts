export type Language = "hr" | "en";

export const translations = {
  hr: {
    // Navigation
    nav: {
      collections: "Kolekcije",
      about: "O nama",
      gallery: "Galerija",
      contact: "Kontakt",
    },
    // Hero
    hero: {
      subtitle: "Zlatarna Popović",
      title: "Tradicija Zlatarstva",
      description:
        "Otkrijte izvrsnost ručno izrađenog nakita od 1990. godine. Svaki komad priča svoju jedinstvenu priču.",
      cta: "Istražite Kolekciju",
    },
    // Collections
    collections: {
      subtitle: "Naša ponuda",
      title: "Kolekcije",
      viewAll: "Pogledaj sve",
      rings: "Prstenje",
      ringsDesc: "Zaručničko, vjenčano i modno prstenje izrađeno s pažnjom prema detaljima.",
      necklaces: "Ogrlice",
      necklacesDesc: "Elegantne ogrlice i privjesci koji upotpunjuju svaku priliku.",
      earrings: "Naušnice",
      earringsDesc: "Od klasičnih do modernih dizajna, za svaki stil i ukus.",
      bracelets: "Narukvice",
      braceletsDesc: "Ručno izrađene narukvice koje dodaju šarm svakom outfitu.",
      watches: "Satovi",
      watchesDesc: "Ekskluzivni satovi poznatih brendova i domaća izrada.",
      custom: "Po mjeri",
      customDesc: "Izradite jedinstveni komad nakita prema vašoj želji.",
    },
    // Showcase / About
    showcase: {
      subtitle: "Usluge i ponuda",
      laserTitle: "Lasersko Graviranje",
      laserDesc:
        "Precizno lasersko graviranje za prstenje, narukvice i privjeske. Personalizirajte poruku, datum ili inicijale uz besprijekornu čistoću linija.",
      laserExtended:
        "Naša usluga laserskog graviranja koristi najmoderniju tehnologiju koja omogućuje izuzetnu preciznost i detalje. Možemo gravirati na zlato, srebro, platinu, titanij i nehrđajući čelik. Popularne opcije uključuju datume vjenčanja, inicijale, kratke poruke ljubavi, koordinate posebnih mjesta ili čak otiske prstiju. Graviranje je trajno i ne blijedi s vremenom, čineći vaš nakit uistinu jedinstvenim.",
      ringsTitle: "Prstenje Po Želji",
      ringsDesc:
        "Ostvarite svoju viziju savršenog prstena. Od zaručničkog do vjenčanog, kreiramo jedinstvene komade prilagođene vašem stilu, budžetu i najdražim trenucima.",
      ringsExtended:
        "Proces izrade prstena po mjeri započinje konzultacijom gdje razgovaramo o vašim željama, stilu i budžetu. Naši majstori zlatari s više od 30 godina iskustva izrađuju svaki prsten ručno, od odabira kamena do završne obrade. Nudimo širok izbor materijala - od klasičnog žutog zlata, preko bijelog zlata i ružičastog zlata, do platine. Svaki prsten dolazi s certifikatom autentičnosti i doživotnim jamstvom na izradu.",
      watchesTitle: "Ekskluzivni Satovi",
      watchesDesc:
        "Kolekcija klasičnih i modernih satova s vrhunskim mehanizmima, ručnom završnom obradom i bezvremenskim dizajnom.",
      watchesExtended:
        "U našoj kolekciji pronaći ćete satove renomiranih svjetskih proizvođača, kao i unikatne primjerke s ručnom izradom. Nudimo mehaničke satove sa švicarskim mehanizmima, automatike i kvarcne satove. Svaki sat prolazi detaljnu provjeru autentičnosti i funkcionalnosti. Također pružamo usluge servisiranja, zamjene baterija i remenja, te restauracije vintage satova.",
      learnMore: "Saznaj više",
      showLess: "Prikaži manje",
    },
    // Gallery
    gallery: {
      subtitle: "Naša Kolekcija",
      title: "Galerija",
      description:
        "Otkrijte našu kolekciju ručno izrađenog nakita. Svaki komad je jedinstveno remek-djelo.",
      pageDescription: "Istražite našu kolekciju ručno izrađenog nakita i luksuznih satova. Svaki komad priča svoju jedinstvenu priču.",
      all: "Sve",
      filterBy: "Kategorije",
      search: "Pretraži",
      searchPlaceholder: "Pretraži proizvode...",
      clearFilters: "Očisti filtere",
      noResults: "Nema rezultata",
      noResultsHint: "Pokušajte s drugim pojmom za pretragu ili očistite filtere.",
      products: "proizvoda",
      product: "proizvod",
      category: "Kategorija",
      searchLabel: "Pretraga",
      view: "Pogledaj",
    },
    // Categories
    categories: {
      "Prstenje": "Prstenje",
      "Ogrlice": "Ogrlice",
      "Naušnice": "Naušnice",
      "Satovi": "Satovi",
      "Narukvice": "Narukvice",
      "Privjesci": "Privjesci",
      "Broševi": "Broševi",
    },
    // Contact
    contact: {
      title: "Kontaktirajte Nas",
      description:
        "Imate pitanje ili želite rezervirati privatni termin? Rado ćemo vam pomoći.",
      visitUs: "Posjetite naš salon",
      address: "Kneza Mutimira 27, Livno",
      workingHours: "Radno vrijeme",
      weekdays: "Pon - Pet: 09:00 - 18:00",
      saturday: "Sub: 09:00 - 14:00",
      inquiryTab: "Upit",
      reservationTab: "Rezervacija",
      // Form fields
      nameLabel: "Ime i prezime",
      namePlaceholder: "Vaše ime i prezime",
      emailLabel: "Email",
      emailPlaceholder: "vas@email.com",
      phoneLabel: "Telefon",
      phonePlaceholder: "+387 63 000 000",
      messageLabel: "Poruka",
      messagePlaceholder: "Kako vam možemo pomoći?",
      dateLabel: "Datum",
      datePlaceholder: "Odaberite datum",
      timeLabel: "Vrijeme",
      timePlaceholder: "Odaberite vrijeme",
      serviceLabel: "Usluga",
      servicePlaceholder: "Odaberite uslugu",
      send: "Pošalji upit",
      reserve: "Rezerviraj termin",
      sending: "Slanje...",
      // Services
      serviceConsultation: "Konzultacija za nakit",
      serviceRepair: "Popravak nakita",
      serviceEngraving: "Graviranje",
      serviceCustom: "Izrada po narudžbi",
      serviceAppraisal: "Procjena vrijednosti",
      // Messages
      successTitle: "Hvala vam!",
      successInquiry: "Vaš upit je uspješno poslan. Odgovorit ćemo vam u najkraćem mogućem roku.",
      successReservation: "Vaša rezervacija je uspješno poslana. Kontaktirat ćemo vas radi potvrde.",
      errorMessage: "Došlo je do greške. Molimo pokušajte ponovo.",
      sendAnother: "Pošalji novi upit",
      makeAnother: "Nova rezervacija",
    },
    // Footer
    footer: {
      description:
        "Tradicija zlatarstva od 1990. Izrađujemo jedinstvene komade nakita s ljubavlju i pažnjom.",
      navigation: "Navigacija",
      contactUs: "Kontakt",
      workingHours: "Radno vrijeme",
      weekdays: "Pon - Pet: 09:00 - 18:00",
      saturday: "Sub: 09:00 - 14:00",
      rights: "Sva prava pridržana.",
    },
    // Gallery Modal
    modal: {
      close: "Zatvori",
      interested: "Zainteresirani ste? Pošaljite upit",
      hideInquiry: "Sakrij upit",
      article: "Artikl",
      yourMessage: "Vaša poruka",
      messagePlaceholder: "Opišite vaš upit ili pitanje o ovom artiklu...",
      sendInquiry: "Pošalji upit",
      sending: "Slanje...",
      successTitle: "Upit uspješno poslan!",
      successMessage: "Odgovorit ćemo vam u najkraćem mogućem roku.",
      optional: "(opcionalno)",
    },
  },
  en: {
    // Navigation
    nav: {
      collections: "Collections",
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
    },
    // Hero
    hero: {
      subtitle: "Zlatarna Popović",
      title: "Jewelry Tradition",
      description:
        "Discover the excellence of handcrafted jewelry since 1990. Each piece tells its own unique story.",
      cta: "Explore Collection",
    },
    // Collections
    collections: {
      subtitle: "Our Offer",
      title: "Collections",
      viewAll: "View all",
      rings: "Rings",
      ringsDesc: "Engagement, wedding and fashion rings crafted with attention to detail.",
      necklaces: "Necklaces",
      necklacesDesc: "Elegant necklaces and pendants that complement every occasion.",
      earrings: "Earrings",
      earringsDesc: "From classic to modern designs, for every style and taste.",
      bracelets: "Bracelets",
      braceletsDesc: "Handcrafted bracelets that add charm to any outfit.",
      watches: "Watches",
      watchesDesc: "Exclusive watches from famous brands and domestic craftsmanship.",
      custom: "Custom",
      customDesc: "Create a unique piece of jewelry according to your wishes.",
    },
    // Showcase / About
    showcase: {
      subtitle: "Services & Offer",
      laserTitle: "Laser Engraving",
      laserDesc:
        "Precise laser engraving for rings, bracelets and pendants. Personalize a message, date or initials with impeccable line clarity.",
      laserExtended:
        "Our laser engraving service uses state-of-the-art technology that enables exceptional precision and detail. We can engrave on gold, silver, platinum, titanium and stainless steel. Popular options include wedding dates, initials, short love messages, coordinates of special places or even fingerprints. The engraving is permanent and does not fade over time, making your jewelry truly unique.",
      ringsTitle: "Custom Rings",
      ringsDesc:
        "Realize your vision of the perfect ring. From engagement to wedding, we create unique pieces tailored to your style, budget and dearest moments.",
      ringsExtended:
        "The custom ring process begins with a consultation where we discuss your wishes, style and budget. Our master jewelers with over 30 years of experience craft each ring by hand, from stone selection to final finishing. We offer a wide range of materials - from classic yellow gold, white gold and rose gold, to platinum. Each ring comes with a certificate of authenticity and lifetime warranty on craftsmanship.",
      watchesTitle: "Exclusive Watches",
      watchesDesc:
        "A collection of classic and modern watches with premium mechanisms, hand finishing and timeless design.",
      watchesExtended:
        "In our collection you will find watches from renowned world manufacturers, as well as unique handcrafted pieces. We offer mechanical watches with Swiss movements, automatics and quartz watches. Each watch undergoes detailed authenticity and functionality checks. We also provide servicing, battery and strap replacement, and vintage watch restoration.",
      learnMore: "Learn more",
      showLess: "Show less",
    },
    // Gallery
    gallery: {
      subtitle: "Our Collection",
      title: "Gallery",
      description:
        "Discover our collection of handcrafted jewelry. Each piece is a unique masterpiece.",
      pageDescription: "Explore our collection of handcrafted jewelry and luxury watches. Each piece tells its own unique story.",
      all: "All",
      filterBy: "Categories",
      search: "Search",
      searchPlaceholder: "Search products...",
      clearFilters: "Clear filters",
      noResults: "No results",
      noResultsHint: "Try a different search term or clear filters.",
      products: "products",
      product: "product",
      category: "Category",
      searchLabel: "Search",
      view: "View",
    },
    // Categories
    categories: {
      "Prstenje": "Rings",
      "Ogrlice": "Necklaces",
      "Naušnice": "Earrings",
      "Satovi": "Watches",
      "Narukvice": "Bracelets",
      "Privjesci": "Pendants",
      "Broševi": "Brooches",
    },
    // Contact
    contact: {
      title: "Contact Us",
      description:
        "Have a question or want to book a private appointment? We're happy to help.",
      visitUs: "Visit our salon",
      address: "Kneza Mutimira 27, Livno",
      workingHours: "Working hours",
      weekdays: "Mon - Fri: 09:00 - 18:00",
      saturday: "Sat: 09:00 - 14:00",
      inquiryTab: "Inquiry",
      reservationTab: "Reservation",
      // Form fields
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+387 63 000 000",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      dateLabel: "Date",
      datePlaceholder: "Select date",
      timeLabel: "Time",
      timePlaceholder: "Select time",
      serviceLabel: "Service",
      servicePlaceholder: "Select service",
      send: "Send inquiry",
      reserve: "Book appointment",
      sending: "Sending...",
      // Services
      serviceConsultation: "Jewelry consultation",
      serviceRepair: "Jewelry repair",
      serviceEngraving: "Engraving",
      serviceCustom: "Custom order",
      serviceAppraisal: "Value appraisal",
      // Messages
      successTitle: "Thank you!",
      successInquiry: "Your inquiry has been sent successfully. We will respond as soon as possible.",
      successReservation: "Your reservation has been sent successfully. We will contact you for confirmation.",
      errorMessage: "An error occurred. Please try again.",
      sendAnother: "Send another inquiry",
      makeAnother: "New reservation",
    },
    // Footer
    footer: {
      description:
        "Jewelry tradition since 1990. We create unique pieces of jewelry with love and care.",
      navigation: "Navigation",
      contactUs: "Contact",
      workingHours: "Working hours",
      weekdays: "Mon - Fri: 09:00 - 18:00",
      saturday: "Sat: 09:00 - 14:00",
      rights: "All rights reserved.",
    },
    // Gallery Modal
    modal: {
      close: "Close",
      interested: "Interested? Send an inquiry",
      hideInquiry: "Hide inquiry",
      article: "Item",
      yourMessage: "Your message",
      messagePlaceholder: "Describe your inquiry or question about this item...",
      sendInquiry: "Send inquiry",
      sending: "Sending...",
      successTitle: "Inquiry sent successfully!",
      successMessage: "We will respond as soon as possible.",
      optional: "(optional)",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];
