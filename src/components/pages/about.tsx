import { Reveal } from "@/components/motion/reveal";
import { KeptVideo } from "@/components/motion/kept-video";
import { asset } from "@/lib/asset";
import type { Locale } from "@/lib/i18n";

const COPY = {
  vi: {
    eyebrow: "Về chúng tôi",
    h1Head: "Sinh ra ở Huế,",
    h1Mid: "lớn lên ",
    h1Italic: "từ quầy bếp mở.",
    beginLabel: "01 — Khởi đầu",
    beginBody:
      "Bunbun bắt đầu bằng một quầy bếp mở ở 39A Bến Nghé — không có gì để giấu, và cũng chẳng có gì cần giấu. Bạn gọi món, rồi nhìn chiếc burger của mình thành hình từ đầu đến cuối: bánh in dấu Bunbun nướng ấm, khoai cắt tay vừa thả vào chảo, lớp xốt cuối rưới xuống ngay trước khi gói lại. Bên cạnh là một quầy trà nhỏ — trà sữa nhài, trà đào, trà dâu — để buổi chiều Huế trôi chậm thêm một chút.",
    hueLabel: "02 — Made in Huế",
    quotePre: "“Made in Huế” không chỉ là nơi chốn. Đó là cách làm việc: ",
    quoteItalic: "tử tế, chỉn chu,",
    quotePost: " và tự hào về mảnh đất mình lớn lên.",
    hueBody:
      "Thực đơn cố định chỉ giữ 35 món — đủ ít để món nào cũng được chăm kỹ, đủ nhiều để lần sau quay lại bạn vẫn còn thứ để thử. Phần còn lại dành cho những món theo mùa, xuất hiện một quãng ngắn rồi thôi. Mỗi chiếc burger mang một chút tính cách Huế: đậm đà mà tinh tế, giản dị mà không giản đơn.",
    videoAria: "Bunbun Burger — clip stop-motion Made in Huế",
    stat1: "Burger đồng giá",
    stat2: "Món cố định + món theo mùa",
    stat3: "Nơi mọi thứ bắt đầu",
  },
  en: {
    eyebrow: "About us",
    h1Head: "Born in Huế,",
    h1Mid: "raised ",
    h1Italic: "behind an open counter.",
    beginLabel: "01 — The beginning",
    beginBody:
      "Bunbun began with an open kitchen counter at 39A Bến Nghé — nothing to hide, and nothing that needs hiding. You order, then watch your burger come together from start to finish: the Bunbun-stamped bun warmed up, hand-cut fries dropped into the fryer, the last spoon of sauce added right before it’s wrapped. Next to it, a small tea bar — jasmine milk tea, peach tea, strawberry tea — to slow a Huế afternoon down a little more.",
    hueLabel: "02 — Made in Huế",
    quotePre: "“Made in Huế” isn’t just a place. It’s a way of working: ",
    quoteItalic: "kind, meticulous,",
    quotePost: " and proud of where we grew up.",
    hueBody:
      "The fixed menu keeps just 35 dishes — few enough that every one gets real attention, plenty enough that there’s still something new next visit. The rest is left to seasonal specials that appear for a short while, then go. Every burger carries a little of Huế’s character: rich yet refined, simple but never plain.",
    videoAria: "Bunbun Burger — Made in Huế stop-motion clip",
    stat1: "One price for burgers",
    stat2: "Fixed dishes + seasonal specials",
    stat3: "Where it all began",
  },
} as const;

export function AboutPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <main>
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px] pb-[90px]">
        <Reveal className="mb-7 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] tracking-[0.32em] uppercase">
            {t.eyebrow}
          </span>
        </Reveal>
        <Reveal>
          <h1 className="mb-12 max-w-[18ch] font-display text-[clamp(44px,6.5vw,92px)] leading-[1.04] font-normal tracking-[-0.03em]">
            {t.h1Head}
            <br />
            {t.h1Mid}
            <span className="font-light text-ember italic">{t.h1Italic}</span>
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="pt-2 text-[11px] tracking-[0.32em] text-stone uppercase">
            {t.beginLabel}
          </Reveal>
          <Reveal className="max-w-[56ch] text-[17px] leading-[1.9] text-body">
            {t.beginBody}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[90px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="border-t pt-2 text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
            {t.hueLabel}
          </Reveal>
          <div className="grid grid-cols-1 items-center gap-11 md:grid-cols-[1.5fr_1fr]">
            <div>
              <Reveal className="mb-8 max-w-[32ch] font-display text-[clamp(22px,3vw,36px)] leading-[1.4] font-normal tracking-[-0.015em]">
                {t.quotePre}
                <span className="text-ember italic">{t.quoteItalic}</span>
                {t.quotePost}
              </Reveal>
              <Reveal className="max-w-[56ch] text-base leading-[1.9] text-body">
                {t.hueBody}
              </Reveal>
            </div>
            {/* Video stop-motion: multiply + mask ellipse cùng một lớp cho nền tan vào
                màu giấy; negative margin cho khối tràn nhẹ ra ngoài cột. */}
            <Reveal
              className="relative mx-auto -my-6 w-[min(96vw,420px)] md:-mx-8 md:-my-10 md:w-auto"
              style={{ aspectRatio: "9 / 14" }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  mixBlendMode: "multiply",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 74% 62% at 50% 50%, #000 48%, rgba(0,0,0,0) 96%)",
                  maskImage:
                    "radial-gradient(ellipse 74% 62% at 50% 50%, #000 48%, rgba(0,0,0,0) 96%)",
                }}
              >
                <KeptVideo
                  src={asset("/bunbun-stopmotion.mp4")}
                  poster={asset("/stopmotion-poster.png")}
                  ariaLabel={t.videoAria}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "calc(100% * 16 / 9)",
                    height: "calc(100% * 9 / 16)",
                    transform: "translate(-50%, -50%) rotate(90deg)",
                    objectFit: "cover",
                    display: "block",
                    filter: "brightness(1.08)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[150px]">
        <div className="grid grid-cols-1 gap-6 border-t pt-11 [border-color:rgba(25,20,16,0.15)] md:grid-cols-3">
          <Reveal>
            <div className="font-display text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em]">
              43K
            </div>
            <div className="mt-2 text-xs tracking-[0.18em] text-stone uppercase">
              {t.stat1}
            </div>
          </Reveal>
          <Reveal>
            <div className="font-display text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em]">
              35
            </div>
            <div className="mt-2 text-xs tracking-[0.18em] text-stone uppercase">
              {t.stat2}
            </div>
          </Reveal>
          <Reveal>
            <div className="font-display text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] text-ember">
              Huế
            </div>
            <div className="mt-2 text-xs tracking-[0.18em] text-stone uppercase">
              {t.stat3}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
