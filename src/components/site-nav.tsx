"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ORDER_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { asset } from "@/lib/asset";
import content from "@/data/site-content.json";
import {
  NAV_LABELS,
  ROUTES,
  switchLocalePath,
  type Locale,
  type RouteKey,
} from "@/lib/i18n";

const ORDER_LABEL: Record<Locale, string> = { vi: "Đặt hàng", en: "Order" };
const ORDER_NOW: Record<Locale, string> = {
  vi: "Đặt hàng ngay",
  en: "Order now",
};

const ROUTE_KEYS: RouteKey[] = ["home", "menu", "about", "contact"];

function LocaleSwitch({
  locale,
  pathname,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  className?: string;
}) {
  const other: Locale = locale === "vi" ? "en" : "vi";
  return (
    <span
      className={`flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase ${className}`}
    >
      <span className="font-semibold text-ink">{locale}</span>
      <span className="text-stone">/</span>
      <Link
        href={switchLocalePath(pathname, other)}
        className="text-stone transition-colors duration-[250ms] hover:text-ember"
      >
        {other}
      </Link>
    </span>
  );
}

export function SiteNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng overlay khi chuyển trang (adjust-state-during-render, tránh setState trong effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Khoá cuộn nền khi overlay mở
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] backdrop-blur-md transition-colors duration-300"
        style={{
          background:
            solid || open ? "rgba(251,247,242,0.88)" : "rgba(251,247,242,0)",
          borderBottom:
            solid && !open
              ? "1px solid rgba(25,20,16,0.08)"
              : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex max-w-[1360px] items-center gap-5 px-5 py-4 md:px-10 md:py-5">
          <Link
            href={ROUTES.home[locale]}
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src={asset(content.assets.logo)}
              alt="Bunbun Burger — logo mèo burger"
              width={34}
              height={34}
              className="block rounded-[9px]"
            />
            <span className="font-display text-base font-semibold tracking-[0.02em]">
              Bunbun Burger
            </span>
          </Link>

          {/* Desktop */}
          <div className="ml-auto hidden items-center gap-[34px] md:flex">
            {ROUTE_KEYS.map((key) => {
              const href = ROUTES[key][locale];
              const active = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className="text-[13px] tracking-[0.1em] uppercase transition-colors duration-[250ms]"
                  style={{
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--color-ember)" : "var(--color-ink)",
                  }}
                >
                  {NAV_LABELS[locale][key]}
                </Link>
              );
            })}
            <LocaleSwitch locale={locale} pathname={pathname} />
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-ink px-6 py-3 font-display text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-[250ms] hover:bg-ink hover:text-paper"
            >
              {ORDER_LABEL[locale]}
            </a>
          </div>

          {/* Mobile: nút mở menu */}
          <button
            type="button"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="ml-auto flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className="absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300"
                style={{
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 top-[7px] h-px w-full bg-ink transition-opacity duration-300"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300"
                style={{
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[90] flex flex-col bg-paper px-5 pt-[96px] pb-8 transition-opacity duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="flex flex-col border-t [border-color:rgba(25,20,16,0.15)]">
          {ROUTE_KEYS.map((key, i) => {
            const href = ROUTES[key][locale];
            const active = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className="grid grid-cols-[36px_1fr] items-baseline border-b py-5 [border-color:rgba(25,20,16,0.12)]"
                onClick={() => setOpen(false)}
              >
                <span className="text-[11px] tracking-[0.2em] text-stone">
                  {"0" + (i + 1)}
                </span>
                <span
                  className="font-display text-[28px] leading-none tracking-[-0.02em]"
                  style={{
                    color: active ? "var(--color-ember)" : "var(--color-ink)",
                    fontStyle: active ? "italic" : "normal",
                    fontWeight: active ? 300 : 400,
                  }}
                >
                  {NAV_LABELS[locale][key]}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6">
          <LocaleSwitch
            locale={locale}
            pathname={pathname}
            className="text-[14px]"
          />
        </div>

        <div className="mt-auto flex flex-col gap-5">
          <a
            href={PHONE_TEL}
            className="self-start border-b border-ink pb-1 text-[13px] tracking-[0.14em] text-ink uppercase"
          >
            Hotline · {PHONE_DISPLAY}
          </a>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-ember px-[30px] py-4 text-center font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
          >
            {ORDER_NOW[locale]}
          </a>
        </div>
      </div>
    </>
  );
}
