import type { Metadata } from "next";
import { Inter, Oswald, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Los Aldeanos — Archivo Digital del Legado",
  description:
    "Referencia sobre Los Aldeanos: historia del dúo, El rap es guerra, discografía y legado del rap cubano (2003–2014).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${oswald.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen flex flex-col antialiased font-sans">{children}</body>
    </html>
  );
}
