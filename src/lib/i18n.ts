export type Locale = "vi" | "en";

// Route tương ứng giữa 2 ngôn ngữ — vi ở gốc, en dưới /en
export const ROUTES = {
  home: { vi: "/", en: "/en" },
  menu: { vi: "/menu", en: "/en/menu" },
  about: { vi: "/ve-chung-toi", en: "/en/about" },
  contact: { vi: "/lien-he", en: "/en/contact" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function routeKeyFromPath(pathname: string): RouteKey {
  for (const [key, paths] of Object.entries(ROUTES)) {
    if (paths.vi === pathname || paths.en === pathname) return key as RouteKey;
  }
  return "home";
}

/** Đường dẫn trang hiện tại ở ngôn ngữ còn lại (cho nút switch VI/EN). */
export function switchLocalePath(pathname: string, to: Locale): string {
  return ROUTES[routeKeyFromPath(pathname)][to];
}

export const NAV_LABELS: Record<Locale, Record<RouteKey, string>> = {
  vi: {
    home: "Trang chủ",
    menu: "Thực đơn",
    about: "Về chúng tôi",
    contact: "Liên hệ",
  },
  en: {
    home: "Home",
    menu: "Menu",
    about: "About us",
    contact: "Contact",
  },
};

export const HOURS_I18N: Record<Locale, { days: string; time: string }[]> = {
  vi: [
    { days: "Thứ 2 – Thứ 6", time: "10:00 – 22:00" },
    { days: "Thứ 7 – Chủ nhật", time: "09:00 – 22:30" },
  ],
  en: [
    { days: "Mon – Fri", time: "10:00 – 22:00" },
    { days: "Sat – Sun", time: "09:00 – 22:30" },
  ],
};

export const VENUE_LABELS: Record<Locale, [string, string]> = {
  vi: ["Cơ sở 01", "Cơ sở 02"],
  en: ["Location 01", "Location 02"],
};
