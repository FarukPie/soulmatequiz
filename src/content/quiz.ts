// Sitedeki tüm metinler burada.

export type Option = { label: string; icon: string; color?: string };
export type Question = { text: string; options: Option[] };

// ︎: sembolün emoji yerine metin olarak çizilmesini sağlar.
const t = (symbol: string) => symbol + "︎";

export const intro = {
  eyebrow: "Yıldızların Fısıltısı",
  title: "Ruh Eşini Gökyüzü Söylesin",
  subtitle:
    "10 soru, 12 burç ve sonsuz bir gökyüzü. Cevapların yıldızlara yazılacak; kaderin ise tek bir isimde saklı.",
  namePrompt: "Yıldızlar sana nasıl seslensin?",
  namePlaceholder: "Adın",
  cta: "Kaderini Keşfet",
};

export const stats = [
  { value: 128437, label: "kişi bu testi çözdü" },
  { value: 41902, label: "kişi ruh eşini buldu" },
  { value: 94.7, label: "doğruluk oranı", percent: true },
];

export const questions: Question[] = [
  {
    text: "Arkadaşların seni nasıl tanımlar?",
    options: [
      { label: "Hayat dolu ve enerjik", icon: "✦" },
      { label: "Sakin ve güven veren", icon: t("☾") },
      { label: "Komik, ortamın neşesi", icon: t("☀") },
      { label: "Gizemli ve derin", icon: "✧" },
      { label: "Lider ruhlu, kararlı", icon: t("♛") },
    ],
  },
  {
    text: "En sevdiğin mevsim hangisi?",
    options: [
      { label: "İlkbahar", icon: "❀" },
      { label: "Yaz", icon: t("☀") },
      { label: "Sonbahar", icon: "❦" },
      { label: "Kış", icon: "❄" + "︎" },
    ],
  },
  {
    text: "Burcun nedir?",
    options: [
      { label: "Koç", icon: t("♈") },
      { label: "Boğa", icon: t("♉") },
      { label: "İkizler", icon: t("♊") },
      { label: "Yengeç", icon: t("♋") },
      { label: "Aslan", icon: t("♌") },
      { label: "Başak", icon: t("♍") },
      { label: "Terazi", icon: t("♎") },
      { label: "Akrep", icon: t("♏") },
      { label: "Yay", icon: t("♐") },
      { label: "Oğlak", icon: t("♑") },
      { label: "Kova", icon: t("♒") },
      { label: "Balık", icon: t("♓") },
    ],
  },
  {
    text: "Hayalindeki ilk buluşma nasıl olurdu?",
    options: [
      { label: "Gün batımında sahil yürüyüşü", icon: "◐" },
      { label: "Şehir ışıklarına karşı akşam yemeği", icon: "✦" },
      { label: "Doğada, kamp ateşinin başında", icon: "▲" },
      { label: "Evde film ve sıcak bir kahve", icon: "♨" },
      { label: "Plansız, spontane bir yolculuk", icon: "➶" },
    ],
  },
  {
    text: "Gece gökyüzüne baktığında aklına ilk ne gelir?",
    options: [
      { label: "Ay'ın sakin ışığı", icon: t("☾") },
      { label: "Kayan bir yıldıza dilek tutmak", icon: "✧" },
      { label: "Evrenin sonsuzluğu", icon: "∞" },
      { label: "Bu anı biriyle paylaşmak", icon: t("♡") },
    ],
  },
  {
    text: "Hangi element sana daha yakın?",
    options: [
      { label: "Ateş — tutku ve cesaret", icon: "▲" },
      { label: "Su — sezgi ve duygu", icon: "▼" },
      { label: "Hava — özgürlük ve fikir", icon: "△" },
      { label: "Toprak — sadakat ve denge", icon: "▽" },
    ],
  },
  {
    text: "Bir ilişkide senin için en önemli şey nedir?",
    options: [
      { label: "Sadakat", icon: "◈" },
      { label: "Mizah ve kahkaha", icon: t("☀") },
      { label: "Tutku", icon: t("♡") },
      { label: "Huzur", icon: t("☾") },
      { label: "Karşılıklı saygı", icon: "✦" },
    ],
  },
  {
    text: "Hafta sonu seni nerede buluruz?",
    options: [
      { label: "Deniz kenarında", icon: "≈" },
      { label: "Spor salonunda ya da doğada koşarken", icon: "➶" },
      { label: "Bir kafede, elimde kitapla", icon: "❦" },
      { label: "Kalabalık bir sofrada", icon: "✦" },
      { label: "Evde, kendi köşemde", icon: t("☾") },
    ],
  },
  {
    text: "Hangi renk ruhunu en iyi anlatır?",
    options: [
      { label: "Gece mavisi", icon: "●", color: "#3b5bdb" },
      { label: "Altın sarısı", icon: "●", color: "#f2cf7e" },
      { label: "Bordo", icon: "●", color: "#9b1b30" },
      { label: "Zümrüt yeşili", icon: "●", color: "#2f9e6e" },
      { label: "Lavanta", icon: "●", color: "#b197fc" },
    ],
  },
  {
    text: "Aşka dair neye inanırsın?",
    options: [
      { label: "İlk görüşte aşka", icon: "✧" },
      { label: "Zamanla büyüyen aşka", icon: "❀" },
      { label: "Kadere; o kişi zaten yazılı", icon: "∞" },
      { label: "Henüz emin değilim", icon: "?" },
    ],
  },
];

export const reveal = {
  messages: [
    "Yıldızlar hizalanıyor…",
    "Cevapların gökyüzüne yazılıyor…",
    "Kaderin açığa çıkıyor…",
  ],
};

// Hangi cevaplar verilirse verilsin herkes bu ekranı görür.
// `{name}` katılımcının adıyla değiştirilir.
export const result = {
  greeting: "{name}, yıldızlar konuştu…",
  title: "Ruh Eşinin Yıldız Haritası",
  compatibility: { value: 96, label: "Kozmik uyum" },
  traits: [
    { icon: "M", label: "İsminin baş harfi", value: "M", probability: 97 },
    { icon: "∿", label: "Saçları", value: "Siyah ve kıvırcık", probability: 92 },
    { icon: "≈", label: "Yaşadığı yer", value: "Ege Bölgesi", probability: 89 },
    { icon: t("☀"), label: "Ten rengi", value: "Esmer", probability: 87 },
    { icon: "✦", label: "Mesleği", value: "Öğretmen ya da sporla ilgili", probability: 81 },
  ],
  note:
    "Cevapların, gökyüzünde tek bir izi işaret ediyor: Ege'nin güneşinde esmerleşmiş, siyah kıvırcık saçlı, adı M ile başlayan biri. Ya bir sınıfın önünde bilgi paylaşıyor ya da sahada ter döküyor. Yolların kesişmek üzere; gözlerini açık tut.",
  restart: "Yeniden Başla",
};
