import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/globals.css";
import { BASE_URL } from "../../config";
import Provider from "@/shared/components/provider";
import { cn } from "@/shared/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// For Persian/Arabic projects, swap Inter for Vazirmatn and set <html lang="fa" dir="rtl">:
// const vazirmatn = Vazirmatn({
//   subsets: ["arabic", "latin"],
//   variable: "--font-vazir",
//   display: "swap",
// });

const SITE_NAME = "Next.js Boilerplate";
const SITE_DESCRIPTION =
  "An opinionated Next.js starter with the App Router, TypeScript, Tailwind CSS, React Query, Zustand, and a typed API layer.";
const OG_IMAGE = {
  url: "/logo.png",
  width: 1089,
  height: 1067,
  alt: `${SITE_NAME} logo`,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, inter.variable, "antialiased")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
