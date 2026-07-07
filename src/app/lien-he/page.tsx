import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import {
  EMAIL,
  FACEBOOK_URL,
  HOURS,
  ORDER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SHOPEE_URL,
  VENUE_1,
  VENUE_2,
} from "@/lib/constants";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Bunbun Burger — 2 cơ sở tại Huế: 39A Bến Nghé & 02 Đặng Thái Thân. Giờ mở cửa 10:00–22:00 (T2–T6), 09:00–22:30 (T7–CN). Hotline 079 928 9889.",
  openGraph: {
    title: "Liên hệ · Bunbun Burger",
    description: "2 cơ sở tại Huế — giờ mở cửa, bản đồ, hotline.",
    images: ["/contact-venue-v2.png"],
  },
};

function mapEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
}

function directionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    query
  )}`;
}

function VenueBlock({ venue }: { venue: typeof VENUE_1 }) {
  return (
    <Reveal>
      <div className="mb-5 flex items-baseline gap-3 border-t-[1.5px] border-ink pt-[18px]">
        <span className="font-display text-[11px] font-semibold tracking-[0.28em] text-ember uppercase">
          {venue.label}
        </span>
      </div>
      <div className="mb-[18px] font-display text-[clamp(20px,2.2vw,26px)] leading-[1.3] font-normal tracking-[-0.015em]">
        {venue.addressLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < venue.addressLines.length - 1 ? <br /> : null}
          </span>
        ))}
      </div>
      <div className="h-[340px] overflow-hidden rounded bg-placeholder">
        <iframe
          title={`Bản đồ tới Bunbun Burger ${venue.address}`}
          src={mapEmbedUrl(venue.mapQuery)}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-wrap gap-[22px] pt-[22px] px-0.5">
        <a
          href={directionsUrl(venue.mapQuery)}
          target="_blank"
          rel="noopener"
          className="border-b border-ink pb-1 text-xs tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
        >
          Chỉ đường →
        </a>
        <a
          href={PHONE_TEL}
          className="border-b border-ink pb-1 text-xs tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </Reveal>
  );
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px] pb-[120px]">
      <Reveal className="mb-20 grid grid-cols-1 items-center gap-11 md:grid-cols-[0.82fr_1.18fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded bg-placeholder">
          <Image
            src={asset("/contact-venue-v2.png")}
            alt="Bunbun Burger — mặt tiền quán"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div>
          <div className="mb-7 flex items-center gap-3.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            <span className="text-[11px] tracking-[0.32em] uppercase">
              Liên hệ
            </span>
          </div>
          <h1 className="mb-7 font-display text-[clamp(44px,6.5vw,92px)] leading-[1.02] font-normal tracking-[-0.03em]">
            Ghé <span className="font-light text-ember italic">Bunbun.</span>
          </h1>
          <p className="max-w-[46ch] text-base leading-[1.9] text-body">
            Cứ tìm bức tường cam &ldquo;i Love Huế&rdquo; — thấy nó là tới
            nơi. Hai cơ sở ngay trung tâm thành phố, ghé ăn tại chỗ hay mang
            đi đều được; mèo Bunbun đợi bạn ngay ở cửa.
          </p>
        </div>
      </Reveal>

      <div className="mb-18 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
        <VenueBlock venue={VENUE_1} />
        <VenueBlock venue={VENUE_2} />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Reveal className="border-t pt-[22px] [border-color:rgba(25,20,16,0.15)]">
          <div className="mb-3.5 text-[11px] tracking-[0.28em] text-stone uppercase">
            Hotline · Bấm để gọi
          </div>
          <a
            href={PHONE_TEL}
            className="font-display text-[clamp(22px,2.6vw,32px)] font-normal tracking-[-0.02em] transition-colors duration-[250ms] hover:text-ember"
          >
            {PHONE_DISPLAY}
          </a>
          <div className="mt-3">
            <a
              href={`mailto:${EMAIL}`}
              className="text-[13px] text-stone transition-colors duration-[250ms] hover:text-ember"
            >
              {EMAIL}
            </a>
          </div>
        </Reveal>
        <Reveal className="border-t pt-[22px] [border-color:rgba(25,20,16,0.15)]">
          <div className="mb-3.5 text-[11px] tracking-[0.28em] text-stone uppercase">
            Giờ mở cửa · Cả 2 cơ sở
          </div>
          {HOURS.map((h, i) => (
            <div
              key={h.days}
              className={`flex justify-between py-1.5 text-sm ${
                i < HOURS.length - 1
                  ? "border-b [border-color:rgba(25,20,16,0.08)]"
                  : ""
              }`}
            >
              <span className="text-stone">{h.days}</span>
              <span>{h.time}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="border-t pt-[22px] [border-color:rgba(25,20,16,0.15)]">
          <div className="mb-3.5 text-[11px] tracking-[0.28em] text-stone uppercase">
            Kết nối
          </div>
          <div className="flex flex-col gap-3.5">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener"
              className="self-start border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
            >
              Facebook
            </a>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="self-start border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
            >
              Đặt hàng · iPOS
            </a>
            <a
              href={SHOPEE_URL}
              target="_blank"
              rel="noopener"
              className="self-start border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase transition-colors duration-[250ms] hover:border-ember hover:text-ember"
            >
              ShopeeFood
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
