import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Magic Canvas",
  description: "Drawing problems, deriving solutions! Solve any problem whether it's a mathematical equation, real life world problem or a story line with a simple drawing.",
  keywords: "Magic Canvas, AI, Artificial Intelligence, Draw to Solve, Physics, Mathematics, Interactive Tool",
  authors: [{ name: "Divyansh Vishwakarma" }],
  openGraph: {
    title: "Magic Canvas",
    description: "Drawing problems, deriving solutions! Solve any problem whether it's a mathematical equation, real life world problem or a story line with a simple drawing.",
    images: [
      {
        url: "/magic-canvas-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Magic Canvas Preview",
      },
    ],
    url: "https://magic-canvas-rho.vercel.app/landing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Canvas",
    description: "Drawing problems, deriving solutions! Solve any problem whether it's a mathematical equation, real life world problem or a story line with a simple drawing.",
    images: ["/magic-canvas-preview.jpg"],
    creator: "@deevee47",
    site: "@deevee47",
  },
  icons: {
    icon: "/wand.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-poppins antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}