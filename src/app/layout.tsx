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

        {/* Explicit Open Graph Meta Tags for Better Compatibility */}
        <meta property="og:title" content="Patrick Lehmann - Full-Stack Software Engineer" />
        <meta property="og:description" content="Full-stack software engineer specializing in scalable applications and enterprise integrations. Expert in C#/.NET, TypeScript, React, and Angular." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_CONFIG.url} />
        <meta property="og:site_name" content="Patrick Lehmann" />
        <meta property="og:image" content={`${SITE_CONFIG.url}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Patrick Lehmann - Full-Stack Software Engineer" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Patrick Lehmann - Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Full-stack software engineer with 6+ years building scalable applications. Expert in C#/.NET, TypeScript, React, and Angular." />
        <meta name="twitter:image" content={`${SITE_CONFIG.url}/og-image.png`} />
        <meta name="twitter:image:alt" content="Patrick Lehmann - Full-Stack Software Engineer" />

        {/* Additional Meta Tags for Better Social Media Support */}
        <meta name="theme-color" content="#C4651C" />
        <link rel="canonical" href={SITE_CONFIG.url} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
