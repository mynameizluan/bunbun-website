import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealBand } from "@/components/motion/reveal-band";
import { TiltCard } from "@/components/motion/tilt-card";
import { Marquee } from "@/components/motion/marquee";
import { getSignatureItems, BUNBUN_MENU, formatPrice } from "@/data/menu";
import { ORDER_URL, SHOPEE_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  description:
    "Một chiếc burger, làm chậm rãi như một món Huế. Bánh ủ mềm, khoai tây cắt tay chiên thủ công, xốt nêm theo khẩu vị Huế. Đồng giá 43.000đ, 2 cơ sở tại Huế.",
};

const SIGNATURE_SPANS = [
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
  { col: "md:col-span-5", ratio: "aspect-square" },
  { col: "md:col-span-5", ratio: "aspect-square" },
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
];

export default function HomePage() {
  const signature = getSignatureItems(4);
  const teaserGroups = BUNBUN_MENU.groups.map((g, i) => ({
    id: g.id,
    name: g.name,
    count: g.items.length,
    idx: (i + 1 < 10 ? "0" : "") + (i + 1),
  }));

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px]">
        <Reveal delay={0} className="mb-9 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] font-normal tracking-[0.32em] text-ink uppercase">
            Burger thủ công · Made in Huế
          </span>
        </Reveal>

        <Reveal delay={130}>
          <h1 className="mb-11 max-w-[20ch] font-display text-[clamp(44px,7.4vw,110px)] leading-[1.04] font-normal tracking-[-0.03em]">
            Một chiếc burger,
            <br />
            làm chậm rãi{" "}
            <span className="font-light text-ember italic">
              như một món&nbsp;Huế.
            </span>
          </h1>
        </Reveal>

        <Reveal
          delay={280}
          className="mb-16 flex flex-wrap items-end justify-between gap-7"
        >
          <p className="max-w-[44ch] text-base leading-[1.85] text-body">
            Chiếc bánh ủ mềm mang dấu Bunbun, khoai tây cắt tay từng lát, và
            những hũ xốt nêm theo trí nhớ vị giác của người Huế. Ở đây,
            &ldquo;nhanh&rdquo; chỉ nói về thời gian bạn chờ — không phải
            cách chúng tôi làm món.
          </p>
          <div className="flex items-center gap-7">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-ember px-[30px] py-4 font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
            >
              Đặt hàng ngay
            </a>
            <Link
              href="/menu"
              className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
            >
              Thực đơn
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
            alt="Bunbun Burger — combo lifestyle"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </RevealBand>
      </section>

      <Marquee />

      {/* ---------- PHILOSOPHY ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[64px] pb-[72px] md:pt-[110px] md:pb-[120px]">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="pt-2.5 text-[11px] tracking-[0.32em] text-stone uppercase">
            01 — Triết lý
          </Reveal>
          <div>
            <Reveal className="mb-10 max-w-[30ch] font-display text-[clamp(24px,3.2vw,40px)] leading-[1.35] font-normal tracking-[-0.015em] text-ink">
              Ít món hơn, kỹ hơn. Một công thức phải được thử đi thử lại đến
              khi <span className="text-ember italic">cả bếp gật đầu</span>{" "}
              — rồi mới có tên trên thực đơn.
            </Reveal>
            <Reveal>
              <Link
                href="/ve-chung-toi"
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                Câu chuyện của chúng tôi
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SIGNATURE ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[60px]">
        <Reveal className="mb-13 flex items-baseline justify-between gap-6 border-t pt-[22px] [border-color:rgba(25,20,16,0.15)]">
          <div className="text-[11px] tracking-[0.32em] text-stone uppercase">
            02 — Món signature
          </div>
          <Link
            href="/menu"
            className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
          >
            Toàn bộ thực đơn
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
            03 — Made in Huế
          </Reveal>
          <div>
            <Reveal className="max-w-[26ch] font-display text-[clamp(26px,3.6vw,46px)] leading-[1.3] font-light tracking-[-0.015em]">
              &ldquo;Huế dạy chúng tôi sự chỉn chu, và niềm tự hào với những
              gì làm bằng tay. Chiếc burger này là cách chúng tôi kể chuyện
              Huế — <span className="text-ember italic">bạn nếm là hiểu.</span>
              &rdquo;
            </Reveal>
            <Reveal className="mt-9 text-[11px] tracking-[0.24em] text-stone-dark uppercase">
              Đội ngũ Bunbun — 39A Bến Nghé
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CHANNELS + HOURS ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <Reveal className="mb-9 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
              04 — Đặt món
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
                  Sắp có
                </span>
              </Reveal>
              <Reveal className="flex items-center justify-between border-b px-0.5 py-5 text-[#B3A798] [border-color:rgba(25,20,16,0.12)]">
                <span className="font-display text-lg font-medium">
                  Zalo Mini App · tích điểm
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  Sắp có
                </span>
              </Reveal>
            </div>
          </div>
          <div>
            <Reveal className="mb-9 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
              05 — Ghé quán · Hai cơ sở tại Huế
            </Reveal>
            <div className="mb-9 grid grid-cols-2 gap-7">
              <Reveal>
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="font-display text-[10px] font-semibold tracking-[0.24em] text-ember uppercase">
                    Cơ sở 01
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
                    Cơ sở 02
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
            <Reveal className="flex justify-between border-b px-0.5 py-4 text-sm [border-color:rgba(25,20,16,0.12)]">
              <span className="text-stone">Thứ 2 – Thứ 6</span>
              <span>10:00 – 22:00</span>
            </Reveal>
            <Reveal className="flex justify-between border-b px-0.5 py-4 text-sm [border-color:rgba(25,20,16,0.12)]">
              <span className="text-stone">Thứ 7 – Chủ nhật</span>
              <span>09:00 – 22:30</span>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-7">
              <a
                href={PHONE_TEL}
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                {PHONE_DISPLAY}
              </a>
              <Link
                href="/lien-he"
                className="border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
              >
                Bản đồ cả 2 cơ sở →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- MENU TEASER ---------- */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[96px] md:pb-[140px]">
        <Reveal className="mb-11 border-t pt-[22px] text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
          06 — Thực đơn
        </Reveal>
        <div className="flex flex-col">
          {teaserGroups.map((g) => (
            <Reveal key={g.id}>
              <Link
                href="/menu"
                className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1fr_auto] items-baseline gap-6 border-b px-0.5 py-6 transition-[padding] duration-[250ms] hover:pl-3 [border-color:rgba(25,20,16,0.12)]"
              >
                <span className="text-[11px] tracking-[0.2em] text-stone">
                  {g.idx}
                </span>
                <span className="font-display text-[clamp(22px,3vw,34px)] tracking-[-0.02em] transition-colors duration-[250ms]">
                  {g.name}
                </span>
                <span className="text-xs tracking-[0.16em] text-stone uppercase">
                  {g.count} món
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
