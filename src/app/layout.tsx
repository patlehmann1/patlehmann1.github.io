import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Patrick Lehmann - Full-Stack Software Engineer",
  description: "Full-stack software engineer with 6+ years building scalable applications using C#/.NET, TypeScript, and modern JavaScript frameworks. Delivering consistent business value through changing technologies and organizational transitions.",
  keywords: ["Patrick Lehmann", "Full-Stack Developer", "Software Engineer", "C#", ".NET", "TypeScript", "React", "Angular", "Node.js"],
  authors: [{ name: "Patrick Lehmann" }],
  creator: "Patrick Lehmann",
  openGraph: {
    title: "Patrick Lehmann - Full-Stack Software Engineer",
    description: "Full-stack software engineer specializing in scalable applications and enterprise integrations. Expert in C#/.NET, TypeScript, React, and Angular.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Lehmann - Full-Stack Software Engineer",
    description: "Full-stack software engineer with 6+ years building scalable applications. Expert in C#/.NET, TypeScript, React, and Angular.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
