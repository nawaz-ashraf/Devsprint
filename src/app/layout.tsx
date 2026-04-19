import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nawaz-immersive.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nawaz — Flutter & Web Developer",
    template: "%s | Nawaz Studio",
  },
  description:
    "Premium futuristic developer portfolio for Flutter apps and modern websites with immersive 3D storytelling and conversion-focused UX.",
  openGraph: {
    title: "Nawaz — Flutter & Web Developer",
    description:
      "I build modern apps and websites that solve real problems. Explore Flutter products and premium web builds.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nawaz Studio immersive digital experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawaz — Flutter & Web Developer",
    description:
      "Futuristic portfolio with coding-focused 3D visuals, Flutter app showcase, and high-conversion UX.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-[#050510] text-zinc-100 selection:bg-cyan-400/25 selection:text-cyan-100">
        {children}
      </body>
    </html>
  );
}
