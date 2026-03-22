import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/3b0862b6-b985-4b0e-93df-941d814f6cd7";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function sendLead(phone: string, source: string, name?: string, comment?: string, photos?: File[]) {
  const photosB64 = photos && photos.length > 0
    ? await Promise.all(photos.map(fileToBase64))
    : [];
  await fetch(SEND_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, source, name, comment, photos: photosB64 }),
  });
}

const PHONE = "+7 (977) 354-09-99";
const PHONE_RAW = "+79773540999";
const TG_LINK = "https://t.me/clean_himch";
const MAX_LINK = "https://max.ru/call/79773540999";

const services = [
  { category: "🛋 Диваны", name: "", price: "" },
  { name: "2-местный диван", price: "от 3 590 ₽" },
  { name: "3-местный диван", price: "от 4 590 ₽" },
  { name: "4-местный диван", price: "от 5 590 ₽" },
  { name: "Угловой диван", price: "от 5 390 ₽" },
  { name: "П-образный диван", price: "от 6 790 ₽" },
  { category: "🪑 Кресла и стулья", name: "", price: "" },
  { name: "Кресло", price: "от 2 290 ₽" },
  { name: "Кресло-кровать", price: "от 2 690 ₽" },
  { name: "Стул с мягкой спинкой", price: "1 190 ₽" },
  { name: "Стул без мягкой спинки", price: "790 ₽" },
  { category: "🛏 Матрасы", name: "", price: "" },
  { name: "Односпальный", price: "от 1 490 ₽" },
  { name: "Полуторный", price: "от 2 290 ₽" },
  { name: "Двуспальный", price: "от 3 190 ₽" },
];

const reviews = [
  {
    name: "Марина",
    text: "Заказала химчистку дивана после того, как кот оставил свои следы. Мастер приехал в назначенное время, всё отчистил до идеального состояния. Диван выглядит как новый!",
    date: "25 февраля 2026",
    stars: 5,
  },
  {
    name: "Алексей",
    text: "Отличная работа! Чистил матрас и два кресла. Пришёл вовремя, работал аккуратно, убрал за собой. Результат превзошёл ожидания — запах свежести держится уже вторую неделю.",
    date: "20 февраля 2026",
    stars: 5,
  },
  {
    name: "Светлана",
    text: "Обратилась для чистки дивана с детскими пятнами. Мастер вежливый и профессиональный, объяснил что делает и почему. Все пятна вывел, цена соответствует качеству.",
    date: "15 февраля 2026",
    stars: 5,
  },
  {
    name: "Татьяна",
    text: "Заказывала химчистку ковра и двух кресел. Всё быстро, качественно, без навязывания лишних услуг. Буду обращаться снова и рекомендую всем знакомым!",
    date: "10 февраля 2026",
    stars: 5,
  },
  {
    name: "Ирина",
    text: "Чистили угловой диван после ремонта — был весь в строительной пыли и пятнах. Результат просто невероятный! Мастер работает профессионально, аккуратно, без лишнего шума.",
    date: "5 февраля 2026",
    stars: 5,
  },
  {
    name: "Дмитрий",
    text: "Обращался насчёт кресла — старое пятно от кофе не мог вывести несколько лет. Мастер справился за один раз. Очень доволен, цена адекватная.",
    date: "1 февраля 2026",
    stars: 5,
  },
  {
    name: "Наталья",
    text: "Заказала химчистку детского матраса. Мастер приехал точно в срок, объяснил всё доступно, использовал безопасные средства. Матрас после чистки как новый, ребёнок доволен!",
    date: "28 января 2026",
    stars: 5,
  },
  {
    name: "Олег",
    text: "Чистили кожаный диван и два пуфа. Работа выполнена на отлично — кожа заблестела, никаких разводов. Приятно иметь дело с настоящим профессионалом.",
    date: "22 января 2026",
    stars: 5,
  },
  {
    name: "Анна",
    text: "Вызвала мастера срочно — пролила красное вино на светлый диван. Приехал через два часа, пятно вывел полностью. Очень оперативно и качественно, спасибо!",
    date: "18 января 2026",
    stars: 5,
  },
  {
    name: "Сергей",
    text: "Делал химчистку трёхместного дивана и ковра. Работает быстро, но без спешки. Объяснил как правильно ухаживать за мебелью после чистки. Однозначно рекомендую!",
    date: "14 января 2026",
    stars: 5,
  },
  {
    name: "Екатерина",
    text: "Заказывала чистку после того, как кот пометил диван. Запах исчез полностью — а я уже думала, придётся выбрасывать. Мастер настоящий профессионал, цена более чем справедливая.",
    date: "9 января 2026",
    stars: 5,
  },
  {
    name: "Виктор",
    text: "Чистили офисные кресла — 8 штук. Мастер справился быстро, результат отличный. Сотрудники оценили свежесть. Будем заказывать регулярно.",
    date: "4 января 2026",
    stars: 5,
  },
  {
    name: "Людмила",
    text: "Обратилась по совету подруги. Химчистка дивана и двух кресел — всё сделано аккуратно, чисто, с заботой. Мастер вежливый, пунктуальный. Осталась очень довольна!",
    date: "28 декабря 2025",
    stars: 5,
  },
  {
    name: "Роман",
    text: "Чистил матрас и диван — привёз кошку в новую квартиру, всё пропиталось запахом. После химчистки как будто купил новую мебель. Очень рекомендую этого мастера!",
    date: "22 декабря 2025",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Как быстро вы сможете приехать?",
    a: "Выезжаю в день обращения или на следующий день. Согласовываем удобное для вас время. Работаю без выходных.",
  },
  {
    q: "Сколько сохнет мебель после химчистки?",
    a: "В среднем 6–8 часов. В тёплый сезон быстрее.",
  },
  {
    q: "Безопасна ли химчистка для детей и животных?",
    a: "Да, использую только сертифицированные гипоаллергенные составы, безопасные для детей и домашних животных.",
  },
  {
    q: "Какая гарантия на работу?",
    a: "Даю гарантию на результат. Если что-то не устроит — вернусь и исправлю бесплатно.",
  },
  {
    q: "Нужно ли что-то подготавливать перед приездом?",
    a: "Ничего особенного. Просто освободите доступ к мебели. Всё оборудование и средства привожу с собой.",
  },
];

const galleryItems = [
  { id: 1, src: "https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/ef9b278f-784e-49df-a548-d062b8317325.png", alt: "Химчистка углового дивана" },
  { id: 2, src: "https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/d2a455a6-0874-4093-af12-9dfcca6fa877.jpg", alt: "Химчистка дивана до и после" },
  { id: 3, src: "https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/289adb90-ff93-4f41-a249-778e55a498cf.jpg", alt: "Химчистка белого дивана" },
  { id: 4, src: "https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/47fecc49-6ebb-4b60-a50a-0ac5cdc81957.jpg", alt: "Химчистка бежевого дивана" },
  { id: 5, src: "https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/51c49ee9-9639-4d3b-bccc-7c4d38ecd2bc.jpg", alt: "Химчистка серого дивана до и после" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-[#f5a623]" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroPhone, setHeroPhone] = useState("");
  const [heroSent, setHeroSent] = useState(false);
  const [sidePhone, setSidePhone] = useState("");
  const [sideSent, setSideSent] = useState(false);
  const [reviewPhone, setReviewPhone] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [showReviews, setShowReviews] = useState(2);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoName, setPhotoName] = useState("");
  const [photoPhone, setPhotoPhone] = useState("");
  const [photoComment, setPhotoComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string; sender: "client" | "manager"}[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatClientId = (() => {
    let id = localStorage.getItem("siteClientId");
    if (!id) { id = "id_" + Math.random().toString(36).substr(2, 9); localStorage.setItem("siteClientId", id); }
    return id;
  })();
  const CHAT_SERVER = "http://185.139.69.164:3000";

  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChatMessages(prev => [...prev, { text, sender: "client" }]);
    try {
      await fetch(`${CHAT_SERVER}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: chatClientId, text }),
      });
    } catch (e) { console.error(e); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendLead(photoPhone, "Форма с фото", photoName, photoComment, photoFiles);
    setSubmitted(true);
  };

  const handleHeroSubmit = async () => {
    if (!heroPhone) return;
    await sendLead(heroPhone, "Заказать звонок (герой)");
    setHeroSent(true);
    setHeroPhone("");
  };

  const handleSideSubmit = async () => {
    if (!sidePhone) return;
    await sendLead(sidePhone, "Скидка 10% (сайдбар)");
    setSideSent(true);
    setSidePhone("");
  };

  const handleReviewSubmit = async () => {
    if (!reviewPhone) return;
    await sendLead(reviewPhone, "Скидка 10% (отзывы)");
    setReviewSent(true);
    setReviewPhone("");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const applyPhoneMask = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  const handlePhoneChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(applyPhoneMask(e.target.value));
  };

  return (
    <div className="min-h-screen bg-white font-montserrat text-[#1a1a1a]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#f5a623] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">✦</span>
            </div>
            <span className="font-bold text-base leading-tight">
              Химчистка <span className="text-[#f5a623]">мебели</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            {(
              [
                ["Цены", "prices"],
                ["Галерея", "gallery"],
                ["Отзывы", "reviews"],
                ["Контакты", "contacts"],
              ] as [string, string][]
            ).map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:text-[#f5a623] transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_RAW}`}
              className="hidden md:flex items-center gap-2 font-bold text-[#1a1a1a] hover:text-[#f5a623] transition-colors text-sm"
            >
              <Icon name="Phone" size={16} />
              {PHONE}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <Icon name="Menu" size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            {(
              [
                ["Цены", "prices"],
                ["Галерея", "gallery"],
                ["Отзывы", "reviews"],
                ["Контакты", "contacts"],
              ] as [string, string][]
            ).map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-gray-700 hover:text-[#f5a623]"
              >
                {label}
              </button>
            ))}
            <a href={`tel:${PHONE_RAW}`} className="font-bold text-[#f5a623]">
              {PHONE}
            </a>
          </div>
        )}
      </header>

      {/* TRUST BAR */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "MessageCircle", title: "Нужна консультация?", sub: "звоните прямо сейчас" },
            { icon: "CheckCircle", title: "Бесплатный выезд", sub: "и консультация" },
            { icon: "Shield", title: "Работаю без посредников", sub: "у меня доступные цены" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                <Icon name={item.icon as "MessageCircle"} size={18} className="text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">
            Химчистка мягкой мебели
            <br />
            <span className="text-gray-500 text-2xl font-bold">(с выездом на дом)</span>
          </h1>

          <div className="flex items-start gap-5 bg-gray-50 rounded-xl p-4">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-[#e8e8e8] overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/a39cf82c-e01c-4716-93ab-656c1e5b9b49/bucket/9b4e82fe-91df-4a1b-92bc-62b7e31d9a32.jpg"
                  className="w-full h-full object-cover object-top"
                  alt="Мастер"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              Я — Вячеслав, частный мастер по химчистке мебели. Работаю быстро и качественно, а главное — на совесть. На все работы даю гарантию. Для оценки стоимости работы присылайте фотографии мебели любым удобным способом.
              <div className="flex gap-2 mt-3 flex-wrap">
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#29a8e8] text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-[#1a90cc] transition-colors">
                  ✈️ Telegram
                </a>
                <a href={MAX_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#0077ff] text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-[#0060cc] transition-colors">
                  💬 Max
                </a>
              </div>
            </div>
          </div>

          {/* CALLBACK FORM */}
          <div className="bg-[#f5a623] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-4 top-2 opacity-20 text-8xl select-none pointer-events-none">
              🛋️
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              Нужна консультация?
              <br />
              Закажите звонок
            </h2>
            {heroSent ? (
              <div className="mt-4 text-white font-bold text-sm">✅ Принято! Перезвоню вам в ближайшее время.</div>
            ) : (
              <div className="flex gap-3 mt-4 flex-wrap">
                <input
                  type="tel"
                  value={heroPhone}
                  onChange={handlePhoneChange(setHeroPhone)}
                  placeholder="+7 (___) ___-__-__"
                  maxLength={18}
                  className="flex-1 min-w-[180px] px-4 py-3 rounded-lg border-2 border-white bg-white text-[#1a1a1a] font-medium placeholder:text-gray-400 focus:outline-none text-sm"
                />
                <button onClick={handleHeroSubmit} className="bg-white text-[#1a1a1a] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap">
                  Перезвоните
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" defaultChecked />
              <span className="text-white text-xs opacity-80">
                Согласен с{" "}
                <span className="underline cursor-pointer">политикой конфиденциальности</span>
              </span>
            </label>
          </div>

          {/* PRICES */}
          <div id="prices">
            <h2 className="text-2xl font-black mb-4">Стоимость работ:</h2>
            <div className="rounded-xl overflow-hidden border border-gray-100">
              {services.map((s, i) =>
                s.category ? (
                  <div
                    key={s.category}
                    className="px-5 py-2.5 bg-gray-100 font-bold text-sm text-[#1a1a1a]"
                  >
                    {s.category}
                  </div>
                ) : (
                  <div
                    key={s.name + i}
                    className={`flex items-center justify-between px-5 py-3 text-sm ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-yellow-50 transition-colors`}
                  >
                    <span className="text-gray-600">{s.name}</span>
                    <span className="font-bold text-[#1a1a1a] whitespace-nowrap ml-4">
                      {s.price}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] bg-yellow-50 border border-[#f5a623] rounded-lg px-4 py-3">
              <span>👉</span>
              <span>Точную цену назову по фото за 1 минуту</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-base">Мои плюсы</h3>
            {[
              { icon: "MessageCircle", title: "Нужна консультация?", sub: "звоните прямо сейчас" },
              { icon: "CheckCircle", title: "Бесплатный выезд", sub: "и консультация" },
              { icon: "Shield", title: "Работаю без посредников", sub: "у меня доступные цены" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={item.icon as "MessageCircle"} size={16} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SIDE DISCOUNT FORM */}
          <div className="border-2 border-[#f5a623] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-lg">Скидки</span>
              <span className="bg-[#f5a623] text-white font-black text-sm px-2 py-0.5 rounded">
                10%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">за ОНЛАЙН заявку</p>
            {sideSent ? (
              <p className="text-[#f5a623] font-bold text-sm text-center py-3">✅ Принято! Перезвоню через 2 минуты.</p>
            ) : (
              <>
                <input
                  type="tel"
                  value={sidePhone}
                  onChange={handlePhoneChange(setSidePhone)}
                  placeholder="+7 (___) ___-__-__"
                  maxLength={18}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f5a623] transition-colors mb-3"
                />
                <button onClick={handleSideSubmit} className="w-full bg-[#f5a623] text-white font-bold py-3 rounded-lg hover:bg-[#e09010] transition-colors text-sm">
                  Получить скидку
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Перезвоню вам через 2 минуты
                </p>
              </>
            )}
          </div>

          {/* MESSENGER BUTTONS */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600 text-center">
              Написать в мессенджер:
            </p>
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#29a8e8] text-white font-bold py-3 rounded-xl hover:bg-[#1a90cc] transition-colors text-sm"
            >
              <span className="text-xl">✈️</span> Telegram
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#0077ff] text-white font-bold py-3 rounded-xl hover:bg-[#0060cc] transition-colors text-sm"
            >
              <span className="text-xl">💬</span> Max
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-12" id="services">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-8">Услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "Armchair", title: "Диваны и кресла", desc: "Выводим любые загрязнения: жир, вино, кофе, следы животных" },
              { icon: "BedDouble", title: "Матрасы", desc: "Глубокая чистка матраса, дезинфекция, устранение запахов" },
              { icon: "Wind", title: "Ковры и ковролин", desc: "Паровая чистка ковров, вывод пятен, сушка на месте" },
              { icon: "Car", title: "Автомобильный салон", desc: "Чистка сидений, потолка, дверных панелей" },
              { icon: "ChairIcon", title: "Стулья и пуфы", desc: "Быстрая чистка текстиля любого вида" },
              { icon: "Sparkles", title: "Дезодорация", desc: "Устранение запахов животных, табака, плесени" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#f5a623] hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#f5a623] transition-colors">
                  <Icon
                    name={item.icon as "Armchair"}
                    fallback="Star"
                    size={22}
                    className="text-[#f5a623] group-hover:text-white"
                  />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-12" id="gallery">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2">Галерея работ</h2>
          <p className="text-gray-500 text-sm mb-8">Примеры химчистки мебели</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox({ src: item.src, alt: item.alt })}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer relative group"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Icon
                    name="ZoomIn"
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>

          {lightbox && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </section>

      {/* PHOTO ORDER FORM */}
      <section className="bg-gray-50 py-12" id="order">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2">Отправьте фото мебели</h2>
          <p className="text-gray-500 text-sm mb-8">
            Пришлите фото — рассчитаю стоимость и перезвоню через 5 минут
          </p>

          {submitted ? (
            <div className="bg-white rounded-2xl p-10 text-center border-2 border-[#f5a623]">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-black text-xl mb-2">Заявка принята!</h3>
              <p className="text-gray-500 text-sm">Перезвоню вам в течение 5 минут</p>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    value={photoName}
                    onChange={(e) => setPhotoName(e.target.value)}
                    placeholder="Александр"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={photoPhone}
                    onChange={handlePhoneChange(setPhotoPhone)}
                    placeholder="+7 (___) ___-__-__"
                    maxLength={18}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Комментарий</label>
                <textarea
                  value={photoComment}
                  onChange={(e) => setPhotoComment(e.target.value)}
                  placeholder="Опишите что нужно почистить, какие пятна, когда удобно..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f5a623] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Фото мебели (необязательно)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#f5a623] hover:bg-yellow-50 transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {photoFiles.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-2xl">📎</div>
                      <p className="font-semibold text-sm text-[#f5a623]">
                        Загружено файлов: {photoFiles.length}
                      </p>
                      <p className="text-xs text-gray-400">
                        {photoFiles.map((f) => f.name).join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl">📸</div>
                      <p className="font-semibold text-sm text-gray-600">
                        Нажмите для загрузки фото
                      </p>
                      <p className="text-xs text-gray-400">JPG, PNG — до 10 MB каждый</p>
                    </div>
                  )}
                </div>
                {photoFiles.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {photoFiles.map((file, i) => (
                      <div
                        key={i}
                        className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#f5a623] text-white font-black py-4 rounded-xl hover:bg-[#e09010] transition-colors text-base"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-12" id="reviews">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-2">
              {reviews.length * 12} отзывов о моей работе
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#f5a623] text-2xl">★</span>
                <span className="font-black text-xl">Рейтинг: 5,0</span>
              </div>
              <span className="text-gray-400 text-sm">{reviews.length * 12} отзывов</span>
            </div>

            <div className="space-y-1 mb-6 max-w-sm">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="text-[#f5a623] w-4">★</span>
                  <span className="text-gray-500 w-2">{star}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#f5a623]"
                      style={{ width: i === 0 ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="text-gray-500 w-8 text-right text-xs">
                    {i === 0 ? reviews.length * 12 : 0}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {reviews.slice(0, showReviews).map((r, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#f5a623] transition-colors"
                >
                  <h3 className="font-bold mb-2">{r.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{r.text}</p>
                  <div className="flex items-center gap-4">
                    <StarRating count={r.stars} />
                    <span className="text-gray-400 text-xs">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {showReviews < reviews.length && (
              <button
                onClick={() => setShowReviews(reviews.length)}
                className="mt-6 bg-[#f5a623] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#e09010] transition-colors text-sm"
              >
                Показать ещё
              </button>
            )}
          </div>

          <div>
            <div className="border-2 border-[#f5a623] rounded-xl p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-lg">Скидки</span>
                <span className="bg-[#f5a623] text-white font-black text-sm px-2 py-0.5 rounded">
                  10%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">за ОНЛАЙН заявку</p>
              {reviewSent ? (
                <p className="text-[#f5a623] font-bold text-sm text-center py-3">✅ Принято! Перезвоню через 2 минуты.</p>
              ) : (
                <>
                  <input
                    type="tel"
                    value={reviewPhone}
                    onChange={handlePhoneChange(setReviewPhone)}
                    placeholder="+7 (___) ___-__-__"
                    maxLength={18}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f5a623] transition-colors mb-3"
                  />
                  <button onClick={handleReviewSubmit} className="w-full bg-[#f5a623] text-white font-bold py-3 rounded-lg hover:bg-[#e09010] transition-colors text-sm">
                    Получить скидку
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Перезвоню вам через 2 минуты
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-8">Ответы на вопросы</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={18}
                    className="shrink-0 ml-4 text-gray-400"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-12" id="contacts">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black mb-2">Контакты</h2>
          <p className="text-gray-500 text-sm mb-8">Выберите удобный способ связи</p>

          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center justify-center gap-3 w-full max-w-md mx-auto bg-[#f5a623] text-white font-black py-4 rounded-2xl hover:bg-[#e09010] transition-colors text-base mb-4"
          >
            <Icon name="Phone" size={20} />
            {PHONE}
          </a>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#29a8e8] text-white font-bold py-3.5 rounded-xl hover:bg-[#1a90cc] transition-colors text-sm"
            >
              <span className="text-lg">✈️</span> Telegram
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0077ff] text-white font-bold py-3.5 rounded-xl hover:bg-[#0060cc] transition-colors text-sm"
            >
              <span className="text-lg">💬</span> Max
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="bg-gray-50 rounded-xl p-4">
              <Icon name="Clock" size={20} className="text-[#f5a623] mx-auto mb-2" />
              <div className="font-semibold">Режим работы</div>
              <div className="text-xs mt-1 text-gray-500">Ежедневно 8:00 – 22:00</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Icon name="MapPin" size={20} className="text-[#f5a623] mx-auto mb-2" />
              <div className="font-semibold">Выезд на дом</div>
              <div className="text-xs mt-1 text-gray-500">Работаем по всему городу</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Icon name="Star" size={20} className="text-[#f5a623] mx-auto mb-2" />
              <div className="font-semibold">Гарантия качества</div>
              <div className="text-xs mt-1 text-gray-500">На все виды работ</div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING ACTION BUTTON */}
      <style>{`
        @keyframes fab-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(245,166,35,0.5); }
          50% { transform: scale(1.1); box-shadow: 0 6px 30px rgba(245,166,35,0.8); }
        }
        .fab-btn { animation: fab-pulse 2s ease-in-out infinite; }
        .fab-btn:hover { animation: none; transform: scale(1.15); }
        @keyframes fab-item-in {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fab-item { animation: fab-item-in 0.2s ease forwards; }
      `}</style>

      {/* Чат-виджет */}
      {chatOpen && (
        <div style={{position:"fixed",bottom:"100px",right:"20px",width:"320px",border:"1px solid #ddd",borderRadius:"12px",background:"white",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column",zIndex:9999,overflow:"hidden",fontFamily:"sans-serif"}}>
          <div style={{background:"#007bff",color:"white",padding:"15px",textAlign:"center",fontWeight:"bold",cursor:"pointer",fontSize:"16px"}} onClick={() => setChatOpen(false)}>Связаться с нами ✕</div>
          <div style={{height:"300px",overflowY:"auto",padding:"15px",display:"flex",flexDirection:"column",gap:"10px",background:"#f9f9f9"}}>
            {chatMessages.length === 0 && <div style={{color:"#999",fontSize:"13px",textAlign:"center",marginTop:"auto",marginBottom:"auto"}}>Напишите нам — ответим быстро!</div>}
            {chatMessages.map((m, i) => (
              <div key={i} style={{padding:"10px 14px",borderRadius:"15px",maxWidth:"85%",wordWrap:"break-word",fontSize:"14px",alignSelf:m.sender==="client"?"flex-end":"flex-start",background:m.sender==="client"?"#007bff":"#e5e5ea",color:m.sender==="client"?"white":"black"}}>{m.text}</div>
            ))}
          </div>
          <div style={{display:"flex",padding:"10px",background:"white",borderTop:"1px solid #eee"}}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendChatMessage()} placeholder="Ваше сообщение..." style={{flex:1,padding:"10px",border:"1px solid #ddd",borderRadius:"20px",outline:"none",fontSize:"14px"}} />
            <button onClick={sendChatMessage} style={{marginLeft:"8px",width:"40px",height:"40px",background:"#007bff",color:"white",border:"none",borderRadius:"50%",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>➤</button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        <button
          onClick={() => { setChatOpen(!chatOpen); }}
          className="fab-btn w-16 h-16 rounded-full bg-[#f5a623] text-white flex items-center justify-center shadow-2xl"
        >
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={28} />
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-white py-8 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 bg-[#f5a623] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✦</span>
            </div>
            <span className="font-bold">Химчистка мебели</span>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 · Профессиональная химчистка мягкой мебели с выездом на дом
          </p>
          <p className="text-gray-500 text-xs mt-1">
            <span className="cursor-pointer hover:text-gray-300">
              Политика конфиденциальности
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}