import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { modeInitScript } from "@/lib/mode";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://reveren.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "reveren — One pipeline. Every agent.",
    template: "%s · reveren",
  },
  description:
    "Structured, versioned, repo-aware guardrails for AI coding agents. Playbooks plus pipelines that make whichever agent you already pay for dramatically better.",
  applicationName: "reveren",
  authors: [{ name: "reveren" }],
  keywords: [
    "AI coding agents",
    "playbooks",
    "Claude",
    "Cursor",
    "Copilot",
    "Windsurf",
    "agent orchestration",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "reveren",
    title: "reveren — One pipeline. Every agent.",
    description:
      "Stop correcting your AI. Start directing it. Structured guardrails for whichever coding agent you already use.",
    images: [
      {
        url: "/og/reveren-og-1200x630.svg",
        width: 1200,
        height: 630,
        alt: "reveren — One pipeline. Every agent.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "reveren — One pipeline. Every agent.",
    description: "Stop correcting your AI. Start directing it.",
    images: ["/og/reveren-og-1200x630.svg"],
  },
  icons: {
    icon: [{ url: "/logo/svg/reveren-favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#141312" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Sets data-mode on <html> before paint so MUI's CSS-vars resolve
          to the right palette on the first frame. Inline so it runs
          synchronously; CSP-safe (no eval). React 19 hoists this into
          the rendered <head>; previous attempts via next/script with
          strategy="beforeInteractive" got deferred in production.
        */}
        <script dangerouslySetInnerHTML={{ __html: modeInitScript }} />
      </head>
      <body>
        <ThemeRegistry>
          <a href="#main" className="rv-skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}

