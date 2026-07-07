"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, ORDER_URL } from "@/lib/constants";
import { asset } from "@/lib/asset";

export function SiteNav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] backdrop-blur-md transition-colors duration-300"
      style={{
        background: solid ? "rgba(251,247,242,0.88)" : "rgba(251,247,242,0)",
        borderBottom: solid
          ? "1px solid rgba(25,20,16,0.08)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-[1360px] items-center gap-5 px-10 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={asset("/logo.png")}
            alt="Bunbun Burger — logo mèo burger"
            width={34}
            height={34}
            className="block rounded-[9px]"
          />
          <span className="font-display text-base font-semibold tracking-[0.02em]">
            Bunbun Burger
          </span>
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-[34px]">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.1em] uppercase transition-colors duration-[250ms]"
                style={{
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-ember)" : "var(--color-ink)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-ink px-6 py-3 font-display text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-[250ms] hover:bg-ink hover:text-paper"
          >
            Đặt hàng
          </a>
        </div>
      </nav>
    </header>
  );
}
