"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import {
  BUNBUN_MENU,
  formatPrice,
  menuImageFor,
  slugify,
} from "@/data/menu";
import { ORDER_URL, FACEBOOK_URL } from "@/lib/constants";

export function MenuClient() {
  const [filter, setFilter] = useState<string>("all");

  const chips = useMemo(
    () => [
      { id: "all", name: "Tất cả" },
      ...BUNBUN_MENU.groups.map((g) => ({ id: g.id, name: g.name })),
    ],
    []
  );

  const groups = useMemo(
    () => BUNBUN_MENU.groups.filter((g) => filter === "all" || g.id === filter),
    [filter]
  );

  return (
    <main className="mx-auto max-w-[1360px] px-10 pt-[172px] pb-[120px]">
      <Reveal className="mb-16">
        <div className="mb-8 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] tracking-[0.32em] uppercase">
            Thực đơn · Burger đồng giá 43K
          </span>
        </div>
        <h1 className="font-display text-[clamp(44px,6.5vw,92px)] leading-[1.02] font-normal tracking-[-0.03em]">
          Thực đơn <span className="font-light text-ember italic">Bunbun.</span>
        </h1>
      </Reveal>

      <div
        className="sticky top-[74px] z-50 mb-10 flex flex-wrap gap-x-[26px] gap-y-2 border-b bg-paper py-4 [border-color:rgba(25,20,16,0.15)]"
      >
        {chips.map((chip) => {
          const active = chip.id === filter;
          return (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              className="border-b bg-transparent py-1.5 font-body text-[13px] tracking-[0.12em] uppercase transition-colors duration-[250ms]"
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
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_2fr]">
            <div className="md:sticky md:top-[150px]">
              <h2 className="mb-2.5 font-display text-[clamp(24px,2.8vw,36px)] font-normal tracking-[-0.02em]">
                {group.name}
              </h2>
              <div className="max-w-[26ch] text-[13px] leading-[1.6] text-stone">
                {group.note}
              </div>
            </div>
            <div className="flex flex-col">
              {group.items.map((item) => {
                const slug = slugify(item.name);
                const imgSrc = menuImageFor(slug);
                return (
                  <div
                    key={item.name}
                    className="grid grid-cols-[88px_1fr_auto] items-center gap-[22px] border-b px-0.5 py-5 [border-color:rgba(25,20,16,0.12)]"
                  >
                    <div className="relative h-[88px] w-[88px] overflow-hidden rounded bg-placeholder">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
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
                );
              })}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t pt-12 [border-color:rgba(25,20,16,0.15)]">
        <p className="font-display text-[clamp(22px,2.6vw,32px)] font-normal tracking-[-0.02em]">
          Sẵn sàng gọi món?
        </p>
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-ember px-[30px] py-4 font-display text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-[250ms] hover:bg-ember-deep"
        >
          Đặt hàng ngay
        </a>
      </Reveal>
      <p className="mt-7 max-w-[64ch] text-[13px] leading-[1.7] text-stone">
        ✳ Ngoài thực đơn cố định, Bunbun còn có{" "}
        <span className="text-ember italic">món theo mùa</span> — xuất hiện
        một quãng ngắn rồi thôi. Theo dõi{" "}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener"
          className="border-b border-current"
        >
          Facebook
        </a>{" "}
        để không bỏ lỡ.
      </p>
    </main>
  );
}
