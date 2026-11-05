export type ChronologyCategory = "Yaşam" | "Eğitim" | "Kariyer" | "Eser" | "Miras";

export type ChronologyItem = {
  year: string;
  date?: string;
  category: ChronologyCategory;
  title: string;
  text: string;
  icon: "life" | "edu" | "career" | "work" | "legacy";
};

export const chronologyIntro =
  "Saint Michel’den Robert Kolej’e, mühendislikten üç ciltlik tarihe uzanan çizgi.";

export const chronology: ChronologyItem[] = [
  {
    year: "1935",
    category: "Yaşam",
    title: "İstanbul’da dünyaya geldi",
    text: "16 Mart 1935 tarihinde İstanbul’da doğdu.",
    icon: "life",
  },
  {
    year: "1952",
    category: "Eğitim",
    title: "Saint Michel Fransız Lisesi’nden mezuniyet",
    text: "Fransızca eğitiminin kazandırdığı diller ve belge okuma becerisi, ileride yapacağı arşiv araştırmalarının temelini attı.",
    icon: "edu",
  },
  {
    year: "1956",
    category: "Eğitim",
    title: "Robert Kolej — Elektrik Mühendisliği",
    text: "Sonradan Boğaziçi Üniversitesi adını alan Robert Kolej’den elektrik mühendisi olarak mezun oldu.",
    icon: "edu",
  },
  {
    year: "1957",
    category: "Kariyer",
    title: "Mühendislik kariyeri",
    text: "Türkiye sanayi ve enerji sektöründe uzun yıllara yayılan bir mühendislik kariyeri sürdürdü; araştırmacılığı ise yaşam boyu yanına koyduğu uğraşı oldu.",
    icon: "career",
  },
  {
    year: "1964",
    category: "Kariyer",
    title: "Müsavat Locası No. 11 — Tekris",
    text: "Müsavat Muhterem Locası’nda tekris edilerek nura kavuştu; masonik yaşamının ve tarih araştırmalarının eşiği bu yıldır.",
    icon: "career",
  },
  {
    year: "1967",
    category: "Eser",
    title: "Mimar Sinan Araştırma Locası’na kabul",
    text: "Mimar Sinan Araştırma Locası’na kabul edildi; dergide onlarca makale ve çeviri yayımlayarak araştırmacı kimliğini güçlendirdi.",
    icon: "work",
  },
  {
    year: "1972",
    category: "Kariyer",
    title: "Üstad-ı Muhteremlik",
    text: "Müsavat Locası’nın Üstad-ı Muhterem’i seçildi.",
    icon: "career",
  },
  {
    year: "1991",
    category: "Kariyer",
    title: "Büyük Görevliler Kurulu",
    text: "1991–1998 arasında Büyük Görevliler Kurulu’nda hizmet etti; kariyerini Önceki Büyük Üstat Yardımcısı olarak noktaladı.",
    icon: "career",
  },
  {
    year: "1992",
    category: "Eser",
    title: "Tesviye dergisi",
    text: "HKEMBL resmi yayını Tesviye’nin yazıişleri müdürlüğünü üstlendi; 2013’e kadar dergiye yön verdi.",
    icon: "work",
  },
  {
    year: "1999",
    category: "Eser",
    title: "Türkiye’de Masonluk Tarihi — Cilt 1",
    text: "«Başlangıç (1721–1956)» cildi yayımlandı; seri Türk Masonluk tarihinin belgelere dayalı referans metni oldu.",
    icon: "work",
  },
  {
    year: "2001",
    category: "Eser",
    title: "Cilt 2 — «Yapılanma (1957–1970)»",
    text: "Serinin ikinci cildi yayımlandı; yapılanma döneminin olaylarını yıl yıl belgeler.",
    icon: "work",
  },
  {
    year: "2003",
    category: "Eser",
    title: "Cilt 3 — Konsolidasyon",
    text: "«Konsolidasyon Dönemi (1971–1990)» ile üçleme tamamlandı; konferanslar ve yazılar sürdü.",
    icon: "work",
  },
  {
    year: "2020",
    date: "29 Haziran 2020",
    category: "Yaşam",
    title: "Hayata veda",
    text: "29 Haziran 2020 tarihinde Ebedi Maşrık’a uğurlandı.",
    icon: "life",
  },
  {
    year: "2024",
    category: "Miras",
    title: "CLMAK — Celil Layiktez Müzesi ve Araştırma Kütüphanesi",
    text: "Eserleri Celil Layiktez Müzesi ve Araştırma Kütüphanesi’nde muhafaza edilir; bu dijital arşiv aynı mirasın herkese açık yüzüdür.",
    icon: "legacy",
  },
];
