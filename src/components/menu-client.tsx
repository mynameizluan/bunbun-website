"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { localizeMenu, formatPrice } from "@/data/menu";
import { ORDER_URL, FACEBOOK_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

import content from "@/data/site-content.json";

const COPY = content.copy.menuPage;

export function MenuClient({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const [filter, setFilter] = useState<string>("all");

  const menu = useMemo(() => localizeMenu(locale), [locale]);
  const chips = useMemo(
    () => [
      { id: "all", name: t.all },
      ...menu.map((g) => ({ id: g.id, name: g.name })),
    ],
    [menu, t.all]
  );
  const groups = useMemo(
    () => menu.filter((g) => filter === "all" || g.id === filter),
    [menu, filter]
  );

  return (
    <main className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px] pb-[120px]">
      <Reveal className="mb-16">
        <div className="mb-8 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] tracking-[0.32em] uppercase">
            {t.eyebrow}
          </span>
        </div>
        <h1 className="font-display text-[clamp(44px,6.5vw,92px)] leading-[1.02] font-normal tracking-[-0.03em]">
          {t.h1Head}
          <span className="font-light text-ember italic">{t.h1Italic}</span>
        </h1>
      </Reveal>

      <div className="sticky top-[64px] z-50 mb-10 -mx-5 flex gap-x-[22px] overflow-x-auto border-b bg-paper px-5 py-4 [border-color:rgba(25,20,16,0.15)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:top-[74px] md:mx-0 md:flex-wrap md:gap-x-[26px] md:gap-y-2 md:overflow-visible md:px-0">
        {chips.map((chip) => {
          const active = chip.id === filter;
          return (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              className="shrink-0 border-b bg-transparent py-1.5 font-body text-[13px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-[250ms]"
              style={{
                borderColor: active ? "var(--color-ember)" : "transparent",
                color: active ? "var(--color-ember)" : "var(--color-ink)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {chip.name}
            </button>
          );
        })}
      </div>

      {groups.map((group) => (
        <Reveal key={group.id} className="mb-18">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[1fr_2fr] md:gap-12">
            <div className="md:sticky md:top-[150px]">
              <h2 className="mb-2.5 font-display text-[clamp(24px,2.8vw,36px)] font-normal tracking-[-0.02em]">
                {group.name}
              </h2>
              <div className="max-w-[26ch] text-[13px] leading-[1.6] text-stone">
                {group.note}
              </div>
            </div>
            <div className="flex flex-col">
              {group.items.map((item) => (
                <div
                  key={item.slug}
                  className="grid grid-cols-[64px_1fr_auto] items-center gap-3.5 border-b px-0.5 py-5 sm:grid-cols-[88px_1fr_auto] sm:gap-[22px] [border-color:rgba(25,20,16,0.12)]"
                >
                  <div className="relative h-[64px] w-[64px] overflow-hidden rounded bg-placeholder sm:h-[88px] sm:w-[88px]">
                    {item.imgSrc ? (
                      <Image
                        src={item.imgSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="88px"
                      />
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-[17px] font-medium tracking-[-0.01em]">
                        {item.name}
                      </span>
                      {item.tag ? (
                        <span className="rounded-full border border-ember/40 px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-ember uppercase">
                          {item.tag}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-[13.5px] leading-[1.6] text-stone">
                      {item.desc}
                    </div>
                  </div>
                  <div className="font-display text-base font-medium whitespace-nowrap">
                    {formatPrice(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t pt-12 [border-color:rgba(25,20,16,0.15)]">
        <p className="font-display text-[clamp(22px,2.6vw,32px)] font-normal tracking-[-0.02em]">
          {t.ready}
        </p>
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-ember px-[30px] py-4 font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
        >
          {t.orderNow}
        </a>
      </Reveal>
      <p className="mt-7 max-w-[64ch] text-[13px] leading-[1.7] text-stone">
        {t.seasonalPre}
        <span className="text-ember italic">{t.seasonalItalic}</span>
        {t.seasonalMid}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener"
          className="border-b border-current"
        >
          Facebook
        </a>
        {t.seasonalPost}
      </p>
    </main>
  );
}
