import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    description: "Full-stack software engineer specializing in scalable applications and enterprise integrations. Expert in C#/.NET, TypeScript, React, and Angular.",
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
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
    description: "Full-stack software engineer with 6+ years building scalable applications. Expert in C#/.NET, TypeScript, React, and Angular.",
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
        <link rel="canonical" href={SITE_CONFIG.url} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          themes={['light', 'dark', 'ocean', 'forest', 'sunset', 'minimal']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
