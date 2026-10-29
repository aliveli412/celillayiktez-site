export type MenuItem = {
  tr: string;
  en: string;
  price: string;
  note?: string;
};

export type MenuSection = {
  id: string;
  number: string;
  tr: string;
  en: string;
  intro?: string;
  items: MenuItem[];
};

export const menuMeta = {
  venue: "53 Stoke Newington High Street · London N16 8EL",
  hours: "Daily 08:00–20:00",
  web: "www.ideafabrika.co.uk",
  instagram: "@ideafabrikaumw",
  taglineTr: "GELENEKSEL LEZZETLER",
  taglineEn: "COMMUNITY SPIRIT",
};

export const menuSections: MenuSection[] = [
  {
    id: "kahvalti",
    number: "01",
    tr: "Kahvaltı",
    en: "Breakfast",
    items: [
      {
        tr: "Günlük Taze Kömbe",
        en: "Daily baked kömbe (kıymalı veya ıspanaklı / minced meat or spinach)",
        price: "£2.50",
      },
      {
        tr: "Kömbe Tabağı",
        en: "Kömbe platter (domates, salatalık, zeytin / tomato, cucumber, olives)",
        price: "£5.00",
      },
      {
        tr: "Kahvaltı Tabağı",
        en: "Mediterranean breakfast (beyaz peynir, kaşar, hellim, sucuk, zeytin, bal, domates, salatalık / feta, kaşar, halloumi, sucuk, olives, honey, tomato, cucumber)",
        price: "£9.00",
      },
      {
        tr: "Peynir Tabağı",
        en: "Cheese platter (kaşar, beyaz peynir, zeytin, domates)",
        price: "£5.00",
      },
      {
        tr: "Söğüş",
        en: "Fresh vegetable plate (domates, biber, salatalık)",
        price: "£3.00",
      },
      {
        tr: "Menemen",
        en: "Tomato & pepper eggs",
        price: "£8.00",
        note: "+ £1.00 sucuk / ıspanak / beyaz peynir each",
      },
      { tr: "Sahanda 2 Yumurta", en: "Two fried eggs", price: "£3.50" },
      { tr: "Sahanda 3 Yumurta", en: "Three fried eggs", price: "£5.00" },
      { tr: "Sade Omlet", en: "Plain omelette", price: "£6.00" },
      {
        tr: "Ispanak / Peynir / Mantar Omlet",
        en: "Spinach, cheese or mushroom omelette",
        price: "£7.50",
      },
      {
        tr: "Karışık Sebzeli Omlet",
        en: "Mixed vegetable omelette (mantar, ıspanak, biber, peynir)",
        price: "£8.00",
      },
      { tr: "Ev Yapımı Yoğurt", en: "Homemade yogurt", price: "£3.00" },
    ],
  },
  {
    id: "tostlar",
    number: "02",
    tr: "Tostlar",
    en: "Toasties",
    items: [
      { tr: "Kaşarlı Tost", en: "Turkish cheddar toast", price: "£5.00" },
      {
        tr: "Kaşarlı Sucuklu Tost",
        en: "Cheddar & Turkish sausage toast",
        price: "£6.50",
      },
      {
        tr: "Sebzeli Tost",
        en: "Vegetable toast (domates, biber, kaşar)",
        price: "£7.00",
      },
    ],
  },
  {
    id: "corba",
    number: "03",
    tr: "Çorba",
    en: "Soup",
    items: [
      { tr: "Mercimek Çorbası", en: "Red lentil soup", price: "£6.00" },
      {
        tr: "Şefin Özel Çorbası",
        en: "Chef’s special soup · seasonal",
        price: "£7.00",
      },
    ],
  },
  {
    id: "ana-yemek",
    number: "04",
    tr: "Ana Yemek",
    en: "Mains",
    items: [
      { tr: "İçli Köfte", en: "Stuffed bulgur meatballs", price: "£11.50" },
      {
        tr: "Mantı",
        en: "Turkish dumplings with garlic yogurt",
        price: "£10.00",
      },
      {
        tr: "Etli Kuru Fasulye",
        en: "White bean & lamb stew",
        price: "£9.00",
      },
      { tr: "Tavuk Dürüm", en: "Chicken wrap", price: "£7.00" },
      { tr: "Hellim Dürüm", en: "Halloumi wrap", price: "£6.00" },
      { tr: "Hamburger", en: "Hamburger", price: "£9.00" },
      { tr: "Sucuk Ekmek", en: "Turkish sausage sandwich", price: "£9.00" },
      { tr: "Balık Ekmek", en: "Fish sandwich", price: "£9.00" },
      { tr: "Köfte Ekmek", en: "Meatball sandwich", price: "£9.00" },
    ],
  },
  {
    id: "gunluk-yemek",
    number: "★",
    tr: "Günlük Yemek",
    en: "Dish of the Day",
    intro: "£9 · Served with rice and salad or cacık / Pilav ve salata veya cacık ile",
    items: [
      { tr: "PZT / MON", en: "Karnıyarık (Stuffed aubergine)", price: "£9.00" },
      {
        tr: "SAL / TUE",
        en: "Fırında Tavuk ve Patates (Baked chicken & potatoes)",
        price: "£9.00",
      },
      {
        tr: "ÇAR / WED",
        en: "Kuzu Etli Güveç (Lamb & vegetable casserole)",
        price: "£9.00",
      },
      {
        tr: "PER / THU",
        en: "İzmir Köfte (Meatballs with potatoes)",
        price: "£9.00",
      },
      {
        tr: "CUM / FRI",
        en: "Tas Kebabı (Meat stew with potatoes)",
        price: "£9.00",
      },
      {
        tr: "CMT / SAT",
        en: "Fırında Sebzeli Makarna (Baked vegetable pasta)",
        price: "£9.00",
      },
      { tr: "PAZ / SUN", en: "Tavuk Sote (Sautéed chicken)", price: "£9.00" },
    ],
  },
  {
    id: "tatlilar",
    number: "05",
    tr: "Tatlılar",
    en: "Desserts",
    items: [
      { tr: "Şekerpare", en: "Traditional syrup dessert", price: "£2.00" },
      { tr: "Kurabiye", en: "Cookie", price: "£1.50" },
    ],
  },
  {
    id: "icecekler",
    number: "06",
    tr: "İçecekler",
    en: "Drinks",
    items: [
      { tr: "Türk Çayı", en: "Turkish tea", price: "£1.00" },
      { tr: "Earl Grey Çayı", en: "Earl Grey tea", price: "£1.50" },
      { tr: "Bitki Çayı", en: "Herbal tea", price: "£2.00" },
      { tr: "Türk Kahvesi", en: "Turkish coffee", price: "£2.50" },
      { tr: "Espresso", en: "Espresso", price: "£2.00" },
      { tr: "Americano", en: "Americano", price: "£2.50" },
      { tr: "Flat White", en: "Flat White", price: "£2.50" },
      { tr: "Latte", en: "Latte", price: "£2.50" },
      { tr: "Mocha", en: "Mocha", price: "£3.50" },
      { tr: "Sıcak Çikolata", en: "Hot chocolate", price: "£2.50" },
      { tr: "Meşrubatlar", en: "Soft drinks", price: "£1.50" },
      { tr: "Gazlı İçecekler", en: "Fizzy drinks", price: "£1.50" },
      { tr: "Kutu Bira", en: "Can beer", price: "£3.00" },
      { tr: "Şişe Bira", en: "Bottle beer", price: "£4.00" },
      {
        tr: "Yulaf sütü / Oat milk",
        en: "Oat milk supplement",
        price: "+£0.50",
      },
    ],
  },
  {
    id: "cocuk",
    number: "07",
    tr: "Çocuk Menüsü",
    en: "Kids",
    items: [
      {
        tr: "Tavuk Nugget ve Patates",
        en: "Chicken nuggets & chips",
        price: "£5.00",
      },
      { tr: "Köfte Pilav", en: "Meatballs & rice", price: "£7.00" },
    ],
  },
];
