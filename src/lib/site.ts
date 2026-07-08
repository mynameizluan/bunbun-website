import content from "@/data/site-content.json";

// Domain đặt trong dashboard (tab Tên miền) — fallback placeholder khi chưa có
export const SITE_DOMAIN = content.domain?.trim() || "bunbunburger.vn";
export const SITE_URL = `https://${SITE_DOMAIN}`;
