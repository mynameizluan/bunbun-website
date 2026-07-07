const ITEMS: { text: string; emphasis?: boolean }[] = [
  { text: "Burger đồng giá 43K" },
  { text: "Made in Huế", emphasis: true },
  { text: "Khoai tây thủ công" },
  { text: "Món theo mùa", emphasis: true },
];

function Track() {
  return (
    <div className="flex items-center gap-16 pr-16">
      {ITEMS.map((item, i) => (
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

export function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="mt-[72px] md:mt-[120px] overflow-hidden border-y py-6"
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="flex w-max animate-[bbmarquee_30s_linear_infinite] motion-reduce:animate-none">
        <Track />
        <Track />
      </div>
    </section>
  );
}
