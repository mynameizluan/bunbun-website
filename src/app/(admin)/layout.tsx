import type { Metadata } from "next";
import "../globals.css";
import { fontClass } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Bunbun Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={fontClass}>
      <body className="bg-paper text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
