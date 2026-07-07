import Image from "next/image";
import Link from "next/link";
import {
  EMAIL,
  FACEBOOK_URL,
  ORDER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SHOPEE_URL,
} from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/asset";

const exploreLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/menu", label: "Thực đơn" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 bg-ink px-5 md:px-10 pt-[90px] pb-12 text-paper">
      <div className="mx-auto max-w-[1360px]">
        <Reveal
          className="mb-11 flex flex-wrap items-end justify-between gap-8 border-b pb-14 [border-color:rgba(251,247,242,0.15)]"
          delay={0}
        >
          <div className="font-display text-[clamp(34px,4.6vw,60px)] leading-[1.1] font-light tracking-[-0.025em]">
            Đói rồi?
            <br />
            <span className="text-ember italic">Bunbun lo.</span>
          </div>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-ember px-9 py-[18px] font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
          >
            Đặt hàng ngay
          </a>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-[11px]">
              <Image
                src={asset("/logo.png")}
                alt="Bunbun Burger — logo mèo burger"
                width={32}
                height={32}
                className="block rounded-lg"
              />
              <span className="font-display text-base font-semibold">
                Bunbun Burger
              </span>
            </div>
            <p className="max-w-[42ch] text-[13px] leading-[1.8] text-stone-dark">
              Tự hào là thương hiệu burger Made in Huế.
              <br />
              39A Bến Nghé · 02 Đặng Thái Thân, TP. Huế
              <br />
              Hotline:{" "}
              <a href={PHONE_TEL} className="text-paper">
                {PHONE_DISPLAY}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${EMAIL}`} className="text-paper">
                {EMAIL}
              </a>
            </p>
          </div>
          <div>
            <div className="mb-[18px] text-[11px] tracking-[0.28em] text-stone-dark uppercase">
              Khám phá
            </div>
            <div className="flex flex-col gap-3 text-sm text-stone-on-dark">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-[250ms] hover:text-ember"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-[18px] text-[11px] tracking-[0.28em] text-stone-dark uppercase">
              Đặt món
            </div>
            <div className="flex flex-col gap-3 text-sm text-stone-on-dark">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener"
                className="transition-colors duration-[250ms] hover:text-ember"
              >
                iPOS Web Order
              </a>
              <a
                href={SHOPEE_URL}
                target="_blank"
                rel="noopener"
                className="transition-colors duration-[250ms] hover:text-ember"
              >
                ShopeeFood
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener"
                className="transition-colors duration-[250ms] hover:text-ember"
              >
                Facebook
              </a>
              <span className="opacity-45">GrabFood · sắp có</span>
            </div>
          </div>
        </div>

        <div className="mt-13 flex flex-wrap justify-between gap-3 border-t pt-6 text-[11px] tracking-[0.14em] text-stone-dark uppercase [border-color:rgba(251,247,242,0.12)]">
          <span>© {new Date().getFullYear()} Bunbun Burger — Made in Huế</span>
          <span>Thiết kế & vận hành tại Huế</span>
        </div>
      </div>
    </footer>
  );
}
