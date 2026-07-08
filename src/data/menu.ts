import { asset } from "@/lib/asset";
import type { Locale } from "@/lib/i18n";

export type MenuItem = {
  name: string;
  price: number;
  desc: string;
  tag?: string;
  /** Bản dịch tiếng Anh — slug/ảnh luôn theo tên tiếng Việt */
  en: { name: string; desc: string; tag?: string };
};

export type MenuGroup = {
  id: string;
  name: string;
  en: string;
  note: string;
  noteEn: string;
  items: MenuItem[];
};

export const BUNBUN_MENU: {
  updatedAt: string;
  groups: MenuGroup[];
} = {
  updatedAt: "Cập nhật 07/2026",
  groups: [
    {
      id: "burger",
      name: "Burger",
      en: "Burgers",
      note: "Đồng giá 43.000đ · +5.000đ trứng / phô mai",
      noteEn: "All at 43,000đ · +5,000đ for egg / cheese",
      items: [
        {
          name: "Burger Bò Xốt BBQ",
          price: 43000,
          tag: "Best seller",
          desc: "Bò Mỹ thượng hạng, xốt BBQ — best seller của quán.",
          en: {
            name: "BBQ Beef Burger",
            tag: "Best seller",
            desc: "Premium US beef, BBQ sauce — our best seller.",
          },
        },
        {
          name: "Burger Bò Xốt Cay",
          price: 43000,
          desc: "Bò Mỹ, phô mai cheddar, xốt cay.",
          en: {
            name: "Spicy Beef Burger",
            desc: "US beef, cheddar cheese, house spicy sauce.",
          },
        },
        {
          name: "Burger Tôm Xốt Mayo",
          price: 43000,
          desc: "Tôm chiên giòn, xốt mayo hoặc xốt cay đặc biệt.",
          en: {
            name: "Shrimp Mayo Burger",
            desc: "Crispy fried shrimp, mayo or special spicy sauce.",
          },
        },
        {
          name: "Burger Gà Rán Xốt Mayo",
          price: 43000,
          desc: "Gà rán giòn, xốt mayo hoặc xốt cay đặc biệt.",
          en: {
            name: "Fried Chicken Mayo Burger",
            desc: "Crispy fried chicken, mayo or special spicy sauce.",
          },
        },
        {
          name: "Burger Gà Nướng Mật Ong",
          price: 43000,
          desc: "Gà nướng mật ong, ngọt thơm.",
          en: {
            name: "Honey Grilled Chicken Burger",
            desc: "Honey-glazed grilled chicken, sweet and fragrant.",
          },
        },
        {
          name: "Burger Gà Nướng Teriyaki",
          price: 43000,
          desc: "Gà nướng xốt teriyaki kiểu Nhật.",
          en: {
            name: "Teriyaki Chicken Burger",
            desc: "Grilled chicken with Japanese-style teriyaki sauce.",
          },
        },
      ],
    },
    {
      id: "combo",
      name: "Combo",
      en: "Combos",
      note: "+5.000đ đổi nước sang Milo / trà sữa",
      noteEn: "+5,000đ to swap the drink for Milo / milk tea",
      items: [
        {
          name: "Combo Tiết Kiệm",
          price: 69000,
          desc: "1 burger bò xốt BBQ + khoai tây thủ công mini + Coca/Sprite.",
          en: {
            name: "Value Combo",
            desc: "1 BBQ beef burger + mini hand-cut fries + Coke/Sprite.",
          },
        },
        {
          name: "Combo No Nê",
          price: 89000,
          tag: "Đáng thử",
          desc: "1 burger bất kì + khoai tây xốt bò băm/gà cay + Coca/Sprite.",
          en: {
            name: "Hearty Combo",
            tag: "Worth a try",
            desc: "Any burger + fries with minced beef/spicy chicken + Coke/Sprite.",
          },
        },
        {
          name: "Combo 2 Người",
          price: 139000,
          desc: "2 burger bất kì + khoai tây thủ công + 2 Coca/Sprite.",
          en: {
            name: "Combo for Two",
            desc: "Any 2 burgers + hand-cut fries + 2 Coke/Sprite.",
          },
        },
      ],
    },
    {
      id: "mini-custard",
      name: "Mini Burger & Custard",
      en: "Mini & Custard",
      note: "Bữa nhẹ vừa tay",
      noteEn: "Light bites, just the right size",
      items: [
        {
          name: "Burger Mini Gà Nướng Mật Ong",
          price: 29000,
          desc: "Mini burger gà nướng mật ong.",
          en: {
            name: "Mini Honey Chicken Burger",
            desc: "Mini burger with honey grilled chicken.",
          },
        },
        {
          name: "Burger Mini Nhân Chảy",
          price: 29000,
          desc: "'Lava' mini burger — nhân phô mai chảy.",
          en: {
            name: "Mini Lava Burger",
            desc: "'Lava' mini burger with molten cheese filling.",
          },
        },
        {
          name: "Custard Trứng Phomai",
          price: 25000,
          desc: "Custard trứng & phô mai.",
          en: {
            name: "Egg & Cheese Custard",
            desc: "Silky egg custard with cheese.",
          },
        },
      ],
    },
    {
      id: "an-kem",
      name: "Món Ăn Kèm",
      en: "Side dishes",
      note: "+5.000đ xốt phô mai",
      noteEn: "+5,000đ for cheese sauce",
      items: [
        {
          name: "Khoai Tây Thủ Công Chiên",
          price: 25000,
          desc: "Khoai cắt tay, chiên giòn.",
          en: {
            name: "Hand-Cut Fries",
            desc: "Potatoes cut by hand, fried crisp.",
          },
        },
        {
          name: "Khoai Tây Thủ Công Bò Băm",
          price: 35000,
          desc: "Khoai tây thủ công phủ bò băm.",
          en: {
            name: "Fries with Minced Beef",
            desc: "Hand-cut fries topped with minced beef.",
          },
        },
        {
          name: "Khoai Tây Thủ Công Gà Cay",
          price: 35000,
          desc: "Khoai tây thủ công & gà cay.",
          en: {
            name: "Fries with Spicy Chicken",
            desc: "Hand-cut fries with spicy chicken.",
          },
        },
        {
          name: "Gà Viên",
          price: 35000,
          desc: "+5.000đ bột ớt Tứ Xuyên.",
          en: {
            name: "Chicken Bites",
            desc: "+5,000đ for Sichuan chili powder.",
          },
        },
        {
          name: "Tôm Viên",
          price: 45000,
          desc: "+5.000đ bột ớt Tứ Xuyên.",
          en: {
            name: "Shrimp Bites",
            desc: "+5,000đ for Sichuan chili powder.",
          },
        },
      ],
    },
    {
      id: "topping",
      name: "Topping Thêm",
      en: "Toppings",
      note: "Gọi thêm cho burger đầy đặn hơn",
      noteEn: "Add more to make your burger fuller",
      items: [
        {
          name: "Bò Nướng",
          price: 25000,
          desc: "Thêm một lớp bò nướng BBQ.",
          en: { name: "Grilled Beef", desc: "An extra layer of BBQ beef." },
        },
        {
          name: "Tôm Chiên",
          price: 25000,
          desc: "Thêm tôm chiên giòn.",
          en: { name: "Crispy Shrimp", desc: "Extra crispy fried shrimp." },
        },
        {
          name: "Gà Rán",
          price: 25000,
          desc: "Thêm miếng gà rán.",
          en: { name: "Fried Chicken", desc: "An extra fried chicken piece." },
        },
        {
          name: "Gà Nướng",
          price: 25000,
          desc: "Thêm gà nướng.",
          en: { name: "Grilled Chicken", desc: "Extra grilled chicken." },
        },
        {
          name: "Trứng",
          price: 5000,
          desc: "Trứng ốp la.",
          en: { name: "Egg", desc: "Fried egg." },
        },
        {
          name: "Phô Mai",
          price: 5000,
          desc: "Lát phô mai cheddar.",
          en: { name: "Cheese", desc: "A slice of cheddar." },
        },
      ],
    },
    {
      id: "salad",
      name: "Salad",
      en: "Salads",
      note: "Thanh mát, cân vị",
      noteEn: "Fresh and balancing",
      items: [
        {
          name: "Salad Bắp Cải Xốt Mè Rang",
          price: 25000,
          desc: "Bắp cải giòn, xốt mè rang.",
          en: {
            name: "Cabbage Salad · Roasted Sesame",
            desc: "Crunchy cabbage, roasted sesame dressing.",
          },
        },
        {
          name: "Salad Bắp Cải Xốt Mù Tạt",
          price: 25000,
          desc: "Bắp cải giòn, xốt mù tạt.",
          en: {
            name: "Cabbage Salad · Mustard",
            desc: "Crunchy cabbage, mustard dressing.",
          },
        },
      ],
    },
    {
      id: "trang-mieng",
      name: "Tráng Miệng",
      en: "Desserts",
      note: "Ngọt nhẹ kết bữa",
      noteEn: "A light sweet finish",
      items: [
        {
          name: "Tart Trứng (2 cái)",
          price: 25000,
          desc: "Tart trứng nướng, vỏ giòn.",
          en: {
            name: "Egg Tarts (2 pcs)",
            desc: "Baked egg tarts with a crisp shell.",
          },
        },
        {
          name: "Bánh Hạt Dẻ (3 cái)",
          price: 25000,
          desc: "Custard hạt dẻ mềm thơm.",
          en: {
            name: "Chestnut Cakes (3 pcs)",
            desc: "Soft, fragrant chestnut custard cakes.",
          },
        },
      ],
    },
    {
      id: "thuc-uong",
      name: "Thức Uống & Trà",
      en: "Drinks & Tea",
      note: "Mát lạnh, cân vị béo",
      noteEn: "Ice-cold, cuts the richness",
      items: [
        {
          name: "Coca",
          price: 19000,
          desc: "Ly đá mát lạnh.",
          en: { name: "Coke", desc: "Served over ice." },
        },
        {
          name: "Sprite",
          price: 19000,
          desc: "Ly đá mát lạnh.",
          en: { name: "Sprite", desc: "Served over ice." },
        },
        {
          name: "Nước Chanh",
          price: 19000,
          desc: "Chanh tươi vắt.",
          en: { name: "Fresh Lemonade", desc: "Freshly squeezed lime." },
        },
        {
          name: "Milo",
          price: 25000,
          desc: "Milo đá.",
          en: { name: "Iced Milo", desc: "Milo over ice." },
        },
        {
          name: "Trà Sữa Nhài",
          price: 29000,
          desc: "Trà nhài, sữa béo nhẹ.",
          en: {
            name: "Jasmine Milk Tea",
            desc: "Jasmine tea with light creamy milk.",
          },
        },
        {
          name: "Trà Chanh",
          price: 29000,
          desc: "Trà đen, chanh tươi.",
          en: { name: "Lemon Tea", desc: "Black tea with fresh lime." },
        },
        {
          name: "Trà Đào",
          price: 29000,
          desc: "Trà đào miếng.",
          en: { name: "Peach Tea", desc: "Tea with peach slices." },
        },
        {
          name: "Trà Dâu",
          price: 29000,
          desc: "Trà dâu tươi.",
          en: { name: "Strawberry Tea", desc: "Tea with fresh strawberries." },
        },
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

/* ---------- Localized views (slug/ảnh luôn theo tên tiếng Việt) ---------- */

export type LocalizedItem = {
  slug: string;
  name: string;
  desc: string;
  tag?: string;
  price: number;
  imgSrc?: string;
};

export type LocalizedGroup = {
  id: string;
  name: string;
  note: string;
  items: LocalizedItem[];
};

function localizeItem(it: MenuItem, locale: Locale): LocalizedItem {
  const slug = slugify(it.name);
  const src = locale === "en" ? it.en : it;
  return {
    slug,
    name: src.name,
    desc: src.desc,
    tag: src.tag,
    price: it.price,
    imgSrc: menuImageFor(slug),
  };
}

export function localizeMenu(locale: Locale): LocalizedGroup[] {
  return BUNBUN_MENU.groups.map((g) => ({
    id: g.id,
    name: locale === "en" ? g.en : g.name,
    note: locale === "en" ? g.noteEn : g.note,
    items: g.items.map((it) => localizeItem(it, locale)),
  }));
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

export function getSignatureItems(count = 4, locale: Locale = "vi"): LocalizedItem[] {
  const all: MenuItem[] = BUNBUN_MENU.groups.flatMap((g) => g.items);
  const picked: MenuItem[] = [];
  const has = (it: MenuItem) => picked.includes(it);

  all.forEach((it) => {
    if (it.tag === "Signature" || it.tag === "Best seller") picked.push(it);
  });
  all.forEach((it) => {
    if (SIGNATURE_SLUGS.includes(slugify(it.name)) && !has(it)) picked.push(it);
  });
  if (picked.length < count) {
    all.forEach((it) => {
      if (!has(it)) picked.push(it);
    });
  }

  return picked.slice(0, count).map((it) => localizeItem(it, locale));
}
