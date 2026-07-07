import { asset } from "@/lib/asset";

export type MenuItem = {
  name: string;
  price: number;
  desc: string;
  tag?: string;
};

export type MenuGroup = {
  id: string;
  name: string;
  en: string;
  note: string;
  items: MenuItem[];
};

export const BUNBUN_MENU: {
  updatedAt: string;
  seasonalNote: string;
  groups: MenuGroup[];
} = {
  updatedAt: "Cập nhật 07/2026",
  seasonalNote:
    "Ngoài thực đơn cố định, Bunbun còn có các món theo mùa — xuất hiện một quãng ngắn rồi thôi. Theo dõi Facebook để không bỏ lỡ.",
  groups: [
    {
      id: "burger",
      name: "Burger",
      en: "Burgers",
      note: "Đồng giá 43.000đ · +5.000đ trứng / phô mai",
      items: [
        {
          name: "Burger Bò Xốt BBQ",
          price: 43000,
          tag: "Best seller",
          desc: "Bò Mỹ thượng hạng, xốt BBQ — best seller của quán.",
        },
        {
          name: "Burger Bò Xốt Cay",
          price: 43000,
          desc: "Bò Mỹ, phô mai cheddar, xốt cay.",
        },
        {
          name: "Burger Tôm Xốt Mayo",
          price: 43000,
          desc: "Tôm chiên giòn, xốt mayo hoặc xốt cay đặc biệt.",
        },
        {
          name: "Burger Gà Rán Xốt Mayo",
          price: 43000,
          desc: "Gà rán giòn, xốt mayo hoặc xốt cay đặc biệt.",
        },
        {
          name: "Burger Gà Nướng Mật Ong",
          price: 43000,
          desc: "Gà nướng mật ong, ngọt thơm.",
        },
        {
          name: "Burger Gà Nướng Teriyaki",
          price: 43000,
          desc: "Gà nướng xốt teriyaki kiểu Nhật.",
        },
      ],
    },
    {
      id: "combo",
      name: "Combo",
      en: "Combos",
      note: "+5.000đ đổi nước sang Milo / trà sữa",
      items: [
        {
          name: "Combo Tiết Kiệm",
          price: 69000,
          desc: "1 burger bò xốt BBQ + khoai tây thủ công mini + Coca/Sprite.",
        },
        {
          name: "Combo No Nê",
          price: 89000,
          tag: "Đáng thử",
          desc: "1 burger bất kì + khoai tây xốt bò băm/gà cay + Coca/Sprite.",
        },
        {
          name: "Combo 2 Người",
          price: 139000,
          desc: "2 burger bất kì + khoai tây thủ công + 2 Coca/Sprite.",
        },
      ],
    },
    {
      id: "mini-custard",
      name: "Mini Burger & Custard",
      en: "Mini & Custard",
      note: "Bữa nhẹ vừa tay",
      items: [
        {
          name: "Burger Mini Gà Nướng Mật Ong",
          price: 29000,
          desc: "Mini burger gà nướng mật ong.",
        },
        {
          name: "Burger Mini Nhân Chảy",
          price: 29000,
          desc: "'Lava' mini burger — nhân phô mai chảy.",
        },
        {
          name: "Custard Trứng Phomai",
          price: 25000,
          desc: "Custard trứng & phô mai.",
        },
      ],
    },
    {
      id: "an-kem",
      name: "Món Ăn Kèm",
      en: "Side dishes",
      note: "+5.000đ xốt phô mai",
      items: [
        {
          name: "Khoai Tây Thủ Công Chiên",
          price: 25000,
          desc: "Khoai cắt tay, chiên giòn.",
        },
        {
          name: "Khoai Tây Thủ Công Bò Băm",
          price: 35000,
          desc: "Khoai tây thủ công phủ bò băm.",
        },
        {
          name: "Khoai Tây Thủ Công Gà Cay",
          price: 35000,
          desc: "Khoai tây thủ công & gà cay.",
        },
        { name: "Gà Viên", price: 35000, desc: "+5.000đ bột ớt Tứ Xuyên." },
        { name: "Tôm Viên", price: 45000, desc: "+5.000đ bột ớt Tứ Xuyên." },
      ],
    },
    {
      id: "topping",
      name: "Topping Thêm",
      en: "Toppings",
      note: "Gọi thêm cho burger đầy đặn hơn",
      items: [
        { name: "Bò Nướng", price: 25000, desc: "Thêm một lớp bò nướng BBQ." },
        { name: "Tôm Chiên", price: 25000, desc: "Thêm tôm chiên giòn." },
        { name: "Gà Rán", price: 25000, desc: "Thêm miếng gà rán." },
        { name: "Gà Nướng", price: 25000, desc: "Thêm gà nướng." },
        { name: "Trứng", price: 5000, desc: "Trứng ốp la." },
        { name: "Phô Mai", price: 5000, desc: "Lát phô mai cheddar." },
      ],
    },
    {
      id: "salad",
      name: "Salad",
      en: "Salads",
      note: "Thanh mát, cân vị",
      items: [
        {
          name: "Salad Bắp Cải Xốt Mè Rang",
          price: 25000,
          desc: "Bắp cải giòn, xốt mè rang.",
        },
        {
          name: "Salad Bắp Cải Xốt Mù Tạt",
          price: 25000,
          desc: "Bắp cải giòn, xốt mù tạt.",
        },
      ],
    },
    {
      id: "trang-mieng",
      name: "Tráng Miệng",
      en: "Desserts",
      note: "Ngọt nhẹ kết bữa",
      items: [
        {
          name: "Tart Trứng (2 cái)",
          price: 25000,
          desc: "Tart trứng nướng, vỏ giòn.",
        },
        {
          name: "Bánh Hạt Dẻ (3 cái)",
          price: 25000,
          desc: "Custard hạt dẻ mềm thơm.",
        },
      ],
    },
    {
      id: "thuc-uong",
      name: "Thức Uống & Trà",
      en: "Drinks & Tea",
      note: "Mát lạnh, cân vị béo",
      items: [
        { name: "Coca", price: 19000, desc: "Ly đá mát lạnh." },
        { name: "Sprite", price: 19000, desc: "Ly đá mát lạnh." },
        { name: "Nước Chanh", price: 19000, desc: "Chanh tươi vắt." },
        { name: "Milo", price: 25000, desc: "Milo đá." },
        { name: "Trà Sữa Nhài", price: 29000, desc: "Trà nhài, sữa béo nhẹ." },
        { name: "Trà Chanh", price: 29000, desc: "Trà đen, chanh tươi." },
        { name: "Trà Đào", price: 29000, desc: "Trà đào miếng." },
        { name: "Trà Dâu", price: 29000, desc: "Trà dâu tươi." },
      ],
    },
  ],
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatPrice(n: number): string {
  return (n || 0).toLocaleString("vi-VN") + "đ";
}

const MENU_IMAGE_SLUGS = new Set([
  "burger-bo-xot-bbq",
  "burger-bo-xot-cay",
  "burger-tom-xot-mayo",
  "burger-ga-ran-xot-mayo",
  "burger-ga-nuong-mat-ong",
  "burger-ga-nuong-teriyaki",
  "combo-tiet-kiem",
  "combo-no-ne",
  "combo-2-nguoi",
  "burger-mini-ga-nuong-mat-ong",
  "burger-mini-nhan-chay",
  "custard-trung-phomai",
  "khoai-tay-thu-cong-chien",
  "khoai-tay-thu-cong-bo-bam",
  "khoai-tay-thu-cong-ga-cay",
  "ga-vien",
  "tom-vien",
  "bo-nuong",
  "tom-chien",
  "ga-ran",
  "ga-nuong",
  "salad-bap-cai-xot-me-rang",
  "salad-bap-cai-xot-mu-tat",
  "tart-trung-2-cai",
  "banh-hat-de-3-cai",
]);

export function menuImageFor(slug: string): string | undefined {
  return MENU_IMAGE_SLUGS.has(slug) ? asset(`/menu/${slug}.png`) : undefined;
}

const SIGNATURE_SLUGS = [
  "burger-bo-xot-bbq",
  "burger-ga-ran-xot-mayo",
  "burger-tom-xot-mayo",
  "burger-ga-nuong-teriyaki",
  "burger-mini-nhan-chay",
  "burger-mini-ga-nuong-mat-ong",
  "khoai-tay-thu-cong-chien",
  "khoai-tay-thu-cong-ga-cay",
  "ga-vien",
  "tom-vien",
  "custard-trung-phomai",
  "tart-trung-2-cai",
  "banh-hat-de-3-cai",
  "salad-bap-cai-xot-me-rang",
  "salad-bap-cai-xot-mu-tat",
];

export type SignatureItem = MenuItem & { slug: string; imgSrc?: string };

export function getSignatureItems(count = 4): SignatureItem[] {
  const all: MenuItem[] = BUNBUN_MENU.groups.flatMap((g) => g.items);
  const withSlug = (it: MenuItem) => ({ ...it, slug: slugify(it.name) });

  const sig = all
    .filter((it) => it.tag === "Signature" || it.tag === "Best seller")
    .map(withSlug);

  const isReal = (it: MenuItem) =>
    SIGNATURE_SLUGS.includes(slugify(it.name));
  const alreadyIn = (slug: string) => sig.some((it) => it.slug === slug);

  all.forEach((it) => {
    const slug = slugify(it.name);
    if (isReal(it) && !alreadyIn(slug)) sig.push({ ...it, slug });
  });

  if (sig.length < count) {
    all.forEach((it) => {
      const slug = slugify(it.name);
      if (!alreadyIn(slug)) sig.push({ ...it, slug });
    });
  }

  return sig.slice(0, count).map((it) => ({
    ...it,
    imgSrc: menuImageFor(it.slug),
  }));
}
