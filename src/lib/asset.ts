// next/image (unoptimized) và <video>/<source> không tự thêm basePath,
// nên mọi asset trong public/ phải đi qua helper này để chạy được trên GitHub Pages.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
