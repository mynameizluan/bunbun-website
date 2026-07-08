import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";

// Dùng chung cho cả 2 root layout (vi) và en/
export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontClass = `${jakarta.variable} ${vietnamPro.variable}`;
