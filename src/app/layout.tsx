import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosy Songs — Toutes les musiques du podcast Cosy Corner",
  description:
    "Retrouvez toutes les musiques citées dans le podcast Cosy Corner. Parcourez les épisodes, découvrez les morceaux et exportez vos playlists sur Spotify, Deezer ou YouTube.",
  openGraph: {
    title: "Cosy Songs — Toutes les musiques du podcast Cosy Corner",
    description:
      "Retrouvez toutes les musiques citées dans le podcast Cosy Corner. Parcourez les épisodes et créez vos playlists.",
    siteName: "Cosy Songs",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
