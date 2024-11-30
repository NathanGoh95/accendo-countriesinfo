import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Country Explorer - Explore Global Countries, Facts, and Data',
  description: 'Discover detailed information about countries around the world. Explore country names, capitals, populations, languages, currencies, regions, and more. View countries in card or table formats and filter by region.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
