import { asset } from "@/lib/asset";
import type { Locale } from "@/lib/i18n";
import content from "@/data/site-content.json";

export type MenuItem = {
  name: string;
  price: number;
  desc: string;
  tag?: string;
  /** Đường dẫn ảnh trong public/ (dashboard upload sẽ điền vào đây) */
  img?: string;
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

// JSON literal types quá hẹp/lệch (tag/img optional không đồng nhất) → ép về shape chuẩn
export const MENU_GROUPS = content.menu.groups as unknown as MenuGroup[];

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

/* ---------- Localized views (slug luôn theo tên tiếng Việt) ---------- */

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
  const src = locale === "en" ? it.en : it;
  return {
    slug: slugify(it.name),
    name: src.name,
    desc: src.desc,
    tag: src.tag,
    price: it.price,
    imgSrc: it.img ? asset(it.img) : undefined,
  };
}

export function localizeMenu(locale: Locale): LocalizedGroup[] {
  return MENU_GROUPS.map((g) => ({
    id: g.id,
    name: locale === "en" ? g.en : g.name,
    note: locale === "en" ? g.noteEn : g.note,
    items: g.items.map((it) => localizeItem(it, locale)),
  }));
}

export function getSignatureItems(
  count = 4,
  locale: Locale = "vi"
): LocalizedItem[] {
  const all: MenuItem[] = MENU_GROUPS.flatMap((g) => g.items);
  const bySlug = new Map(all.map((it) => [slugify(it.name), it]));
  const picked: MenuItem[] = [];

  (content.signatureSlugs as string[]).forEach((slug) => {
    const it = bySlug.get(slug);
    if (it && !picked.includes(it)) picked.push(it);
  });
  if (picked.length < count) {
    all.forEach((it) => {
      if (!picked.includes(it) && it.img) picked.push(it);
    });
  }

  return picked.slice(0, count).map((it) => localizeItem(it, locale));
}
