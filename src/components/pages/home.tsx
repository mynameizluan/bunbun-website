import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealBand } from "@/components/motion/reveal-band";
import { TiltCard } from "@/components/motion/tilt-card";
import { Marquee } from "@/components/motion/marquee";
import { getSignatureItems, localizeMenu, formatPrice } from "@/data/menu";
import { ORDER_URL, SHOPEE_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { ROUTES, HOURS_I18N, VENUE_LABELS, type Locale } from "@/lib/i18n";

const COPY = {
  vi: {
    eyebrow: "Burger thủ công · Made in Huế",
    h1Head: "Một chiếc burger,",
    h1Mid: "làm chậm rãi ",
    h1Italic: "như một món Huế.",
    lead: "Chiếc bánh ủ mềm mang dấu Bunbun, khoai tây cắt tay từng lát, và những hũ xốt nêm theo trí nhớ vị giác của người Huế. Ở đây, “nhanh” chỉ nói về thời gian bạn chờ — không phải cách chúng tôi làm món.",
    orderNow: "Đặt hàng ngay",
    menuLink: "Thực đơn",
    heroAlt: "Bunbun Burger — combo lifestyle",
    philosophyLabel: "01 — Triết lý",
    philosophyPre: "Ít món hơn, kỹ hơn. Một công thức phải được thử đi thử lại đến khi ",
    philosophyItalic: "cả bếp gật đầu",
    philosophyPost: " — rồi mới có tên trên thực đơn.",
    ourStory: "Câu chuyện của chúng tôi",
    signatureLabel: "02 — Món signature",
    fullMenu: "Toàn bộ thực đơn",
    quoteLabel: "03 — Made in Huế",
    quotePre: "“Huế dạy chúng tôi sự chỉn chu, và niềm tự hào với những gì làm bằng tay. Chiếc burger này là cách chúng tôi kể chuyện Huế — ",
    quoteItalic: "bạn nếm là hiểu.",
    quotePost: "”",
    quoteBy: "Đội ngũ Bunbun — 39A Bến Nghé",
    orderLabel: "04 — Đặt món",
    comingSoon: "Sắp có",
    zaloRow: "Zalo Mini App · tích điểm",
    visitLabel: "05 — Ghé quán · Hai cơ sở tại Huế",
    mapAll: "Bản đồ cả 2 cơ sở →",
    teaserLabel: "06 — Thực đơn",
    dishes: "món",
  },
  en: {
    eyebrow: "Handcrafted burgers · Made in Huế",
    h1Head: "One burger,",
    h1Mid: "made slowly, ",
    h1Italic: "like a dish from Huế.",
    lead: "A soft-baked bun pressed with the Bunbun mark, fries cut by hand, and sauces seasoned from the taste memory of Huế. Here, “fast” describes your wait — not the way we cook.",
    orderNow: "Order now",
    menuLink: "Menu",
    heroAlt: "Bunbun Burger — lifestyle combo",
    philosophyLabel: "01 — Philosophy",
    philosophyPre: "Fewer dishes, done more carefully. A recipe is tested again and again until ",
    philosophyItalic: "the whole kitchen nods",
    philosophyPost: " — only then does it make the menu.",
    ourStory: "Our story",
    signatureLabel: "02 — Signature dishes",
    fullMenu: "Full menu",
    quoteLabel: "03 — Made in Huế",
    quotePre: "“Huế taught us to care about the small things — and to take pride in what’s made by hand. This burger is how we tell Huế’s story: ",
    quoteItalic: "one bite and you’ll get it.",
    quotePost: "”",
    quoteBy: "The Bunbun team — 39A Bến Nghé",
    orderLabel: "04 — Order",
    comingSoon: "Coming soon",
    zaloRow: "Zalo Mini App · loyalty points",
    visitLabel: "05 — Visit us · Two locations in Huế",
    mapAll: "Map of both locations →",
    teaserLabel: "06 — Menu",
    dishes: "dishes",
  },
} as const;

const SIGNATURE_SPANS = [
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
  { col: "md:col-span-5", ratio: "aspect-square" },
  { col: "md:col-span-5", ratio: "aspect-square" },
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const signature = getSignatureItems(4, locale);
  const teaserGroups = localizeMenu(locale).map((g, i) => ({
    id: g.id,
    name: g.name,
    count: g.items.length,
    idx: (i + 1 < 10 ? "0" : "") + (i + 1),
  }));
  const hours = HOURS_I18N[locale];
  const venueLabels = VENUE_LABELS[locale];

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px]">
        <Reveal delay={0} className="mb-9 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] font-normal tracking-[0.32em] text-ink uppercase">
            {t.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={130}>
          <h1 className="mb-11 max-w-[20ch] font-display text-[clamp(44px,7.4vw,110px)] leading-[1.04] font-normal tracking-[-0.03em]">
            {t.h1Head}
            <br />
            {t.h1Mid}
            <span className="font-light text-ember italic">{t.h1Italic}</span>
          </h1>
        </Reveal>

        <Reveal
          delay={280}
          className="mb-16 flex flex-wrap items-end justify-between gap-7"
        >
          <p className="max-w-[44ch] text-base leading-[1.85] text-body">
            {t.lead}
          </p>
          <div className="flex items-center gap-7">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-ember px-[30px] py-4 font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
            >
              {t.orderNow}
            </a>
            <Link
              href={ROUTES.menu[locale]}
              className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
            >
              {t.menuLink}
            </Link>
          </div>
        </Reveal>

        <RevealBand
          delay={420}
          className="relative aspect-[2/1] max-h-[82vh] w-screen overflow-hidden bg-[#F3EAD9]"
          style={{ marginLeft: "calc(50% - 50vw)" }}
        >
          <Image
            src={asset("/hero-banner-clean.png")}
            alt={t.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </RevealBand>
      </section>

      <Marquee locale={locale} />

      {/* ---------- PHILOSOPHY ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[64px] pb-[72px] md:pt-[110px] md:pb-[120px]">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="pt-2.5 text-[11px] tracking-[0.32em] text-stone uppercase">
            {t.philosophyLabel}
          </Reveal>
          <div>
            <Reveal className="mb-10 max-w-[30ch] font-display text-[clamp(24px,3.2vw,40px)] leading-[1.35] font-normal tracking-[-0.015em] text-ink">
              {t.philosophyPre}
              <span className="text-ember italic">{t.philosophyItalic}</span>
              {t.philosophyPost}
            </Reveal>
            <Reveal>
              <Link
                href={ROUTES.about[locale]}
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                {t.ourStory}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SIGNATURE ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[60px]">
        <Reveal className="mb-13 flex items-baseline justify-between gap-6 border-t pt-[22px] [border-color:rgba(25,20,16,0.15)]">
          <div className="text-[11px] tracking-[0.32em] text-stone uppercase">
            {t.signatureLabel}
          </div>
          <Link
            href={ROUTES.menu[locale]}
            className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
          >
            {t.fullMenu}
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {signature.map((item, i) => {
            const span = SIGNATURE_SPANS[i % SIGNATURE_SPANS.length];
            return (
              <Reveal key={item.slug} className={span.col}>
                <TiltCard max={4}>
                  <div className={`relative w-full bg-placeholder ${span.ratio}`}>
                    {item.imgSrc ? (
                      <Image
                        src={item.imgSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    ) : null}
                  </div>
                </TiltCard>
                <div className="flex items-baseline justify-between gap-3.5 px-0.5 pt-4">
                  <div>
                    <div className="font-display text-[17px] font-medium tracking-[-0.01em]">
                      {item.name}
                    </div>
                    <div className="mt-1 max-w-[34ch] text-[13px] leading-[1.6] text-stone">
                      {item.desc}
                    </div>
                  </div>
                  <div className="font-display text-[15px] font-medium whitespace-nowrap">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- QUOTE BAND ---------- */}
      <section className="mt-20 bg-ink px-5 py-[80px] md:px-10 md:py-[130px] text-paper">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="pt-2.5 text-[11px] tracking-[0.32em] text-stone-dark uppercase">
            {t.quoteLabel}
          </Reveal>
          <div>
            <Reveal className="max-w-[26ch] font-display text-[clamp(26px,3.6vw,46px)] leading-[1.3] font-light tracking-[-0.015em]">
              {t.quotePre}
              <span className="text-ember italic">{t.quoteItalic}</span>
              {t.quotePost}
            </Reveal>
            <Reveal className="mt-9 text-[11px] tracking-[0.24em] text-stone-dark uppercase">
              {t.quoteBy}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CHANNELS + HOURS ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <Reveal className="mb-9 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
              {t.orderLabel}
            </Reveal>
            <div className="flex flex-col">
              <Reveal>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-between border-b px-0.5 py-5 transition-[padding] duration-[250ms] hover:pl-2.5 [border-color:rgba(25,20,16,0.12)]"
                >
                  <span className="font-display text-lg font-medium">
                    iPOS Web Order
                  </span>
                  <span className="text-ember">→</span>
                </a>
              </Reveal>
              <Reveal>
                <a
                  href={SHOPEE_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-between border-b px-0.5 py-5 transition-[padding] duration-[250ms] hover:pl-2.5 [border-color:rgba(25,20,16,0.12)]"
                >
                  <span className="font-display text-lg font-medium">
                    ShopeeFood
                  </span>
                  <span className="text-ember">→</span>
                </a>
              </Reveal>
              <Reveal className="flex items-center justify-between border-b px-0.5 py-5 text-[#B3A798] [border-color:rgba(25,20,16,0.12)]">
                <span className="font-display text-lg font-medium">
                  GrabFood
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  {t.comingSoon}
                </span>
              </Reveal>
              <Reveal className="flex items-center justify-between border-b px-0.5 py-5 text-[#B3A798] [border-color:rgba(25,20,16,0.12)]">
                <span className="font-display text-lg font-medium">
                  {t.zaloRow}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  {t.comingSoon}
                </span>
              </Reveal>
            </div>
          </div>
          <div>
            <Reveal className="mb-9 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
              {t.visitLabel}
            </Reveal>
            <div className="mb-9 grid grid-cols-2 gap-7">
              <Reveal>
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="font-display text-[10px] font-semibold tracking-[0.24em] text-ember uppercase">
                    {venueLabels[0]}
                  </span>
                  <span className="h-px flex-1 [background:rgba(25,20,16,0.15)]" />
                </div>
                <div className="font-display text-[clamp(19px,2vw,24px)] leading-[1.3] font-normal tracking-[-0.015em]">
                  39A Bến Nghé,
                  <br />
                  Phú Hội, TP. Huế
                </div>
              </Reveal>
              <Reveal>
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="font-display text-[10px] font-semibold tracking-[0.24em] text-ember uppercase">
                    {venueLabels[1]}
                  </span>
                  <span className="h-px flex-1 [background:rgba(25,20,16,0.15)]" />
                </div>
                <div className="font-display text-[clamp(19px,2vw,24px)] leading-[1.3] font-normal tracking-[-0.015em]">
                  02 Đặng Thái Thân,
                  <br />
                  TP. Huế
                </div>
              </Reveal>
            </div>
            {hours.map((h, i) => (
              <Reveal
                key={i}
                className="flex justify-between border-b px-0.5 py-4 text-sm [border-color:rgba(25,20,16,0.12)]"
              >
                <span className="text-stone">{h.days}</span>
                <span>{h.time}</span>
              </Reveal>
            ))}
            <Reveal className="mt-8 flex flex-wrap gap-7">
              <a
                href={PHONE_TEL}
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                {PHONE_DISPLAY}
              </a>
              <Link
                href={ROUTES.contact[locale]}
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                {t.mapAll}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- MENU TEASER ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[96px] md:pb-[140px]">
        <Reveal className="mb-11 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
          {t.teaserLabel}
        </Reveal>
        <div className="flex flex-col">
          {teaserGroups.map((g) => (
            <Reveal key={g.id}>
              <Link
                href={ROUTES.menu[locale]}
                className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1fr_auto] items-baseline gap-6 border-b px-0.5 py-6 transition-[padding] duration-[250ms] hover:pl-3 [border-color:rgba(25,20,16,0.12)]"
              >
                <span className="text-[11px] tracking-[0.2em] text-stone">
                  {g.idx}
                </span>
                <span className="font-display text-[clamp(22px,3vw,34px)] tracking-[-0.02em] transition-colors duration-[250ms]">
                  {g.name}
                </span>
                <span className="text-xs tracking-[0.16em] text-stone uppercase">
                  {g.count} {t.dishes}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
