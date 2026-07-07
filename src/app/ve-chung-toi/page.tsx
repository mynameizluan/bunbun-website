import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { KeptVideo } from "@/components/motion/kept-video";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Bunbun Burger bắt đầu từ một quầy bếp mở nhỏ ở 39A Bến Nghé, Huế — burger thủ công, khoai tây cắt tay, xốt tự làm theo khẩu vị người Việt.",
  openGraph: {
    title: "Về chúng tôi · Bunbun Burger",
    description:
      "Sinh ra ở Huế, lớn lên từ quầy bếp mở — câu chuyện của Bunbun Burger.",
    images: ["/about-spread-v2.png"],
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pt-[128px] md:pt-[172px] pb-[90px]">
        <Reveal className="mb-7 flex items-center gap-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] tracking-[0.32em] uppercase">
            Về chúng tôi
          </span>
        </Reveal>
        <Reveal>
          <h1 className="mb-12 max-w-[18ch] font-display text-[clamp(44px,6.5vw,92px)] leading-[1.04] font-normal tracking-[-0.03em]">
            Sinh ra ở Huế,
            <br />
            lớn lên <span className="font-light text-ember italic">từ quầy bếp mở.</span>
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="pt-2 text-[11px] tracking-[0.32em] text-stone uppercase">
            01 — Khởi đầu
          </Reveal>
          <Reveal className="max-w-[56ch] text-[17px] leading-[1.9] text-body">
            Bunbun bắt đầu bằng một quầy bếp mở ở 39A Bến Nghé — không có gì
            để giấu, và cũng chẳng có gì cần giấu. Bạn gọi món, rồi nhìn
            chiếc burger của mình thành hình từ đầu đến cuối: bánh in dấu
            Bunbun nướng ấm, khoai cắt tay vừa thả vào chảo, lớp xốt cuối
            rưới xuống ngay trước khi gói lại. Bên cạnh là một quầy trà nhỏ
            — trà sữa nhài, trà đào, trà dâu — để buổi chiều Huế trôi chậm
            thêm một chút.
          </Reveal>
        </div>
      </section>

      {/* Video stop-motion: đứng giữa, không khung. Mask + multiply phải nằm CÙNG một lớp —
          nếu mask đặt ở div tổ tiên riêng sẽ tạo stacking context cô lập blend (nền trắng chói). */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-24">
        <Reveal
          className="relative mx-auto"
          style={{
            width: "min(76vw, 380px)",
            aspectRatio: "9 / 16",
            maxHeight: "82vh",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              mixBlendMode: "multiply",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 18%, #000 86%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 18%, #000 86%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              maskComposite: "intersect",
            }}
          >
            <KeptVideo
              src={asset("/bunbun-stopmotion.mp4")}
              poster={asset("/stopmotion-poster.png")}
              ariaLabel="Bunbun Burger — clip stop-motion Made in Huế"
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
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[20%]"
            style={{
              background:
                "linear-gradient(to bottom, #FBF7F2 85%, rgba(251,247,242,0))",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[14%]"
            style={{
              background:
                "linear-gradient(to top, #FBF7F2 82%, rgba(251,247,242,0))",
            }}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 md:px-10 pb-[90px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal className="border-t pt-2 text-[11px] tracking-[0.32em] text-stone uppercase [border-color:rgba(25,20,16,0.15)]">
            02 — Made in Huế
          </Reveal>
          <div className="grid grid-cols-1 items-center gap-11 md:grid-cols-[1.5fr_1fr]">
            <div>
              <Reveal className="mb-8 max-w-[32ch] font-display text-[clamp(22px,3vw,36px)] leading-[1.4] font-normal tracking-[-0.015em]">
                &ldquo;Made in Huế&rdquo; không chỉ là nơi chốn. Đó là cách
                làm việc:{" "}
                <span className="text-ember italic">tử tế, chỉn chu,</span>{" "}
                và tự hào về mảnh đất mình lớn lên.
              </Reveal>
              <Reveal className="max-w-[56ch] text-base leading-[1.9] text-body">
                Thực đơn cố định chỉ giữ 35 món — đủ ít để món nào cũng được
                chăm kỹ, đủ nhiều để lần sau quay lại bạn vẫn còn thứ để
                thử. Phần còn lại dành cho những món theo mùa, xuất hiện một
                quãng ngắn rồi thôi. Mỗi chiếc burger mang một chút tính
                cách Huế: đậm đà mà tinh tế, giản dị mà không giản đơn.
              </Reveal>
            </div>
            <Reveal className="relative aspect-[2/3] overflow-hidden rounded bg-placeholder">
              <Image
                src={asset("/about-spread-v2.png")}
                alt="Bunbun Burger — ảnh mâm sản phẩm"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
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
              Burger đồng giá
            </div>
          </Reveal>
          <Reveal>
            <div className="font-display text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em]">
              35
            </div>
            <div className="mt-2 text-xs tracking-[0.18em] text-stone uppercase">
              Món cố định + món theo mùa
            </div>
          </Reveal>
          <Reveal>
            <div className="font-display text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] text-ember">
              Huế
            </div>
            <div className="mt-2 text-xs tracking-[0.18em] text-stone uppercase">
              Nơi mọi thứ bắt đầu
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
