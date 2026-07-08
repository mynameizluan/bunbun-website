import type { Locale } from "@/lib/i18n";
import content from "@/data/site-content.json";

const ITEMS: Record<Locale, { text: string; emphasis?: boolean }[]> =
  content.copy.marquee;

function Track({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-16 pr-16">
      {ITEMS[locale].map((item, i) => (
        <span key={i} className="flex items-center gap-16">
          <span
            className={
              item.emphasis
                ? "font-display text-lg italic font-light uppercase tracking-[0.22em] text-ember"
                : "font-display text-lg font-normal uppercase tracking-[0.22em] text-ink"
            }
          >
            {item.text}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
        </span>
      ))}
    </div>
  );
}

export function Marquee({ locale = "vi" }: { locale?: Locale }) {
  return (
    <section
      aria-hidden="true"
      className="mt-[72px] md:mt-[120px] overflow-hidden border-y py-6"
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="flex w-max animate-[bbmarquee_30s_linear_infinite] motion-reduce:animate-none">
        <Track locale={locale} />
        <Track locale={locale} />
      </div>
    </section>
  );
}
