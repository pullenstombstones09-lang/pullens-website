import type { Metadata } from "next";
import { Inter, Lora, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pullen's Tombstones — Cast in Stone Since 1982",
    template: "%s | Pullen's Tombstones",
  },
  description:
    "KwaZulu-Natal's most trusted tombstone manufacturer since 1982. Over 22,000 memorials installed across South Africa.",
  metadataBase: new URL("https://pullenstombstones.co.za"),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Pullen's Tombstones",
    title: "Pullen's Tombstones — Cast in Stone Since 1982",
    description:
      "KwaZulu-Natal's most trusted tombstone manufacturer since 1982. Over 22,000 memorials installed.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pullen's Tombstones — Cast in Stone Since 1982",
    description:
      "KwaZulu-Natal's most trusted tombstone manufacturer since 1982.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
