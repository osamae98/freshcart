import { ReactNode } from "react";
import type { Metadata } from "next";
import "../styles/globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { Exo } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { verifyToken } from "@/features/auth/server/auth.actions";
import { getInitialCart } from "@/features/cart/server/cart.actions";
import { getInitialWishlist } from "@/features/wishlist/server/wishlist.actions";

export const metadata: Metadata = {
  title: "FreshCart",
  icons: {
    icon: "/favicon.png",
  },
};

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo"
})

export default async function RootLayout({ children }: { children: ReactNode }) {

  const [authValues, cartValues, wishlistValues] = await Promise.all([
    verifyToken(),
    getInitialCart(),
    getInitialWishlist()
  ]);

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium`} suppressHydrationWarning>
        <Providers preloadedState={{ auth: authValues, cart: { ...cartValues, isLoading: false, error: null }, wishlist: { ...wishlistValues, isLoading: false, error: null } }}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

