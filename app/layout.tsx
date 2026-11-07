import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

// Display serif for headings: warm and slightly soft.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Readable sans-serif for body text and UI.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Each page sets its own title; "%s" is replaced by it (e.g. "Calendar | Desi Days").
  title: {
    default: "Desi Days",
    template: "%s | Desi Days",
  },
  description:
    "Learn when Hindu festivals happen, what they mean, and how to celebrate them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
