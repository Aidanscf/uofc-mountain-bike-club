import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const imageUrl = new URL("/og.png", origin).toString();

  return {
    title: "UofC Mountain Bike Club",
    description:
      "Animated University of Calgary Mountain Bike Club site for rides, trail gallery, membership, and weekly shreds across Calgary and the Rockies.",
    metadataBase: new URL(origin),
    icons: {
      icon: "/favicon.jpg",
      shortcut: "/favicon.jpg",
    },
    openGraph: {
      title: "UofC Mountain Bike Club",
      description:
        "Join the Calgary Shred Pack for weekly rides, clinics, shuttles, and Rocky Mountain trail days.",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "UofC MTB Club social preview with dinosaur rider in the Rockies",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "UofC Mountain Bike Club",
      description:
        "Weekly UCalgary MTB rides, clinics, shuttles, and trail community across Calgary and the Rockies.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
