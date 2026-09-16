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

  return {
    title: "UofC Mountain Bike Club",
    description:
      "University of Calgary Mountain Bike Club site for group rides, trail photos, membership, sponsors, and ride details.",
    metadataBase: new URL(origin),
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "UofC Mountain Bike Club",
      description:
        "Join the UofC MTB club for weekly rides, skills sessions, sponsor benefits, and local mountain bike community.",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "UofC Mountain Bike Club",
      description:
        "Weekly rides, club benefits, sponsors, and $10 membership details for UCalgary MTB.",
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
