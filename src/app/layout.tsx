import type { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SITE_CONFIG, SITE_URL } from "@/lib/constants";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ["Patrick Lehmann", "Full-Stack Developer", "Software Engineer", "C#", ".NET", "TypeScript", "React", "Angular", "Node.js"],
  authors: [{ name: "Patrick Lehmann" }],
  creator: "Patrick Lehmann",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Patrick Lehmann - Full-Stack Software Engineer",
    description: SITE_CONFIG.description,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Patrick Lehmann",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Patrick Lehmann - Full-Stack Software Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Lehmann - Full-Stack Software Engineer",
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Patrick Lehmann - Articles & Insights"
          href="/rss.xml"
        />


        {/* Additional Meta Tags for Better Social Media Support */}
        <meta name="theme-color" content="#C4651C" />
      </head>
      <body
        className={`${pressStart.variable} ${pixelify.variable} ${jetbrainsMono.variable} font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          themes={['light', 'dark', 'ocean', 'forest', 'synthwave', 'cobalt2', 'minimal']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
