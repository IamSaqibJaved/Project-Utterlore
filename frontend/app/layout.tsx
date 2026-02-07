import type { Metadata } from "next";
import { bonaNova, inter, figmaHand, brunella } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "UtterLore - Empowering Knowledge for the Mindful Collectives",
  description: "Where design meets storytelling. Explore insights, ideas, and reflections across beauty, fashion, and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bonaNova.variable} ${inter.variable} ${figmaHand.variable} ${brunella.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
