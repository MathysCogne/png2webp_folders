import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "Bulk PNG to WebP Converter";
const APP_DESCRIPTION =
  "Convert entire folders of images (PNG, JPG) to WebP right in your browser. Fast, private, and preserves folder structure.";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "PNG to WebP",
    "JPG to WebP",
    "image converter",
    "bulk image converter",
    "folder converter",
    "webp converter",
    "online tool",
    "privacy",
    "client-side",
    "no upload",
  ],
  authors: [{ name: "Mathys Cogne", url: "https://github.com/MathysCogne" }],
  creator: "Mathys Cogne",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: "/og.jpg",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: "/og.jpg",
    creator: "@MattCogne",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
