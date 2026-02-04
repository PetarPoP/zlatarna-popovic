import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const galleryItems = [
  {
    title: "Dijamantni prsten 'Vječnost'",
    description:
      "Ručno izrađen prsten od 18-karatnog bijelog zlata s brilijanom vrhunske čistoće. Klasičan dizajn koji simbolizira vječnu ljubav i predanost.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1738694242379-ef21044985bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2ODk4MTA1Mnww&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 1,
    isAvailable: true,
  },
  {
    title: "Zlatna ogrlica 'Elegancija'",
    description:
      "Raskošna ogrlica od 14-karatnog žutog zlata s pažljivo postavljenim dragim kamenjem. Savršena za posebne prilike i večernje događaje.",
    category: "Ogrlice",
    image:
      "https://images.unsplash.com/photo-1767921482419-d2d255b5b700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuZWNrbGFjZSUyMGpld2Vscnl8ZW58MXx8fHwxNzY4OTUxODg5fDA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 2,
    isAvailable: true,
  },
  {
    title: "Naušnice 'Blistavi sjaj'",
    description:
      "Elegantne viseće naušnice od ružičastog zlata s prirodnim biserima. Spoj moderne estetike i klasične ljepote za svaku prigodu.",
    category: "Naušnice",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVnYW50JTIwZWFycmluZ3MlMjBnb2xkfGVufDF8fHx8MTc2ODkzNzg0Nnww&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 3,
    isAvailable: true,
  },
  {
    title: "Luksuzni sat 'Majstor'",
    description:
      "Švicarski sat s automatskim mehanizmom i kućištem od nehrđajućeg čelika. Safirno staklo i vodootpornost do 100 metara.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
    sortOrder: 4,
    isAvailable: true,
  },
  {
    title: "Zaručnički prsten 'Obećanje'",
    description:
      "Prekrasan solitaire prsten s dijamantom okruglog brusa. Platinasta traka sa skrivenim detaljima na unutrašnjosti.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwcmluZ3xlbnwxfHx8fDE3Njg5ODE1MjN8MA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 5,
    isAvailable: true,
  },
  {
    title: "Narukvica 'Večernja zvijezda'",
    description:
      "Tenis narukvica s nizom brilijanata postavljenih u bijelo zlato. Svaki kamen je ručno odabran za savršenu konzistentnost.",
    category: "Narukvice",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXR8ZW58MXx8fHwxNzY4OTgxNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 6,
    isAvailable: true,
  },
  {
    title: "Privjesak 'Srce oceana'",
    description:
      "Jedinstveni privjesak u obliku srca s akvamarinom okruženim sitnim dijamantima. Inspiriran dubinama mora.",
    category: "Privjesci",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGVuZGFudHxlbnwxfHx8fDE3Njg5ODE3MzB8MA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 7,
    isAvailable: true,
  },
  {
    title: "Vjenčani set 'Savršenstvo'",
    description:
      "Usklađeni set vjenčanog prstenja za nju i njega. Izrađen od platine s diskretnim graviranjem imena i datuma.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3N8ZW58MXx8fHwxNzY4OTgxODE1fDA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 8,
    isAvailable: true,
  },
  {
    title: "Vintage broš 'Dama'",
    description:
      "Antikni broš iz 1920-ih s ručno postavljenim smaragdima i dijamantima. Art Deco stil koji odiše elegancijom prošlih vremena.",
    category: "Broševi",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeXxlbnwxfHx8fDE3Njg5ODE5MDB8MA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 9,
    isAvailable: true,
  },
  {
    title: "Safirne naušnice 'Noćno nebo'",
    description:
      "Prekrasne naušnice s cejlonskim safirima okruženim dijamantima. Duboka plava boja koja podsjeća na zvjezdano nebo.",
    category: "Naušnice",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHx3YWxsZXQtcGFnZXx8fHx8fHx8fDE3Njg5ODE5MDB8MA&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 10,
    isAvailable: true,
  },
  {
    title: "Muški prsten 'Vladar'",
    description:
      "Snažan prsten od titana i 18-karatnog zlata. Minimalistički dizajn za modernog muškarca.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 11,
    isAvailable: true,
  },
  {
    title: "Biserna ogrlica 'Klasik'",
    description:
      "Tradicionalna ogrlica od japanskih Akoya bisera. Savršeno usklađeni biseri s prekrasnim sjajem.",
    category: "Ogrlice",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 12,
    isAvailable: true,
  },
  {
    title: "Ženski sat 'Gracioznost'",
    description:
      "Elegantan ženski sat s dijamantima na luneti. Švicarski mehanizam i kožna narukvica.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 13,
    isAvailable: true,
  },
  {
    title: "Smaragdni prsten 'Šuma'",
    description:
      "Raskošan prsten s kolumbijskim smaragdom i bočnim dijamantima. Bogata zelena boja koja očarava.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 14,
    isAvailable: true,
  },
  {
    title: "Zlatna narukvica 'Lanac'",
    description:
      "Masivna lančana narukvica od 18-karatnog žutog zlata. Klasičan dizajn za svakodnevno nošenje.",
    category: "Narukvice",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 15,
    isAvailable: true,
  },
  {
    title: "Rubinski privjesak 'Strast'",
    description:
      "Intenzivno crven burmanski rubin u elegantnom zlatnom okviru. Simbol ljubavi i strasti.",
    category: "Privjesci",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 16,
    isAvailable: true,
  },
  {
    title: "Dijamantne naušnice 'Kap'",
    description:
      "Kapljičaste naušnice s dijamantima u bjelom zlatu. Elegantne i rafinirane za svaku prigodu.",
    category: "Naušnice",
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 17,
    isAvailable: true,
  },
  {
    title: "Sportski sat 'Diver'",
    description:
      "Profesionalni ronilački sat vodootporan do 300 metara. Keramička luneta i Super-LumiNova indeksi.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 18,
    isAvailable: true,
  },
  {
    title: "Opal ogrlica 'Aurora'",
    description:
      "Australski opal s igrom boja poput sjeverne svjetlosti. Okružen dijamantima u ružičastom zlatu.",
    category: "Ogrlice",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 19,
    isAvailable: true,
  },
  {
    title: "Vintage sat 'Heritage'",
    description:
      "Restaurirani sat iz 1960-ih s ručnim navijanjem. Originalni dijelovi i certifikat autentičnosti.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 20,
    isAvailable: true,
  },
  {
    title: "Dijamantna narukvica 'Sjaj'",
    description:
      "Blistava narukvica s punim okruglim dijamantima. Bijelo zlato i sigurnosna kopča.",
    category: "Narukvice",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 21,
    isAvailable: true,
  },
  {
    title: "Tanzanit prsten 'Violeta'",
    description:
      "Rijedak tanzanit prekrasne ljubičasto-plave boje. Jedinstven prsten s trostrukim halo dizajnom.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 22,
    isAvailable: true,
  },
  {
    title: "Zlatan broš 'Leptir'",
    description:
      "Umjetnički izrađen broš u obliku leptira s emajlom i dijamantima. Živopisne boje i detalji.",
    category: "Broševi",
    image:
      "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 23,
    isAvailable: true,
  },
  {
    title: "Kronograf 'Pilot'",
    description:
      "Pilotski kronograf sat s GMT funkcijom. Veliki brojčanik za lako čitanje i kožna narukvica.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200",
    sortOrder: 24,
    isAvailable: true,
  },
];

async function main() {
  console.log("Seeding gallery items...");

  // Check if gallery items already exist
  const existingCount = await prisma.galleryItem.count();
  if (existingCount > 0) {
    console.log(`Gallery already has ${existingCount} items. Skipping seed.`);
    return;
  }

  // Create all gallery items
  for (const item of galleryItems) {
    await prisma.galleryItem.create({
      data: item,
    });
  }

  console.log(`Created ${galleryItems.length} gallery items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
