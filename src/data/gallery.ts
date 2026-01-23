export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Dijamantni prsten 'Vječnost'",
    description:
      "Ručno izrađen prsten od 18-karatnog bijelog zlata s brilijanom vrhunske čistoće. Klasičan dizajn koji simbolizira vječnu ljubav i predanost.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1738694242379-ef21044985bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2ODk4MTA1Mnww&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "2",
    title: "Zlatna ogrlica 'Elegancija'",
    description:
      "Raskošna ogrlica od 14-karatnog žutog zlata s pažljivo postavljenim dragim kamenjem. Savršena za posebne prilike i večernje događaje.",
    category: "Ogrlice",
    image:
      "https://images.unsplash.com/photo-1767921482419-d2d255b5b700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuZWNrbGFjZSUyMGpld2Vscnl8ZW58MXx8fHwxNzY4OTUxODg5fDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "3",
    title: "Naušnice 'Blistavi sjaj'",
    description:
      "Elegantne viseće naušnice od ružičastog zlata s prirodnim biserima. Spoj moderne estetike i klasične ljepote za svaku prigodu.",
    category: "Naušnice",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVnYW50JTIwZWFycmluZ3MlMjBnb2xkfGVufDF8fHx8MTc2ODkzNzg0Nnww&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "4",
    title: "Luksuzni sat 'Majstor'",
    description:
      "Švicarski sat s automatskim mehanizmom i kućištem od nehrđajućeg čelika. Safirno staklo i vodootpornost do 100 metara.",
    category: "Satovi",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
  },
  {
    id: "5",
    title: "Zaručnički prsten 'Obećanje'",
    description:
      "Prekrasan solitaire prsten s dijamantom okruglog brusa. Platinasta traka sa skrivenim detaljima na unutrašnjosti.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwcmluZ3xlbnwxfHx8fDE3Njg5ODE1MjN8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "6",
    title: "Narukvica 'Večernja zvijezda'",
    description:
      "Tenis narukvica s nizom brilijanata postavljenih u bijelo zlato. Svaki kamen je ručno odabran za savršenu konzistentnost.",
    category: "Narukvice",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXR8ZW58MXx8fHwxNzY4OTgxNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "7",
    title: "Privjesak 'Srce oceana'",
    description:
      "Jedinstveni privjesak u obliku srca s akvamarinom okruženim sitnim dijamantima. Inspiriran dubinama mora.",
    category: "Privjesci",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGVuZGFudHxlbnwxfHx8fDE3Njg5ODE3MzB8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "8",
    title: "Vjenčani set 'Savršenstvo'",
    description:
      "Usklađeni set vjenčanog prstenja za nju i njega. Izrađen od platine s diskretnim graviranjem imena i datuma.",
    category: "Prstenje",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3N8ZW58MXx8fHwxNzY4OTgxODE1fDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    id: "9",
    title: "Vintage broš 'Dama'",
    description:
      "Antikni broš iz 1920-ih s ručno postavljenim smaragdima i dijamantima. Art Deco stil koji odiše elegancijom prošlih vremena.",
    category: "Broševi",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamV3ZWxyeXxlbnwxfHx8fDE3Njg5ODE5MDB8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
];

export function getGalleryItem(id: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === id);
}

export function getGalleryCategories(): string[] {
  return Array.from(new Set(galleryItems.map((item) => item.category)));
}
