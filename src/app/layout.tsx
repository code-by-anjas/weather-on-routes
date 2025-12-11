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
  title: "Weather on Route — Real-Time Weather Along Your Journey",
  description:
    "Weather on Route helps you check weather conditions along your travel path using Google Maps Platform and real-time weather APIs.",
  authors: [{ name: "code-by-anjas" }],
  creator: "code-by-anjas",
  metadataBase: new URL("https://weather-on-route.vercel.app"),
  keywords: [
    "weather",
    "weather on route",
    "route weather",
    "travel weather",
    "weather map",
    "nextjs",
    "google maps api",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Weather on Route",
    description:
      "See weather updates along your journey with Google Maps integration and real-time weather forecasting.",
    url: "https://weather-on-route.vercel.app",
    siteName: "Weather on Route",
    locale: "en_US",
    type: "website",
  },
  other: {
    copyright: "© code-by-anjas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
